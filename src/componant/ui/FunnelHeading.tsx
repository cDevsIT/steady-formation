type CustomFunnelHeadingProps = {
    className?: string;
    children: React.ReactNode;
};

export const FunnelHeading: React.FC<CustomFunnelHeadingProps> = ({ children, className = '' }) => {
    return (
        <h1 className={`text-[24px] lg:text-[30px] leading-[32px] lg:leading-[38px] font-semibold text-black ${className}`}>{children}</h1>
    );
};

export const FunnelSubHeading: React.FC<CustomFunnelHeadingProps> = ({ children, className = '' }) => {
    return (
        <h3 className={`text-[16px] lg:text-[20px] leading-[24px] lg:leading-[30px] font-medium text-black ${className}`}>{children}</h3>
    );
}


