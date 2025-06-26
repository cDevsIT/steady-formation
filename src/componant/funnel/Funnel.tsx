'use client';
import { useEffect, useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import { useRouter } from "next/navigation";
import FirstFunnel from "./FirstFunnel";

const Funnel = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(6);

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
            setCurrentStep(parsedData.step || 1);
        }
    }, []);

    // Custom setter: updates localStorage and state
    const updateCompanyData = (newData: any) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        localStorage.setItem('companyData', JSON.stringify(updatedData));
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            updateCompanyData({ step: newStep });
        } else {
            router.back();
        }
    };
    return (
        <section className=" bg-white pt-[65px] px-4">
            <div className="max-w-[1512px] mx-auto">
                <ProgressBar
                    totalSteps={totalSteps}
                    currentStep={currentStep}
                    onBack={handleBack}
                    className="mt-2 max-w-[1280px] mx-auto mb-6"
                />
                <div className="max-w-[1280px] mx-auto">
                    <FirstFunnel />
                </div>
            </div>
        </section>
    );
};

export default Funnel;