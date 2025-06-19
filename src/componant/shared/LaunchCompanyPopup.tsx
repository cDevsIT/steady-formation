import React, { useEffect, useState } from "react";

export default function LaunchCompanyPopup() {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 5000); // 5 seconds
        return () => clearTimeout(timer);
    }, []);

    if (!show || hide) return null;

    return (
        <div className="fixed top-[65px] left-0 w-full z-50 flex justify-center animate-slideDown">
            <div className="bg-[#4A1FB8] w-full flex items-center justify-between px-4 md:px-12 py-3 gap-4 md:gap-8">
                <div className="flex items-center gap-6 flex-1">
                    <span className="font-inter font-semibold text-[18px] md:text-[20px] leading-[1.2] text-white whitespace-nowrap">Launch Your U.S. Company</span>
                    <span className="text-white text-[13px] md:text-[14px] font-normal font-inter opacity-90 hidden md:block">The delightfully smart collaboration platform get started – for free everything in Hobby plus higher limits.</span>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Company Name"
                        className="rounded-lg px-4 py-2 text-black w-[180px] md:w-[220px] text-[14px] h-[38px] bg-white"
                    />
                    <button className="bg-[#7CD4F7] hover:bg-[#6bc4e7] text-black rounded-lg px-6 py-2 font-medium font-inter text-[14px] leading-[20px] whitespace-nowrap h-[38px]">
                        Start Now
                    </button>
                    <button
                        className="bg-white/10 hover:bg-white/20 rounded p-1.5 text-white"
                        onClick={() => setHide(true)}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <style jsx global>{`
                @keyframes slideDown {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.5s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </div>
    );
} 