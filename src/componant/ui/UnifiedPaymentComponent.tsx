'use client';
import { useState } from 'react';
import PaymentComponent from './PaymentComponent';
import StripePaymentComponent from './StripePaymentComponent';

interface UnifiedPaymentComponentProps {
    amount: number;
    currency?: string;
    onSuccess: (data: any) => void;
    onError: (error: string) => void;
    onCancel: () => void;
    className?: string;
}

type PaymentMethod = 'paypal' | 'stripe';

const UnifiedPaymentComponent: React.FC<UnifiedPaymentComponentProps> = ({
    amount,
    currency = 'usd',
    onSuccess,
    onError,
    onCancel,
    className = ''
}) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('paypal');

    return (
        <div className={`flex flex-col gap-6 ${className}`}>
            <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Choose Payment Method</h3>
                <p className="text-gray-600 mb-4">
                    Total Amount: <span className="font-bold text-green-600">${amount.toFixed(2)}</span>
                </p>
            </div>

            {/* Payment Method Selection */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => setSelectedMethod('paypal')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedMethod === 'paypal'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H5.777c-.681 0-1.352-.163-1.844-.478C3.441 12.321 3.089 11.811 3.089 11.158c0-.653.352-1.163.844-1.478.492-.315 1.163-.478 1.844-.478h12.446c.681 0 1.352.163 1.844.478z"/>
                    </svg>
                    PayPal
                </button>

                <button
                    onClick={() => setSelectedMethod('stripe')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedMethod === 'stripe'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Credit Card
                </button>
            </div>

            {/* Payment Component */}
            <div className="mt-4">
                {selectedMethod === 'paypal' ? (
                    <PaymentComponent
                        amount={amount}
                        onSuccess={onSuccess}
                        onError={onError}
                        onCancel={onCancel}
                    />
                ) : (
                    <StripePaymentComponent
                        amount={amount}
                        currency={currency}
                        onSuccess={onSuccess}
                        onError={onError}
                        onCancel={onCancel}
                    />
                )}
            </div>

            {/* Payment Security Info */}
            <div className="text-center text-sm text-gray-500 mt-4">
                <p>🔒 All payments are encrypted and secure</p>
                <p>💳 We accept all major credit cards and PayPal</p>
            </div>
        </div>
    );
};

export default UnifiedPaymentComponent; 