import { API_CONFIG, fetchApi } from '@/config/api';

export interface PaymentHistoryItem {
  id: number;
  date: string;
  description: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Fail';
  statusColor: string;
  action: string;
  actionType: 'download' | 'pay' | 'retry';
}

export interface PaymentHistoryResponse {
  status: string;
  message: string;
  data: {
    history: PaymentHistoryItem[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    }
  } | null;
}

export const paymentService = {
  async getHistory(params: { company_id?: number; user_id?: number; page?: number; per_page?: number } = {}) {
    const search = new URLSearchParams();
    if (params.company_id) search.append('company_id', String(params.company_id));
    if (params.user_id) search.append('user_id', String(params.user_id));
    if (params.page) search.append('page', String(params.page));
    if (params.per_page) search.append('per_page', String(params.per_page));

    const url = `${API_CONFIG.BASE_URL}/payments/history${search.toString() ? `?${search.toString()}` : ''}`;

    const res = await fetch(url, {
      // Public endpoint: no credentials, no Authorization header
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch payment history');
    }
    return res.json() as Promise<PaymentHistoryResponse>;
  }
};


