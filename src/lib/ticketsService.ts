import { API_CONFIG } from '@/config/api';

export interface Ticket {
  id: number;
  user: string;
  avatar: string;
  name: string;
  subject: string;
  submitted: string;
  updated: string;
  assignee: string;
  status: string;
  priority: string;
  content?: string;
  file_name?: string;
  file_url?: string;
  created_at?: string;
  user_info?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: number;
  comment_text: string;
  attachment?: string;
  file_name?: string;
  file_url?: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: number;
  };
}

export interface CreateTicketData {
  title: string;
  content: string;
  attachment?: File;
}

export interface AddCommentData {
  comment_text: string;
  attachment?: File;
}

export interface TicketsResponse {
  status: string;
  message: string;
  data: {
    tickets: Ticket[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
    };
  } | null;
}

export interface TicketResponse {
  status: string;
  message: string;
  data: Ticket | null;
}

export interface CommentResponse {
  status: string;
  message: string;
  data: Comment | null;
}

class TicketsService {
  private baseUrl = API_CONFIG.BASE_URL;

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async makeFormDataRequest<T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get user's tickets with pagination and filters
   */
  async getUserTickets(params: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  } = {}): Promise<TicketsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params.search) searchParams.append('search', params.search);
    if (params.status) searchParams.append('status', params.status);

    const queryString = searchParams.toString();
    const endpoint = `/tickets/user-tickets${queryString ? `?${queryString}` : ''}`;

    return this.makeRequest<TicketsResponse>(endpoint);
  }

  /**
   * Get single ticket with comments
   */
  async getTicket(ticketId: number): Promise<TicketResponse> {
    return this.makeRequest<TicketResponse>(`/tickets/${ticketId}`);
  }

  /**
   * Create a new ticket
   */
  async createTicket(data: CreateTicketData): Promise<TicketResponse> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    return this.makeFormDataRequest<TicketResponse>('/tickets', formData);
  }

  /**
   * Add comment to ticket
   */
  async addComment(ticketId: number, data: AddCommentData): Promise<CommentResponse> {
    const formData = new FormData();
    formData.append('comment_text', data.comment_text);
    
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    return this.makeFormDataRequest<CommentResponse>(`/tickets/${ticketId}/comments`, formData);
  }

  /**
   * Download ticket attachment
   */
  async downloadTicketAttachment(ticketId: number): Promise<Blob> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${this.baseUrl}/tickets/${ticketId}/download/ticket`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * Download comment attachment
   */
  async downloadCommentAttachment(commentId: number): Promise<Blob> {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch(`${this.baseUrl}/tickets/comments/${commentId}/download`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return response.blob();
  }

  /**
   * Get download URL for ticket attachment
   */
  getTicketAttachmentUrl(ticketId: number): string {
    const token = localStorage.getItem('auth_token');
    return `${this.baseUrl}/tickets/${ticketId}/download/ticket?token=${token}`;
  }

  /**
   * Get download URL for comment attachment
   */
  getCommentAttachmentUrl(commentId: number): string {
    const token = localStorage.getItem('auth_token');
    return `${this.baseUrl}/tickets/comments/${commentId}/download?token=${token}`;
  }
}

export const ticketsService = new TicketsService();
