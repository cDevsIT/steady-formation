import { useEffect, useState } from "react";
import Image from "../ui/Image";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading } from "../ui/FunnelHeading";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { countries } from "./funnel.type";
import companyFormationService, { CompanyFormationData, useCompanyFormationData } from "@/lib/companyFormationService";
import { useRouter } from "next/navigation";
import { createStripeSession, createPayPalPayment } from "@/services/paymentService";
import { getWalletBalance, processWalletPayment } from "@/services/walletService";

// Custom Check Icon Component
const CheckIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
    return (
        isSelected ? (
            <Image className="h-[20px]" url="/icons/checkbox.svg" alt="Check Box" />
        ) : (
            <Image className="h-[20px]" url="/icons/checkbox-ring.svg" alt="Check Box Ring" />
        )
    );
};

const NinthFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [paymentOption, setPaymentOption] = useState<string>("");
    const data = useCompanyFormationData();
    const [formMethods, setFormMethods] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [isWalletAvailable, setIsWalletAvailable] = useState<boolean>(false);
    const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);
    const router = useRouter();


    // Get state fees with fallback
    const stateFees = data?.stateFees || {
        registration_fee: 100,
        renewal_fee: 50,
        transfer_fee: 25
    };

    const multiLLC = data?.multimemberFee ? data?.multimemberFee : 0;
    const totalAmmount = (data?.agreement_amount ?? 0) + (data?.en_amount ?? 0) + (data?.rush_processing_amount ?? 0) + (data?.plan?.plan_price ?? 0) + (stateFees.registration_fee ?? 0) + multiLLC


    // Fetch wallet balance on component mount
    useEffect(() => {
        const fetchWalletBalance = async () => {
            setIsLoadingBalance(true);
            try {
                console.log('Fetching wallet balance...');
                console.log('Total amount needed:', totalAmmount);
                
                const walletData = await getWalletBalance();
                console.log('Wallet data received:', walletData);
                
                if (walletData.success && walletData.wallet_exists) {
                    setWalletBalance(walletData.balance);
                    const isAvailable = walletData.status === 'Active' && walletData.balance >= totalAmmount;
                    setIsWalletAvailable(isAvailable);
                    
                    console.log('Wallet status:', walletData.status);
                    console.log('Wallet balance:', walletData.balance);
                    console.log('Is available:', isAvailable);
                } else {
                    console.log('No wallet found or API call failed');
                    setWalletBalance(0);
                    setIsWalletAvailable(false);
                }
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
                setWalletBalance(0);
                setIsWalletAvailable(false);
            } finally {
                setIsLoadingBalance(false);
            }
        };

        fetchWalletBalance();
    }, [totalAmmount]);

    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
            });
        }
    }, [data, formMethods]);

    const handleSubmit = async (formData: CustomFormData) => {
        if (!paymentOption) {
            alert("Please select a payment option.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Get all localStorage data for payment processing
            const localStorageData = companyFormationService.getFromLocalStorage();

            // Handle wallet payment
            if (paymentOption === 'balance') {
                // Process wallet payment
                const walletPaymentResult = await processWalletPayment(totalAmmount, localStorageData);
                
                if (walletPaymentResult.success) {
                    // Store temp login token and mark payment as complete (same as Stripe)
                    const tempLoginToken = walletPaymentResult.data?.temp_login_token;
                    
                    companyFormationService.saveToLocalStorage({
                        ...localStorageData,
                        payment: {
                            method: 'wallet',
                            amount: totalAmmount,
                            status: 'completed'
                        },
                        isPaymentComplete: true,
                        currentStep: 10,
                        tempLoginToken: tempLoginToken || undefined
                    });
                    
                    // Redirect to setup-company with success parameters (same as Stripe)
                    router.push(
                        `/setup-company?payment=success&method=wallet&user_id=${walletPaymentResult.data?.user_id}&order_id=${walletPaymentResult.data?.order_id}&temp_login_token=${tempLoginToken}`
                    );
                } else {
                    throw new Error(walletPaymentResult.message || 'Wallet payment failed');
                }
                return;
            }

            // Save payment method to localStorage
            companyFormationService.saveToLocalStorage({
                ...localStorageData,
                payment: {
                    method: paymentOption as 'paypal' | 'stripe',
                    amount: totalAmmount,
                    status: 'pending'
                },
                currentStep: 9
            });

            // Create payment session based on selected method
            if (paymentOption === 'stripe') {
                const stripeSession = await createStripeSession(localStorageData);
                // Redirect to Stripe checkout
                window.location.href = stripeSession.checkout_url;
            } else if (paymentOption === 'paypal') {
                const paypalPayment = await createPayPalPayment(localStorageData);
                // Redirect to PayPal checkout
                window.location.href = paypalPayment.approval_url;
            } else {
                throw new Error('Invalid payment method selected');
            }

        } catch (error) {
            console.error('Error creating payment session:', error);

            // Handle specific error cases
            if (error instanceof Error) {
                if (error.message.includes('Email Already Exists') || error.message.includes('email already exists')) {
                    alert('An account with this email already exists. Please login first or use a different email address.');
                } else if (error.message.includes('Insufficient wallet balance')) {
                    alert('Insufficient wallet balance. Please choose another payment method.');
                } else if (error.message.includes('wallet is currently frozen')) {
                    alert('Your wallet is currently frozen. Please contact support or choose another payment method.');
                } else {
                    alert('An error occurred while processing your payment. Please try again.');
                }
            } else {
                alert('An error occurred while processing your payment. Please try again.');
            }

            setIsSubmitting(false);
        }
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    const handleContinueWithLink = async () => {
        if (!paymentOption) {
            alert("Please select a payment option.");
            return;
        }

        // Call the same submit function
        await handleSubmit({} as CustomFormData);
    };

    return (
        <div className="lg:max-w-[730px] w-full">
            <FunnelHeading>
                Payment
            </FunnelHeading>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <div
                    className={`flex items-center gap-4 p-[20px] w-full h-[120px] rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "stripe" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setPaymentOption("stripe")}
                >
                    <CheckIcon isSelected={paymentOption === "stripe"} />
                    <div className="flex gap-2 items-center">
                        <Image className="w-[121px]" url="/icons/card.svg" alt="Card" />
                        <span className="text-xl font-medium text-black">Card</span>
                    </div>
                </div>
                {/* <div
                    className={`flex items-center justify-between gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "paypal" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setPaymentOption("paypal")}
                >
                    <CheckIcon isSelected={paymentOption === "paypal"} />
                    <div className="flex gap-2 items-center">
                        <Image className="h-[40px]" url="/icons/paypal-icon.svg" alt="Paypal" />
                        <span className="text-xl font-medium text-black">Paypal</span>
                    </div>
                </div> */}

                
                <div
                    className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 transition-all duration-150 ${
                        !isWalletAvailable 
                            ? "border-gray-300 bg-gray-50 opacity-60 cursor-not-allowed" 
                            : paymentOption === "balance" 
                                ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm cursor-pointer" 
                                : "border-gray-200 bg-white hover:border-[#C7B6F7] cursor-pointer"
                    }`}
                    onClick={() => isWalletAvailable && setPaymentOption("balance")}
                    title={
                        !isWalletAvailable && walletBalance > 0 && walletBalance < totalAmmount
                            ? `Insufficient balance. You have $${walletBalance.toFixed(2)} but need $${totalAmmount.toFixed(2)}`
                            : !isWalletAvailable && walletBalance === 0
                                ? 'No wallet balance available'
                                : isWalletAvailable
                                    ? 'Pay using your wallet balance'
                                    : 'Wallet payment not available'
                    }
                >
                    <CheckIcon isSelected={paymentOption === "balance"} />
                    <div className="flex gap-2 items-center w-full justify-between">
                        <div className="flex flex-col">
                            <p className={`text-xl font-medium ${isWalletAvailable ? 'text-black' : 'text-gray-400'}`}>
                                System Balance
                            </p>
                            {!isWalletAvailable && walletBalance < totalAmmount && walletBalance > 0 && (
                                <small className="text-red-500 text-xs">Need ${(totalAmmount - walletBalance).toFixed(2)} more</small>
                            )}
                            {!isWalletAvailable && walletBalance === 0 && !isLoadingBalance && (
                                <small className="text-gray-400 text-xs">No balance available</small>
                            )}
                            {isWalletAvailable && (
                                <small className="text-green-600 text-xs">Sufficient balance ✓</small>
                            )}
                        </div>
                        <p className={`text-xl font-medium ${isWalletAvailable ? 'text-green-600' : 'text-gray-400'}`}>
                            {isLoadingBalance ? '...' : `$${walletBalance.toFixed(2)}`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Continue Button */}
            <button
                type="button"
                onClick={handleContinueWithLink}
                disabled={isSubmitting}
                className="mt-6 w-full bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-3 rounded-xl shadow transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting 
                    ? (paymentOption === 'balance' ? 'Processing Payment...' : 'Processing...') 
                    : (paymentOption === 'balance' ? 'Pay with Wallet' : 'Continue to Payment')
                }
            </button>

            <div className="border border-dashed border-gray-200 rounded-xl p-4 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <span className="font-semibold text-black text-base absolute top-[-14px] left-8 bg-white px-2">100% Secure Checkout</span>
                    <div className="flex items-center gap-3 mt-1">
                        {/* Payment icons (replace src with your actual icons) */}
                        <Image className="w-[147px]" url="/icons/pay-option.svg" alt="Pay Option" width={250} height={100} />
                    </div>
                </div>
                <Image className="w-[171px]" url="/icons/stripe.svg" alt="Pay Option" width={147} height={40} />
            </div>
        </div>
    );
};

export default NinthFunnel;