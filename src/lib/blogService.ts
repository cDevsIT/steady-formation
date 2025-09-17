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
      ? 'https://api.cdevs.com.bd/api'
      : 'http://localhost:8000/api');
  if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const url = new URL(apiUrl);
  return `${url.protocol}//${url.host}`;
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

}

export const blogService = new BlogService();
export default blogService;

// Console examples for testing
console.log('=== Blog Service Examples ===');

// Example 1: Get all blogs
blogService.getAllBlogs(1)
  .then(response => {
    console.log('📚 All Blogs (Page 1):', response);
    console.log(`Total blogs: ${response.data.total}`);
    console.log(`Current page: ${response.data.current_page}`);
    console.log(`Blogs per page: ${response.data.per_page}`);
    console.log(`First blog title: ${response.data.data[0]?.title || 'No blogs found'}`);
  })
  .catch(error => {
    console.error('❌ Error fetching all blogs:', error);
  });

// Example 2: Get a single blog (replace 'example-blog-slug' with actual slug)
const exampleSlug = 'example-blog-slug';
blogService.getBlogBySlug(exampleSlug)
  .then(response => {
    console.log('📖 Single Blog:', response);
    console.log(`Blog title: ${response.data.title}`);
    console.log(`Blog author: ${response.data.author.name}`);
    console.log(`Blog category: ${response.data.category.name}`);
    console.log(`Blog tags: ${response.data.tags.map(tag => tag.name).join(', ')}`);
  })
  .catch(error => {
    console.error(`❌ Error fetching blog with slug "${exampleSlug}":`, error);
  });

// Example 3: Get specific blog information
blogService.getBlogTitle(exampleSlug)
  .then(title => {
    console.log('📝 Blog Title:', title);
  })
  .catch(error => {
    console.error('❌ Error fetching blog title:', error);
  });

// Example 4: Get total number of blogs
blogService.getTotalBlogs()
  .then(total => {
    console.log('📊 Total Blogs:', total);
  })
  .catch(error => {
    console.error('❌ Error fetching total blogs:', error);
  });