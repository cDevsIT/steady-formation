"use client"
import React, { useState } from 'react';
import Button from '@/componant/ui/Button';
import Image from '@/componant/ui/Image';
import { useDocuments } from '@/hooks/useDocuments';
import { useCompany } from '@/contexts/CompanyContext';
import { API_CONFIG } from '@/config/api';


interface FullScreenImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    alt: string;
    document: any;
    previewUrl: string | null;
    showImagePreview: boolean;
}

function FullScreenImageModal({ open, onClose, imageUrl, alt, document, previewUrl, showImagePreview }: FullScreenImageModalProps) {
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
                        {document?.file_path ? (
                            <a 
                                href={`${API_CONFIG.BASE_URL}/documents/file/${document.file_path.split('/').pop()}`}
                                download={document.file_path.split('/').pop()}
                                className="bg-[#7856FC] text-white px-6 py-2 rounded-lg hover:bg-[#6840e0] w-full md:w-auto inline-block text-center no-underline"
                            >
                                Download
                            </a>
                        ) : (
                            <span className="bg-[#7856FC] text-white px-6 py-2 rounded-lg w-full md:w-auto inline-block text-center opacity-50">
                                Download
                            </span>
                        )}
                    </div>
                </div>
                {/* Image Preview (below) - Only show for image files */}
                {showImagePreview ? (
                    <div className="flex-1 min-h-0 flex justify-center items-center w-full bg-[#F9FAFB] p-4 overflow-auto">
                        <Image
                            url={previewUrl || ''}
                            alt={alt}
                            width={200}
                            className="max-h-full max-w-full object-contain rounded shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="flex-1 min-h-0 flex justify-center items-center w-full bg-[#F9FAFB] p-4">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-[#667085] text-sm font-medium">
                                {document?.name || 'Document Preview'}
                            </p>
                            <p className="text-[#667085] text-xs mt-2">
                                Click Download to view this document
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Documents() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const { selectedCompany } = useCompany();
    
    // Use API data only
    const { documents, isLoading, error, downloadDocument } = useDocuments(selectedCompany?.user_id || 3);

    const handleRowClick = (doc: any) => {
        setSelectedDoc(doc);
        setOpenModal(true);
    };



    // Check if the file is an image and get the preview URL
    const isImageFile = (filename: string) => {
        if (!filename) return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
        return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    const getPreviewUrl = (doc: any) => {
        if (!doc?.file_path) return null;
        
        const filename = doc.file_path.split('/').pop();
        if (isImageFile(filename)) {
            // Use the actual file URL for image preview (same as download link)
            return doc.file_path;
        }
        
        // For non-image files, use a default document icon
        return '/client/document-icon.svg';
    };

    const previewUrl = getPreviewUrl(selectedDoc);
    const showImagePreview = selectedDoc?.file_path && isImageFile(selectedDoc.file_path.split('/').pop());

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
            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7856FC] mx-auto mb-4"></div>
                        <p className="text-[#667085]">Loading documents...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="flex justify-center items-center py-12">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error loading documents: {error}</p>
                        <Button 
                            className="bg-[#7856FC] text-white px-4 py-2 rounded-lg hover:bg-[#6840e0]"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                    </div>
                </div>
            )}

            {/* Documents Table */}
            {!isLoading && !error && (
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
                                        {doc.file_path ? (
                                            <a 
                                                href={`${API_CONFIG.BASE_URL}/documents/file/${doc.file_path.split('/').pop()}`}
                                                download={doc.file_path.split('/').pop()}
                                                className="bg-[#F5F5F7] text-[#7856FC] px-4 py-2 rounded-lg hover:bg-[#ece9fa] inline-block text-center no-underline"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {doc.action}
                                            </a>
                                        ) : (
                                            <span className="bg-[#F5F5F7] text-[#7856FC] px-4 py-2 rounded-lg inline-block text-center opacity-50">
                                                {doc.action}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <FullScreenImageModal 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                imageUrl={previewUrl || ''} 
                alt={selectedDoc?.name || ''} 
                document={selectedDoc}
                previewUrl={previewUrl}
                showImagePreview={showImagePreview}
            />
        </div>
    );
} 