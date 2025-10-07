import { API_CONFIG, fetchApi } from '@/config/api';

export interface WalletBalance {
  success: boolean;
  balance: number;
  currency: string;
  wallet_exists: boolean;
  wallet_type?: string;
  status?: string;
}

export interface WalletPaymentResponse {
  success: boolean;
  message: string;
  data?: {
    transaction_id: string;
    company_id: number;
    order_id: number;
    amount_paid: number;
    remaining_balance: number;
    temp_login_token: string;
    user_id: number;
  };
  error?: string;
}

/**
 * Get user's wallet balance
 */
export const getWalletBalance = async (): Promise<WalletBalance> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      // No token, user not logged in
      return {
        success: false,
        balance: 0,
        currency: 'USD',
        wallet_exists: false
      };
    }

    const data = await fetchApi<WalletBalance>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET.BALANCE}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return data;
  } catch (error: any) {
    console.error('Error fetching wallet balance:', error);
    return {
      success: false,
      balance: 0,
      currency: 'USD',
      wallet_exists: false
    };
  }
};

/**
 * Process payment using wallet balance
 */
export const processWalletPayment = async (
  amount: number,
  companyData: any
): Promise<WalletPaymentResponse> => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      throw new Error('Authentication required. Please login to use wallet payment.');
    }

    const data = await fetchApi<WalletPaymentResponse>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WALLET.PROCESS_PAYMENT}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        amount,
        company_data: companyData
      }),
    });
    return data;
  } catch (error: any) {
    console.error('Error processing wallet payment:', error);
    throw error;
  }
};

