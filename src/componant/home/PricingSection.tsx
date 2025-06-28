
import Button from '../ui/Button';
import Image from '../ui/Image';

const businessStructures = [
    {
        id: 'c-corp',
        title: 'C Corp',
        subtitle: 'Structured for Growth, Investment, and Scalability',
        description: 'Ideal for startups planning to raise capital, issue shares, or go public, with strong legal protection and flexibility.',
        features: [
            'Unlimited owners (members) allowed',
            'Board of directors required',
            'Allows strong protection for personal assets',
            'Subject to double taxation(profits taxed at both corporate & shareholder levels)',
            'Best for raising venture capital and issuing stock',
            'Long-term existence (Perpetual)',
            'Suitable for going public'
        ],
        highlighted: false,
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200'
    },
    {
        id: 'llc',
        title: 'LLC',
        subtitle: 'Flexible, Simple, and Perfect for Solo Founders',
        description: 'Enjoy full control and personal asset protection while keeping your paperwork and taxes simple.',
        features: [
            'Unlimited owners (members) allowed',
            'No board of directors required',
            'Shields personal assets from business liabilities',
            'Pass-through taxation — profits taxed once at owner level',
            'Elect to be taxed as S Corp, C Corp, or partnership',
            'Long-term existence (Perpetual)',
            'Not suitable for going public'
        ],
        highlighted: true,
        bgColor: 'bg-gradient-to-br from-blue-600 to-purple-700',
        borderColor: 'border-blue-600'
    },
    {
        id: 's-corp',
        title: 'S Corp',
        subtitle: 'Tax-Smart Structure for U.S. Residents | Must be U.S. Citizens/Residents',
        description: 'Designed for small to medium-sized U.S.-based businesses looking for tax efficiency while still enjoying liability protection.',
        features: [
            'Up to 100 shareholders',
            'Board of directors required',
            'Shields personal assets from business debts',
            'Pass-through taxation—no corporate tax, income taxed at individual level',
            'S Corp Can only issue one class of stock',
            'IRS filing keeps S Corp status',
            'Not ideal for raising venture capital or going public'
        ],
        highlighted: false,
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200'
    }
];

export default function PricingSection() {
    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1280px] mx-auto">
                {/* Header */}
                <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center max-w-[807px] mx-auto">
                    Find the Right Business Structure for Your Success
                </h2>

                {/* Business Structure Cards */}
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
                    {businessStructures.map((structure) => (
                        <div
                            key={structure.id}
                            className={`
                                relative rounded-2xl p-4 transition-all duration-300 hover:scale-105 ${structure.highlighted && 'shadow-xl'} bg-white border-2 border-gray-200 flex flex-col justify-between`}
                        >

                            {/* Card Header */}
                            <div className={`${structure.highlighted ? 'bg-primary' : 'bg-[#F4F3FF]'} p-8 rounded-xl`}>
                                <h2 className={`text-[30px] lg:text-[36px] font-bold mb-3 ${structure.highlighted ? 'text-white' : 'text-black'}`}>
                                    {structure.title}
                                </h2>
                                <h3 className={`text-[16px] font-medium mb-2 ${structure.highlighted ? 'text-white' : 'text-black'}`}>
                                    {structure.subtitle}
                                </h3>
                                <p className={`text-[16px] leading-relaxed font-normal ${structure.highlighted ? 'text-white' : 'text-[#475467]'}`}>
                                    {structure.description}
                                </p>
                            </div>

                            {/* Features List */}
                            <div className="mb-8">
                                <h4 className={`text-lg font-semibold p-4 text-black`}>
                                    Features included:
                                </h4>
                                <ul className="space-y-2 px-4">
                                    {structure.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Image
                                                className="w-[20px]"
                                                url='/icons/check-circle.svg'
                                                alt='Check'
                                                width={20}
                                                height={20}
                                            />
                                            <span className={`text-[16px] leading-relaxed text-black`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <Button className='w-full' theme={`${structure.highlighted ? 'primary' : 'secondary'}`}>Start with $0 Cost</Button>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 text-center flex justify-between items-center">
                    <p className="text-gray-600 max-w-[314px] text-start font-bold">
                        👉 Still unsure which structure fits your business best?
                    </p>
                    <Button >Talk to a Business Advisor</Button>
                </div>
            </div>
        </section>
    );
}