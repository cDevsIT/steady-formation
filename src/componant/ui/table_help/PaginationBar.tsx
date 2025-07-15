import React, { useState } from "react";
import Image from "../Image";

type PaginationBarProps = {
    gotoPage: (pageIndex: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    handleChangePagePerView: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PaginationBar: React.FC<PaginationBarProps> = ({
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageSize,
    handleChangePagePerView,
}) => {
    const [gotoPageInput, setGotoPageInput] = useState("");
    const renderPageButtons = () => {
        const buttons = [];
        const currentPage = pageIndex + 1 || 1;

        let surroundingCount = 2;
        if (pageCount > 40) {
            surroundingCount = 4;
        } else if (pageCount > 20) {
            surroundingCount = 3;
        }

        const shouldShow = (i: number) => {
            return (
                i <= 2 || // first two pages
                i > pageCount - 2 || // last two pages
                (i >= currentPage - surroundingCount && i <= currentPage + surroundingCount)
            );
        };

        let prevWasEllipsis = false;

        for (let i = 1; i <= pageCount; i++) {
            if (shouldShow(i)) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => gotoPage(i - 1)}
                        className={`w-8 h-8 flex items-center justify-center ${i === currentPage
                            ? "bg-[#7856FC] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {i}
                    </button>
                );
                prevWasEllipsis = false;
            } else if (!prevWasEllipsis) {
                buttons.push(
                    <span
                        key={`ellipsis-${i}`}
                        className="text-gray-400 h-8 w-7 flex items-center justify-center"
                    >
                        ...
                    </span>
                );
                prevWasEllipsis = true;
            }
        }

        return buttons;
    };

    const handleGotoPage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const page = parseInt(gotoPageInput, 10);
        if (page >= 1 && page <= pageCount) {
            gotoPage(page - 1);
            setGotoPageInput("");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center  mt-4 border border-gray-200 rounded-lg">
                <div className="flex items-center border-r border-gray-200 h-full">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className={`px-2 rounded-full flex gap-2 items-center justify-center ${canPreviousPage
                            ? "text-gray-600"
                            : "text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        <Image
                            className="w-5"
                            url='/icons/arrow-left.svg'
                            alt='Arrow Left'
                            width={20}
                            height={20}
                        />
                        <span className="text-sm">Previous</span>
                    </button>
                </div>

                {/* go field  */}
                {/* <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Go:</span>
                <form onSubmit={handleGotoPage} className="flex items-center space-x-2">
                    <input
                        type="number"
                        min="1"
                        max={pageCount}
                        value={gotoPageInput}
                        onChange={(e) => setGotoPageInput(e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
            </div> */}
                <div className="flex items-center divide-x divide-gray-200">{renderPageButtons()}</div>

                {/* total item selector  */}
                {/* <div className="flex items-center space-x-2">
                <select
                    value={pageSize}
                    onChange={(e) => handleChangePagePerView(e)}
                    className="px-2 py-1 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {[10, 20, 30, 40, 50]?.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div> */}
                <div className="flex items-center border-l border-gray-200 h-full">
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className={`px-2 rounded-full flex gap-2 items-center justify-center ${canNextPage
                            ? "text-gray-600"
                            : "text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        <span className="">Next</span> <Image
                            className="w-5"
                            url='/icons/arrow-right.svg'
                            alt='Arrow right'
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationBar;