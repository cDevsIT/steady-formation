"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/componant/ui/Image';
import NextImage from 'next/image';

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
    // Example companies
    const companies = [
        {
            name: 'Fission',
            address: 'wyoming, Cheyenne, 82007',
            icon: '/client/dropdown-icon1.svg',
        },
        {
            name: 'Propovoice',
            address: 'wyoming, Cheyenne, 82007',
            icon: '/client/dropdown-icon2.svg',
        },
        {
            name: 'Kidency',
            address: 'wyoming, Cheyenne, 82007',
            icon: '/client/dropdown-icon3.svg',
        },
        {
            name: 'Decorative',
            address: 'wyoming, Cheyenne, 82007',
            icon: '/client/dropdown-icon4.svg',
        },
    ];
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="w-full flex justify-center bg-[#f8f9fb] pt-[70px] min-h-screen">
            <div className="max-w-[1280px] w-full flex">
                {/* Sidebar */}
                <aside className="w-[282px] bg-white border border-[#ececec] rounded-[16px] flex flex-col justify-between min-h-[calc(100vh-70px)] p-0">
                    <div>
                        {/* User Info with Dropdown */}
                        <div className="pt-6 pb-4 border-b border-[#ececec] px-6">
                            {/* Icon row */}
                            <div className="flex mb-3">
                                <NextImage src={selectedCompany.icon} alt="User Icon" width={56} height={56} className="w-14 h-14 rounded-full" />
                            </div>
                            {/* Info and dropdown row */}
                            <div className="relative">
                                <button
                                    className="flex items-center w-full focus:outline-none cursor-pointer"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                >
                                    <div className="flex flex-col flex-1 min-w-0 text-left">
                                        <span className="font-bold text-xl text-black leading-tight truncate">{selectedCompany.name}</span>
                                        <span className="text-[#667085] text-sm leading-tight truncate">{selectedCompany.address}</span>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <NextImage
                                            src={dropdownOpen ? '/client/arrow-down.svg' : '/client/arrow-down.svg'}
                                            alt="Dropdown Arrow"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5"
                                        />
                                    </div>
                                </button>
                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute w-[272px] -left-5 mt-2 bg-white rounded-xl shadow-lg border border-[#ececec] z-20">
                                        <div className="flex items-center justify-between px-4 pt-3 pb-1">
                                            <span className="text-xs text-[#7C8493] font-semibold tracking-wide">SWITCH COMPANY</span>
                                            <button className="w-6 h-6 cursor-pointer flex items-center justify-center rounded hover:bg-[#f4f4f7] transition-colors" onClick={() => setDropdownOpen((open) => !open)}>
                                                <NextImage src="/client/arrow-up.svg" alt="Arrow Up" width={20} height={20} className="w-5 h-5" />
                                            </button>
                                        </div>
                                        {companies.map((company, idx) => (
                                            <button
                                                key={company.name}
                                                className={`flex items-center w-full px-4 py-2 gap-3 hover:bg-[#f4f4f7] transition-colors ${selectedCompany.name === company.name ? 'bg-[#f9fafb]' : ''}`}
                                                onClick={() => { setSelectedCompany(company); setDropdownOpen(false); }}
                                            >
                                                <NextImage src={company.icon} alt={company.name + ' icon'} width={36} height={36} className="w-9 h-9 rounded-full border border-[#ececec]" />
                                                <div className="flex flex-col text-left">
                                                    <span className={`font-medium leading-7 text-sm ${selectedCompany.name === company.name ? 'text-[#7856FC]' : 'text-[#23272E]'}`}>{company.name}</span>
                                                    <span className="text-xs leading-4 font-normal text-[#7C8493]">{company.address}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
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
                <main className="flex-1 max-w-[975px] w-full bg-white rounded-[16px] min-h-[calc(100vh-70px)]">
                    {children}
                </main>
            </div>
        </div>
    );
} 