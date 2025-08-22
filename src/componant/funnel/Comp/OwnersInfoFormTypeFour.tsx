import React, { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries, manageTypes } from "../funnel.type";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";

const OwnersInfoFormTypeFour: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [formMethods, setFormMethods] = useState<any>(null);
    const [watchedValues, setWatchedValues] = useState<any>({});
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

    // Generate initial form data based on number of owners
    const generateInitialFormData = () => {
        const initialData: any = {
            who_manage: "member_manage",
        };

        for (let i = 1; i <= numberOfOwners; i++) {
            const ownerPrefix = `owner_${i}`;
            initialData[`${ownerPrefix}_name`] = `Owner ${i}`;
            initialData[`${ownerPrefix}_email`] = "demo@email.com";
            initialData[`${ownerPrefix}_mobile`] = "2345678901";
            initialData[`${ownerPrefix}_country`] = "us";
            initialData[`${ownerPrefix}_city`] = 'New York';
            initialData[`${ownerPrefix}_state`] = 'Manhattan';
            initialData[`${ownerPrefix}_zipCode`] = '22011';
            initialData[`${ownerPrefix}_streetAddress`] = '111, manhattan, new work';
        }

        return initialData;
    };

    useEffect(() => {
        if (formMethods) {
            formMethods.reset(generateInitialFormData());
        }
    }, [data, formMethods, numberOfOwners]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ OwnersInfo: data, isOwnersInfoComplete: true })
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);

        // Set up watchers for specific fields
        const subscription = methods.watch((value: any, { name, type }: any) => {
            setWatchedValues(value);
        });

        // Cleanup subscription when component unmounts or form changes
        return () => subscription.unsubscribe();
    };

    // Generate owner form fields dynamically
    const generateOwnerForm = (ownerNumber: number) => {
        const ownerPrefix = `owner_${ownerNumber}`;

        return (
            <React.Fragment key={`owner-${ownerNumber}`}>
                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">
                    Owner Info {ownerNumber.toString().padStart(2, '0')}
                </h2>

                <InputField
                    name={`${ownerPrefix}_name`}
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2"
                />

                <InputField
                    name={`${ownerPrefix}_email`}
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name={`${ownerPrefix}_mobile`}
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />

                <InputField
                    name={`${ownerPrefix}_country`}
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                />

                <InputField
                    name={`${ownerPrefix}_city`}
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name={`${ownerPrefix}_state`}
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />

                <InputField
                    name={`${ownerPrefix}_zipCode`}
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name={`${ownerPrefix}_streetAddress`}
                    label="Street Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                    className="lg:col-span-2"
                />
            </React.Fragment>
        );
    };

    // Generate owner options for manager selection
    const generateOwnerOptions = () => {
        const options = [];
        for (let i = 1; i <= numberOfOwners; i++) {
            const ownerName = watchedValues?.[`owner_${i}_name`] || `Owner ${i}`;
            options.push({ label: ownerName, value: ownerName });
        }
        return options;
    };

    return (
        <div className="max-w-[758px] mx-auto py-24">
            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
                defaultValues={generateInitialFormData()}
            >
                {/* Generate owner forms dynamically */}
                {Array.from({ length: numberOfOwners }, (_, index) => generateOwnerForm(index + 1))}

                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">Manage type</h2>

                <InputField
                    name="who_manage"
                    label="Who manage?"
                    type="select"
                    required
                    placeholder="Select Manage Type"
                    className={`lg:col-span-2`}
                    options={manageTypes}
                />

                {watchedValues?.who_manage === 'member_manage' && (
                    <InputField
                        name="owner_as_manager"
                        label="Select One of the Owner As a Manager"
                        type="select"
                        required
                        placeholder="Select Owner"
                        className="lg:col-span-2"
                        options={generateOwnerOptions()}
                    />
                )}

                {/* Manager Manage Section */}
                {watchedValues?.who_manage === 'manager_manage' && (
                    <>
                        <InputField
                            name="manager_name"
                            label="Name"
                            type="text"
                            required
                            placeholder="Enter Your Name"
                            className="lg:col-span-2"
                        />

                        <InputField
                            name="manager_email"
                            label="Email"
                            placeholder="Enter your email"
                            required
                            type="text"
                            className=''
                        />

                        <InputField
                            name="manager_mobile"
                            label="Mobile Number"
                            type="phone"
                            required
                            placeholder="Enter mobile number"
                        />

                        <InputField
                            name="manager_country"
                            label="Country"
                            type="select"
                            required
                            placeholder="Select Country"
                            className=""
                            options={countries}
                        />

                        <InputField
                            name="manager_city"
                            label="City"
                            type="text"
                            required
                            placeholder="Enter City"
                        />

                        <InputField
                            name="manager_state"
                            label="State"
                            type="text"
                            required
                            placeholder="Enter State"
                        />

                        <InputField
                            name="manager_zipCode"
                            label="Zip Code"
                            type="text"
                            required
                            placeholder="Enter Zip Code"
                        />

                        <InputField
                            name="manager_streetAddress"
                            label="Street Address"
                            type="text"
                            required
                            placeholder="Enter Street Address"
                            className="lg:col-span-2"
                        />
                    </>
                )}
            </ReusableForm>
        </div>
    );
};

export default OwnersInfoFormTypeFour;