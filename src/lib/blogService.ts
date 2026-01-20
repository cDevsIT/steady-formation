import { API_CONFIG } from '@/config/api';

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  feature_image: string;
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

export interface BlogListResponse {
  status: string;
  message: string;
  data: {
    data: Blog[];
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}

export interface SingleBlogResponse {
  status: string;
  message: string;
  data: Blog;
}

export function getBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://app.steadyformation.com/api'
      : 'http://localhost:8000/api');
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const url = new URL(apiUrl);
  // return `${url.protocol}//${url.host}`;
  return `${process.env.PROTOCOL}://${process.env.HOSTNAME}`;
}

class BlogService {
  /**
   * Get all blogs with pagination
   */
  async getAllBlogs(page: number = 1): Promise<BlogListResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.LIST}?page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      throw error;
    }
  }

  /**
   * Get a single blog by slug
   */
  async getBlogBySlug(slug: string): Promise<SingleBlogResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.DETAIL(slug)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  }

  /**
   * Get blog title by slug
   */
  async getBlogTitle(slug: string): Promise<string> {
    try {
      const response = await this.getBlogBySlug(slug);
      return response.data.title;
    } catch (error) {
      console.error('Error fetching blog title:', error);
      return ''; // Return empty string as fallback
    }
  }

  /**
   * Get blog content by slug
   */
  async getBlogContent(slug: string): Promise<string> {
    try {
      const response = await this.getBlogBySlug(slug);
      return response.data.content;
    } catch (error) {
      console.error('Error fetching blog content:', error);
      return ''; // Return empty string as fallback
    }
  }

  /**
   * Get blog author by slug
   */
  async getBlogAuthor(slug: string): Promise<string> {
    try {
      const response = await this.getBlogBySlug(slug);
      return response.data.author.name;
    } catch (error) {
      console.error('Error fetching blog author:', error);
      return ''; // Return empty string as fallback
    }
  }

  /**
   * Get blog category by slug
   */
  async getBlogCategory(slug: string): Promise<string> {
    try {
      const response = await this.getBlogBySlug(slug);
      return response.data.category.name;
    } catch (error) {
      console.error('Error fetching blog category:', error);
      return ''; // Return empty string as fallback
    }
  }

  /**
   * Get blog tags by slug
   */
  async getBlogTags(slug: string): Promise<string[]> {
    try {
      const response = await this.getBlogBySlug(slug);
      return response.data.tags.map(tag => tag.name);
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      return []; // Return empty array as fallback
    }
  }

  /**
   * Get total number of blogs
   */
  async getTotalBlogs(): Promise<number> {
    try {
      const response = await this.getAllBlogs();
      return response.data.total;
    } catch (error) {
      console.error('Error fetching total blogs:', error);
      return 0; // Return 0 as fallback
    }
  }

  /**
   * Get blogs by category (if API supports filtering)
   */
  async getBlogsByCategory(categoryName: string, page: number = 1): Promise<BlogListResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.LIST}?category=${categoryName}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  }

  /**
   * Search blogs by title or content (if API supports search)
   */
  async searchBlogs(query: string, page: number = 1): Promise<BlogListResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BLOGS.LIST}?search=${encodeURIComponent(query)}&page=${page}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService();
export default blogService;
