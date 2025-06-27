'use client';
import { useEffect, useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import { useRouter } from "next/navigation";
import FirstFunnel from "./FirstFunnel";
import Image from "../ui/Image";
import { CustomFormData } from "../ui/FormSample";
import ErrorPage from 'next/error';
import SecondFunnel from "./SecondFunnel";

export interface dataState {
    companyName?: string;
    currentStep?: number;
    stepOne?: {
        fullName?: string;
        email?: string;
        primaryPhone?: string;
        secondaryPhone?: string
    }

}

const Funnel = () => {
    const router = useRouter();
    const [data, setData] = useState<dataState>({});
    const [currentStep, setCurrentStep] = useState(2);
    const [totalSteps] = useState(6);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleChildSubmitSuccess = () => {
        setRefreshKey(prev => prev + 1); // triggers re-render
    };

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
            setCurrentStep(parsedData.currentStep || 1);
        }
    }, []);

    // Custom setter: updates localStorage and state
    const updateCompanyData = (newData: any) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        localStorage.setItem('companyData', JSON.stringify(updatedData));
    };

    const handleFormSubmit = (data: CustomFormData) => {
        updateCompanyData({ ...data, currentStep:currentStep+1})
            setCurrentStep(currentStep + 1)
            handleChildSubmitSuccess();
    
        };

    const handleBack = () => {
        if (currentStep > 1) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);
            updateCompanyData({ currentStep: newStep });
        } else {
            router.back();
        }
    };


    if (!data?.currentStep) {
        return <ErrorPage statusCode={404} />;
      }

    return (
        <section className=" bg-white pt-[65px] px-4" key={refreshKey}>
            <div className="max-w-[1512px] mx-auto">
                <ProgressBar
                    totalSteps={totalSteps}
                    currentStep={currentStep}
                    onBack={handleBack}
                    className="mt-2 max-w-[1280px] mx-auto mb-6"
                />

                {data?.currentStep === 1 &&
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4">

                        <FirstFunnel handleFormSubmit={handleFormSubmit} />
                        <Image
                            className="w-[565px] hidden lg:block"
                            url='/funnel/funnel_step.png'
                            alt='Funnel Page'
                            width={565}
                            height={719}
                        />
                    </div>
                }

                {data?.currentStep === 2 &&
                    <div className="max-w-[1280px] mx-auto ">

                        <SecondFunnel />
                    </div>
                }

            </div>
        </section>
    );


};

export default Funnel;