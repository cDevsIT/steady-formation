'use client';
import { useEffect, useState, Suspense } from "react";
import ProgressBar from "../ui/ProgressBar";
import { useRouter, useSearchParams } from "next/navigation";
import FirstFunnel from "./FirstFunnel";
import Image from "../ui/Image";
import { CustomFormData } from "../ui/FormSample";
import ErrorPage from 'next/error';
import SecondFunnel from "./SecondFunnel";
import FunnelSidebar from "./Comp/FunnelSidebar";
import ThirdFunnel from "./ThirdFunnel";
import FourthFunnel from "./FourthFunnel";
import FifthFunnel from "./FifthFunnel";
import SixthFunnel from "./SixthFunnel";
import EightFunnel from "./EightFunnel";
import SeventhFunnel from "./SeventhFunnel";
import NinthFunnel from "./NinthFunnel";
import RegisterConfirm from "./RegisterConfirm";
import OwnersInfo from "./OwnersInfo";
import OwnersInfoComplete from "./OwnersInfoComplete";
import FirstFunnelSidebar from "./Comp/FirstFunnelSidebar";
import companyFormationService, { CompanyFormationData } from "@/lib/companyFormationService";
import { handleStripeSuccess, handlePayPalSuccess, handleStripeCancel, handlePayPalCancel } from "@/services/paymentService";

export interface dataState {
    businessType?: string;
    companyName?: string;
    currentStep?: number;
    isPaymentComplete?: boolean;
    registrationConfrim?: boolean;
    isOwnersInfoComplete?: boolean;
    stepOne?: {
        fullName?: string;
        email?: string;
        primaryPhone?: string;
        secondaryPhone?: string
    };
    stepTwo?: {
        industryType?: string;
        llcType?: string;
        stateName?: string;
    };

}

const FunnelContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState<CompanyFormationData>({ currentStep: 1 });
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(9);
    const [refreshKey, setRefreshKey] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'cancel' | null>(null);
    const [paymentData, setPaymentData] = useState<any>(null);

    const handleChildSubmitSuccess = () => {
        setRefreshKey(prev => prev + 1); // triggers re-render
    };

    // Handle payment success/cancel
    useEffect(() => {
        const payment = searchParams.get('payment');
        const sessionId = searchParams.get('session_id');
        const userId = searchParams.get('user_id');
        const orderId = searchParams.get('order_id');
        const token = searchParams.get('token');
        const payerId = searchParams.get('PayerID');

        console.log('Payment URL parameters:', {
            payment,
            sessionId,
            userId,
            orderId,
            token,
            payerId
        });

        // Check if we have payment parameters (either success or cancel)
        if (payment && ((sessionId && userId && orderId) || (token && payerId))) {
            console.log('Processing payment:', payment);
            const processPayment = async () => {
                try {
                    let result;
                    
                    if (payment === 'success') {
                        console.log('Processing payment success...');
                        if (sessionId && userId && orderId) {
                            console.log('Processing Stripe success...');
                            // Stripe payment success
                            result = await handleStripeSuccess(sessionId, userId, orderId);
                        } else if (token && payerId) {
                            console.log('Processing PayPal success...');
                            // PayPal payment success
                            result = await handlePayPalSuccess(token, payerId);
                        }
                        
                        console.log('Payment success result:', result);
                        setPaymentStatus('success');
                        setPaymentData(result);
                        
                        // Update localStorage to mark payment as complete
                        const localData = companyFormationService.getFromLocalStorage();
                        console.log('Current localStorage data:', localData);
                        companyFormationService.saveToLocalStorage({
                            ...localData,
                            payment: {
                                method: localData.payment?.method || 'stripe',
                                amount: localData.payment?.amount || 0,
                                status: 'completed'
                            },
                            isPaymentComplete: true,
                            currentStep: 10 // Move to next step
                        });
                        
                    } else if (payment === 'cancel') {
                        console.log('Processing payment cancel...');
                        if (userId && orderId) {
                            await handleStripeCancel(userId, orderId);
                        } else {
                            await handlePayPalCancel();
                        }
                        
                        setPaymentStatus('cancel');
                        
                        // Clear localStorage on cancel
                        companyFormationService.clearLocalStorage();
                    }
                } catch (error) {
                    console.error('Payment processing error:', error);
                    setPaymentStatus('cancel');
                }
            };

            processPayment();
        } else {
            console.log('No payment parameters found or incomplete parameters');
        }
    }, [searchParams]);

    // Load initial data from localStorage
    useEffect(() => {
        const localData = companyFormationService.getFromLocalStorage();
        
        // If we have data but no currentStep, or if we're at step 1, reset to fresh state
        if (localData && (!localData.currentStep || localData.currentStep === 1)) {
            // Only load basic data for step 1, clear any completion flags
            const freshData = {
                businessType: localData.businessType,
                companyName: localData.companyName,
                currentStep: 1
            };
            setData(freshData);
            setCurrentStep(1);
            // Update localStorage with clean state
            companyFormationService.saveToLocalStorage(freshData);
        } else {
            setData(localData);
            setCurrentStep(localData.currentStep || 1);
        }
    }, []);

    // Custom setter: updates localStorage and state
    const updateCompanyData = (newData: Partial<CompanyFormationData>) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        companyFormationService.saveToLocalStorage(updatedData);
    };

    const handleFormSubmit = (formData: CustomFormData) => {
        updateCompanyData({ ...formData, currentStep: currentStep + 1 });
        setCurrentStep(currentStep + 1);
        handleChildSubmitSuccess();
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            updateCompanyData({ currentStep: newStep });
        } else {
            router.back();
        }
    };

    const handleStartOver = () => {
        // Clear all data and redirect to home
        companyFormationService.clearLocalStorage();
        router.push('/');
    };


    if (!data?.currentStep) {
        return <ErrorPage statusCode={404} />;
    }

    // Handle payment success
    if (paymentStatus === 'success') {
        return (
            <section className="bg-white pt-[70px] px-4">
                <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                    <div className="text-center py-12">
                        <div className="text-green-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Successful!</h2>
                        <p className="text-gray-600 mb-6">
                            Your company formation has been processed successfully. You will receive an email with your login credentials shortly.
                        </p>
                        
                        {paymentData && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                                <h3 className="font-semibold text-gray-900 mb-3">Payment Details:</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium">Amount:</span> ${paymentData.amount}</p>
                                    <p><span className="font-medium">Payment Method:</span> {paymentData.payment_method}</p>
                                    <p><span className="font-medium">Transaction ID:</span> {paymentData.payment_id}</p>
                                </div>
                            </div>
                        )}
                        
                        <button
                            onClick={() => {
                                setPaymentStatus(null);
                                // Continue to owners info step
                                const localData = companyFormationService.getFromLocalStorage();
                                companyFormationService.saveToLocalStorage({
                                    ...localData,
                                    registrationConfrim: true,
                                    currentStep: 11
                                });
                                setData({ ...localData, registrationConfrim: true, currentStep: 11 });
                            }}
                            className="bg-[#7856FC] text-white px-8 py-3 rounded-lg hover:bg-[#5D3FC4] transition-colors font-medium"
                        >
                            Continue to Owner Information
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // Handle payment cancel
    if (paymentStatus === 'cancel') {
        return (
            <section className="bg-white pt-[70px] px-4">
                <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                    <div className="text-center py-12">
                        <div className="text-yellow-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Cancelled</h2>
                        <p className="text-gray-600 mb-6">
                            Your payment was cancelled. No charges have been made to your account. You can try again anytime.
                        </p>
                        
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setPaymentStatus(null);
                                    router.push('/setup-company');
                                }}
                                className="bg-[#7856FC] text-white px-8 py-3 rounded-lg hover:bg-[#5D3FC4] transition-colors font-medium"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => {
                                    setPaymentStatus(null);
                                    router.push('/');
                                }}
                                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium ml-4"
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (data?.isOwnersInfoComplete) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <OwnersInfoComplete />
            </div>
        </section>;
    }

    if (data?.registrationConfrim) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <OwnersInfo handleFormSubmit={handleFormSubmit} />
            </div>
        </section>;
    }

    if (data?.isPaymentComplete) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <RegisterConfirm handleFormSubmit={handleFormSubmit} />
            </div>
        </section>;
    }

    return (
        <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">

                {data?.currentStep < 10 &&
                    <ProgressBar
                        totalSteps={totalSteps}
                        currentStep={currentStep}
                        onBack={handleBack}
                        onStartOver={handleStartOver}
                        className="mt-2 mb-6"
                    />}


                {data?.currentStep === 1 &&
                    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4">

                        <FirstFunnel handleFormSubmit={handleFormSubmit} />
                        <FirstFunnelSidebar/>
                    </div>
                }

                {data?.currentStep !== 1 &&
                    <div className="flex justify-between gap-4 ">

                        {data?.currentStep === 2 && <SecondFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 3 && <ThirdFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 4 && <FourthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 5 && <FifthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 6 && <SixthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 7 && <SeventhFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 8 && <EightFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 9 && <NinthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep < 10 && <FunnelSidebar />}

                    </div>
                }

            </div>
        </section>
    );


};

const Funnel = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FunnelContent />
        </Suspense>
    );
};

export default Funnel;