import React from 'react';

interface WhyChooseFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const whyChooseData: WhyChooseFeature[] = [
  {
    id: 'fast-efficient',
    title: 'Fast & Efficient',
    description: 'Most formations completed within 24-48 hours. Same-day EIN processing available. Get your business up and running quickly without sacrificing accuracy.',
    icon: '⚡'
  },
  {
    id: 'accuracy-guarantee',
    title: '100% Accuracy Guarantee',
    description: 'Our expert team reviews every document before submission. If we make an error, we\'ll fix it for free and cover any additional state fees.',
    icon: '🛡️'
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent Pricing',
    description: 'No hidden fees or surprise charges. Clear, upfront pricing with detailed breakdowns of all costs including state fees and optional services.',
    icon: '💰'
  },
  {
    id: 'expert-support',
    title: 'Expert Support',
    description: 'Real people, real help. Our knowledgeable support team is available by phone, email, and chat to answer your questions every step of the way.',
    icon: '🎧'
  },
  {
    id: 'secure-confidential',
    title: 'Secure & Confidential',
    description: 'Bank-level security protects your sensitive information. All data is encrypted and stored securely with regular security audits and compliance monitoring.',
    icon: '🔒'
  },
  {
    id: 'ongoing-resources',
    title: 'Ongoing Resources',
    description: 'Access to business guides, compliance calendars, and educational resources. We support your success beyond formation with valuable tools and insights.',
    icon: '📚'
  }
];

const WhyChooseFeature: React.FC<{ feature: WhyChooseFeature }> = ({ feature }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Icon */}
      <div className="text-4xl mb-4">
        {feature.icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {feature.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

const WhyChoose: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Expedite Formation?
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We combine expertise, technology, and personalized service to deliver exceptional results for your business formation needs.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((feature) => (
            <WhyChooseFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;