'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from '@/componant/ui/Image';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    router.push('/client/dashboard');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md mx-auto text-center p-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Success Icon */}
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Payment Successful!
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Your company formation has been submitted and payment has been processed successfully. 
                        You will receive a confirmation email shortly.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Your application will be reviewed by our team</li>
                            <li>• You'll receive status updates via email</li>
                            <li>• Processing typically takes 2-3 business days</li>
                            <li>• You can track progress in your dashboard</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/client/dashboard')}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                            Go to Dashboard
                        </button>

                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                        >
                            Return to Home
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                        Redirecting to dashboard in {countdown} seconds...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage; 