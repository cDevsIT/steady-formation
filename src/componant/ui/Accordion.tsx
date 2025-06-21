"use client";

import { useState } from 'react';
import Image from './Image';
interface AccordionProps {
    className: string;
    accordion: FAQItem[]
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export default function Accordion({ className, accordion }: AccordionProps) {
    const [openItem, setOpenItem] = useState<number>(1); 
    const toggleItem = (id: number) => {
        setOpenItem(openItem === id ? 0 : id);
    };

    return (
        <div className={`rounded-2xl ${className}`}>
            {accordion.map((item, index) => {
                const isFirstItem = (index===0);
                const isLastItem = (accordion.length-1) === index
                return <div
                    key={index}
                    className={`bg-white/70 backdrop-blur-sm border-1 border-gray-200 overflow-hidden transition-all duration-300 ${isFirstItem && 'rounded-t-2xl'} ${isLastItem && 'rounded-b-2xl'}`}
                >
                    <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-6 sm:px-8 sm:py-8 text-left transition-colors duration-200 hover:bg-white/50"
                        aria-expanded={openItem === item.id}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4 leading-tight">
                                {item.question}
                            </h3>
                            <div className="flex-shrink-0">
                                {openItem === item.id ? (
                                    <Image
                                        className="w-[15px] transition-transform duration-200"
                                        url='/icons/minus.svg'
                                        alt='Plus'
                                        width={15}
                                        height={15}
                                    />
                                ) : (
                                    <Image
                                        className="w-[15px] transition-transform duration-200"
                                        url='/icons/plus.svg'
                                        alt='Plus'
                                        width={15}
                                        height={15}
                                    />
                                )}
                            </div>
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openItem === item.id
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 bg-[#F4F3FF]">
                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-gray-700 leading-relaxed mt-4 text-base sm:text-lg">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
}