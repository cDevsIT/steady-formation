import React, { useEffect, useState } from "react";
type GlobalFilterProps = {
    onSearch: (searchValue: string) => void;
};

export const GlobalFilter: React.FC<GlobalFilterProps> = ({ onSearch }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(value); // Trigger search with the updated value
        }, 700);

        return () => clearTimeout(timer);
    }, [value, onSearch]);

    return (
        <div className="relative w-full">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-2 max-w-[350px] rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};