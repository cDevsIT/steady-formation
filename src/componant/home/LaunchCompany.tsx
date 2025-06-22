import StartFunnelInput from "../shared/StartFunnelInput";
import Image from "../ui/Image";

const LaunchCompany = () => {

    return (
        <section className="pb-20 bg-white px-3">
            <div className="max-w-[1512px] mx-auto relative">
                <div>
                    <div className="bg-white hidden lg:flex justify-between relative">
                        <div className="absolute left-4 xl:left-15 top-[30px] xl:top-[60px]  z-10 max-w-[654px] space-y-3 xl:space-y-6 ">
                            <h2 className="text-[37px] xl:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-white text-start">Everything You Need to Start, Nothing You Don’t</h2>
                            <p className="text-[16px] leading-[24px] max-w-[692px] text-start text-white">Once you register your U.S. company, you`ll gain access to your personalized dashboard—designed to make managing your business effortless from anywhere in the world.</p>
                            <StartFunnelInput
                                className="items-center justify-start"
                                theme="dark"
                            />
                        </div>
                        <Image
                            className="w-[350px] xl:w-[450px] absolute lg:right-8 xl:right-15 bottom-[30px] xl:bottom-[60px] z-10"
                            url='/homepage/launch_company.png'
                            alt='Facility Section'
                            width={412}
                            height={424}
                        />
                        <div className="h-[350px] xl:h-[478px] w-full bg-[#3E1999] z-0 rounded-3xl"></div>
                    </div>
                    <div className="bg-[#3E1999] lg:hidden relative rounded-2xl p-6 pb-[200px] md:pb-[150px] mb-[150px]">
                        <div className=" flex flex-col justify-center items-center gap-5">
                            <h2 className="text-[30px] leading-[38px] font-bold text-white text-center">Launch Your U.S. Company</h2>
                            <p className="text-[16px] leading-[24px] text-center text-white">The delightfully smart collaboration platform get started - for free everything in Hobby plus higher limits.</p>
                            <StartFunnelInput
                                className="items-start"
                                theme="dark"
                            />
                        </div>
                        <Image
                            className="z-10 w-[316px] absolute left-[45%] top-[70%] transform -translate-x-1/2"
                            url='/homepage/launch_company.png'
                            alt='Facility Section'
                            width={412}
                            height={424}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LaunchCompany;