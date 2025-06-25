import React from 'react';
import Link from 'next/link';
import Image from '@/componant/ui/Image';

const menu = [
    { name: 'Dashboard', path: '/client', icon: '/client/dashboard-icon.svg' },
    { name: 'Compliance', path: '/client/compliance', icon: '/client/compliance-icon.svg' },
    { name: 'My Profile', path: '/client/my-profile', icon: '/client/my-profile-icon.svg' },
    { name: 'Company', path: '/client/company', icon: '/client/company-icon.svg' },
    { name: 'Documents', path: '/client/documents', icon: '/client/documents-icon.svg' },
    { name: 'Tax Filing', path: '/client/tax-filing', icon: '/client/tax-filing-icon.svg' },
    { name: 'Payment', path: '/client/payment', icon: '/client/payment-icon.svg' },
    { name: 'Support / Help', path: '/client/support-help', icon: '/client/support-help-icon.svg' },
    { name: 'Affiliate', path: '/client/affiliate', icon: '/client/affiliate-icon.svg' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex justify-center bg-[#f8f9fb] pt-[70px] min-h-screen">
            <div className="max-w-[1280px] w-full flex">
                {/* Sidebar */}
                <aside className="w-[282px] bg-white border border-[#ececec] rounded-[16px] flex flex-col justify-between min-h-[calc(100vh-70px)] p-0">
                    <div>
                        {/* User Info */}
                        <div className="pt-6 pb-4 border-b border-[#ececec] px-6">
                            {/* Icon row */}
                            <div className="flex mb-3">
                                <Image url="/client/steady-formations-client-icon1.png" alt="User Icon" className="w-14 h-14 rounded-full" width={56} height={56} />
                            </div>
                            {/* Info and dropdown row */}
                            <div className="flex items-center w-full">
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="font-bold text-xl text-black leading-tight truncate">Fission</span>
                                    <span className="text-[#667085] text-sm leading-tight truncate">wyoming, Cheyenne, 82007</span>
                                </div>
                                <div className="flex-shrink-0 ml-2">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>
                        {/* Menu */}
                        <nav className="flex flex-col gap-1 mt-2 px-2">
                            {menu.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-[#344054] text-base font-semibold hover:bg-[#f4f4f7] hover:text-[#7856FC] transition-colors"
                                    prefetch={false}
                                >
                                    <Image url={item.icon} alt={item.name + ' icon'} className="w-5 h-5" width={20} height={20} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    {/* Log Out */}
                    <div className="border-t border-[#ececec] px-6 py-4">
                        <button className="flex items-center gap-3 text-[#344054] text-base font-semibold hover:text-[#7856FC] w-full">
                            <Image url="/client/log-out-icon.svg" alt="Log Out Icon" className="w-5 h-5" width={20} height={20} />
                            Log Out
                        </button>
                    </div>
                </aside>
                {/* Gap between sidebar and content */}
                <div className="w-[23px]" />
                {/* Main Content */}
                <main className="flex-1 max-w-[975px] w-full bg-white rounded-[16px] p-8 min-h-[calc(100vh-70px)]">
                    {children}
                </main>
            </div>
        </div>
    );
} 