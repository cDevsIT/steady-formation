"use client";

import React, { useEffect, useState } from 'react';
import Image from '@/componant/ui/Image';
import { useCompanyStatus } from '@/hooks/useCompanyStatus';
import { useCompany } from '@/contexts/CompanyContext';
import { useRouter } from 'next/navigation';
import { getQuickActions, QuickAction } from '@/services/quickActionsService';

export default function ClientDashboard() {
    const { selectedCompany } = useCompany();
    const { statusData, isLoading, error } = useCompanyStatus({ 
        company_id: selectedCompany?.id 
    });
    const router = useRouter();
    const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
    const [isLoadingActions, setIsLoadingActions] = useState(true);

    useEffect(() => {
        const fetchQuickActions = async () => {
            if (selectedCompany?.id) {
                setIsLoadingActions(true);
                try {
                    const actions = await getQuickActions(undefined, selectedCompany.id);
                    setQuickActions(actions);
                } catch (error) {
                    console.error('Error fetching quick actions:', error);
                } finally {
                    setIsLoadingActions(false);
                }
            }
        };

        fetchQuickActions();
    }, [selectedCompany?.id]);

    const handleActionClick = (action: QuickAction) => {
        if (!action.action_enabled) return;

        switch (action.action_type) {
            case 'view':
                if (action.action_url) {
                    window.open(action.action_url, '_blank');
                }
                break;
            case 'renew':
                // Navigate to renewal page or open modal
                router.push('/client/compliance');
                break;
            case 'upload':
                // Navigate to upload page
                router.push('/client/compliance');
                break;
            case 'schedule':
                // Navigate to scheduling page
                router.push('/client/compliance');
                break;
            case 'process':
                // Navigate to processing page
                router.push('/client/compliance');
                break;
            default:
                console.log('Action clicked:', action.name);
        }
    };

    return (
        <div>

            {/* Stepper/Progress Section */}
            <div className="bg-white rounded-2xl mx-4 md:mx-0 px-4 md:px-6 py-8 shadow-sm border border-[#ECECEC] mb-5 overflow-hidden">
                <div className="relative w-full">
                    {/* Background line connecting all steps */}
                    <div className="absolute top-4 left-16 right-17 h-1 bg-[#ECECEC] rounded-full mx-4 md:mx-6"></div>
                    {/* Progress line */}
                    <div className="absolute top-4 left-14 h-1 bg-[#7856FC] rounded-full transition-all duration-500 mx-4 md:mx-6"
                        style={{ 
                            width: statusData?.steps 
                                ? (() => {
                                    const completedSteps = statusData.steps.filter(step => step.status === 'complete').length;
                                    const processingSteps = statusData.steps.filter(step => step.status === 'processing').length;
                                    
                                    // Calculate total progress: complete steps (full) + processing steps (half)
                                    const totalProgress = completedSteps + (processingSteps * 0.5);
                                    
                                    if (totalProgress === 0) return 'calc(0% + 0px)';
                                    if (totalProgress === 0.5) return 'calc(6% + 0px)';
                                    if (totalProgress === 1) return 'calc(9.5% + 0px)';
                                    if (totalProgress === 1.5) return 'calc(13% + 0px)';
                                    if (totalProgress === 2) return 'calc(18% + 0px)';
                                    if (totalProgress === 2.5) return 'calc(26% + 0px)';
                                    if (totalProgress === 3) return 'calc(34.5% + 0px)';
                                    if (totalProgress === 3.5) return 'calc(44% + 0px)';
                                    if (totalProgress === 4) return 'calc(53% + 0px)';
                                    if (totalProgress === 4.5) return 'calc(60% + 0px)';
                                    if (totalProgress === 5) return 'calc(67.25% + 0px)';
                                    if (totalProgress === 5.5) return 'calc(75% + 0px)';
                                    if (totalProgress === 6) return 'calc(83% + 0px)';
                                    return 'calc(0% + 0px)';
                                })()
                                : 'calc(0% + 0px)' 
                        }}></div>
                    {/* Steps */}
                    <div className="flex justify-between relative z-10 px-4 md:px-6">
                        {[
                            { label: 'Name Availability Search' },
                            { label: 'State Filing' },
                            { label: 'Registered Business Address' },
                            { label: 'Mail Forwarding' },
                            { label: 'EIN' },
                            { label: 'Operating Agreement' },
                        ].map((step, idx) => {
                            // Get status from API data or use default
                            const apiStep = statusData?.steps?.find(s => s.label === step.label);
                            const stepStatus = apiStep?.status || (idx === 0 ? 'complete' : idx === 1 ? 'processing' : 'pending');
                            
                            const isCompleted = stepStatus === 'complete';
                            const isProcessing = stepStatus === 'processing';
                            const isUpcoming = stepStatus === 'pending';
                            return (
                                <div key={step.label} className="flex flex-col items-center flex-shrink-0 min-w-[90px]">
                                    {/* Step circle */}
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 mb-3
                                        ${isCompleted ? 'bg-[#7856FC]' : isProcessing ? 'bg-[#7856FC]' : 'bg-white border-2 border-[#ECECEC]'}
                                    `}>
                                        {isCompleted ? (
                                            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : isProcessing ? (
                                            <div className="w-3 h-3 rounded-full bg-white"></div>
                                        ) : (
                                            <div className="w-3 h-3 rounded-full bg-[#ECECEC]"></div>
                                        )}
                                    </div>
                                    {/* Step label */}
                                    <div className={`text-[12px] leading-3 font-medium text-center mt-1
                                        ${isCompleted ? 'text-black font-bold' : isProcessing ? 'text-[#7856FC]' : 'text-[#BDBDBD]'}
                                    `} style={{ whiteSpace: 'normal' }}>
                                        {step.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#ECECEC] pt-4 mb-[28px] mx-4 md:mx-0 md:px-6">
                <h2 className="text-xl leading-7 font-semibold mb-4 px-6">Quick Action</h2>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#F9FAFB]">
                            <tr className="text-[#7C8493] text-left border-b border-[#E4E7EC]">
                                <th className="py-3 px-7 font-medium text-xs leading-4">Name</th>
                                <th className="py-3 px-4 font-medium text-xs leading-4">Due Date</th>
                                <th className="py-3 px-4 font-medium text-center text-xs leading-4">Status</th>
                                <th className="py-3 px-4 font-medium text-center text-xs leading-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#23272E]">
                            {isLoadingActions ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-[#7C8493]">
                                        Loading quick actions...
                                    </td>
                                </tr>
                            ) : quickActions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-[#7C8493]">
                                        No quick actions available
                                    </td>
                                </tr>
                            ) : (
                                quickActions.map((action, index) => (
                                    <tr key={action.id} className={index === quickActions.length - 1 ? '' : 'border-b border-[#E4E7EC]'}>
                                        <td className="py-5 px-7 font-medium text-[14px] leading-5">{action.name}</td>
                                        <td className="py-5 px-4 font-medium text-[14px] leading-5">{action.due_date}</td>
                                        <td className="py-5 px-4 text-center font-medium text-[14px] leading-5">
                                            <span className={`${action.status_class} px-3 py-1 rounded-lg font-medium`}>
                                                {action.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-4 text-center font-medium text-[14px] leading-5">
                                            <button 
                                                onClick={() => handleActionClick(action)}
                                                disabled={!action.action_enabled}
                                                className={`px-4 py-1 rounded-lg font-medium transition-colors ${
                                                    action.action_enabled 
                                                        ? 'bg-[#F3F4F6] text-[#23272E] hover:bg-[#E5E7EB] cursor-pointer' 
                                                        : 'bg-[#F3F4F6] text-[#7C8493] cursor-not-allowed opacity-60'
                                                }`}
                                            >
                                                {action.action_label}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
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
                        <Image url="/client/expert-icon1.svg" alt="Expert 1" className="w-10 h-10 rounded-full border-2 border-white shadow"  />
                        <Image url="/client/expert-icon2.svg" alt="Expert 2" className="w-10 h-10 rounded-full border-2 border-white shadow"  />
                        <Image url="/client/expert-icon3.svg" alt="Expert 3" className="w-10 h-10 rounded-full border-2 border-white shadow" />
                        <Image url="/client/expert-icon4.svg" alt="Expert 4" className="w-10 h-10 rounded-full border-2 border-white shadow"  />
                    </div>
                </div>
                <button onClick={() => router.push('/client/support-help?new=1')} className="z-10 bg-[#7856FC] hover:bg-[#6840e0] text-white px-8 py-3 rounded-lg font-medium text-base transition-colors duration-200 w-full md:w-auto mt-4 md:mt-0">
                    Create a Support Ticket
                </button>
            </div>

        </div>
    )

} 