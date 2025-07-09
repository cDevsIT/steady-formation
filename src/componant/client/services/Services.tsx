import Image from '@/componant/ui/Image';
import Link from 'next/link';

const servicesData = [
    {
        icon: '/client/service_one.svg',
        name: 'New Registered agent',
        description: 'Get a New Registered Agent for just $99 with a trusted U.S. business address.',
        price: '$99',
        oldPrice: '$199',
        route: '/client/services/new-registered-agent',
    },
    {
        icon: '/client/service_two.svg',
        name: 'Transfer Register Agent',
        description: 'Transfer your Registered Agent to us for just $45 with full filing support.',
        price: '$45',
        oldPrice: '$145',
        route: '/client/services/transfer-register-agent',
    },
    {
        icon: '/client/service_three.svg',
        name: 'U.S. Business Address',
        description: 'Receive a professional U.S. mailing address for your company.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/us-business-address',
    },
    {
        icon: '/client/service_four.svg',
        name: 'EIN (Tax ID) Application',
        description: 'We handle your Employer Identification Number (EIN) application.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/ein-application',
    },
    {
        icon: '/client/service_five.svg',
        name: 'Operating Agreement Drafting',
        description: 'Professionally drafted Operating Agreement to streamline operations.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/operating-agreement',
    },
    {
        icon: '/client/service_six.svg',
        name: 'ITIN ( Individual Tax Identification Number)',
        description: 'Speed up your business registration with our expedited service.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/itin',
    },
    {
        icon: '/client/service_seven.svg',
        name: 'Annual Compliance Assistance',
        description: 'Stay in good standing with help on annual reports and filings.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/annual-compliance',
    },
    {
        icon: '/client/service_eight.svg',
        name: 'Certificate of Good Standing',
        description: 'Get an official certificate verifying your business status.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/good-standing',
    },
    {
        icon: '/client/service_nine.svg',
        name: 'Banking Assistance',
        description: 'Guidance on opening a U.S. bank account as a non-resident.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/banking-assistance',
    },
    {
        icon: '/client/service_ten.svg',
        name: 'Virtual Office & Mail Scanning',
        description: 'Forwarding and scanning service for your U.S. business mail.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/virtual-office',
    },
];

const Services = () => {
    return (
        <div className="bg-white rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold px-6 py-3 border-b border-gray-200 ">Service</h2>
            <div className="flex flex-col gap-2 divide-y divide-gray-200">
                {servicesData.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-6 py-2">
                        <div className="flex items-center gap-4">
                            <Image url={service.icon.replace('/public', '/')} alt={service.name} className="w-8 h-8" />
                            <div>
                                <div className="font-medium text-sm flex items-center gap-2">
                                    {service.name}
                                </div>
                                <div className="text-gray-600 text-[12px]">{service.description}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap10 w-[35%]">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-black">{service.price}</span>
                                <span className="text-gray-400 line-through text-sm">{service.oldPrice}</span>
                            </div>
                            <Link href={service.route}>
                                <button className="border border-gray-200 bg-white text-[#7856FC] hover:text-white px-5 py-2 rounded-lg font-bold hover:bg-purple-700 text-sm transition">Buy Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;