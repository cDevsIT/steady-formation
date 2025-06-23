'use client';
import { useState } from "react";
import ProgressBar from "../ui/ProgressBar";

const Funnel = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(6);
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };
    return (
        <section className=" bg-white pt-[65px] px-4">
            <div className="max-w-[1512px] mx-auto">
                <ProgressBar
                    totalSteps={totalSteps}
                    currentStep={currentStep}
                    onBack={handleBack}
                    className="mt-2"
                />
            </div>
        </section>
    );
};

export default Funnel;