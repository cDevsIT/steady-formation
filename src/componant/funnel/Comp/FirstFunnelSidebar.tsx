import Image from "@/componant/ui/Image";

const FirstFunnelSidebar = () => {
    return (
        <div className="max-w-[565px] min-h-[677px] bg-white rounded-3xl">
            <div className="grid grid-cols-[70%_30%] bg-gray-100">
                <div className="flex flex-col gap-4 rounded-br-3xl pl-10 pb-4 bg-white align-middle">
                    <Image url='/icons/rating_stars.svg' alt='Trust Pilot' width={105} height={20} className="w-[105px]" />
                    <p className="text-sm font-normal text-black">Their operating agreement service was on point my business setup process was smoother than expected team really know their job very happy.</p>
                    <div className="flex justify-start items-center gap-4">
                        <Image url='/icons/rating_avatar.svg' alt='Trust Pilot' width={41} height={41} className="w-[41px]" />
                        <p className="text-sm font-semibold text-black">Daniel Romero</p>
                    </div>
                </div>
                <div className="bg-white ">
                    <div className="rounded-t-3xl bg-gray-100 w-full h-full flex justify-center items-center">
                        <Image url='/icons/secure.svg' alt='Secure Icon' width={121} height={121} className="w-[121px]" />
                    </div>
                </div>
            </div>
            <div className="bg-white relative">
                <div className="bg-gray-100 pt-10 pb-2 flex justify-center rounded-b-3xl rounded-tl-3xl">
                    <Image url='/funnel/sidebar_image.png' alt='Funnel Sidebar' width={420} height={500} className="w-[420px]" />
                </div>

                <div className="max-w-[282px] flex justify-start items-center p-3 rounded-full absolute bottom-3 left-3 bg-white gap-3">
                    <Image url='/icons/company_icon.svg' alt='Company SVG' width={48} height={48} className="w-[48px]" />
                    <p className="text-lg font-medium text-black">Register Your US Company Today</p>
                </div>

                <Image url='/funnel/successfull_card.png' alt='Successfull Card' width={194} height={151} className="w-[194px] absolute top-10 right-5" />
            </div>
        </div>
    );
};

export default FirstFunnelSidebar;