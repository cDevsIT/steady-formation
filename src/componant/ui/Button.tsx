import React from 'react';

type CustomButtonProps = {
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    theme?: 'primary' | 'secondary'
};

const Button: React.FC<CustomButtonProps> = ({
    onClick,
    className = '',
    type = 'button',
    children,
    theme = 'primary'
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`h-11 px-8 my-2 lg:my-0 ${theme === 'primary' ?'text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500': 'bg-transparent border-1 border-gray-200 text-gray-600'}   text-xs xs:text-sm sm:text-[14px] font-semibold rounded-lg transition-all duration-200 transform  focus:ring-offset-2 whitespace-nowrap ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
