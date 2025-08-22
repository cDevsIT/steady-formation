import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { countries } from "./funnel.type";
import OwnersInfoFormTypeOne from "./Comp/OwnersInfoFormTypeOne";
import OwnersInfoFormTypeTwo from "./Comp/OwnersInfoFormTypeTwo";
import OwnersInfoFormTypeThree from "./Comp/OwnersInfoFormTypeThree";
import OwnersInfoFormTypeFour from "./Comp/OwnersInfoFormTypeFour";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";

const OwnersInfo: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const data = useCompanyFormationData();

    // Load initial data from localStorage
    useEffect(() => {
        let localStorageData = data;
        if (!data || Object.keys(data).length <= 1) {
            localStorageData = companyFormationService.getFromLocalStorage();
            console.log("Fallback - Loading directly from localStorage:", localStorageData);
        }
    }, []);
    const singleLLc = data?.businessType === 'llc' && data?.businessDetails?.llcType === 'singleLLC'

    const singleCorp = data?.businessType === 's_corp'

    const directorInfo = data?.businessType === 'non_profit'

    return (
        <div className="">

            {singleLLc && <OwnersInfoFormTypeOne handleFormSubmit={handleFormSubmit} />}

            {directorInfo && <OwnersInfoFormTypeThree handleFormSubmit={handleFormSubmit} />}

            {singleCorp && <OwnersInfoFormTypeFour handleFormSubmit={handleFormSubmit} />}

            {!singleLLc && !directorInfo && !singleCorp && <OwnersInfoFormTypeTwo handleFormSubmit={handleFormSubmit} />}


        </div>
    );
};

export default OwnersInfo;