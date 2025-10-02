import React, { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries } from "../funnel.type";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";

const OwnersInfoFormTypeThree: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [formMethods, setFormMethods] = useState<any>(null);
    const data = useCompanyFormationData();
    const numberOfOwners = data?.businessDetails?.number_of_ownership || 1;

    // Load initial data from localStorage
    useEffect(() => {
        let localStorageData = data;
        if (!data || Object.keys(data).length <= 1) {
            localStorageData = companyFormationService.getFromLocalStorage();
            console.log("Fallback - Loading directly from localStorage:", localStorageData);
        }
    }, []);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ OwnersInfo: data, isOwnersInfoComplete: true })
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    // Generate director form fields dynamically
    const generateDirectorForm = (directorNumber: number) => {
        const directorPrefix = `director_${directorNumber}`;

        return (
            <React.Fragment key={`director-${directorNumber}`}>
                <div className="lg:col-span-2">
                    <h2 className="text-[30px] font-semibold text-black">
                        Director Info {directorNumber}
                    </h2>
                    <p className="text-base font-normal text-gray-600">One of the director must be US resident</p>
                </div>

                <InputField
                    name={`${directorPrefix}_name`}
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2"
                />

                <InputField
                    name={`${directorPrefix}_email`}
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name={`${directorPrefix}_mobile`}
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />

                <InputField
                    name={`${directorPrefix}_country`}
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                    belowText='One of director must be from USA'
                />

                <InputField
                    name={`${directorPrefix}_city`}
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name={`${directorPrefix}_state`}
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />

                <InputField
                    name={`${directorPrefix}_zipCode`}
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name={`${directorPrefix}_streetAddress`}
                    label="Street Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                    className="lg:col-span-2"
                />

                <InputField
                    name={`${directorPrefix}_scanned_passport_copy`}
                    label="Scanned Passport Copy"
                    type="file"
                    required
                />

                <InputField
                    name={`${directorPrefix}_bank_statement`}
                    label="Local Bank Statement (last 3 months)"
                    type="file"
                    required
                />
            </React.Fragment>
        );
    };

    return (
        <div className="max-w-[758px] mx-auto py-24">
            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                {/* Generate director forms dynamically */}
                {Array.from({ length: numberOfOwners }, (_, index) => generateDirectorForm(index + 1))}
            </ReusableForm>
        </div>
    );
};

export default OwnersInfoFormTypeThree;