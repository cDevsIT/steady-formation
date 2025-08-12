'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import { useCompanyFormation } from '@/lib/useCompanyFormation';

interface PaymentComponentProps {
    amount: number;
    onSuccess: (data: any) => void;
    onError: (error: string) => void;
    onCancel: () => void;
    className?: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
    amount,
    onSuccess,
    onError,
    onCancel,
    className = ''
}) => {
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
    const { createPayPalPayment, capturePayPalPayment, loading, error } = useCompanyFormation();

    // Handle PayPal payment creation
    const handlePayPalPayment = async () => {
        try {
            const result = await createPayPalPayment(amount);
            
            if (result.success && result.data?.approval_url) {
                setPaymentUrl(result.data.approval_url);
                // Redirect to PayPal
                window.location.href = result.data.approval_url;
            } else {
                onError(result.error || 'Failed to create payment');
            }
        } catch (err) {
            onError('Payment creation failed');
        }
    };

    // Handle payment success (called when user returns from PayPal)
    const handlePaymentSuccess = async (orderId: string) => {
        try {
            const result = await capturePayPalPayment(orderId);
            
            if (result.success) {
                onSuccess(result.data);
            } else {
                onError(result.error || 'Payment capture failed');
            }
        } catch (err) {
            onError('Payment capture failed');
        }
    };

    // Check for PayPal return parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const payerId = urlParams.get('PayerID');

        if (token && payerId) {
            // User returned from PayPal successfully
            handlePaymentSuccess(token);
        } else if (urlParams.get('cancel')) {
            // User cancelled payment
            onCancel();
        }
    }, [handlePaymentSuccess, onCancel]);

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Complete Your Payment</h3>
                <p className="text-gray-600 mb-4">
                    Total Amount: <span className="font-bold text-green-600">${amount.toFixed(2)}</span>
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <Button
                    onClick={handlePayPalPayment}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {loading ? 'Processing...' : 'Pay with PayPal'}
                </Button>

                <Button
                    onClick={onCancel}
                    theme="secondary"
                    className="w-full"
                    disabled={loading}
                >
                    Cancel Payment
                </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
                <p>Secure payment processed by PayPal</p>
                <p>Your payment information is encrypted and secure</p>
            </div>
        </div>
    );
};

export default PaymentComponent; 