"use client"
import React, { useState } from 'react';
import Button from '@/componant/ui/Button';
import Image from '@/componant/ui/Image';

const documents = [
    {
        id: 1,
        name: 'EIN Confirmation Letter',
        icon: '/client/ein-confirmation-letter-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 2,
        name: 'Certificate of formation',
        icon: '/client/formation-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 3,
        name: 'Operation Agreement',
        icon: '/client/operation-agreement-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 4,
        name: 'Registered agent Agreement',
        icon: '/client/registered-agent-agreement-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 5,
        name: 'Annual Filling Receipt (2024)',
        icon: '/client/annual-filing-receipt-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 6,
        name: 'Business Address Letter',
        icon: '/client/business-address-letter-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 7,
        name: 'Certificate of formation',
        icon: '/client/formation-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 8,
        name: 'Operation Agreement',
        icon: '/client/operation-agreement-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
    {
        id: 9,
        name: 'Registered agent Agreement',
        icon: '/client/registered-agent-agreement-icon.svg',
        issuedDate: 'Jun 22, 2025',
        status: 'Verify',
        statusColor: 'bg-green-100 text-green-600',
        action: 'Download',
    },
];

interface FullScreenImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    alt: string;
    document: any;
}

function FullScreenImageModal({ open, onClose, imageUrl, alt, document }: FullScreenImageModalProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 z-10"
                aria-label="Close"
            >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <div className="bg-white rounded-2xl shadow-lg flex flex-col w-[95vw] max-w-2xl max-h-[95vh] overflow-hidden">
                {/* Details Panel (top) */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">{document?.name}</h2>
                            <div className="flex gap-6 mt-2 text-sm">
                                <div>
                                    <span className="text-[#667085]">Issue Date</span>
                                    <div className="font-medium">{document?.issuedDate}</div>
                                </div>
                                <div>
                                    <span className="text-[#667085]">Status</span>
                                    <div>
                                        <span className="px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-600">{document?.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="bg-[#7856FC] text-white px-6 py-2 rounded-lg hover:bg-[#6840e0] w-full md:w-auto">Download PDF</Button>
                    </div>
                </div>
                {/* Image Preview (below) */}
                <div className="flex-1 min-h-0 flex justify-center items-center w-full bg-[#F9FAFB] p-4 overflow-auto">
                    <img
                        src={imageUrl}
                        alt={alt}
                        className="max-h-full max-w-full object-contain rounded shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default function Documents() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    const handleRowClick = (doc: any) => {
        setSelectedDoc(doc);
        setOpenModal(true);
    };

    // Use the custom image for EIN Confirmation Letter
    const isEIN = selectedDoc?.name === 'EIN Confirmation Letter';
    const previewUrl = isEIN ? '/client/EIN-Confirmation-letter.png' : (selectedDoc?.previewUrl || '/blog-details/steady-formations-blog-details.png');

    return (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
            <div className="px-6 border-b border-[#E4E7EC] pb-4 flex flex-col gap-3 md:hidden">
                {/* First row: Heading and Add Document button */}
                <div className="flex items-center justify-between w-full mb-3">
                    <h2 className="text-[20px] leading-7 font-semibold">Document</h2>
                    <Button className="ml-2 px-4 py-2 bg-[#7856FC] text-white rounded-lg hover:bg-[#6a4ee6] w-auto md:w-auto" >Add Document</Button>
                </div>
                {/* Second row: Search bar */}
                <div className="w-full mb-3">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-full md:w-[350px]"
                    />
                </div>
                {/* Third row: All Document select */}
                <div className="w-full mb-3">
                    <select
                        className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none pr-8 appearance-none bg-[url('/client/arrow-down.svg')] bg-no-repeat bg-[right_12px_center] bg-[length:16px_16px] cursor-pointer w-full md:w-[175px]"
                    >
                        <option>All Document</option>
                    </select>
                </div>
            </div>
            {/* Desktop controls */}
            <div className="px-6 border-b border-[#E4E7EC] pb-4 hidden md:flex items-center justify-between">
                <h2 className="text-[20px] leading-7 font-semibold">Document</h2>
                <div className="flex flex-1 items-center justify-between ml-6">
                    <div className="flex gap-2 mx-auto">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            style={{ width: 350 }}
                        />
                        <select
                            className="border border-[#E4E7EC] rounded-lg px-3 py-2 text-sm focus:outline-none pr-8 appearance-none bg-[url('/client/arrow-down.svg')] bg-no-repeat bg-[right_12px_center] bg-[length:16px_16px] cursor-pointer"
                            style={{ width: 175 }}
                        >
                            <option>All Document</option>
                        </select>
                    </div>
                    <Button className="ml-2 px-4 py-2 bg-[#7856FC] text-white rounded-lg hover:bg-[#6a4ee6]">Add Document</Button>
                </div>
            </div>
            {/* Desktop & Mobile Table (responsive, simple table) */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#7856FC] scrollbar-track-[#E4E7EC]">
                <table className="min-w-full w-full divide-y divide-[#E4E7EC]">
                    <thead>
                        <tr className="bg-[#F9FAFB] text-[#667085] text-sm">
                            <th className="py-3 px-6 text-left font-medium">Document name</th>
                            <th className="py-3 px-6 text-center font-medium">Issued Date</th>
                            <th className="py-3 px-6 text-center font-medium">Status</th>
                            <th className="py-3 px-6 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E4E7EC]">
                        {documents.map((doc) => (
                            <tr
                                key={doc.id}
                                className="hover:bg-[#F5F5F7] transition-colors cursor-pointer"
                                onClick={() => handleRowClick(doc)}
                            >
                                <td className="py-3 px-6 flex items-center gap-3 whitespace-nowrap">
                                    <Image url={doc.icon} alt="icon" className="w-8 h-8" />
                                    <span className="text-[#344054] py-6 text-[15px] leading-5 text-center font-medium whitespace-nowrap">{doc.name}</span>
                                </td>
                                <td className="py-3 px-6 text-[#667085] text-[15px] leading-5 text-center whitespace-nowrap">{doc.issuedDate}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`px-3 py-1 rounded-lg text-xs leading-5 font-medium ${doc.statusColor}`}>{doc.status}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <Button className="bg-[#F5F5F7] text-[#7856FC] px-4 py-2 rounded-lg hover:bg-[#ece9fa]" theme="secondary">
                                        {doc.action}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FullScreenImageModal open={openModal} onClose={() => setOpenModal(false)} imageUrl={previewUrl} alt={selectedDoc?.name || ''} document={selectedDoc} />
        </div>
    );
} 