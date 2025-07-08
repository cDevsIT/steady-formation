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

const OwnersInfo: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [data, setData] = useState<dataState>({});

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
        }
    }, []);
    const singleLLc = data?.businessType === 'llc' && data?.stepTwo?.llcType === 'singleLLC'

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