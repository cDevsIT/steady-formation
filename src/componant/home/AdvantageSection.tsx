import Image from '../ui/Image';
import AdvantageSectionClient from './client-componant/AdvantageSectionClient';



export default function AdvantageSection() {


    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1392px] mx-auto px-3 lg:px-15 py-5 lg:py-15 bg-[#F9FAFB] rounded-3xl">
                {/* Section Title */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[562px] mx-auto">
                    Forming an LLC Comes With Big Advantages
                </h2>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Side - Tabs and Content */}
                    <AdvantageSectionClient />

                    {/* Right Side - Image */}
                    <div className="order-2">
                        <div className="relative">
                            {/* Background Decorative Elements */}
                            <Image
                                className="w-[531px]"
                                url='/homepage/advantage_section.png'
                                alt='Advantage Section Image'
                                width={550}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}