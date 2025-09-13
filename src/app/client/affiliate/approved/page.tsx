'use client';

import React from "react";
import Link from "next/link";

const ApprovedPage = () => {

    return (
        <div className="max-w-[975px] mx-auto px-4 pt-6">
            {/* Headline */}
            <h1 className="text-2xl font-bold mb-4">Affiliate</h1>

            {/* Static Navigation Bar */}
            <div className="relative flex items-center bg-white rounded-t-xl border border-[#E4E7EC] w-fit overflow-hidden mb-0 px-2 pt-2" style={{ minHeight: '54px' }}>

                <button className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center bg-[#F6F1FF] text-[#7856FC] font-semibold rounded-full shadow-sm" style={{ zIndex: 2 }} type="button">Overview</button>

                <Link href="/client/affiliate/referral-log" legacyBehavior>
                    <a className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center text-black bg-transparent" style={{ zIndex: 2 }}>
                        Referral Log
                    </a>
                </Link>

                <Link href="/client/affiliate/payout-history" legacyBehavior>
                    <a className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center text-black bg-transparent" style={{ zIndex: 2 }}>
                        Payout History
                    </a>
                </Link>

            </div>

            {/* Hello Bar Section */}
            <div className="bg-[#240D68] rounded-2xl rounded-tl-none px-6 py-7 md:px-10 text-white relative overflow-hidden mb-8">
                <div
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                        backgroundImage: "url('/affiliate/design-steady-formations-affiliate.png')",
                        backgroundPosition: 'right',
                        backgroundSize: 'cover',
                        opacity: 0.5,
                    }}
                ></div>
                <div className="relative z-10">
                    <h2 className="font-inter font-medium text-2xl md:text-[32px] leading-tight md:leading-[40px] mb-2">
                        Welcome Back, Nasir Uddin
                    </h2>
                    <p className="font-normal text-base md:text-lg leading-relaxed md:leading-7">
                        Let’s Grow together here’s your current Affiliate summary
                    </p>
                </div>
            </div>

            {/* Summary Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Total Referrals Card */}
                <div className="border border-[#E4E7EC] rounded-xl p-5 bg-white flex flex-col">
                    <div className="text-[14px] leading-5 text-black font-normal mb-1">Approved</div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-lg font-semibold text-black">Total Referrals</div>
                        <div className="text-3xl font-bold text-[#7856FC]">08</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="text-[14px] leading-5 text-[#475467] font-medium">Referral link</div>
                        <div className="text-[16px] leading-6 text-black max-w-[120px]">https://stradyformation.com...</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="text-[14px] leading-5 text-[#475467] font-medium">Earn a commission</div>
                        <div className="text-[16px] leading-6 text-black">FISSION582</div>
                    </div>
                    <button className="bg-[#7856FC] text-white text-[14px] leading-5 font-semibold rounded-lg px-4 py-2 w-fit">Copy Your Link</button>
                </div>
                {/* Total Balance Card */}
                <div className="border border-[#E4E7EC] rounded-xl p-5 bg-white flex flex-col">
                    <div className="text-[14px] leading-5 text-black font-normal mb-1">Your Affiliate Earnings</div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="text-lg font-semibold text-black">Total Balance</div>
                        <div className="text-3xl font-bold text-[#7856FC]">$450</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mb-6">
                        <div className="flex flex-col">
                            <div className="text-[14px] leading-5 text-[#475467] font-medium">Commission Earned</div>
                            <div className="text-[16px] leading-6 text-black">30%</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-[14px] leading-5 text-[#475467] font-medium">Bonus from Milestone</div>
                            <div className="text-[16px] leading-6 text-black">80</div>
                        </div>
                    </div>
                    <button className="bg-[#7856FC] text-white text-[14px] leading-5 font-semibold rounded-lg px-4 py-2 w-fit">Submit payout request</button>
                </div>
            </div>

            {/* Commission Rate Table Row */}
            <div className="border border-[#E4E7EC] rounded-xl bg-white p-6 mb-8">
                <div className="font-semibold text-[24px] leading-8 mb-8 text-black">Your commission rate increases as you grow your referrals:</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <div className="text-[14px] leading-5 text-[#475467] mb-1">Base Commission</div>
                        <div className="text-lg font-bold text-[#344054]">10%</div>
                    </div>
                    <div>
                        <div className="text-[14px] leading-5 text-[#475467] mb-1">After 20 Referrals</div>
                        <div className="text-lg font-bold text-[#344054]">12%</div>
                    </div>
                    <div>
                        <div className="text-[14px] leading-5 text-[#475467] mb-1">After 50 Referrals</div>
                        <div className="text-lg font-bold text-[#344054]">15%</div>
                    </div>
                    <div>
                        <div className="text-[14px] leading-5 text-[#475467] mb-1">After 100+ Referrals</div>
                        <div className="text-lg font-bold text-[#344054]">20%</div>
                    </div>
                </div>
            </div>

            {/* Referral Log Box */}
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div className="text-[18px] font-semibold text-black">Referral Log</div>
                    <div className="relative w-full md:w-[260px]">
                        <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] text-[15px] focus:outline-none" />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B7C3]">
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 11.5L15 15" stroke="#B0B7C3" strokeWidth="2" strokeLinecap="round" /><circle cx="7.5" cy="7.5" r="5.5" stroke="#B0B7C3" strokeWidth="2" /></svg>
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-[#F9FAFB] text-[#7C8493] text-[14px]">
                            <tr>
                                <th className="py-3 px-4 font-medium">Date</th>
                                <th className="py-3 px-4 font-medium">Package Name</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="text-[15px] text-black">
                            <tr className="border-b border-[#F0F1F3]">
                                <td className="py-3 px-4">25 Jan, 2025</td>
                                <td className="py-3 px-4">LLC</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Active</span></td>
                                <td className="py-3 px-4 text-right"><span className="text-[#B0B7C3]">...</span></td>
                            </tr>
                            <tr className="border-b border-[#F0F1F3]">
                                <td className="py-3 px-4">25 Jan, 2025</td>
                                <td className="py-3 px-4">S Crop</td>
                                <td className="py-3 px-4"><span className="bg-[#F3F4F6] text-[#667085] text-xs font-semibold px-3 py-1 rounded">Pending</span></td>
                                <td className="py-3 px-4 text-right"><span className="text-[#B0B7C3]">...</span></td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">25 Jan, 2025</td>
                                <td className="py-3 px-4">C Crop</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Active</span></td>
                                <td className="py-3 px-4 text-right"><span className="text-[#B0B7C3]">...</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment History Box */}
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <div className="text-[18px] font-semibold text-black">Payment History</div>
                    <div className="relative w-full md:w-[260px]">
                        <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] text-[15px] focus:outline-none" />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B7C3]">
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 11.5L15 15" stroke="#B0B7C3" strokeWidth="2" strokeLinecap="round" /><circle cx="7.5" cy="7.5" r="5.5" stroke="#B0B7C3" strokeWidth="2" /></svg>
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-[#F9FAFB] text-[#7C8493] text-[14px]">
                            <tr>
                                <th className="py-3 px-4 font-medium">Date</th>
                                <th className="py-3 px-4 font-medium">Amount</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="text-[15px] text-black">
                            <tr className="border-b border-[#F0F1F3]">
                                <td className="py-3 px-4">25 Jan, 2025</td>
                                <td className="py-3 px-4">$75.00</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Paid</span></td>
                                <td className="py-3 px-4 text-right"><span className="text-[#B0B7C3]">...</span></td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">25 Jan, 2025</td>
                                <td className="py-3 px-4">$100.00</td>
                                <td className="py-3 px-4"><span className="bg-[#F3F4F6] text-[#667085] text-xs font-semibold px-3 py-1 rounded">Pending</span></td>
                                <td className="py-3 px-4 text-right"><span className="text-[#B0B7C3]">...</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApprovedPage; 