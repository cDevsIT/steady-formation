'use client';

import { useState } from 'react';
import Image from '../ui/Image';

interface TabContent {
    id: string;
    title: string;
    subTitle:string;
    items:string[];
}

const tabsData: TabContent[] = [
    {
        id: 'story',
        title: 'Story',
        subTitle: 'What Mission Do We Have',
        items: [
            'Driven by this deep understanding and empathy, we embarked on our mission 7+ years ago. Our founders, armed with a blend of expertise in business strategy, ',
            'Taxation, and international law, set out to dismantle the barriers that kept global entrepreneurs from accessing the US market. ',
            'What started as a small team of like-minded professionals has now grown into a family, united by a common goal—to empower.',
            'Starting as a small, driven team, we’ve grown into a dedicated, tight-knit family, committed to empowering business owners everywhere to reach their fullest potential.'
        ]
    },
    {
        id: 'vision',
        title: 'Vision',
        subTitle: 'Bridging Dreams and Realities',
        items: [
            'We’re here to make building a U.S. business feel less like a maze and more like momentum.',
            'With over seven years of experience and 500+ successful client journeys behind us, our mission is simple: empower entrepreneurs to launch, scale, and succeed without friction.',
            'We don’t just guide—we walk beside you, turning big visions into solid wins.'
        ]
    },
    {
        id: 'mission',
        title: 'Mission',
        subTitle: 'Bridging Dreams and Realities',
        items: [
            'We see a world where launching a U.S. business doesn’t come with borders, barriers, or guesswork. ',
            'Our goal? To hand you the tools, clarity, and confidence to build boldly—wherever you`re from.',
            'At Steady Formation, we’re not just forming companies; we’re opening doors to global growth. Because your business deserves more than a start. It deserves momentum.'
        ]
    }
];

export default function HowWeThinkSection() {
    const [activeTab, setActiveTab] = useState('story');

    const activeTabData = tabsData.find(tab => tab.id === activeTab);

    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1512px] mx-auto px-3 py-5 lg:py-15 bg-[#F9FAFB] rounded-3xl">
                {/* Section Title */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[562px] mx-auto">
                    How We Think, Build, and Empower.
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
                            <h3 className='p-4 pb-0 text-[24px] font-bold'>{activeTabData?.subTitle}</h3>
                            {activeTabData?.items.map((item, index) => (
                                <p
                                    key={index}
                                    className='p-4 text-[#475467] text-[16px]'
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="order-2">
                        <div className="relative">
                            {/* Background Decorative Elements */}
                            <Image
                                className="w-[586px]"
                                url='/aboutpage/about_page.png'
                                alt='About Page Image'
                                width={600}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}