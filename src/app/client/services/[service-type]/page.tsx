import { notFound } from 'next/navigation';
import Image from '@/componant/ui/Image';
import Link from 'next/link';
import ITIN from '@/componant/client/services/service/ITIN';
import TransferRegisterAgent from '@/componant/client/services/service/TransferRegisterAgent';
import EIN from '@/componant/client/services/service/EIN';
// Example component imports (these would be real imports in a real app)
// import NewRegisteredAgent from '@/componant/client/services/NewRegisteredAgent';
// import TransferRegisterAgent from '@/componant/client/services/TransferRegisterAgent';
// ...etc

const servicesData = [
    {
        icon: '/client/service_one.svg',
        name: 'New Registered agent',
        description: 'Get a New Registered Agent for just $99 with a trusted U.S. business address.',
        price: '$99',
        oldPrice: '$199',
        route: '/client/services/new-registered-agent',
        slug: 'new-registered-agent',
    },
    {
        icon: '/client/service_two.svg',
        name: 'Transfer Register Agent',
        description: 'Transfer your Registered Agent to us for just $45 with full filing support.',
        price: '$45',
        oldPrice: '$145',
        route: '/client/services/transfer-register-agent',
        slug: 'transfer-register-agent',
    },
    {
        icon: '/client/service_three.svg',
        name: 'U.S. Business Address',
        description: 'Receive a professional U.S. mailing address for your company.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/us-business-address',
        slug: 'us-business-address',
    },
    {
        icon: '/client/service_four.svg',
        name: 'EIN (Tax ID) Application',
        description: 'We handle your Employer Identification Number (EIN) application.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/ein-application',
        slug: 'ein-application',
    },
    {
        icon: '/client/service_five.svg',
        name: 'Operating Agreement Drafting',
        description: 'Professionally drafted Operating Agreement to streamline operations.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/operating-agreement',
        slug: 'operating-agreement',
    },
    {
        icon: '/client/service_six.svg',
        name: 'ITIN ( Individual Tax Identification Number)',
        description: 'Speed up your business registration with our expedited service.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/itin',
        slug: 'itin',
    },
    {
        icon: '/client/service_seven.svg',
        name: 'Annual Compliance Assistance',
        description: 'Stay in good standing with help on annual reports and filings.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/annual-compliance',
        slug: 'annual-compliance',
    },
    {
        icon: '/client/service_eight.svg',
        name: 'Certificate of Good Standing',
        description: 'Get an official certificate verifying your business status.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/good-standing',
        slug: 'good-standing',
    },
    {
        icon: '/client/service_nine.svg',
        name: 'Banking Assistance',
        description: 'Guidance on opening a U.S. bank account as a non-resident.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/banking-assistance',
        slug: 'banking-assistance',
    },
    {
        icon: '/client/service_ten.svg',
        name: 'Virtual Office & Mail Scanning',
        description: 'Forwarding and scanning service for your U.S. business mail.',
        price: '$444',
        oldPrice: '$599',
        route: '/client/services/virtual-office',
        slug: 'virtual-office',
    },
];

interface Props {
    params: Promise<{ 'service-type': string }>;
}

const serviceComponentMap: Record<string, React.ReactNode> = {
    'new-registered-agent': <div>NewRegisteredAgent Component Rendered Here</div>,
    'transfer-register-agent': <TransferRegisterAgent />,
    'us-business-address': <div>USBusinessAddress Component Rendered Here</div>,
    'ein-application': <EIN />,
    'operating-agreement': <div>OperatingAgreement Component Rendered Here</div>,
    'itin': <ITIN />,
    'annual-compliance': <div>AnnualCompliance Component Rendered Here</div>,
    'good-standing': <div>GoodStanding Component Rendered Here</div>,
    'banking-assistance': <div>BankingAssistance Component Rendered Here</div>,
    'virtual-office': <div>VirtualOffice Component Rendered Here</div>,
};

const Page = async ({ params }: Props) => {
    const resolvedParams = await params;
    const service = servicesData.find(
        (s) => s.slug === resolvedParams['service-type']
    );
    if (!service) {
        notFound();
    }
    const ServiceComponent = serviceComponentMap[service.slug] || <div>Component not found</div>;
    return (
        <div className="">
            
            {ServiceComponent}
        </div>
    );
};

export default Page;