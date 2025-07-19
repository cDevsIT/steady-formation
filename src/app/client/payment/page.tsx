"use client";
import React, { useState } from "react";
import Button from "@/componant/ui/Button";
import Image from "@/componant/ui/Image";

const paymentHistory = [
    {
        id: 1,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Paid",
        statusColor: "bg-green-100 text-green-600",
        action: "Download PDF",
        actionType: "download",
    },
    {
        id: 2,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Paid",
        statusColor: "bg-green-100 text-green-600",
        action: "Download PDF",
        actionType: "download",
    },
    {
        id: 3,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Pending",
        statusColor: "bg-gray-100 text-gray-500",
        action: "Pay Now",
        actionType: "pay",
    },
    {
        id: 4,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Paid",
        statusColor: "bg-green-100 text-green-600",
        action: "Download PDF",
        actionType: "download",
    },
    {
        id: 5,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Fail",
        statusColor: "bg-red-100 text-red-500",
        action: "Retry Payment",
        actionType: "retry",
    },
    {
        id: 6,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Paid",
        statusColor: "bg-green-100 text-green-600",
        action: "Download PDF",
        actionType: "download",
    },
    {
        id: 7,
        date: "Apr 15, 2025",
        description: "Company Formation (LLC - Delaware)",
        amount: "$10",
        status: "Paid",
        statusColor: "bg-green-100 text-green-600",
        action: "Download PDF",
        actionType: "download",
    },
];

const invoiceData = [
    { id: 1, invoiceId: "INV 2514", date: "Apr 15, 2025", description: "Company Formation (LLC - Delaware)", amount: "$10", status: "Paid", statusColor: "bg-green-100 text-green-600" },
    { id: 2, invoiceId: "INV 2514", date: "Apr 15, 2025", description: "Company Formation (LLC - Delaware)", amount: "$10", status: "Paid", statusColor: "bg-green-100 text-green-600" },
    { id: 3, invoiceId: "INV 2514", date: "Apr 15, 2025", description: "Company Formation (LLC - Delaware)", amount: "$10", status: "Paid", statusColor: "bg-green-100 text-green-600" },
    { id: 4, invoiceId: "INV 2514", date: "Apr 15, 2025", description: "Company Formation (LLC - Delaware)", amount: "$10", status: "Paid", statusColor: "bg-green-100 text-green-600" },
    { id: 5, invoiceId: "INV 2514", date: "Apr 15, 2025", description: "Company Formation (LLC - Delaware)", amount: "$10", status: "Paid", statusColor: "bg-green-100 text-green-600" },
];

function RemoveCardModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <style>{`
                @media (max-width: 768px) {
                    .remove-modal-mobile {
                        max-width: 100vw !important;
                        min-width: 100vw !important;
                        min-height: 100vh !important;
                        border-radius: 0 !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                }
            `}</style>
            <div
                className="bg-white mx-auto p-0 relative flex flex-col items-center w-full remove-modal-mobile overflow-y-auto"
                style={{
                    maxWidth: 551,
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px 0 rgba(16, 24, 40, 0.12)',
                }}
            >
                {/* Top: Warning centered, close at top right */}
                <div className="w-full flex flex-col items-center relative pt-6 pb-0">
                    <span className="text-[16px] leading-6 font-semibold text-[#101828] mx-auto">Warning</span>
                    <button onClick={onClose} className="absolute top-5 right-6 text-[#667085] hover:bg-gray-100 rounded-full p-1" aria-label="Close">
                        <Image url="/client/cross-icon.svg" alt="Close" width={20} height={20} />
                    </button>
                </div>
                {/* Icon */}
                <div className="flex justify-center w-full mt-2 mb-4">
                    <Image url="/client/gift-icon.svg" alt="Gift" className="w-14 h-14" width={65} height={65} />
                </div>
                {/* Headline and subheadline */}
                <h2 className="text-lg md:text-xl leading-7 font-bold text-center mb-1 px-6">Before you remove your card...</h2>
                <div className="text-[#667085] text-center text-[14px] leading-5 font-normal mb-7 px-6">Hey Nasir, did you know?</div>
                {/* Bullet points */}
                <ul className="text-left space-y-3 mb-8 px-8 w-full max-w-[480px]">
                    <li className="flex items-start gap-2">
                        <span className="mt-1"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#7856FC" /><path d="M6.5 9.5l2 2 3-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        <span className="font-normal leading-[20px] text-[14px]">Keep your card and get <span className="text-[#7856FC] font-semibold">20% off your next renewal.</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#7856FC" /><path d="M6.5 9.5l2 2 3-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        <span className="font-normal leading-[20px] text-[14px]">Enjoy <span className="text-[#7856FC] font-semibold">priority support</span> & <span className="text-[#7856FC] font-semibold">automatic reminders</span> for deadlines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#7856FC" /><path d="M6.5 9.5l2 2 3-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        <span className="font-normal leading-[20px] text-[14px]">Never worry about missing compliance dates—let us handle the stress for you!</span>
                    </li>
                </ul>
                {/* Action buttons at the very bottom */}
                <div className="w-full flex flex-col gap-3 px-6 pb-6 mt-auto">
                    <button className="w-full bg-[#7856FC] text-white text-[16px] leading-6 font-semibold rounded-lg py-3 hover:bg-[#6840e0] transition cursor-pointer">Yes, Keep My Card & Claim Perks</button>
                    <button className="w-full bg-white border border-[#E4E7EC] text-[#344054] text-[16px] leading-6 font-semibold rounded-lg py-3 hover:bg-[#F5F5F7] transition cursor-pointer">No, I still want to remove my card</button>
                </div>
            </div>
        </div>
    );
}

function PaymentDetailsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {/* Responsive border radius and width/height: full viewport for mobile, maxWidth for desktop */}
            <style>{`
                @media (max-width: 768px) {
                    .payment-modal-mobile {
                        border-radius: 0 !important;
                        max-width: 100vw !important;
                        min-width: 100vw !important;
                        min-height: 100vh !important;
                        height: 100vh !important;
                        width: 100vw !important;
                        top: 0 !important;
                        left: 0 !important;
                        position: fixed !important;
                    }
                }
            `}</style>
            <div
                className="bg-white mx-auto p-0 relative flex flex-col items-center w-full payment-modal-mobile overflow-y-auto"
                style={{
                    maxWidth: 570,
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px 0 rgba(16, 24, 40, 0.12)',
                }}
            >
                {/* Top: Payment Details headline centered, Paid tag right, Back button left */}
                <div className="w-full flex items-center justify-between pt-5 pb-0 px-5 relative">
                    {/* Back button (mobile/always visible) */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none absolute left-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0"
                        aria-label="Back"
                    >
                        <Image url="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
                    </button>
                    {/* Headline centered */}
                    <div className="flex-1 flex justify-center items-center">
                        <span className="text-[16px] leading-6 font-semibold text-[#101828] text-center">Payment Details</span>
                    </div>
                    {/* Paid tag right */}
                    <span className="px-2 py-1 bg-[#ECFDF3] text-[#12B76A] text-xs rounded font-medium ml-auto">Paid</span>
                </div>
                {/* Payment Summary Card */}
                <div className="w-full px-5 pt-4 pb-2">
                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 mb-4">
                        <div className="text-[18px] leading-7 font-bold mb-2">Payment Summary Card</div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Transaction ID:</span> <span>#TXN-20250415-01</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Date & Time:</span> <span>April 15, 2025 at 11:30 AM</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Amount Paid:</span> <span>$10.00</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Payment Method:</span> <span>Visa ending in 2345</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Payment Gateway:</span> <span>Stripe</span></div>
                    </div>
                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 mb-4">
                        <div className="text-[18px] leading-7 font-bold mb-2">Company Details</div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Company Name:</span> <span>Fission</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Entity Type:</span> <span>LLC - Delaware</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>User Email:</span> <span>fassionstorage@gmail.com</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>User ID:</span> <span>#11554882</span></div>
                    </div>
                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 mb-18 md:mb-4">
                        <div className="text-[18px] leading-7 font-bold mb-2">Billing Address</div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Name:</span> <span>Steady Formation</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Location:</span> <span>2218 Baker Street, Suite 400</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>City, State ZIP:</span> <span>San Francisco, CA 94115</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Country:</span> <span>United States</span></div>
                    </div>
                </div>
                {/* Download PDF button at bottom for mobile */}
                <div className="block md:hidden w-full px-5 pb-5 fixed left-0 right-0 bottom-0 z-50" style={{ maxWidth: 570, margin: '0 auto' }}>
                    <button className="w-full bg-[#7856FC] text-white text-[16px] leading-6 font-semibold rounded-lg py-3 hover:bg-[#6840e0] transition cursor-pointer">Download PDF</button>
                </div>
                {/* Download PDF button for desktop (top right, hidden on mobile) */}
                <div className="hidden md:flex absolute right-5 top-5">
                    <button className="bg-[#7856FC] text-white text-xs font-semibold rounded px-4 py-2">Download PDF</button>
                </div>
            </div>
        </div>
    );
}

