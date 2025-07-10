"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componant/ui/Button";
import Image from "@/componant/ui/Image";

const taxFilingsData = [
    {
        id: 1,
        name: "Renew US Business Address",
        submittedOn: "Jun 22, 2025",
        status: "Complete",
        statusColor: "bg-green-100 text-green-600",
        action: "View",
    },
    {
        id: 2,
        name: "Renew US Business Address",
        submittedOn: "Jun 22, 2025",
        status: "Pending",
        statusColor: "bg-gray-100 text-gray-500",
        action: "Edit",
    },
    {
        id: 3,
        name: "Renew US Business Address",
        submittedOn: "Jun 22, 2025",
        status: "Complete",
        statusColor: "bg-green-100 text-green-600",
        action: "View",
    },
];

export default function TaxFiling() {
    const [taxFiling, setTaxFiling] = useState(true); // Change to false to see the empty state
    const router = useRouter();

    if (taxFiling) {
        // Tax filings exist: show table, edge-to-edge
        return (
            <div className="max-w-5xl bg-white rounded-2xl border border-[#E4E7EC] pt-6 pb-10 min-h-[400px] mx-4 md:mx-auto">
                {/* Mobile Header Row */}
                <div className="flex flex-col gap-3 md:hidden px-2 mb-4">
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-lg font-semibold text-[#101828]">Tax Filling</span>
                        <Button className="bg-[#7856FC] text-white text-[14px] leading-5 font-semibold px-5 py-2 rounded-lg hover:bg-[#6840e0] w-auto">Add Tax Filing</Button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full"
                    />
                </div>
                {/* Desktop Header Row */}
                <div className="hidden md:flex items-center justify-between mb-0 px-0">
                    <div className="flex items-center gap-4 flex-1">
                        <span className="text-lg md:text-xl px-6 leading-7 font-semibold text-[#101828]">Tax Filling</span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full md:w-[350px] ml-0 md:ml-6"
                        />
                    </div>
                    <Button
                        className="bg-[#7856FC] text-white text-[14px] leading-5 font-semibold px-6 py-2 rounded-lg hover:bg-[#6840e0] w-full md:w-auto self-end md:self-auto mr-6"
                        onClick={() => router.push("/client/tax-filing/step1")}
                    >
                        Get Tax Quotation
                    </Button>
                </div>
                {/* Table: edge-to-edge */}
                <div className="flex-1 w-full mt-4 overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[600px] divide-y divide-[#E4E7EC] border-0">
                        <thead>
                            <tr className="bg-[#F9FAFB] text-[#667085] text-sm">
                                <th className="py-3 px-6 text-left font-medium">Name</th>
                                <th className="py-3 px-6 text-center font-medium">Submitted On</th>
                                <th className="py-3 px-6 text-center font-medium">Status</th>
                                <th className="py-3 px-6 text-center font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-[#E4E7EC]">
                            {taxFilingsData.map((filing) => (
                                <tr key={filing.id} className="hover:bg-[#F5F5F7] transition-colors cursor-pointer">
                                    <td className="py-3 px-6 text-[#344054] text-[15px] leading-5 font-medium whitespace-nowrap">{filing.name}</td>
                                    <td className="py-3 px-6 text-[#667085] text-[15px] leading-5 text-center whitespace-nowrap">{filing.submittedOn}</td>
                                    <td className="py-3 px-6 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-xs leading-5 font-medium ${filing.statusColor}`}>{filing.status}</span>
                                    </td>
                                    <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                                        <Button className="bg-[#F5F5F7] text-[#7856FC] px-4 py-2 rounded-lg hover:bg-[#ece9fa]" theme="secondary">
                                            {filing.action}
                                        </Button>
                                        <button className="ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none" aria-label="More options">
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
                </div>
            </div>
        );
    }

    // No tax filings: show empty state
    return (
        <div className="max-w-5xl bg-white rounded-2xl border border-[#E4E7EC] pt-6 pb-10 px-4 md:px-8 flex flex-col gap-8 min-h-[400px] mx-4 md:mx-auto">
            {/* Header Row (empty state version) */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-12">
                {/* Mobile: No heading or search bar */}
                {/* Desktop: Heading, Search, and Button */}
                <div className="hidden md:flex items-center gap-4 flex-1">
                    <span className="text-lg md:text-xl leading-7 font-semibold text-[#101828]">Tax Filling</span>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full md:w-[350px] ml-0 md:ml-6"
                    />
                </div>
                <Button
                    className="hidden md:block bg-[#7856FC] text-white text-[14px] leading-5 font-semibold px-5 py-2 rounded-lg hover:bg-[#6840e0] w-full md:w-auto self-end md:self-auto"
                    onClick={() => router.push("/client/tax-filing/step1")}
                >
                    Get Tax Quotation
                </Button>
            </div>
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center flex-1 min-h-[300px] mt-12">
                <Image url="/client/no-tax-icon.svg" alt="No Tax Filing" className="w-14 h-14 mb-4" width={56} height={56} />
                <h2 className="text-[24px] leading-8 font-bold text-[#101828] mb-2">No Tax Filling</h2>
                <p className="text-[#667085] text-center mb-2 max-w-md text-[18px] leading-7 font-normal">
                    You haven’t submitted any tax filing information yet.<br />
                    Complete the checklist to get started
                </p>
                <Button className="bg-[#7856FC] text-white px-5 py-2 text-[14px] leading-5 font-semibold cursor-pointer rounded-lg hover:bg-[#6840e0] mt-4">
                    Start Your Tax Filing
                </Button>
            </div>
        </div>
    );
} 