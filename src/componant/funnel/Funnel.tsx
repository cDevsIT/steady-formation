'use client';
import { useEffect, useState } from "react";
import ProgressBar from "../ui/ProgressBar";
import { useRouter } from "next/navigation";
import FirstFunnel from "./FirstFunnel";
import Image from "../ui/Image";
import { CustomFormData } from "../ui/FormSample";
import ErrorPage from 'next/error';
import SecondFunnel from "./SecondFunnel";
import FunnelSidebar from "./Comp/FunnelSidebar";
import ThirdFunnel from "./ThirdFunnel";
import FourthFunnel from "./FourthFunnel";
import FifthFunnel from "./FifthFunnel";
import SixthFunnel from "./SixthFunnel";
import EightFunnel from "./EightFunnel";
import SeventhFunnel from "./SeventhFunnel";
import NinthFunnel from "./NinthFunnel";
import RegisterConfirm from "./RegisterConfirm";
import OwnersInfo from "./OwnersInfo";
import OwnersInfoComplete from "./OwnersInfoComplete";
import FirstFunnelSidebar from "./Comp/FirstFunnelSidebar";
import companyFormationService, { CompanyFormationData } from "@/lib/companyFormationService";

export interface dataState {
    businessType?: string;
    companyName?: string;
    currentStep?: number;
    isPaymentComplete?: boolean;
    registrationConfrim?: boolean;
    isOwnersInfoComplete?: boolean;
    stepOne?: {
        fullName?: string;
        email?: string;
        primaryPhone?: string;
        secondaryPhone?: string
    };
    stepTwo?: {
        industryType?: string;
        llcType?: string;
        stateName?: string;
    };

}

const Funnel = () => {
    const router = useRouter();
    const [data, setData] = useState<CompanyFormationData>({ currentStep: 1 });
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps] = useState(9);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleChildSubmitSuccess = () => {
        setRefreshKey(prev => prev + 1); // triggers re-render
    };

    // Load initial data from localStorage
    useEffect(() => {
        const localData = companyFormationService.getFromLocalStorage();
        
        // If we have data but no currentStep, or if we're at step 1, reset to fresh state
        if (localData && (!localData.currentStep || localData.currentStep === 1)) {
            // Only load basic data for step 1, clear any completion flags
            const freshData = {
                businessType: localData.businessType,
                companyName: localData.companyName,
                currentStep: 1
            };
            setData(freshData);
            setCurrentStep(1);
            // Update localStorage with clean state
            companyFormationService.saveToLocalStorage(freshData);
        } else {
            setData(localData);
            setCurrentStep(localData.currentStep || 1);
        }
    }, []);

    // Custom setter: updates localStorage and state
    const updateCompanyData = (newData: Partial<CompanyFormationData>) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        companyFormationService.saveToLocalStorage(updatedData);
    };

    const handleFormSubmit = (formData: CustomFormData) => {
        updateCompanyData({ ...formData, currentStep: currentStep + 1 });
        setCurrentStep(currentStep + 1);
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

    const handleStartOver = () => {
        // Clear all data and redirect to home
        companyFormationService.clearLocalStorage();
        router.push('/');
    };


    if (!data?.currentStep) {
        return <ErrorPage statusCode={404} />;
    }

    if (data?.isOwnersInfoComplete) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <OwnersInfoComplete />
            </div>
        </section>;
    }

    if (data?.registrationConfrim) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <OwnersInfo handleFormSubmit={handleFormSubmit} />
            </div>
        </section>;
    }

    if (data?.isPaymentComplete) {
        return <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">
                <RegisterConfirm handleFormSubmit={handleFormSubmit} />
            </div>
        </section>;
    }

    return (
        <section className=" bg-white pt-[70px] px-4" key={refreshKey}>
            <div className="max-w-[980px] lg:max-w-[1100px] xl:max-w-[1280px] mx-auto">

                {data?.currentStep < 9 &&
                    <ProgressBar
                        totalSteps={totalSteps}
                        currentStep={currentStep}
                        onBack={handleBack}
                        onStartOver={handleStartOver}
                        className="mt-2 mb-6"
                    />}


                {data?.currentStep === 1 &&
                    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4">

                        <FirstFunnel handleFormSubmit={handleFormSubmit} />
                        <FirstFunnelSidebar/>
                    </div>
                }

                {data?.currentStep !== 1 &&
                    <div className="flex justify-between gap-4 ">

                        {data?.currentStep === 2 && <SecondFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 3 && <ThirdFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 4 && <FourthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 5 && <FifthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 6 && <SixthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 7 && <SeventhFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 8 && <EightFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep === 9 && <NinthFunnel handleFormSubmit={handleFormSubmit} />}

                        {data?.currentStep < 9 && <FunnelSidebar />}

                    </div>
                }

            </div>
        </section>
    );


};

export default Funnel;