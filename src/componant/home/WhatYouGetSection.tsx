import Image from "../ui/Image";

export default function WhatYouGetSection() {
    const benefits = [
        {
            icon: '/icons/company.svg',
            title: "Free Company Name Check",
            description: "We'll confirm your business name is available. Fast, accurate, and 100% free.",
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            icon: '/icons/complience.svg',
            title: "1st Year Compliance Free",
            description: "Enjoy full compliance support for your first year, on us and continuous guidance.",
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            icon: '/icons/email.svg',
            title: "Lifetime Email Support",
            description: "Questions anytime? Get expert help in your inbox, for life.",
            color: "text-amber-600",
            bgColor: "bg-amber-100",
        },
    ];

    return (
        <section className="bg-white px-[16px]">
            <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row gap-5 justify-evenly">
                <div className="space-y-8">
                    <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 text-center lg:text-start max-w-[625px]">What You’ll Get with Steady Formation</h2>
                    <div className="space-y-2">
                        {benefits.map((benefit, index) => {
                            return (
                                <div key={index} className="border-1 border-gray-200 px-[22px] py-[30px] rounded-2xl flex justify-start gap-6">
                                    <Image
                                        className="w-[40px]"
                                        url={benefit.icon}
                                        alt={benefit.title}
                                        width={40}
                                        height={40}
                                    />
                                    <div>
                                        <h3 className="text-[18px] lg:text-[30px] leading-[28px] lg:leading-[38px] font-medium text-black">{benefit.title}</h3>
                                        <p className="text-[14px] lg:text-[16px] leading-[20px] font-medium text-[#475467]">{benefit.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                   
                </div>
                <Image
                    className="w-[548px]"
                    url='/homepage/what_you_will_get_section.png'
                    alt='What You Will Get'
                    width={548}
                    height={618}
                />
            </div>
        </section>
    );
}