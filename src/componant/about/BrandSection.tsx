import Image from "../ui/Image";

const customerLogos = [
    { name: "Company", icon: "🌊", url: "/aboutpage/icons/company_logo.svg" },
    { name: "kintsugi", icon: "🌊", url: "/aboutpage/icons/kintsugi.svg" },
    { name: "stacked_lab.svg", icon: "🌊", url: "/aboutpage/icons/stacked_lab.svg" },
    { name: "Company_3", icon: "🌊", url: "/aboutpage/icons/mangolia.svg" },
    { name: "Company_4", icon: "🌊", url: "/aboutpage/icons/wrapspeed.svg" },
    { name: "Company_5", icon: "🌊", url: "/aboutpage/icons/sysyphus.svg" },
];

const BrandSection = () => {
    return (
        <div>
            <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 max-w-[697px] mx-auto">
                <p className="text-gray-600 text-[20px] leading-[175%] text-center mb-[32px]">
                    <span className=" font-bold text-[#7856FC]">500+</span>
                    Total Satisfied Customers Worldwide
                </p>
                <div className="flex animate-scroll">
                    {customerLogos?.map((logo, index) => (
                        <Image
                            className="h-[37px] w-full ml-4"
                            url={logo.url}
                            alt="Client Brand Image"
                            key={index}
                            width={100}
                            height={37}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandSection;