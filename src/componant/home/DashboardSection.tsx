import Image from "../ui/Image";

const DashboardSection = () => {
    return (
        <section className=" bg-white px-[16px]">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 text-center max-w-[625px]">
                        Your Business, One Smart Dashboard Away
                    </h2>

                    <p className="text-[16px] leading-[24px] max-w-[692px] text-center text-[#475467]">Once you register your U.S. company, you`ll gain access to your personalized dashboard—designed to make managing your business effortless from anywhere in the world.</p>
                    <Image
                        className="w-[889px] mb-8"
                        url='/homepage/dashboard_section_image.png'
                        alt='Dashboard Screenshot'
                        width={889}
                        height={635}
                    />
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;