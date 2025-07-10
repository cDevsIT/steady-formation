import React from "react";
import Button from "@/componant/ui/Button";
import Image from "@/componant/ui/Image";

export default function TaxFilingStep2() {
    return (
        <div className="w-full py-8 px-4 md:px-6">
            {/* Top Bar: Back and Progress */}
            <div className="mb-9">
                <div className="flex items-center justify-between mb-2">
                    <button className="flex items-center gap-2 text-[#667085] text-[15px] font-medium hover:text-[#7856FC] cursor-pointer">
                        <Image url="/client/chevron-left.svg" alt="Back" width={20} height={20} />
                        Back
                    </button>
                    <div className="text-xs text-[#667085]">Step 2 of 2</div>
                </div>
                <div className="w-full h-1 bg-[#F3F4F6] rounded-full">
                    <div className="h-1 bg-[#7856FC] rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
                <h2 className="text-lg leading-7 font-semibold mb-1">Contact Info (Local/Bangladeshi Phone Number)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-[#344054] text-sm font-medium mb-2">Mobile Phone <span className="text-[#7856FC]">*</span></label>
                        <div className="flex items-center border border-[#E4E7EC] rounded-lg px-3 py-2 w-full bg-white focus-within:ring-2 focus-within:ring-indigo-100">
                            <button type="button" className="flex items-center gap-1 text-[#344054] text-[15px] font-medium focus:outline-none cursor-pointer">
                                BD
                                <Image url="/client/arrow-down.svg" alt="Down" className="w-4 h-4 ml-1" width={16} height={16} />
                            </button>
                            <span className="mx-2 text-[#D0D5DD]">|</span>
                            <input type="text" className="flex-1 border-none outline-none text-[15px] bg-transparent" placeholder="+88 017400000" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Documents */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-1">Company Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* EIN Copy */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">EIN Copy<span className="text-[#7856FC]">*</span></label>
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
                    {/* Articles of Incorporation */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Articles of Incorporation<span className="text-[#7856FC]">*</span></label>
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
                    {/* Passport Scan */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Passport Scan<span className="text-[#7856FC]">*</span></label>
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
                    {/* Supporting Docs */}
                    <div>
                        <label className="block text-[#344054] text-sm font-medium mb-2">Supporting Docs<span className="text-[#7856FC]">*</span></label>
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

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
                <Button className="bg-[#7856FC] text-white px-10 py-3 rounded-lg text-[16px] font-semibold hover:bg-[#6840e0] cursor-pointer">Submit For Quotation</Button>
            </div>
        </div>
    );
} 