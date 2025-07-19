'use client';

import React from "react";
import Link from "next/link";

const PayoutHistoryPage = () => {
    return (
        <div className="max-w-[975px] mx-auto px-4 pt-6">
            <h1 className="text-2xl font-bold mb-4">Affiliate</h1>
            {/* Static Navigation Bar */}
            <div className="relative flex items-center bg-white rounded-t-xl border border-[#E4E7EC] w-fit overflow-hidden mb-0 px-2 pt-2" style={{ minHeight: '54px' }}>
                <Link href="/client/affiliate/approved" legacyBehavior>
                    <a className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center text-black bg-transparent" style={{ zIndex: 2 }}>
                        Overview
                    </a>
                </Link>
                <Link href="/client/affiliate/referral-log" legacyBehavior>
                    <a className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center text-black bg-transparent" style={{ zIndex: 2 }}>
                        Referral Log
                    </a>
                </Link>
                <button className="relative px-6 py-2 cursor-pointer mx-1 mb-2 text-sm md:text-base font-medium focus:outline-none transition-all flex items-center bg-[#F6F1FF] text-[#7856FC] font-semibold rounded-full shadow-sm" style={{ zIndex: 2 }} type="button">Payout History</button>
            </div>
            {/* Payout History Table */}
            <div className="bg-white rounded-2xl rounded-tl-none border border-[#E4E7EC]">
                <div className="flex flex-row items-center gap-4 py-6">
                    <div className="text-[18px] font-semibold text-black whitespace-nowrap ml-6">Payment History</div>
                    <div className="relative w-full max-w-xs ml-6">
                        <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E4E7EC] bg-white text-[15px] focus:outline-none" />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0B7C3]">
                            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 11.5L15 15" stroke="#B0B7C3" strokeWidth="2" strokeLinecap="round" /><circle cx="7.5" cy="7.5" r="5.5" stroke="#B0B7C3" strokeWidth="2" /></svg>
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-full text-left border-collapse">
                        <thead className="bg-[#F9FAFB] text-[#7C8493] text-[14px]">
                            <tr>
                                <th className="py-3 px-8 font-medium border-b border-[#E4E7EC]">Date</th>
                                <th className="py-3 px-4 font-medium border-b border-[#E4E7EC]">Amount</th>
                                <th className="py-3 px-4 font-medium border-b border-[#E4E7EC]">Status</th>
                                <th className="py-3 px-4 font-medium border-b border-[#E4E7EC]"></th>
                            </tr>
                        </thead>
                        <tbody className="text-[15px] text-black">
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-3 px-8">25 Jan, 2025</td>
                                <td className="py-3 px-4">$75.00</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Paid</span></td>
                                <td className="py-3 px-2 text-right">
                                    <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors" aria-label="More options">
                                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="7.5" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="13" r="1.2" fill="#B0B7C3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-3 px-8">25 Jan, 2025</td>
                                <td className="py-3 px-4">$100.00</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Paid</span></td>
                                <td className="py-3 px-2 text-right">
                                    <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors" aria-label="More options">
                                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="7.5" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="13" r="1.2" fill="#B0B7C3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-3 px-8">25 Jan, 2025</td>
                                <td className="py-3 px-4">$75.00</td>
                                <td className="py-3 px-4"><span className="bg-[#F3F4F6] text-[#667085] text-xs font-semibold px-3 py-1 rounded">Pending</span></td>
                                <td className="py-3 px-2 text-right">
                                    <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors" aria-label="More options">
                                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="7.5" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="13" r="1.2" fill="#B0B7C3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3 px-8">25 Jan, 2025</td>
                                <td className="py-3 px-4">$75.00</td>
                                <td className="py-3 px-4"><span className="bg-[#E9FBF0] text-[#12B76A] text-xs font-semibold px-3 py-1 rounded">Paid</span></td>
                                <td className="py-3 px-2 text-right">
                                    <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F3F4F6] transition-colors" aria-label="More options">
                                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="7.5" r="1.2" fill="#B0B7C3" />
                                            <circle cx="2.5" cy="13" r="1.2" fill="#B0B7C3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PayoutHistoryPage; 