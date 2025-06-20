import Image from "../ui/Image";

const features = [
  {
    icon: '/icons/fees.svg',
    title: 'No Hidden Fees',
    description: 'What you see is what you pay. No surprises, no fine print. Just clear, upfront pricing.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
      icon: '/icons/document.svg',
    title: 'No Documents Required',
    description: 'Forget the paperwork. Get started quickly. No uploads, no hassle.',
    color: 'bg-cyan-100 text-cyan-600'
  },
  {
      icon: '/icons/save_money.svg',
    title: 'Save Money',
    description: 'Smarter setup, lower costs. Cut the waste and focus on what matters.',
    color: 'bg-green-100 text-green-600'
  },
  {
      icon: '/icons/global.svg',
    title: 'Global Reach',
    description: "We're where you are. Access our services from anywhere in the world.",
    color: 'bg-blue-100 text-blue-600'
  },
  {
      icon: '/icons/support.svg',
    title: 'Dedicated Support',
    description: "Real help, anytime. Our team's here 24/7 to guide you through.",
    color: 'bg-orange-100 text-orange-600'
  },
  {
      icon: '/icons/money_back.svg',
    title: 'Money-Back Guarantee',
    description: 'Risk-free experience. Not satisfied? Get a full refund, no stress.',
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const FacilitySection = () => {
    return (
        <section className="pb-20 bg-white lg:mt-[120px] xl:mt-[180px] lg:mb-[690px] xl:mb-[400px]">
            <div className="max-w-[1512px] mx-auto relative">
                <div>
                    <div className="bg-white hidden lg:flex justify-between relative">
                        <h2 className="absolute left-4 xl:left-15 top-[60px] z-10 text-[40px] xl:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-white max-w-[370px] xl:max-w-[430px] ">Everything You Need to Start, Nothing You Don’t</h2>
                        <Image
                            className="w-[550px] xl:w-[756px] absolute lg:right-2 xl:right-15 bottom-0 z-10"
                            url='/homepage/facility_section.png'
                            alt='Facility Section'
                            width={800}
                            height={600}
                        />
                        <div className="h-[350px] xl:h-[478px] w-full bg-[#5922DF] z-0 rounded-3xl"></div>
                    </div>
                    <div className="lg:hidden bg-[#5922DF] flex flex-col justify-center items-center font-bold px-[25px] pt-[25px] rounded-3xl gap-6">
                        <h2 className="text-[30px] leading-[38px] text-white text-center">Everything You Need to Start, Nothing You Don’t</h2>
                        <Image
                            className="sm:max-w-[450px]"
                            url='/homepage/facility_section.png'
                            alt='Facility Section'
                            width={800}
                            height={600}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-[16px] lg:px-[60px] gap-8 mt-[-100px] z-20 lg:absolute h-full">
                    {
                        features.map((feature,index)=>{
                            return (
                                <div className="border-1 bg-white border-gray-200 rounded-2xl p-8" key={index}>
                                    <Image
                                        className="w-[56px] mb-8"
                                        url={feature.icon}
                                        alt={feature.title}
                                        width={56}
                                        height={56}
                                    />
                                    <h3 className="text-[30px] leading-[38px] mb-2 font-medium">{feature.title}</h3>
                                    <p className="text-[16px] text-[#475467]">{feature.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default FacilitySection;