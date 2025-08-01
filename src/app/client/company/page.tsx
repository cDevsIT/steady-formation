'use client';

import React, { useState, useEffect } from 'react';
import { getCompanyData, CompanyData } from '@/services/companyService';
import { useCompany } from '@/contexts/CompanyContext';

export default function Company() {
    const { selectedCompany } = useCompany();
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (!selectedCompany) return;
            
            try {
                setLoading(true);
                const data = await getCompanyData(selectedCompany.id);
                setCompanyData(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load company data');
                console.error('Error fetching company data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [selectedCompany]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                    <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                        <h2 className="text-lg font-semibold pl-6">Company</h2>
                    </div>
                    <div className="px-6">
                        <div className="text-center py-8">Loading company data...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                    <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                        <h2 className="text-lg font-semibold pl-6">Company</h2>
                    </div>
                    <div className="px-6">
                        <div className="text-center py-8 text-red-500">Error: {error}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!companyData) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                    <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                        <h2 className="text-lg font-semibold pl-6">Company</h2>
                    </div>
                    <div className="px-6">
                        <div className="text-center py-8">No company data found</div>
                    </div>
                </div>
            </div>
        );
    }

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
                                <div className="text-right text-[16px] font-normal leading-6">{companyData.company_name}</div>
                                <div className="text-[rgb(71,84,103)] text-[16px] font-normal leading-6">Entity type:</div>
                                <div className="text-right text-[16px] font-normal leading-6">{companyData.entity_type}</div>
                                <div className="text-[rgb(71,84,103)] text-[16px] font-normal leading-6">EIN:</div>
                                <div className="text-right text-[16px] font-normal leading-6">{companyData.ein}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Business Address:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">{companyData.business_address}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Registration Date:</div>
                                <div className="text-[16px] font-normal leading-6 text-right">{companyData.registration_date}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Renewal Date</div>
                                <div className="text-[16px] font-normal leading-6 text-right">{companyData.renewal_date}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Formation State</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">{companyData.formation_state}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Status</div>
                                <div className=" text-[16px] font-normal leading-6 text-green-500 text-right">{companyData.status}</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">

                        {/* Right: Address Info */}
                        <div>
                            <div className="font-semibold text-[#475467] mb-2  text-[16px] leading-6">Address</div>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Headquarters:</div>
                                <div className=" text-right text-[16px] font-normal leading-6">{companyData.headquarters}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Line 1:</div>
                                <div className=" text-right text-[16px] font-normal leading-6">{companyData.address_line_1}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Line 2:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">{companyData.address_line_2}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Zip:</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">{companyData.zip}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Address Status</div>
                                <div className=" text-[16px] font-normal leading-6 text-green-500 text-right">{companyData.address_status}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Last Mail Received Date</div>
                                <div className=" text-[16px] font-normal leading-6 text-right">{companyData.last_mail_received_date}</div>
                                <div className="text-[#475467] text-[16px] font-normal leading-6">Upgrade premium address</div>
                                <a href="#" className=" text-[16px] font-normal leading-6 text-[#7856FC] hover:underline text-right">{companyData.upgrade_premium_address}</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
} 