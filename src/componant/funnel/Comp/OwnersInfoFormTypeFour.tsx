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
    const numberOfOwners = data?.numOfOwnerShip || 1;

    // Load initial data from localStorage
    useEffect(() => {
        let localStorageData = data;
        if (!data || Object.keys(data).length <= 1) {
            localStorageData = companyFormationService.getFromLocalStorage();
            console.log("Fallback - Loading directly from localStorage:", localStorageData);
        }
    }, []);

    const handleSubmit = (data: CustomFormData) => {
        if (!formMethods) return;
        const percentageKeys = Object.keys(data).filter((key) => /^owner_\d+_percentage$/.test(key));
        let hasInvalid = false;
        const values = percentageKeys.map((key) => {
            const num = parseFloat(String(data[key]));
            if (Number.isNaN(num)) {
                formMethods.setError(key, { type: 'manual', message: 'Enter a valid percentage' });
                hasInvalid = true;
            }
            return num || 0;
        });
        if (hasInvalid) return;
        const total = values.reduce((sum: number, val: number) => sum + val, 0);
        const roundedTotal = Math.round(total * 100) / 100;
        if (roundedTotal !== 100) {
            percentageKeys.forEach((key) => {
                formMethods.setError(key, { type: 'manual', message: `Total ownership must equal 100% (current ${roundedTotal}%)` });
            });
            return;
        }
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

    // Override owner form to include percentage field in type four as well
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
                    name={`${ownerPrefix}_percentage`}
                    label="Ownership Percentage"
                    type="number"
                    required
                    placeholder="Enter Ownership Percentage"
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

                <InputField
                    name={`${ownerPrefix}_scanned_passport_copy`}
                    label="Scanned Passport Copy"
                    type="file"
                    required
                />

                <InputField
                    name={`${ownerPrefix}_bank_statement`}
                    label="Local Bank Statement (last 3 months)"
                    type="file"
                    required
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