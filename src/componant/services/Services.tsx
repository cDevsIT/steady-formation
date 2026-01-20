import React from 'react';
import ServiceCardGrid from './ServiceCard';
import ProcessSteps from './ProcessSteps';
import WhyChoose from './WhyChoose';
import CallToAction from './CallToAction';

const Services = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Service Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCardGrid />
        </div>
      </section>

      {/* Process Steps Section */}
      <ProcessSteps />

      {/* Why Choose Section */}
      <WhyChoose />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Services;