import { API_CONFIG } from '@/config/api';

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

const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('auth_token');
  const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  });
  return response.json();
};

export const blogService = {
  // Get all blogs
  getAllBlogs: async (page: number = 1): Promise<BlogResponse> => {
    return fetchApi<BlogResponse>(`${API_CONFIG.ENDPOINTS.BLOGS.LIST}?page=${page}`);
  },

  // Get single blog by slug
  getBlogBySlug: async (slug: string): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(API_CONFIG.ENDPOINTS.BLOGS.DETAIL(slug));
  },

  // Create new blog
  createBlog: async (blogData: Partial<Blog>): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(API_CONFIG.ENDPOINTS.BLOGS.LIST, {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  },

  // Update blog
  updateBlog: async (id: number, blogData: Partial<Blog>): Promise<SingleBlogResponse> => {
    return fetchApi<SingleBlogResponse>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  },

  // Delete blog
  deleteBlog: async (id: number): Promise<{ status: string; message: string }> => {
    return fetchApi<{ status: string; message: string }>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  },
}; 