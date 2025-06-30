import Image from "next/image";

const CompCreate = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Checkbox Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                <input type="checkbox" id="save-info" className="mt-1 accent-purple-500 w-5 h-5" />
                <div>
                    <label htmlFor="save-info" className="font-semibold text-gray-900 block">Securely save my information for 1-click checkout</label>
                    <span className="text-gray-500 text-sm block mt-1">Pay faster on Steady Formation and everywhere Link is accepted.</span>
                </div>
            </div>

            {/* Pay Button */}
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg text-lg mb-6 transition">Pay</button>

            {/* Secure Checkout Section */}
            <div className="border border-dashed border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <span className="font-medium text-gray-900 text-sm">100% Secure Checkout</span>
                    <div className="flex items-center gap-3 mt-1">
                        {/* Payment icons (replace src with your actual icons) */}
                        <Image src="/public/icons/visa.svg" alt="Visa" width={32} height={20} />
                        <Image src="/public/icons/master_card.svg" alt="Mastercard" width={32} height={20} />
                        <Image src="/public/icons/amex.svg" alt="Amex" width={32} height={20} />
                        <Image src="/public/icons/paypal-icon.svg" alt="PayPal" width={32} height={20} />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Powered by</span>
                    <span className="bg-gray-900 text-white rounded px-2 py-1 text-xs font-semibold flex items-center">
                        <Image src="/public/stripe.svg" alt="Stripe" width={48} height={16} />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CompCreate;