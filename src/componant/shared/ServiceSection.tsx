'use client';

import { useState } from 'react';
import Image from '../ui/Image';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

const services: Service[] = [
  {
    id: 'registered-agent',
    icon: '/icons/service_agent.svg',
    title: 'Trusted Registered Agent Service',
    description: 'Get a reliable, US-based registered agent that ensures your business stays compliant and operational.',
    bgColor: 'bg-[#F4F3FF]'
  },
  {
    id: 'ein-setup',
    icon: '/icons/service_ein_setup.svg',
    title: 'Fast & Easy EIN (Tax ID) Setup',
    description: 'Quickly secure your business tax ID with our streamlined EIN application process.',
    bgColor: 'bg-[#ECFDFF]'
  },
  {
    id: 'operating-agreement',
    icon: '/icons/service_agreement.svg',
    title: 'Custom Operating Agreement',
    description: 'Protect your LLC with a tailored operating agreement that defines ownership and operations.',
    bgColor: 'bg-[#FEFBE8]'
  },
  {
    id: 'company-registration',
    icon: '/icons/service_regestration.svg',
    title: 'Free U.S. Company Registration',
    description: 'Start your business in the US with our comprehensive registration service at no extra cost.',
    bgColor: 'bg-[#EDFCF2]'
  },
  {
    id: 'business-address',
    icon: '/icons/service_address.svg',
    title: 'Prestigious U.S. Business Address',
    description: 'Establish credibility with a world-class business address in prime US locations.',
    bgColor: 'bg-[#EFF4FF]'
  },
  {
    id: 'expedite-filing',
    icon: '/icons/service_filing_delivery.svg',
    title: 'Expedite Filing Service',
    description: 'Accelerate your business formation with our expedited filing service for faster processing.',
    bgColor: 'bg-[#FDF2FA]'
  }
];

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="pb-20 bg-white">
      <div className="max-w-[1512px] mx-auto">
        {/* Header */}
        <div className="text-center rounded-xl lg:rounded-3xl pt-13 pb-50 px-[38px] md:px-[150px] lg:px-[200px] bg-[#F2F4F7]">
          <h2 className="text-[27px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6 ">
            All-in-One Formation Services 
            Designed for U.S Resident Founders
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-3 lg:px-15 mt-[-170px]">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isHovered = hoveredService === service.id;

            return (
              <article
                key={service.id}
                className={`
                  bg-white rounded-2xl p-3 lg:p-8 shadow-sm hover:shadow-md 
                  transition-all duration-300 transform hover:-translate-y-2
                  border border-gray-100 group cursor-pointer text-center
                  ${isHovered ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
                `}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon */}
                <div className={`flex items-center justify-center py-8 rounded-xl mb-6 mx-autotransition-transform duration-300 ${service.bgColor}`}>
                    <Image
                        className="w-[183px]"
                        url={service.icon}
                        alt={service.title}
                        width={200}
                        height={200}
                    />
                </div>

                {/* Title */}
                <h3 className="text-[24px] lg:text-[30px] leading-[32px] lg:leading-[38px] font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[16px] text-gray-600 leading-[24px]">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}