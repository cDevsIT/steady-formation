import React, { useState, useRef, useEffect } from 'react';

interface ThreeDotMenuProps<T = any> {
    handleView?: (row: T) => void;
    handleDelete?: (id: string | number) => void;
    row?: T;
    id?: string | number;
}

const ThreeDotMenu = <T,>({ handleView, handleDelete, row, id }: ThreeDotMenuProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX - 160, // Position to the left of button
            });
        }
        setIsOpen(!isOpen);
    };

    const handleEditClick = () => {
        if (handleView && row) {
            handleView(row);
        }
        setIsOpen(false);
    };

    const handleDeleteClick = () => {
        if (handleDelete && id) {
            handleDelete(id);
        }
        setIsOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full 
                   hover:bg-gray-100 transition-colors duration-200 group m-0"
                aria-label="More options"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>

            </button>

            {isOpen && (
                <div
                    ref={menuRef}
                    className="fixed z-50 w-40 bg-white rounded-lg shadow-lg border border-gray-200 
                     py-1 animate-in fade-in-0 zoom-in-95 duration-100"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                >
                    <button
                        onClick={handleEditClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                       hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150
                       focus:outline-none focus:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3 text-gray-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        Edit
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 
                       hover:bg-red-50 hover:text-red-700 transition-colors duration-150
                       focus:outline-none focus:bg-red-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-3 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        Delete
                    </button>
                </div>
            )}
        </>
    );
};

export default ThreeDotMenu;