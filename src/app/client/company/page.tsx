import React from 'react';

export default function Company() {
    return (
        <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                    <h2 className="text-lg font-semibold pl-6">Company</h2>
                </div>
                <div className="px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 ">
                        {/* Left: Company Info */}
                        <div>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Company Name:</div>
                                <div className="text-right text-[16px] font-normal leading-6">Fission</div>
                                <div className="text-[rgb(71,84,103)] text-[16px] font-normal leading-6">Entity type:</div>
                                <div className="text-right text-[16px] font-normal leading-6">LLC</div>
                                <div className="text-[rgb(71,84,103)] text-[16px] font-normal leading-6">EIN:</div>
                                <div className="text-right text-[16px] font-normal leading-6">2512</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Business Address:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">USA</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Registration Date:</div>
                                <div className="text-[16px] font-normal leading-6 text-right">25 Jun,2024</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Renewal Date</div>
                                <div className="text-[16px] font-normal leading-6 text-right">26 Jun,2025</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Formation State</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">Delaware</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Status</div>
                                <div className=" text-[16px] font-normal leading-6 text-green-500 text-right">Active</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">

                        {/* Right: Address Info */}
                        <div>
                            <div className="font-semibold text-[#475467] mb-2  text-[16px] leading-6">Address</div>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Headquarters:</div>
                                <div className=" text-right text-[16px] font-normal leading-6">New York, USA</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Line 1:</div>
                                <div className=" text-right text-[16px] font-normal leading-6">New York, USA</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Line 2:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">New York, USA</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Zip:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">5300</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Status</div>
                                <div className=" text-[16px] font-normal leading-6 text-green-500 text-right">Active</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Last Mail Received Date</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">Jun 5, 2025</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Upgrade premium address</div>
                                <a href="#" className=" text-[16px] font-normal leading-6 text-[#7856FC] hover:underline text-right">If free</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
} 