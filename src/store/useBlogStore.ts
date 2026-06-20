import { addBlogFns, blogStatusChangeFns, deleteBlogFns, fetchAdminBlogsFns, fetchPublishedBlogsFns, updateBlogFns } from "@/api/function/blog.function";
import { BlogPayload, BlogState } from "@/types/interfaces/blogs.interface";
import { create } from "zustand";

export const useBlogStore = create<BlogState>((set, get) => ({
  isLoading: false,
  isError: null,

  blogs: [],
  isBlogs: null,
  adminBlogs: [],

  dialog: false,
  imagePreview: null,
  page: 1,
  limit: 5,
  setBlog: (blog:any) => {
  set({
    isBlogs: blog,
  });
},

clearBlog: () => {
  set({
    isBlogs: null,
  });
},

  nextPage: () => {
    set({ page: get().page + 1 });
  },

  prevPage: () => {
    set({ page: get().page - 1 });
  },

  setLimit: (payload: number) => {
    set({ limit: payload });
  },

  setImagePreview: (payload: string) => {
    set({
      imagePreview: payload,
    });
  },

  closeImagePreview: () => {
    set({
      imagePreview: null,
    });
  },

  setDialog: (open: boolean) => {
    set({
      dialog: open,
    });
  },

  closeDialog: () => {
    set({
      dialog: false,
      imagePreview: null,
    });
  },

  getAdminBlogs: async ({ page, limit }: { page: number; limit: number }) => {
    set({
      isLoading: true,
      isError: null,
    });

    try {
      const res = await fetchAdminBlogsFns({
        page,
        limit,
      });

      set({
        isLoading: false,
        isError: null,
        adminBlogs: res.data || [],
      });

      return res;
    } catch (error) {
      const err = error as { message: string };

      set({
        isLoading: false,
        isError: err.message,
      });

      return {
        success: false,
        message: err.message,
        data: [],
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  addBlog: async (payload: BlogPayload) => {
    set({
      isLoading: true,
      isError: null,
    });

    try {
      const res = await addBlogFns(payload);

      const blogsRes = await get().getAdminBlogs({
        page: 1,
        limit: 10,
      });

      set({
        adminBlogs: blogsRes.data || [],
      });

      return res;
    } catch (error) {
      const err = error as { message: string };

      set({
        isLoading: false,
        isError: err.message,
      });

      return {
        success: false,
        message: err.message,
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  blogStatusChange: async ({
    id,
    published,
  }: {
    id: string;
    published: boolean;
  }) => {
    try {
      const res = await blogStatusChangeFns({
        id,
        published,
      });

      const blogsRes = await get().getAdminBlogs({
        page: 1,
        limit: 10,
      });

      set({
        adminBlogs: blogsRes.data || [],
      });

      return res;
    } catch (error) {
      const err = error as { message: string };

      return {
        success: false,
        message: err.message,
      };
    }
  },

  deleteBlog: async (id: string) => {
    set({
      isLoading: true,
      isError: null,
    });

    try {
      const res = await deleteBlogFns(id);

      const blogsRes = await get().getAdminBlogs({
        page: 1,
        limit: 10,
      });

      set({
        adminBlogs: blogsRes.data || [],
      });

      return res;
    } catch (error) {
      const err = error as { message: string };

      set({
        isError: err.message,
      });

      return {
        success: false,
        message: err.message,
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  updateBlog: async ({
  id,
  payload,
}: {
  id: string;
  payload: BlogPayload;
}) => {
  set({
    isLoading: true,
    isError: null,
  });

  try {
    const res = await updateBlogFns({
      id,
      payload,
    });

    const blogsRes = await get().getAdminBlogs({
      page: get().page,
      limit: get().limit,
    });

    set({
      adminBlogs: blogsRes.data || [],
    });

    return res;
  } catch (error) {
    const err = error as { message: string };

    return {
      success: false,
      message: err.message,
    };
  } finally {
    set({
      isLoading: false,
    });
  }
},
getPublishedBlogs: async () => {
  set({
    isLoading: true,
    isError: null,
  });

  try {
    const res = await fetchPublishedBlogsFns();

    set({
      blogs: res.data || [],
    });

    return res;
  } catch (error) {
    const err = error as { message: string };

    set({
      isError: err.message,
    });

    return {
      success: false,
      message: err.message,
      data: [],
    };
  } finally {
    set({
      isLoading: false,
    });
  }
},
}));
