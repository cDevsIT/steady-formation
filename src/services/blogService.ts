import { API_ENDPOINTS, fetchApi } from '@/config/api';

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  created_at: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
}

export interface BlogResponse {
  status: string;
  data: {
    data: Blog[];
    current_page: number;
    total: number;
    per_page: number;
  };
}

export interface SingleBlogResponse {
  status: string;
  data: Blog;
}

export const blogService = {
  // Get all blogs
  getAllBlogs: async (page: number = 1): Promise<BlogResponse> => {
    return fetchApi<BlogResponse>(`${API_ENDPOINTS.BLOG.LIST}?page=${page}`);
  },

  // Get single blog by slug
  getBlogBySlug: async (slug: string): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(API_ENDPOINTS.BLOG.DETAIL(slug));
  },

  // Create new blog
  createBlog: async (blogData: Partial<Blog>): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(API_ENDPOINTS.BLOG.CREATE, {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  // Update blog
  updateBlog: async (id: number, blogData: Partial<Blog>): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(API_ENDPOINTS.BLOG.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  // Delete blog
  deleteBlog: async (id: number): Promise<{ status: string; message: string }> => {
    return fetchApi<{ status: string; message: string }>(API_ENDPOINTS.BLOG.DELETE(id), {
      method: 'DELETE',
    });
  },
}; 