'use client';

import { useState } from 'react';
import Image from '../ui/Image';

interface TabContent {
    id: string;
    title: string;
    items: {
        icon: string;
        title: string;
        description: string;
    }[];
}

const tabsData: TabContent[] = [
    {
        id: 'advantages',
        title: 'LLC',
        items: [
            {
                icon: '/homepage/icons/advantage_protection.svg',
                title: 'Limited Liability Protection',
                description: 'Keep your home, car, and savings safe if your business is sued or owes money.'
            },
            {
                icon: '/homepage/icons/advantage_tax.svg',
                title: 'Pass-Through Taxation',
                description: 'Avoid double taxation — profits pass through to your personal return.'
            },
            {
                icon: '/homepage/icons/advantage_bank.svg',
                title: 'Business Bank Account Ready',
                description: 'Open a U.S. business account and keep your personal and business finances separate.'
            },
            {
                icon: '/homepage/icons/advantage_approved.svg',
                title: 'Eligibility for U.S. Business Tools',
                description: 'Stripe, PayPal, Shopify, and other platforms often require a registered LLC.'
            }
        ]
    },
    {
        id: 'features',
        title: 'EIN',
        items: [
            {
                icon: '/homepage/icons/advantage_protection.svg',
                title: 'Required for U.S. Business Operations',
                description: 'Needed for taxes, hiring, and running your business legally in the U.S.'
            },
            {
                icon: '/homepage/icons/advantage_protection.svg',
                title: 'Builds Business Identity',
                description: 'Separates personal and business identity — adds credibility and trust.'
            },
            {
                icon: '/homepage/icons/advantage_protection.svg',
                title: 'Bank & Payment Gateway Access',
                description: 'Open U.S. bank accounts and activate Stripe, PayPal, Amazon, and more.'
            },
            {
                icon: '/homepage/icons/advantage_protection.svg',
                title: 'Hire Employees Legally',
                description: 'Essential for payroll setup and employee tax filings.'
            }
        ]
    }
];

export default function AdvantageSection() {
    const [activeTab, setActiveTab] = useState('advantages');

    const activeTabData = tabsData.find(tab => tab.id === activeTab);

    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1512px] mx-auto px-3 lg:px-15 py-5 lg:py-15 bg-[#F9FAFB] rounded-3xl">
                {/* Section Title */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[562px] mx-auto">
                    Forming an LLC Comes With Big Advantages
                </h2>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Side - Tabs and Content */}
                    <div className="order-1">
                        {/* Tab Navigation - Fluid Style */}
                        <div className="inline-flex flex-wrap gap-3 bg-white p-3 pb-0 rounded-t-2xl">
                            {tabsData.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-flex items-center justify-center 
                                            px-6 py-2 rounded-full font-semibold text-sm 
                                            transition-all duration-300 whitespace-nowrap 
                                            ${activeTab === tab.id
                                        ? 'text-[#7856FC] bg-[#EBE8FF]'
                                            : ''
                                        }`}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-b-2xl rounded-tr-2xl">
                            {activeTabData?.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <Image
                                                className="w-[48px]"
                                                url={item.icon}
                                                alt={item.title}
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="order-2">
                        <div className="relative">
                            {/* Background Decorative Elements */}
                            <Image
                                className="w-[531px]"
                                url='/homepage/advantage_section.png'
                                alt='Advantage Section Image'
                                width={550}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}