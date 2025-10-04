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
    const router = useRouter();


    // Get state fees with fallback
    const stateFees = data?.stateFees || {
        registration_fee: 100,
        renewal_fee: 50,
        transfer_fee: 25
    };

    const multiLLC = data?.multimemberFee ? data?.multimemberFee : 0;
    const totalAmmount = (data?.agreement_amount ?? 0) + (data?.en_amount ?? 0) + (data?.rush_processing_amount ?? 0) + (data?.plan?.plan_price ?? 0) + (stateFees.registration_fee ?? 0) + multiLLC


    // Load initial data from localStorage using the new service


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
                } else {
                    alert('An error occurred while creating the payment session. Please try again.');
                }
            } else {
                alert('An error occurred while creating the payment session. Please try again.');
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
                className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "balance" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
            >
                <CheckIcon isSelected={false} />
                <div className="flex gap-2 items-center w-full justify-between">
                    <p className="text-xl font-medium text-black">System Balance</p>
                    <p className="text-xl font-medium text-black">$0.00</p>
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
                {isSubmitting ? 'Processing...' : 'Continue to Payment'}
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