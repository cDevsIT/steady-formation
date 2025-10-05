'use client'
import companyFormationService from '@/lib/companyFormationService';
import { useRouter } from 'next/navigation';
import React from 'react';

const CallToAction: React.FC = () => {
  const router = useRouter();
  const handleSubmit = () => {
              // Clear any existing data and start fresh
              companyFormationService.clearLocalStorage();
      
              // Save initial data to localStorage
              companyFormationService.saveToLocalStorage({
                  currentStep: 1
              });
      
              router.push('/setup-company');
          };
  return (
    <section className="py-16 bg-[#7856FC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Business?
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of entrepreneurs who trust Steady Formation with their business needs.
        </p>
        
        {/* CTA Button */}
        <button onClick={handleSubmit} className="bg-white text-[#7856FC] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
          Get Started Today
        </button>
      </div>
    </section>
  );
};

export default CallToAction;