// PayNowProcessingModal: for Pay Now button (processing)
function PayNowProcessingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {/* Responsive border radius and width/height: full viewport for mobile, maxWidth for desktop */}
            <style>{`
                @media (max-width: 768px) {
                    .paynow-modal-mobile {
                        border-radius: 0 !important;
                        max-width: 100vw !important;
                        min-width: 100vw !important;
                        min-height: 100vh !important;
                        height: 100vh !important;
                        width: 100vw !important;
                        top: 0 !important;
                        left: 0 !important;
                        position: fixed !important;
                    }
                }
            `}</style>
            <div
                className="bg-white mx-auto p-0 relative flex flex-col items-center w-full paynow-modal-mobile overflow-y-auto"
                style={{
                    maxWidth: 570,
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px 0 rgba(16, 24, 40, 0.12)'
                }}
            >
                {/* Top: Back button, headline centered, Pending tag right */}
                <div className="w-full flex items-center justify-between pt-5 pb-0 px-5 relative">
                    {/* Back button (mobile/always visible) */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none absolute left-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0"
                        aria-label="Back"
                    >
                        <Image url="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
                    </button>
                    {/* Headline centered */}
                    <div className="flex-1 flex justify-center items-center">
                        <span className="text-[16px] leading-6 font-semibold text-[#101828] text-center">Payment Details</span>
                    </div>
                    {/* Pending tag right */}
                    <span className="px-2 py-1 bg-[#F2F4F7] text-[#667085] text-xs rounded font-medium ml-auto">Pending</span>
                </div>
                {/* Payment Processing Message */}
                <div className="w-full px-4 pt-4 pb-2 md:px-16">
                    <div className="bg-[#F9FAFB] rounded-xl border border-[#E4E7EC] p-5 md:p-7 mb-4 flex flex-col items-center">
                        <Image url="/client/process-icon-payment.svg" alt="Processing" width={48} height={48} className="mb-3" />
                        <div className="text-[17px] md:text-[20px] font-bold text-center mb-1">Your payment is currently being processed.</div>
                        <div className="text-[14px] text-[#667085] text-center leading-5">This may take a few moments to complete. Please do not refresh or close the page.</div>
                    </div>
                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 mb-18 md:mb-4">
                        <div className="text-[16px] md:text-[18px] leading-7 font-bold mb-2">Transaction Details</div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Amount:</span> <span>$10.00</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Date:</span> <span>April 15, 2025</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Payment Method:</span> <span>Visa ending in 2345</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Transaction ID:</span> <span>TXN-20250415-02</span></div>
                    </div>
                </div>
                {/* Contact Support button at bottom for mobile */}
                <div className="block md:hidden w-full px-5 pb-5 fixed left-0 right-0 bottom-0 z-50" style={{ maxWidth: 570, margin: '0 auto' }}>
                    <button className="w-full bg-[#7856FC] text-white text-[16px] leading-6 font-semibold rounded-lg py-3 hover:bg-[#6840e0] transition cursor-pointer">Contact Support</button>
                </div>
                {/* Contact Support button for desktop (top right, hidden on mobile) */}
                <div className="hidden md:flex absolute right-5 top-5">
                    <button className="bg-[#7856FC] text-white text-xs font-semibold rounded px-4 py-2">Contact Support</button>
                </div>
            </div>
        </div>
    );
}

