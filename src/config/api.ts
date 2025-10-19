// API Configuration
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'production' 
            ? 'https://app.steadyformation.com/api' 
            : 'http://localhost:8000/api'),
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            SIGNUP: '/auth/signup',
            LOGOUT: '/auth/logout',
            USER: '/auth/user',
        },
        USER: {
            PROFILE: '/user/profile',
            COMPANIES: '/user/companies',
            COMPANY: '/user/company',
            UPDATE_PROFILE: '/user/profile',
            UPDATE_PASSWORD: '/user/password',
            UPLOAD_AVATAR: '/user/avatar',
        },
        PAYMENTS: {
            STRIPE: {
                CREATE_SESSION: '/payments/stripe/create-session',
            },
            PAYPAL: {
                CREATE_PAYMENT: '/payments/paypal/create-payment',
            },
        },
        WALLET: {
            BALANCE: '/wallet/balance',
            PROCESS_PAYMENT: '/wallet/process-payment',
        },
        BLOGS: {
            LIST: '/blogs',
            DETAIL: (slug: string) => `/blogs/${slug}`,
        },
        STATE_FEES: {
            BY_FIELD: '/state-fees/by-field',
            ALL: '/state-fees/all',
            BY_STATE: (stateName: string) => `/state-fees/state/${stateName}`,
        },
               COMPANY_STATUS: {
                   STATUS: '/company-status/status',
                   USER_ORDERS: '/company-status/user-orders',
               },
               DOCUMENTS: {
                   USER_DOCUMENTS: '/documents/user-documents',
                   DOWNLOAD: (orderId: string, type: string) => `/documents/download/${orderId}/${type}`,
               },
               QUICK_ACTIONS: {
                   USER_ACTIONS: '/quick-actions/user-actions',
               }
    }
};

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    // Only set default Content-Type if not already provided and not using FormData
    const isFormData = options.body instanceof FormData;
    const defaultOptions: RequestInit = {
      headers: {
        'Accept': 'application/json',
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
    };
    
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      
      // For validation errors (422), preserve the full error structure
      if (response.status === 422 && errorData) {
        throw new Error(JSON.stringify(errorData));
      }
      
      throw new Error(errorData?.message || `API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Add more descriptive error message
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    throw error;
  }
}; 