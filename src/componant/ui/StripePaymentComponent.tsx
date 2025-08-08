'use client';
import { useState, useEffect } from 'react';
import Button from './Button';
import { useCompanyFormation } from '@/lib/useCompanyFormation';

interface StripePaymentComponentProps {
    amount: number;
    currency?: string;
    onSuccess: (data: any) => void;
    onError: (error: string) => void;
    onCancel: () => void;
    className?: string;
}

const StripePaymentComponent: React.FC<StripePaymentComponentProps> = ({
    amount,
    currency = 'usd',
    onSuccess,
    onError,
    onCancel,
    className = ''
}) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
    const [cardElement, setCardElement] = useState<any>(null);
    const [stripe, setStripe] = useState<any>(null);
    const [processing, setProcessing] = useState(false);
    
    const { createStripePaymentIntent, confirmStripePayment, loading, error } = useCompanyFormation();

    // Initialize Stripe
    useEffect(() => {
        const loadStripe = async () => {
            if (typeof window !== 'undefined' && !stripe) {
                const { loadStripe } = await import('@stripe/stripe-js');
                const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
                setStripe(stripeInstance);
            }
        };

        loadStripe();
    }, [stripe]);

    // Create payment intent when component mounts
    useEffect(() => {
        const createIntent = async () => {
            try {
                const result = await createStripePaymentIntent(amount, currency);
                
                if (result.success && result.data) {
                    setClientSecret(result.data.client_secret);
                    setPaymentIntentId(result.data.payment_intent_id);
                } else {
                    onError(result.error || 'Failed to create payment intent');
                }
            } catch (err) {
                onError('Failed to initialize payment');
            }
        };

        if (amount > 0) {
            createIntent();
        }
    }, [amount, currency, createStripePaymentIntent, onError]);

    // Handle payment submission
    const handlePaymentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!stripe || !clientSecret || !cardElement) {
            onError('Payment system not ready');
            return;
        }

        setProcessing(true);

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Company Formation Payment',
                    },
                }
            });

            if (stripeError) {
                onError(stripeError.message || 'Payment failed');
            } else if (paymentIntent.status === 'succeeded') {
                // Confirm with our backend
                const result = await confirmStripePayment(paymentIntent.id, paymentIntent.payment_method);
                
                if (result.success) {
                    onSuccess(result.data);
                } else {
                    onError(result.error || 'Payment confirmation failed');
                }
            } else {
                onError('Payment was not completed');
            }
        } catch (err) {
            onError('Payment processing failed');
        } finally {
            setProcessing(false);
        }
    };

    // Initialize card element
    useEffect(() => {
        if (stripe && clientSecret) {
            const elements = stripe.elements();
            const card = elements.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            });

            card.mount('#card-element');
            setCardElement(card);

            return () => {
                card.unmount();
            };
        }
    }, [stripe, clientSecret]);

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

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Card Information
                    </label>
                    <div 
                        id="card-element" 
                        className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                    >
                        {/* Stripe Card Element will be mounted here */}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        type="submit"
                        disabled={loading || processing || !clientSecret}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {loading || processing ? 'Processing...' : 'Pay with Card'}
                    </Button>

                    <Button
                        onClick={onCancel}
                        theme="secondary"
                        className="w-full"
                        disabled={loading || processing}
                    >
                        Cancel Payment
                    </Button>
                </div>
            </form>

            <div className="text-center text-sm text-gray-500">
                <p>Secure payment processed by Stripe</p>
                <p>Your payment information is encrypted and secure</p>
            </div>
        </div>
    );
};

export default StripePaymentComponent; 