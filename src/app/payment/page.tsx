'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import UnifiedPaymentComponent from '@/componant/ui/UnifiedPaymentComponent';
import companyFormationService from '@/lib/companyFormationService';
import { useRouter } from 'next/navigation';

const PaymentContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get payment data from localStorage
        const paymentData = companyFormationService.getFromLocalStorage();
        
        if (!paymentData || !paymentData.payment) {
            setError('No payment data found. Please complete the company formation process first.');
            setLoading(false);
            return;
        }

        // Calculate total amount based on the formation data
        const totalAmount = calculateTotalAmount(paymentData);
        setAmount(totalAmount);
        setLoading(false);
    }, []);

    const calculateTotalAmount = (data: any): number => {
        let total = 0;
        
        // State filing fee
        if (data.businessDetails?.stateName) {
            // This should be fetched from the API based on state
            total += 100; // Default state fee
        }
        
        // Plan price
        if (data.plan?.plan_price) {
            total += data.plan.plan_price;
        }
        
        // EIN amount
        if (data.en_amount) {
            total += data.en_amount;
        }
        
        // Agreement amount
        if (data.agreement_amount) {
            total += data.agreement_amount;
        }
        
        // Rush processing amount
        if (data.rush_processing_amount) {
            total += data.rush_processing_amount;
        }
        
        return total;
    };

    const handlePaymentSuccess = async (paymentData: any) => {
        console.log('Payment successful:', paymentData);
        
        // Clear the localStorage after successful payment
        companyFormationService.clearLocalStorage();
        
        // Redirect to success page
        router.push('/payment-success');
    };

    const handlePaymentError = (error: string) => {
        console.error('Payment failed:', error);
        setError(error);
    };

    const handlePaymentCancel = () => {
        router.push('/setup-company');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payment information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/setup-company')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Return to Company Formation
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
                        <p className="text-gray-600">
                            Your company formation data has been submitted successfully. 
                            Please complete your payment to finalize the process.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <UnifiedPaymentComponent
                            amount={amount}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            onCancel={handlePaymentCancel}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payment information...</p>
                </div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
};

export default PaymentPage; 