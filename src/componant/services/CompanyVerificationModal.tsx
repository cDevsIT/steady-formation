'use client'
import React from 'react';

interface CompanyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueWithService: () => void;
  onViewFormationPackages: () => void;
}

const CompanyVerificationModal: React.FC<CompanyVerificationModalProps> = ({
  isOpen,
  onClose,
  onContinueWithService,
  onViewFormationPackages
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-[#00000099] bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#7856FC] text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
              <span className="text-gray-600 text-xl">🏢</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Company Verification Required</h2>
              <p className="text-blue-100 mt-1">Let us know your business status to proceed</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Introductory Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              To access our premium business services, you must have an existing U.S. company. 
              Don&apos;t worry if you don&apos;t have one yet – we can help you form one!
            </p>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: I have a U.S. company */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-[#7856FC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✓</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  I have a U.S. company
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Perfect! You can proceed with ordering our services right away.
                </p>
                
                {/* Button */}
                <button 
                  onClick={onContinueWithService}
                  className="w-full bg-[#7856FC] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#6045cc] transition-colors duration-200"
                >
                  Continue with Service
                </button>
              </div>
            </div>

            {/* Right Card: I need to form a company */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏗️</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  I need to form a company
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  No problem! We&apos;ll help you form your U.S. company first.
                </p>
                
                {/* Button */}
                <button 
                  onClick={onViewFormationPackages}
                  className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                >
                  View Formation Packages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <span className="text-green-600 font-medium mb-2 sm:mb-0">
              Secure & Confidential Process
            </span>
            <span className="text-gray-500">
              Need help? <button className="text-blue-600 hover:text-blue-800 underline">Contact our experts</button>
            </span>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CompanyVerificationModal;