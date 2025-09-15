import InfinityBrandSliding from "../shared/InfinityBrandSliding";

const BrandSection = () => {
    return (
        <div>
            <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 max-w-[697px] mx-auto">
                <p className="text-gray-600 text-[20px] leading-[175%] text-center mb-[32px]">
                    <span className=" font-bold text-[#7856FC]">1000+</span>
                    Total Satisfied Customers Worldwide
                </p>
                
                <InfinityBrandSliding />
            </div>
        </div>
    );
};

export default BrandSection;