import { API_CONFIG, fetchApi } from '@/config/api';
import companyFormationService from '@/lib/companyFormationService';

export interface PaymentSessionData {
    session_id: string;
    checkout_url: string;
    user_id: number;
    company_id: number;
    order_id: number;
}

export interface PayPalPaymentData {
    payment_id: string;
    approval_url: string;
    user_id: number;
    company_id: number;
}

export interface PaymentResponse {
    status: string;
    message: string;
    data?: PaymentSessionData | PayPalPaymentData;
}

export interface PaymentSuccessData {
    payment_id: string;
    amount: number;
    currency: string;
    payment_method: string;
    receipt_url?: string;
}

export interface PaymentSuccessResponse {
    status: string;
    message: string;
    data?: PaymentSuccessData;
}

// Create Stripe checkout session
export const createStripeSession = async (localStorageData: any): Promise<PaymentSessionData> => {
    const response = await fetchApi<PaymentResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.STRIPE.CREATE_SESSION}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                localStorageData: JSON.stringify(localStorageData)
            }),
        }
    );

    if (response.status === 'success' && response.data) {
        return response.data as PaymentSessionData;
    } else {
        throw new Error(response.message || 'Failed to create Stripe session');
    }
};

// Create PayPal payment
export const createPayPalPayment = async (localStorageData: any): Promise<PayPalPaymentData> => {
    const response = await fetchApi<PaymentResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.PAYPAL.CREATE_PAYMENT}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                localStorageData: JSON.stringify(localStorageData)
            }),
        }
    );

    if (response.status === 'success' && response.data) {
        return response.data as PayPalPaymentData;
    } else {
        throw new Error(response.message || 'Failed to create PayPal payment');
    }
};

// Handle Stripe payment success
export const handleStripeSuccess = async (sessionId: string, userId: string, orderId: string): Promise<PaymentSuccessData> => {
    const localStorageData = companyFormationService.getFromLocalStorage();
    const amount = localStorageData?.payment?.amount || 100;
    return {
        payment_id: sessionId,
        amount: amount,
        currency: 'USD',
        payment_method: 'stripe',
        receipt_url: `https://dashboard.stripe.com/payments/${sessionId}`
    };
};

// Handle Stripe payment cancel
export const handleStripeCancel = async (userId: string, orderId: string): Promise<void> => {
    // Handle cancel logic here if needed
    console.log('Stripe payment cancelled for user:', userId, 'order:', orderId);
};

// Handle PayPal payment success
export const handlePayPalSuccess = async (token: string, payerId: string): Promise<PaymentSuccessData> => {
    const localStorageData = companyFormationService.getFromLocalStorage();
    const amount = localStorageData?.payment?.amount || 100;
    return {
        payment_id: token,
        amount: amount,
        currency: 'USD',
        payment_method: 'paypal'
    };
};

// Handle PayPal payment cancel
export const handlePayPalCancel = async (): Promise<void> => {
    // Handle cancel logic here if needed
    console.log('PayPal payment cancelled');
};
