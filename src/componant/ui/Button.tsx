import React from 'react';

type CustomButtonProps = {
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    theme?: 'primary' | 'secondary';
    disabled?: boolean;
};

const Button: React.FC<CustomButtonProps> = ({
    onClick,
    className = '',
    type = 'button',
    children,
    theme = 'primary',
    disabled = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`h-11 px-8 my-2 lg:my-0 ${theme === 'primary' ?'text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500': 'bg-transparent border-1 border-gray-200 text-gray-600'}   text-xs xs:text-sm sm:text-[14px] font-semibold rounded-lg transition-all duration-200 transform  focus:ring-offset-2 whitespace-nowrap ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
