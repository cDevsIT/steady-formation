'use client'
import React, { useState } from 'react';
import CompanyVerificationModal from './CompanyVerificationModal';

interface ServiceFeature {
  text: string;
  included: boolean;
}

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  price: string;
  renewalPrice?: string;
  buttonText: string;
  icon: string;
}

const serviceData: ServiceCardData[] = [
  {
    id: 'ein-letter',
    title: 'Employer Identification Number (EIN Letter)',
    description: 'Employer Identification Number (EIN Letter)',
    features: [
      { text: 'Employer Identification Number (EIN Letter)', included: true }
    ],
    price: 'Starting at $65',
    buttonText: 'Order Now',
    icon: '📄'
  },
  {
    id: 'stripe-consultation',
    title: 'Business Stripe Account Support Consultation',
    description: 'Business Stripe Account Support Consultation',
    features: [
      { text: 'Business Stripe Account Support Consultation', included: true }
    ],
    price: 'Starting at $99',
    buttonText: 'Order Now',
    icon: '💳'
  },
  {
    id: 'business-address',
    title: 'US Business Address',
    description: 'US Business Address',
    features: [
      { text: 'US Business Address', included: true }
    ],
    price: 'Starting at $99',
    renewalPrice: 'Renewal: $99/year',
    buttonText: 'Order Now',
    icon: '🏢'
  },
  {
    id: 'bank-account',
    title: 'Business Bank Account Setup',
    description: 'Professional assistance with opening your business bank account. We help you navigate requirements and connect with banking partners.',
    features: [
      { text: 'Bank Requirements Analysis', included: true },
      { text: 'Document Preparation Assistance', included: true },
      { text: 'Banking Partner Introductions', included: true },
      { text: 'Application Support & Guidance', included: true },
      { text: '+ 4 more features', included: false }
    ],
    price: 'Starting at $199',
    buttonText: 'Order Now',
    icon: '🏦'
  },
  {
    id: 'itin-application',
    title: 'ITIN Application Service',
    description: 'ITIN Application Service',
    features: [
      { text: 'Complete ITIN Application (Form W-7)', included: true },
      { text: 'Document Review & Verification', included: true },
      { text: 'IRS Submission & Tracking', included: true },
      { text: 'Status Updates via Email', included: true },
      { text: '+ 4 more features', included: false }
    ],
    price: 'Starting at $199',
    buttonText: 'Order Now',
    icon: '🆔'
  },
  {
    id: 'business-dissolution',
    title: 'Business Dissolution Service',
    description: 'Professional business dissolution and closure service to properly terminate your business entity and resolve obligations.',
    features: [
      { text: 'Dissolution Document Preparation', included: true },
      { text: 'State Filing & Processing', included: true },
      { text: 'Tax Closure Assistance', included: true },
      { text: 'Asset Distribution Planning', included: true },
      { text: '+ 4 more features', included: false }
    ],
    price: 'Starting at $399',
    buttonText: 'Order Now',
    icon: '📋'
  }
];

const ServiceCard: React.FC<{ service: ServiceCardData }> = ({ service }) => {
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
    // Here you would typically redirect to the formation packages page
    console.log('View formation packages');
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

const ServiceCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {serviceData.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceCardGrid;