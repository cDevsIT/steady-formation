import { useEffect, useState } from "react";
import Image from "../ui/Image";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading } from "../ui/FunnelHeading";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { countries } from "./funnel.type";

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
    const [data, setData] = useState<dataState>({});
    const [formMethods, setFormMethods] = useState<any>(null);
    const isWithLink = paymentOption

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
        }
    }, []);

    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ stepPayment: { paymentOption, data }, isPaymentComplete: true })
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    const handleContinueWithLink = (isWithLink: boolean) => {
        if (!paymentOption) {
            alert("Please select a payment option.");
            return;
        }
        if (isWithLink) {
            window.open("https://dashboard.stripe.com/register/payment_links", "_blank");
            return;
        }
        if (handleFormSubmit) handleFormSubmit({ stepPayment: { paymentOption }, isPaymentComplete: true });
    };
    return (
        <div className="lg:max-w-[730px] w-full">
            <FunnelHeading>
                Payment
            </FunnelHeading>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
                <div
                    className={`flex items-center gap-4 p-[20px] w-full h-[120px] rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "yes" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setPaymentOption("card")}
                >
                    <CheckIcon isSelected={paymentOption === "card"} />
                    <div className="flex gap-2 items-center">
                        <Image className="w-[121px]" url="/icons/card.svg" alt="Card" />
                        <span className="text-xl font-medium text-black">Card</span>
                    </div>
                </div>
                <div
                    className={`flex items-center justify-between gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setPaymentOption("paypal")}
                >
                    <CheckIcon isSelected={paymentOption === "paypal"} />
                    <div className="flex gap-2 items-center">
                        <Image className="h-[40px]" url="/icons/paypal-icon.svg" alt="Paypal" />
                        <span className="text-xl font-medium text-black">Paypal</span>
                    </div>
                </div>
            </div>

            <div
                className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${paymentOption === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
            >
                <CheckIcon isSelected={false} />
                <div className="flex gap-2 items-center w-full justify-between">
                    <p className="text-xl font-medium text-black">System Balance</p>
                    <p className="text-xl font-medium text-black">$5421.00</p>
                </div>
            </div>

            {/* Continue Button */}
            <button
                type="button"
                onClick={() => handleContinueWithLink(paymentOption === "card")}
                className="mt-6 w-full bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-3 rounded-xl shadow transition-all text-lg"
            >
                {isWithLink ? 'Pay With Link' : 'Continue'}
            </button>
            {/* SSN input only if Yes is selected */}
            {paymentOption === "card" && (
                <div className="mb-2 mt-8">
                    <h5 className="block text-base font-bold mb-1 text-black">Your Or Pay With Card</h5>
                    <ReusableForm
                        onSubmit={handleSubmit}
                        submitText="Pay"
                        onFormStateChange={handleFormStateChange}
                        className="mb-5 mt-2"
                    >
                        <InputField
                            name="email"
                            label="Email"
                            type="email"
                            required
                            placeholder="Enter Email"
                            className="lg:col-span-2 "
                        />

                        <InputField
                            name="cardNumber"
                            label="Card Number"
                            type="text"
                            required
                            placeholder="Enter Card Number"
                            className="lg:col-span-2 "
                        />

                        <InputField
                            name="expiryDate"
                            label="Expiry date"
                            type="text"
                            required
                            placeholder="Enter Expiry date"
                        />
                        <InputField
                            name="cvc"
                            label="CVC"
                            type="text"
                            required
                            placeholder="Enter CVC"
                        />

                        <InputField
                            name="country"
                            label="Country"
                            type="select"
                            required
                            placeholder="Select Country"
                            className="lg:col-span-2 "
                            options={countries}
                        />

                        {/* Checkbox Section */}
                        <div className="mb-6 p-4 bg-gray-50 lg:col-span-2  rounded-xl flex items-start gap-3">
                            <input type="checkbox" id="save-info" className="mt-1 accent-purple-500 w-4 h-4 border-gray-200" />
                            <div>
                                <label htmlFor="save-info" className="font-semibold text-base text-black block">Securely save my information for 1-click checkout</label>
                                <span className="text-gray-600 font-normal text-base block mt-1">Pay faster on Steady Formation and everywhere Link is accepted.</span>
                            </div>
                        </div>
                    </ReusableForm>



                </div>
            )}

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