// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cdevs.com.bd/api';

export const API_ENDPOINTS = {
  BLOG: {
    LIST: `${API_BASE_URL}/blogs`,
    DETAIL: (slug: string) => `${API_BASE_URL}/blogs/${slug}`,
    CREATE: `${API_BASE_URL}/blogs`,
    UPDATE: (id: number) => `${API_BASE_URL}/blogs/${id}`,
    // DELETE: (id: number) => `${API_BASE_URL}/blogs/${id}`,
  },
  // Add other API endpoints here as needed
};

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Removed credentials: 'include' to avoid CORS issues
    };

    console.log('Fetching from:', endpoint);
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(errorData?.message || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Add more descriptive error message
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    throw error;
  }
}; 