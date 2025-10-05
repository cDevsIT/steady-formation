import React from 'react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

const processStepsData: ProcessStep[] = [
  {
    id: 1,
    title: 'Choose Your Service',
    description: 'Select the business formation package that best fits your needs. Our experts are available to help you choose the right entity type and structure.'
  },
  {
    id: 2,
    title: 'Complete Your Application',
    description: 'Fill out our simple online questionnaire with your business information. Our secure platform guides you through each step with helpful tips and explanations.'
  },
  {
    id: 3,
    title: 'We Handle the Filing',
    description: 'Our team prepares and submits all required documents to the appropriate government agencies. We monitor the progress and keep you updated throughout the process.'
  },
  {
    id: 4,
    title: 'Receive Your Documents',
    description: 'Get your official formation documents, EIN confirmation, and corporate kit. We provide everything you need to start operating your business legally.'
  }
];

const ProcessStep: React.FC<{ step: ProcessStep }> = ({ step }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Step Number Circle */}
      <div className="w-16 h-16 bg-[#7856FC] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
        {step.id}
      </div>
      
      {/* Step Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {step.title}
      </h3>
      
      {/* Step Description */}
      <p className="text-gray-600 leading-relaxed max-w-sm">
        {step.description}
      </p>
    </div>
  );
};

const ProcessSteps: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Simple 4-Step Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From consultation to completion, we make business formation straightforward and stress-free.
          </p>
        </div>
        
        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processStepsData.map((step) => (
            <ProcessStep key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;