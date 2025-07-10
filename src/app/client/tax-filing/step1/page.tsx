import React from "react";
import Button from "@/componant/ui/Button";
import Image from "@/componant/ui/Image";

export default function TaxFilingStep1() {
    return (
        <div className="w-full py-8 px-4 md:px-6">
            {/* Top Bar: Back and Progress */}
            <div className="mb-9">
                <div className="flex items-center justify-between mb-2">
                    <button className="flex items-center gap-2 text-[#667085] text-[15px] font-medium hover:text-[#7856FC]">
                        <Image url="/client/chevron-left.svg" alt="Back" width={20} height={20} />
                        Back
                    </button>
                    <div className="text-xs text-[#667085]">Step 1 of 2</div>
                </div>
                <div className="w-full h-1 bg-[#F3F4F6] rounded-full">
                    <div className="h-1 bg-[#7856FC] rounded-full" style={{ width: '50%' }}></div>
                </div>
            </div>

            {/* Principal Business Activity */}
            <div className="mb-8">
                <h2 className="text-lg leading-7 font-semibold mb-1">Principal Business Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[#344054] text-sm leading-5 font-medium mb-2">Business Activity <span className="text-[#7856FC]">*</span></label>
                        <input type="text" className="w-full border border-[#E4E7EC] rounded-lg px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Nurency" />
                    </div>
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Mobile Phone <span className="text-[#7856FC]">*</span></label>
                        <div className="flex items-center border border-[#E4E7EC] rounded-lg px-3 py-2 w-full bg-white focus-within:ring-2 focus-within:ring-indigo-100">
                            <button type="button" className="flex items-center gap-1 text-[#344054] text-[15px] font-medium focus:outline-none cursor-pointer">
                                US
                                <Image url="/client/arrow-down.svg" alt="Down" className="w-4 h-4 ml-1" width={16} height={16} />
                            </button>
                            <span className="mx-2 text-[#D0D5DD]">|</span>
                            <input type="text" className="flex-1 border-none outline-none text-[15px] bg-transparent" placeholder="+1 (555) 000-0000" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Documents */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-1">Financial Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Bank Statements */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Bank Statements (CSV)<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Balance Sheet */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Balance Sheet<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* P/L Statement */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">P/L Statement<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Income Statement */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Income Statement<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Documents (second section) */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-1">Financial Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Partner % Ownership <span className="text-[#7856FC]">*</span></label>
                        <button type="button" className="flex items-center justify-between w-full border border-[#E4E7EC] rounded-lg px-3 py-2 text-[15px] bg-white cursor-pointer focus:outline-none">
                            <span>50%</span>
                            <Image url="/client/arrow-down.svg" alt="Down" className="w-4 h-4 ml-1" width={16} height={16} />
                        </button>
                    </div>
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">ITIN Number</label>
                        <input type="text" className="w-full border border-[#E4E7EC] rounded-lg px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="5282" />
                    </div>
                    {/* Passport Upload */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Passport Upload<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Signature Upload */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Signature of Majority Holder (PDF/Photo)<span className="text-[#7856FC]">*</span></label>
                        <div className="border border-[#E4E7EC] rounded-lg flex flex-col items-center justify-center py-6 cursor-pointer hover:border-[#7856FC] transition">
                            <div className="flex flex-col items-center">
                                <div className="border border-[#D0D5DD] rounded-[8px] p-[10px] mb-2 flex items-center justify-center">
                                    <Image url="/client/upload-tax-data-icon.svg" alt="Upload" className="w-5 h-5" width={20} height={20} />
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-[#7856FC] text-sm font-medium leading-5 cursor-pointer">Click to upload</span>
                                    <span className="text-[#667085] text-sm">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end mt-8">
                <Button className="bg-[#7856FC] text-white px-10 py-3 rounded-lg text-[16px] font-semibold hover:bg-[#6840e0]">Continue</Button>
            </div>
        </div>
    );
} 