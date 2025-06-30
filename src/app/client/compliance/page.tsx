import React from 'react';

export default function Compliance() {
    return (
        <div>
            {/* Hello Bar Section*/}
            <div
                className="bg-[#240D68] rounded-2xl px-10 py-6 md:px-12 text-white relative overflow-hidden mb-5 mx-4 md:mx-0"
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
                    <h1 className="font-inter font-medium text-2xl md:text-[36px] leading-tight md:leading-[44px] mb-[5px]">
                        Hi, Nasir!
                    </h1>
                    <p className="font-normal text-base md:text-[18px] leading-relaxed md:leading-[28px]">Here's your company status & quick actions.</p>
                </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#ECECEC] pt-4 mb-[28px] mx-4 md:mx-0 md:px-6">
                <h2 className="text-xl leading-7 font-semibold mb-4 px-4">Compliance</h2>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#F9FAFB]">
                            <tr className="text-[#7C8493] text-left border-b border-[#E4E7EC]">
                                <th className="py-3 px-7 font-medium text-xs leading-4">Name</th>
                                <th className="py-3 px-4 font-medium text-xs leading-4">Summited Date</th>
                                <th className="py-3 px-4 font-medium text-xs leading-4">Expiry Date</th>
                                <th className="py-3 px-4 font-medium text-center text-xs leading-4">Status</th>
                                <th className="py-3 px-4 font-medium text-center text-xs leading-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#23272E]">
                            {/* Row 1 */}
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Renew US Business Address</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 30, 2025</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 30, 2026</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#F3F4F6] text-[#7C8493] px-3 py-1 rounded-lg font-medium">Pending</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">Renew Now</button></td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Download EIN Letter</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 25, 2025</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 30, 2027</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#D1FADF] text-[#039855] px-3 py-1 rounded-lg font-medium">Complete</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">View</button></td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Upload Passport Copy (KYC)</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 20, 2025</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 30, 2029</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#FEE4E2] text-[#D92D20] px-3 py-1 rounded-lg font-medium">Not Submitted</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">Upload</button></td>
                            </tr>
                            {/* Row 4 */}
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Registered Agent Reminder</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 18, 2025</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">May 30, 2026</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#FEF6EE] text-[#DC6803] px-3 py-1 rounded-lg font-medium">Due Soon</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">Renew</button></td>
                            </tr>
                            {/* Row 5 */}
                            <tr className="border-b border-[#E4E7EC]">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Annual Filling Reminder</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">....</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">...</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#EEF4FF] text-[#3538CD] px-3 py-1 rounded-lg font-medium">Scheduled</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">Schedule Filling</button></td>
                            </tr>
                            {/* Row 6 */}
                            <tr className="">
                                <td className="py-5 px-7 font-medium text-[14px] leading-5">Tax filing reminder</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">....</td>
                                <td className="py-5 px-4 font-medium text-[14px] leading-5">....</td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><span className="bg-[#FEF6EE] text-[#DC6803] px-3 py-1 rounded-lg font-medium">Due Soon</span></td>
                                <td className="py-5 px-4 text-center font-medium text-[14px] leading-5"><button className="bg-[#F3F4F6] text-[#23272E] px-4 py-1 rounded-lg font-medium">Start Processing</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Support/Help Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#ECECEC] px-4 md:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden mt-7 mx-4 md:mx-0">
                {/* Decorative CSS curves */}
                <div className="absolute top-8 right-16 w-2/3 h-12 pointer-events-none z-0"
                    style={{
                        borderTop: '2px solid #D1E9FF',
                        borderRadius: '100% 100% 0 0 / 60% 60% 0 0'
                    }}></div>
                <div className="absolute top-10 right-16 w-2/3 h-10 pointer-events-none z-0"
                    style={{
                        borderTop: '1.5px solid #D1E9FF',
                        borderRadius: '100% 100% 0 0 / 70% 70% 0 0'
                    }}></div>
                <div className="absolute top-12 right-16 w-2/3 h-8 pointer-events-none z-0"
                    style={{
                        borderTop: '1px solid #D1E9FF',
                        borderRadius: '100% 100% 0 0 / 80% 80% 0 0'
                    }}></div>
                <div className="flex flex-col z-10 mb-4 md:mb-0">
                    <span className="text-[24px] leading-8 font-semibold mb-3">Need Help from expert?</span>
                    <div className="flex items-center space-x-[-12px] mt-2">
                        <img src="/client/expert-icon1.svg" alt="Expert 1" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                        <img src="/client/expert-icon2.svg" alt="Expert 2" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                        <img src="/client/expert-icon3.svg" alt="Expert 3" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                        <img src="/client/expert-icon4.svg" alt="Expert 4" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                    </div>
                </div>
                <button className="z-10 bg-[#7856FC] hover:bg-[#6840e0] text-white px-8 py-3 rounded-lg font-medium text-base transition-colors duration-200 w-full md:w-auto mt-4 md:mt-0">
                    Create a Support Ticket
                </button>
            </div>
        </div>
    )
} 