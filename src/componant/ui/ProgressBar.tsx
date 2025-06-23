import React from 'react';
import Image from './Image';

interface ProgressBarProps {
    totalSteps: number;
    currentStep: number;
    onBack?: () => void;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    totalSteps,
    currentStep,
    onBack,
    className = ''
}) => {
    // Calculate progress percentage
    const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100);

    // Ensure currentStep is within bounds
    const safeCurrentStep = Math.max(1, Math.min(currentStep, totalSteps));

    return (
        <div className={`w-full ${className}`}>
            {/* Header with back button and step counter */}
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={onBack}
                    className="cursor-pointer flex items-center justify-center gap-2"
                    aria-label="Go back"
                >

                    <Image
                        className="w-full"
                        url="/icons/arrow_left_two.svg"
                        alt="Arrow Left"
                        width={5}
                        height={10}
                    />
                    <span className='text-[16px] font-medium'>Back</span>
                </button>

                <span className="text-[12px] font-medium text-gray-600 hidden lg:block">
                    Step {safeCurrentStep} of {totalSteps}
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative">
                {/* Background track */}
                <div className="w-full h-3 p-1 bg-[#F2F4F7] rounded-full overflow-hidden shadow-inner">
                    {/* Progress fill */}
                    <div
                        className="h-full bg-[#7856FC] rounded-full transition-all duration-700 ease-out shadow-sm"
                        style={{ width: `${progressPercentage}%` }}
                    >
                        {/* Animated shine effect */}
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                </div>

                {/* Step indicators */}
                <div className="hidden justify-between mt-4">
                    {Array.from({ length: totalSteps }, (_, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber <= currentStep;
                        const isCurrent = stepNumber === currentStep;

                        return (
                            <div
                                key={stepNumber}
                                className="flex flex-col items-center"
                            >
                                {/* Step circle */}
                                <div
                                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2
                    ${isCompleted
                                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent shadow-lg'
                                            : isCurrent
                                                ? 'bg-white text-blue-600 border-blue-500 shadow-md'
                                                : 'bg-gray-100 text-gray-400 border-gray-200'
                                        }
                    ${isCurrent ? 'scale-110' : 'scale-100'}
                  `}
                                >
                                    {isCompleted && stepNumber < currentStep ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>

                                {/* Step label */}
                                <div className={`mt-2 text-xs font-medium transition-colors duration-300 ${isCompleted ? 'text-gray-700' : isCurrent ? 'text-blue-600' : 'text-gray-400'
                                    }`}>
                                    Step {stepNumber}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Progress percentage display */}
            <div className="hidden mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                    <div className="text-sm font-semibold text-gray-700">
                        Progress: <span className="text-blue-600">{Math.round(progressPercentage)}%</span>
                    </div>
                </div>
            </div>

            <div className='mx-auto flex lg:hidden justify-center mt-1'>
                <span className="text-[12px] font-medium text-gray-600">
                    Step {safeCurrentStep} of {totalSteps}
                </span>
            </div>

        </div>
    );
};

export default ProgressBar;