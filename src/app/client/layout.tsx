"use client";
import React, { useState, useEffect } from 'react';
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
    { name: 'Payment History', path: '/client/payment', icon: '/client/payment-icon.svg' },
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent background scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Get current path for active menu highlight
    let currentPath = '';
    if (typeof window !== 'undefined') {
        currentPath = window.location.pathname;
    }

    return (
        <div className="w-full flex justify-center bg-[#f8f9fb] pt-[70px] min-h-screen">
            {/* Floating Menu Button - left edge, vertically centered, mobile only, always visible except when sidebar is open */}
            {(!mobileMenuOpen) && (
                <button
                    className="fixed left-0 top-32 -translate-y-1/2 z-50 flex md:hidden items-center justify-center w-12 h-12 rounded-full bg-white border border-[#ececec] shadow-lg"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <img src="/client/menu-button-icon.svg" alt="Open Menu" className="w-7 h-7" />
                </button>
            )}
            {/* Floating Sidebar for Mobile */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/30"
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>
                    {/* Sidebar */}
                    <aside className="fixed top-0 left-0 z-50 w-[70.5vw] max-w-[70.5vw] h-full bg-white shadow-xl rounded-tr-2xl rounded-br-2xl flex flex-col justify-between animate-slideInLeft">
                        <div>
                            {/* Logo and Company Info */}
                            <div className="flex flex-col pt-6 pb-4 border-b border-[#ececec] px-6">
                                <div className="flex mb-2">
                                    <NextImage src={selectedCompany.icon} alt="Company Logo" width={56} height={56} className="w-14 h-14 rounded-full bg-[#240D68] object-cover" />
                                </div>
                                <button
                                    className="flex items-center w-full focus:outline-none cursor-pointer justify-between"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold text-lg text-black leading-7">{selectedCompany.name}</span>
                                        <span className="text-[#7C8493] font-normal text-xs leading-4">{selectedCompany.address}</span>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <NextImage
                                            src="/client/arrow-down.svg"
                                            alt="Dropdown Arrow"
                                            width={16}
                                            height={16}
                                            className="w-4 h-4"
                                        />
                                    </div>
                                </button>
                                {/* Dropdown (optional, can be removed if not needed) */}
                                {dropdownOpen && (
                                    <div className="absolute top-32 -left-1 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[#ececec] z-50 mx-3">
                                        <div className="flex items-center justify-between px-4 pt-3 pb-1">
                                            <span className="text-xs text-[#7C8493] font-semibold tracking-wide">SWITCH COMPANY</span>
                                            <button className="w-6 h-6 cursor-pointer flex items-center justify-center rounded hover:bg-[#f4f4f7] transition-colors" onClick={() => setDropdownOpen((open) => !open)}>
                                                <NextImage src="/client/arrow-up.svg" alt="Arrow Up" width={16} height={16} className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {companies.map((company, idx) => (
                                            <button
                                                key={company.name}
                                                className={`flex items-center w-full px-4 py-2 gap-3 hover:bg-[#f4f4f7] transition-colors ${selectedCompany.name === company.name ? 'bg-[#f9fafb]' : ''}`}
                                                onClick={() => { setSelectedCompany(company); setDropdownOpen(false); }}
                                            >
                                                <NextImage src={company.icon} alt={company.name + ' icon'} width={32} height={32} className="w-8 h-8 rounded-full border border-[#ececec]" />
                                                <div className="flex flex-col text-left">
                                                    <span className={`font-medium text-sm ${selectedCompany.name === company.name ? 'text-[#7856FC]' : 'text-[#23272E]'}`}>{company.name}</span>
                                                    <span className="text-xs font-normal text-[#7C8493]">{company.address}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Menu */}
                            <nav className="flex flex-col gap-1 mt-2 px-2">
                                {menu.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[#23272E] text-base font-medium transition-colors ${currentPath === item.path ? 'bg-[#F3F4F6]' : 'hover:bg-[#f4f4f7]'} ${currentPath === item.path ? 'font-bold' : ''}`}
                                        prefetch={false}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Image url={item.icon} alt={item.name + ' icon'} className="w-5 h-5" width={20} height={20} />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        {/* Log Out */}
                        <div className="border-t border-[#ececec] px-6 py-4">
                            <button className="flex items-center gap-3 text-[#344054] text-base font-medium hover:text-[#7856FC] w-full">
                                <Image url="/client/log-out-icon.svg" alt="Log Out Icon" className="w-5 h-5" width={20} height={20} />
                                Log Out
                            </button>
                        </div>
                    </aside>
                    {/* Close Button, vertically centered, straddling sidebar's right edge */}
                    <button
                        className="fixed z-50 top-1/3 left-[70.5vw] -translate-y-1/2 -ml-6 w-12 h-12 rounded-full bg-white border border-[#ececec] shadow-lg flex items-center justify-center md:hidden transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <NextImage src="/client/menu-button-icon.svg" alt="Close Menu" width={28} height={28} className="w-7 h-7 rotate-180" />
                    </button>
                </>
            )}
            {/* Desktop Sidebar (unchanged) */}
            <div className="max-w-[1280px] w-full flex">
                <aside className="w-[282px] bg-white border border-[#ececec] rounded-[16px] flex-col justify-between min-h-[calc(100vh-70px)] p-0 hidden md:flex">
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
                                    className="flex items-center w-full focus:outline-none cursor-pointer justify-between"
                                    onClick={() => setDropdownOpen((open) => !open)}
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="font-bold text-lg text-black leading-tight truncate">{selectedCompany.name}</span>
                                        <span className="text-[#7C8493] text-xs leading-tight truncate">{selectedCompany.address}</span>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        <NextImage
                                            src="/client/arrow-down.svg"
                                            alt="Dropdown Arrow"
                                            width={16}
                                            height={16}
                                            className="w-4 h-4"
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
                <div className="w-[23px] hidden md:block" />
                {/* Main Content */}
                <main className="flex-1 max-w-[975px] w-full bg-white rounded-[16px] min-h-[calc(100vh-70px)]">

                    {/* Hello Bar Section*/}
                    <div
                        className="bg-[#240D68] rounded-2xl px-10 py-6 md:px-12 text-white relative overflow-hidden mb-5 mx-4 md:mx-0"
                    >
                        <div
                            className="absolute inset-0 bg-no-repeat"
                            style={{
                                backgroundImage: "url('/affiliate/design-steady-formations-affiliate.png')",
                                backgroundPosition: 'right',
                                backgroundSize: 'cover',
                                opacity: 0.5
                            }}
                        ></div>
                        <div className="relative z-10">
                            <h1 className="font-inter font-medium text-2xl md:text-[36px] leading-tight md:leading-[44px] mb-[5px]">
                                Hi, Nasir!
                            </h1>
                            <p className="font-normal text-base md:text-[18px] leading-relaxed md:leading-[28px]">Here's your company status & quick actions.</p>
                        </div>
                    </div>

                    {children}
                </main>
            </div>
        </div>
    );
} 