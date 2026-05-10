'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CompanyVerificationModal from './CompanyVerificationModal';
import companyFormationService from '@/lib/companyFormationService';

interface ServiceFeature {
  text: string;
  included: boolean;
}

export interface ServiceCardData {
  id: string | number;
  title: string;
  description: string;
  features: ServiceFeature[];
  price: string;
  renewalPrice?: string;
  buttonText: string;
  icon: string;
}

const ServiceCard: React.FC<{ service: ServiceCardData }> = ({ service }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderNow = () => {
    setIsModalOpen(true);
  };

  const handleContinueWithService = () => {
    setIsModalOpen(false);
    // Here you would typically redirect to the service ordering page
    console.log('Continue with service:', service.id);
  };

  const handleViewFormationPackages = () => {
    setIsModalOpen(false);
    // Drop the visitor into the formation funnel at step 1 (FirstFunnel),
    // where they enter the company name — same entry point as the home page flow.
    companyFormationService.saveToLocalStorage({ currentStep: 1 });
    router.push('/setup-company');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 bg-[#7856FC] rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto">
          {service.icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-center text-sm leading-relaxed">
          {service.description}
        </p>
        
        {/* Features */}
        <ul className="space-y-2 mb-6 flex-grow">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <span className="text-green-500 mr-2 mt-0.5">✓</span>
              ) : (
                <span className="text-gray-400 mr-2 mt-0.5">•</span>
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        {/* Price */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-[#7856FC]">
            {service.price}
          </div>
          {service.renewalPrice && (
            <div className="text-sm text-gray-500 mt-1">
              {service.renewalPrice}
            </div>
          )}
        </div>
        
        {/* Button */}
        <button 
          onClick={handleOrderNow}
          className="w-full bg-[#7856FC] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#654acf] transition-colors duration-200 mt-auto"
        >
          {service.buttonText}
        </button>
      </div>

      {/* Modal */}
      <CompanyVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinueWithService={handleContinueWithService}
        onViewFormationPackages={handleViewFormationPackages}
      />
    </>
  );
};

const ServiceCardGrid: React.FC<{ services: ServiceCardData[] }> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceCardGrid;