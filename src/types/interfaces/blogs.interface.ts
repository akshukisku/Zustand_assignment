export interface Blog {
  id?: string;
  title: string;
  slug: string;
  content?: string;
  // excerpt:string;
  featured_images: string | null;
  published?: boolean;
  auth_user_id: string;
  page: number;
  limit: number;

  nextPage: () => void;
  prevPage: () => void;
  setLimit: (payload: number) => void;
}

export interface BlogState {
  isLoading: boolean;
  isError: string | null;

  blogs: Blog[];
  isBlogs: Blog | null;
  adminBlogs: Blog[];

  imagePreview: string | null;
  dialog: boolean;

  page: number;
  limit: number;

  nextPage: () => void;
  prevPage: () => void;
  setLimit: (payload: number) => void;

  setImagePreview: (payload: string) => void;
  closeImagePreview: () => void;

  setDialog: (open: boolean) => void;
  closeDialog: () => void;

  getAdminBlogs: (payload: { page: number; limit: number }) => Promise<any>;

  addBlog: (payload: BlogPayload) => Promise<any>;

  updateBlog: (payload: { id: string; payload: BlogPayload }) => Promise<any>;

  blogStatusChange: (payload: {
    id: string;
    published: boolean;
  }) => Promise<any>;

  deleteBlog: (id: string) => Promise<any>;

  setBlog: (blog: Blog | null) => void;
  clearBlog: () => void;
}
export interface BlogPayload {
  title: string;
  slug: string;
  content: string;
  // excerpt:string;
  featured_images: File | null;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data?: Blog[];
}
