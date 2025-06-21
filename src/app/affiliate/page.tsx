"use client";
import React from 'react';
import Accordion from '@/componant/ui/Accordion';

const faqData = [
    {
        id: 1,
        question: 'Can non-U.S. residents legally open a business in the United States?',
        answer: 'Yes, non-U.S. residents can legally form and operate businesses in the U.S. There is no citizenship or residency requirement to start an LLC or C-Corp in most states.'
    },
    {
        id: 2,
        question: 'How does the affiliate program work?',
        answer: 'You register as an affiliate, refer others to Steady Formation using your unique link, and earn commissions for every successful sign-up or milestone achieved by your referrals.'
    },
    {
        id: 3,
        question: 'What commissions or bonuses do affiliates receive?',
        answer: 'Affiliates typically earn a fixed amount per sale (e.g., $X per referral), and milestone bonuses are awarded at specific thresholds. A full commission table is provided upon approval.'
    },
    {
        id: 4,
        question: 'How do I get paid as an international affiliate?',
        answer: 'We offer international payouts via Payoneer, Wise, or wire transfer. You can choose the most convenient method based on your location.'
    },
    {
        id: 5,
        question: 'Do I need a U.S. bank account to participate?',
        answer: 'No. While having a U.S. bank account may simplify some things, we support global affiliates through international payment providers.'
    },
    {
        id: 6,
        question: 'Is a U.S. physical address required to form a company?',
        answer: 'No. However, a registered agent address within the state of formation is required, which we provide as part of our service.'
    },
    {
        id: 7,
        question: 'How fast can I get my company formed?',
        answer: 'In most states, LLC formation takes 1–5 business days. Some states may take longer. We offer expedited filing options too.'
    },
    {
        id: 8,
        question: 'How do taxes work for my U.S. LLC as a non-resident?',
        answer: 'As a foreign-owned LLC, you may have to file IRS Form 5472 and a pro-forma 1120, even if you don’t owe taxes. We recommend consulting our tax partners for compliance help.'
    },
    {
        id: 9,
        question: 'Can I refer others even if I haven’t formed a company yet?',
        answer: 'Yes! You don’t need to be a customer to join our affiliate program. Anyone with a valid platform or network can apply.'
    }
];

export default function AffiliatePage() {
    return (
        <div className="w-full min-h-screen bg-white pt-[65px]">
            <div className="max-w-[975px] mx-auto px-4 py-8">
                <div
                    className="bg-[#240D68] rounded-2xl p-6 md:p-12 text-white relative overflow-hidden"
                >
                    <div
                        className="absolute inset-0 bg-no-repeat"
                        style={{
                            backgroundImage: "url('/affiliate/design-steady-formations-affiliate.png')",
                            backgroundPosition: 'right',
                            backgroundSize: 'cover',
                            opacity: 0.5
                        }}
                    ></div>
                    <div className="relative z-10">
                        <h1 className="font-inter font-bold text-2xl md:text-[30px] leading-tight md:leading-[38px] mb-[30px]">
                            Join Our Affiliate Program
                        </h1>
                        <div className="font-inter mt-6">
                            <p className="font-normal text-base md:text-[16px] leading-relaxed md:leading-[24px]">Affiliate Benefits Section:</p>
                            <ul className="list-disc list-inside mt-4 space-y-4 font-normal text-base md:text-[16px] leading-relaxed md:leading-[24px]">
                                <li>Overview of program (referral, payout, milestones)</li>
                                <li>Sample commission structure table (e.g., % per sale, milestone bonuses)</li>
                            </ul>
                        </div>
                        <button className="bg-white text-black font-semibold rounded-lg w-full sm:w-auto px-8 py-4 mt-8 shadow-md hover:bg-gray-100 transition cursor-pointer">
                            Apply to Become an Affiliate
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 mt-10 mb-5 border border-[#E4E7EC]">
                    <h2 className="font-bold text-center text-gray-800 text-2xl md:text-[30px] leading-tight md:leading-[38px] mb-8 md:mb-[30px]">How it works</h2>
                    <div className="relative">
                        <div className="absolute top-6 left-1/2 w-10/12 -translate-x-1/2 hidden md:block">
                            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-20">
                                <path d="M 0,50 Q 225,100 450,50 Q 675,0 900,50" stroke="#E5E7EB" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                            </svg>
                        </div>

                        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start text-center gap-12 md:gap-4">
                            {[
                                { icon: 'resgister-icon.svg', label: 'Register', color: 'bg-purple-100' },
                                { icon: 'refer-icon.svg', label: 'Refer', color: 'bg-cyan-100' },
                                { icon: 'earn-icon.svg', label: 'Earn', color: 'bg-yellow-100' },
                                { icon: 'paid.svg', label: 'Paid', color: 'bg-green-100' }
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center gap-4 w-full md:w-1/4">
                                    <div className={`relative ${step.color} rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center`}>
                                        <img src={`/affiliate/${step.icon}`} alt={step.label} className="w-10 h-10 md:w-12 md:h-12" />
                                        <div className="absolute -bottom-2 -right-1 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-700">{step.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 mt-3 border border-[#E4E7EC]">
                    <h2 className="font-bold text-center text-gray-800 text-2xl md:text-[30px] leading-tight md:leading-[38px] mb-8 md:mb-[30px]">Frequently Asked Questions</h2>
                    <Accordion
                        className="w-full"
                        accordion={faqData}
                    />
                </div>

                <div className="bg-[#F9FAFB] rounded-2xl p-6 mt-5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 mb-28">
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Still have questions?</h3>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    </div>
                    <button className="bg-[#7856FC] text-white font-semibold rounded-lg px-5 py-3 hover:bg-[#6C3EF5] transition cursor-pointer w-full sm:w-auto">
                        Get in touch
                    </button>
                </div>
            </div>
        </div>
    );
} 