// RetryPaymentModal: for Retry Payment button (fail)
function RetryPaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            {/* Responsive border radius and width/height: full viewport for mobile, maxWidth for desktop */}
            <style>{`
                @media (max-width: 768px) {
                    .retry-modal-mobile {
                        border-radius: 0 !important;
                        max-width: 100vw !important;
                        min-width: 100vw !important;
                        min-height: 100vh !important;
                        height: 100vh !important;
                        width: 100vw !important;
                        top: 0 !important;
                        left: 0 !important;
                        position: fixed !important;
                    }
                }
            `}</style>
            <div
                className="bg-white mx-auto p-0 relative flex flex-col items-center w-full retry-modal-mobile overflow-y-auto"
                style={{
                    maxWidth: 570,
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px 0 rgba(16, 24, 40, 0.12)'
                }}
            >
                {/* Top: Back button, headline centered, Fail tag right */}
                <div className="w-full flex items-center justify-between pt-5 pb-0 px-5 relative">
                    {/* Back button (mobile/always visible) */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none absolute left-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0"
                        aria-label="Back"
                    >
                        <Image url="/icons/arrow-left.svg" alt="Back" width={24} height={24} />
                    </button>
                    {/* Headline centered */}
                    <div className="flex-1 flex justify-center items-center">
                        <span className="text-[16px] leading-6 font-semibold text-[#101828] text-center">Payment Details</span>
                    </div>
                    {/* Fail tag right */}
                    <span className="px-2 py-1 bg-[#FEF3F2] text-[#F04438] text-xs rounded font-medium ml-auto">Fail</span>
                </div>
                {/* Payment Failed Message */}
                <div className="w-full px-4 pt-4 pb-2 md:px-16">
                    <div className="bg-[#F9FAFB] rounded-xl border border-[#E4E7EC] p-5 md:p-7 mb-4 flex flex-col items-center">
                        <Image url="/client/not-processed-icon.svg" alt="Not Processed" width={48} height={48} className="mb-3" />
                        <div className="text-[17px] md:text-[20px] font-bold text-center mb-1">We&apos;re sorry, your payment could not be processed.</div>
                        <div className="text-[14px] text-[#667085] text-center leading-5 mb-2">Here are some possible reasons:</div>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[14px] text-[#667085] w-full">
                            <ul className="list-disc list-inside flex flex-wrap justify-center gap-x-4 gap-y-1 w-full px-0 mb-0">
                                <li>Insufficient funds</li>
                                <li>Incorrect card details</li>
                                <li>Network timeout</li>
                                <li>Payment gateway issue</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 mb-18 md:mb-4">
                        <div className="text-[16px] md:text-[18px] leading-7 font-bold mb-2">Transaction Details</div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Amount:</span> <span>$10.00</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Date:</span> <span>April 15, 2025</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Payment Method:</span> <span>Visa ending in 2345</span></div>
                        <div className="text-[15px] font-normal leading-6 mb-2 md:mb-3 flex justify-between"><span>Transaction ID:</span> <span>TXN-20250415-02</span></div>
                    </div>
                </div>
                {/* Retry Payment button at bottom for mobile */}
                <div className="block md:hidden w-full px-5 pb-5 fixed left-0 right-0 bottom-0 z-50" style={{ maxWidth: 570, margin: '0 auto' }}>
                    <button className="w-full bg-[#7856FC] text-white text-[16px] leading-6 font-semibold rounded-lg py-3 hover:bg-[#6840e0] transition cursor-pointer">Retry Payment</button>
                </div>
                {/* Retry Payment button for desktop (top right, hidden on mobile) */}
                <div className="hidden md:flex absolute right-5 top-5">
                    <button className="bg-[#7856FC] text-white text-xs font-semibold rounded px-4 py-2">Retry Payment</button>
                </div>
            </div>
        </div>
    );
}

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState(true); // true = Payment History, false = Invoice
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [showPayNowProcessing, setShowPayNowProcessing] = useState(false);
    const [showRetryPayment, setShowRetryPayment] = useState(false);
    return (
        <div className="max-w-5xl mx-4 md:mx-auto">
            {/* Tabs Box */}
            <div className="inline-flex bg-white rounded-t-2xl border border-[#E4E7EC] border-b-0 mt-0 p-3">
                <button
                    className={`px-5 py-2 rounded-full font-semibold text-[16px] leading-6 focus:outline-none ${paymentMethod ? "bg-[#EBE8FF] text-[#7856FC] cursor-pointer" : "bg-transparent cursor-pointer text-[#101828]"}`}
                    onClick={() => setPaymentMethod(true)}
                >
                    Payment History
                </button>
                <button
                    className={`px-5 py-2 rounded-full font-semibold text-[16px] leading-6 focus:outline-none ${!paymentMethod ? "bg-[#EBE8FF] text-[#7856FC] cursor-pointer" : "bg-transparent cursor-pointer text-[#101828]"}`}
                    onClick={() => setPaymentMethod(false)}
                >
                    Invoice
                </button>
            </div>
            {/* Table Box */}
            <div className="bg-white rounded-b-2xl border border-t-0 border-[#E4E7EC] pb-6 min-h-[400px]">
                <div className="flex-1 w-full overflow-x-auto custom-scrollbar">
                    {paymentMethod ? (
                        <table className="w-full min-w-[700px] divide-y divide-[#E4E7EC] border-0">
                            <thead>
                                <tr className="bg-[#F9FAFB] text-[#667085] text-sm">
                                    <th className="py-3 px-6 text-left font-medium">Date</th>
                                    <th className="py-3 px-6 text-left font-medium">Description</th>
                                    <th className="py-3 px-6 text-center font-medium">Amount</th>
                                    <th className="py-3 px-6 text-center font-medium">Status</th>
                                    <th className="py-3 px-6 text-center font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E4E7EC]">
                                {paymentHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5F7] transition-colors cursor-pointer">
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 font-medium whitespace-nowrap">{item.date}</td>
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 font-normal whitespace-nowrap">{item.description}</td>
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 text-center font-medium whitespace-nowrap">{item.amount}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span className={`px-3 py-1 rounded-lg text-xs leading-5 font-medium ${item.statusColor}`}>{item.status}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                                            {item.actionType === 'download' ? (
                                                <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer" theme="secondary" onClick={() => setShowPaymentDetails(true)}>
                                                    {item.action}
                                                </Button>
                                            ) : item.actionType === 'pay' ? (
                                                <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer" theme="secondary" onClick={() => setShowPayNowProcessing(true)}>
                                                    {item.action}
                                                </Button>
                                            ) : item.actionType === 'retry' ? (
                                                <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer" theme="secondary" onClick={() => setShowRetryPayment(true)}>
                                                    {item.action}
                                                </Button>
                                            ) : (
                                                <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer" theme="secondary">
                                                    {item.action}
                                                </Button>
                                            )}
                                            <button className="ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer" aria-label="More options">
                                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <circle cx="10" cy="4" r="1.5" fill="#98A2B3" />
                                                    <circle cx="10" cy="10" r="1.5" fill="#98A2B3" />
                                                    <circle cx="10" cy="16" r="1.5" fill="#98A2B3" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full min-w-[700px] divide-y divide-[#E4E7EC] border-0">
                            <thead>
                                <tr className="bg-[#F9FAFB] text-[#667085] text-sm">
                                    <th className="py-3 px-6 text-left font-medium">Invoice id</th>
                                    <th className="py-3 px-6 text-left font-medium">Date</th>
                                    <th className="py-3 px-6 text-left font-medium">Description</th>
                                    <th className="py-3 px-6 text-center font-medium">Amount</th>
                                    <th className="py-3 px-6 text-center font-medium">Status</th>
                                    <th className="py-3 px-6 text-center font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-[#E4E7EC]">
                                {invoiceData.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#F5F5F7] transition-colors cursor-pointer">
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 font-medium whitespace-nowrap">{item.invoiceId}</td>
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 font-medium whitespace-nowrap">{item.date}</td>
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 font-normal whitespace-nowrap truncate max-w-[180px]">{item.description}</td>
                                        <td className="py-3 px-6 text-[#344054] text-[14px] leading-5 text-center font-medium whitespace-nowrap">{item.amount}</td>
                                        <td className="py-3 px-6 text-center">
                                            <span className={`px-3 py-1 rounded-lg text-xs leading-5 font-medium ${item.statusColor}`}>{item.status}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                                            <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer" theme="secondary">
                                                Download PDF
                                            </Button>
                                            <button className="ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer" aria-label="More options">
                                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                                    <circle cx="10" cy="4" r="1.5" fill="#98A2B3" />
                                                    <circle cx="10" cy="10" r="1.5" fill="#98A2B3" />
                                                    <circle cx="10" cy="16" r="1.5" fill="#98A2B3" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {/* Payment Method Section */}
            {paymentMethod && (
                <div className="mt-8">
                    <h2 className="text-[16px] leading-6 font-semibold text-[#101828] mb-4 px-6">Payment method</h2>
                    <div className="bg-white border border-[#E4E7EC] rounded-xl flex flex-col gap-3 p-3 md:p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-3 flex-1 min-w-0">
                            <div className="flex items-center gap-3 w-full">
                                <Image url="/client/mastercard-icon.svg" alt="MasterCard" className="w-10 h-7 object-contain flex-shrink-0" width={40} height={28} />
                                <span className="text-[#344054] text-[15px] break-words whitespace-normal max-w-[160px] md:max-w-none">MasterCard ending in 1006 expiring 08/2026</span>
                                <span className="px-2 py-1 bg-[#F3F4F6] text-[#667085] text-xs rounded font-medium">Default</span>
                            </div>
                        </div>
                        <div className="flex flex-row md:flex-row gap-2 flex-shrink-0 w-full md:w-auto">
                            <button className="text-[#475467] text-[15px] font-semibold px-5 py-2 rounded-lg hover:bg-[#FEE4E2] h-10 min-w-[90px] cursor-pointer w-[35%] md:w-auto" onClick={() => setShowRemoveModal(true)}>Remove</button>
                            <Button className="border border-[#E4E7EC] bg-transparent text-[#7856FC] text-[15px] font-semibold px-[14px] py-[6px] rounded-lg hover:bg-[#F5F5F7] cursor-pointer w-[65%] md:w-auto" theme="secondary">
                                Add New Credit Card
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {paymentMethod && (
                <RemoveCardModal open={showRemoveModal} onClose={() => setShowRemoveModal(false)} />
            )}
            <PaymentDetailsModal open={showPaymentDetails} onClose={() => setShowPaymentDetails(false)} />
            <PayNowProcessingModal open={showPayNowProcessing} onClose={() => setShowPayNowProcessing(false)} />
            <RetryPaymentModal open={showRetryPayment} onClose={() => setShowRetryPayment(false)} />
        </div>
    );
} 