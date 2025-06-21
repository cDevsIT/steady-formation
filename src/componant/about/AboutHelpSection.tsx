import Image from "../ui/Image";

const AboutHelpSection = () => {
    return (
        <div className="pb-20 px-4 bg-white">
            <div className="max-w-[1512px] mx-auto px-3 flex flex-col lg:flex-row gap-4 mt-20 justify-between">
                <div>
                    <h2 className="text-[30px] lg:text-[45px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-3  text-start max-w-[605px]">
                        How we’re helping entrepreneurs around the world build successful U.S.
                    </h2>

                    <div className="max-w-[605px]">
                        <p className='py-3 text-[#475467] text-[16px]'>
                            At Steady Formation, we help people from all over start their businesses in the US easily. Our experienced team is here to guide you through every step, from getting your company set up to making sure everything’s done right.
                        </p>

                        <p className='py-3 text-[#475467] text-[16px]'>
                            We’re committed to helping your business dreams come true, making the process straightforward and stress-free.
                        </p>

                        <p className='py-3 text-[#475467] text-[16px]'>
                            For over seven years, we’ve stood beside startups and scaling brands, guiding them through formation, compliance, and beyond. With 500+ success stories under our belt, we’re here to turn your vision into a well-formed, well-run business. Simple. Secure. Strategic.
                        </p>
                    </div>
                </div>

                <Image
                    className="w-[592px]"
                    url='/aboutpage/about_help_section.png'
                    alt='About Page Image'
                    width={600}
                    height={400}
                />

            </div>
        </div>
    );
};

export default AboutHelpSection;