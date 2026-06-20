import { supabase } from "@/lib/supabase.config";
import { BlogPayload } from "@/types/interfaces/blogs.interface";

export const fetchAdminBlogsFns = async ({
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (res.error) throw res.error;

    return {
      success: true,
      message: "Blogs fetched successfully",
      data: res.data,
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Failed to fetch blogs",
    };
  }
};

export const addBlogFns = async (payload: BlogPayload) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let imageURL: string | null = null;

    if (payload.featured_images) {
      const extension = payload.featured_images.name.split(".").pop();

      const filename = `${crypto.randomUUID()}.${extension}`;
      console.log("Before _ Upload");

      const { error: imageUploadError } = await supabase.storage
        .from("blog-images")
        .upload(filename, payload.featured_images);

      if (imageUploadError) throw imageUploadError;
      console.log("After Upload");

      console.log("Before Insert");

      const { data: image } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filename);

      imageURL = image.publicUrl;
    }

    const { data: blog, error: failedCreation } = await supabase
      .from("blogs")
      .insert({
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        featured_images: imageURL,
        auth_user_id: user?.id,
        published: false,
      })
      .select();

    if (failedCreation) throw failedCreation;

    return {
      success: true,
      message: "Blog created successfully",
      data: blog,
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Blog creation failed",
    };
  }
};

export const blogStatusChangeFns = async ({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) => {
  try {
    const { error } = await supabase
      .from("blogs")
      .update({
        published: !published,
      })
      .eq("id", id);

    if (error) throw error;

    return {
      success: true,
      message: "Blog status updated successfully",
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Failed to update blog status",
    };
  }
};

export const deleteBlogFns = async (id: string) => {
  try {
    const res = await supabase
      .from("blogs")
      .select("featured_images")
      .eq("id", id)
      .single();

    if (res.error) throw res.error;

    if (res.data?.featured_images) {
      const imageURL = res.data.featured_images;

      const urlArray = imageURL.split("/");
      const fileName = urlArray[urlArray.length - 1];

      if (fileName) {
        const { error: fileDeleteError } = await supabase.storage
          .from("blog-images")
          .remove([fileName]);

        if (fileDeleteError) throw fileDeleteError;
      }
    }

    const { error: deleteError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return {
      success: true,
      message: "Blog deleted successfully",
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Blog deletion failed",
    };
  }
};

export const fetchPublishedBlogsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      message: "Published blogs fetched successfully",
      data,
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Failed to fetch blogs",
    };
  }
};

export const fetchBlogBySlugFns = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return {
      success: true,
      message: "Blog fetched successfully",
      data,
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message || "Failed to fetch blog",
    };
  }
};
export const updateBlogFns = async ({
  id,
  payload,
}: {
  id: string;
  payload: BlogPayload;
}) => {
  try {
    let imageURL: string | null = null;

    if (payload.featured_images) {
      const filename = `${crypto.randomUUID()}-${payload.featured_images.name}`;

      const { error: imageUploadError } = await supabase.storage
        .from("blog-images")
        .upload(filename, payload.featured_images);

      if (imageUploadError) throw imageUploadError;

      const { data: image } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filename);

      imageURL = image.publicUrl;
    }

    const { data, error } = await supabase
      .from("blogs")
      .update({
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        ...(imageURL && { featured_images: imageURL }),
      })
      .eq("id", id)
      .select();

    console.log("UPDATE ERROR", error);

    if (error) throw error;

    return {
      success: true,
      message: "Blog Updated Successfully",
      data,
    };
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message,
    };
  }
};
