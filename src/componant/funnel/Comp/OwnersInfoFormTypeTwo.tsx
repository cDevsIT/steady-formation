import React, { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries, manageTypes } from "../funnel.type";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";
import ownerDocumentsService from "@/services/ownerDocumentsService";

const OwnersInfoFormTypeTwo: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
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


    const handleSubmit = async (data: CustomFormData) => {
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

        // Transform owner data to multi_member_info format
        const multiMemberInfo = [];
        for (let i = 1; i <= numberOfOwners; i++) {
            const ownerPrefix = `owner_${i}`;
            multiMemberInfo.push({
                name: data[`${ownerPrefix}_name`] as string,
                email: data[`${ownerPrefix}_email`] as string,
                phone: data[`${ownerPrefix}_mobile`] as string,
                ownership_percentage: parseFloat(String(data[`${ownerPrefix}_percentage`])),
                street_address: data[`${ownerPrefix}_streetAddress`] as string,
                city: data[`${ownerPrefix}_city`] as string,
                state: data[`${ownerPrefix}_state`] as string,
                zip_code: data[`${ownerPrefix}_zipCode`] as string,
                country: data[`${ownerPrefix}_country`] as string,
            });
        }

        // Update localStorage with owner data
        const currentData = companyFormationService.getFromLocalStorage();
        companyFormationService.saveToLocalStorage({
            ...currentData,
            businessDetails: {
                industryType: currentData.businessDetails?.industryType || '',
                stateName: currentData.businessDetails?.stateName || '',
                number_of_ownership: currentData.businessDetails?.number_of_ownership || multiMemberInfo.length,
                ...currentData.businessDetails,
                multi_member_info: multiMemberInfo
            }
        });

        // Call API to create owners in the database
        const companyId = currentData.company_id;
        if (companyId) {
            try {
                const response = await ownerDocumentsService.storeOwners(companyId, multiMemberInfo);
                if (response.status === 'success') {
                    console.log('Owners created successfully:', response.data);
                    
                    // Upload documents for each owner if files are provided
                    const ownerIds = response.data?.owner_ids || [];
                    for (let i = 0; i < ownerIds.length; i++) {
                        const ownerPrefix = `owner_${i + 1}`;
                        const passportFile = data[`${ownerPrefix}_scanned_passport_copy`];
                        const bankFile = data[`${ownerPrefix}_bank_statement`];
                        
                        if ((passportFile instanceof File) || (bankFile instanceof File)) {
                            try {
                                const files: { scanned_passport_copy?: File; bank_statement?: File } = {};
                                
                                if (passportFile instanceof File) {
                                    files.scanned_passport_copy = passportFile;
                                }
                                
                                if (bankFile instanceof File) {
                                    files.bank_statement = bankFile;
                                }

                                if (Object.keys(files).length > 0) {
                                    const uploadResponse = await ownerDocumentsService.uploadDocuments(ownerIds[i], files);
                                    if (uploadResponse.status === 'success') {
                                        console.log(`Documents uploaded for owner ${i + 1}:`, uploadResponse.data);
                                    } else {
                                        console.warn(`Failed to upload documents for owner ${i + 1}:`, uploadResponse.message);
                                    }
                                }
                            } catch (uploadError) {
                                console.error(`Error uploading documents for owner ${i + 1}:`, uploadError);
                                // Don't block the flow if document upload fails
                            }
                        }
                    }
                } else {
                    console.error('Failed to create owners:', response.message);
                    alert('Failed to save owner information. Please try again.');
                    return;
                }
            } catch (error) {
                console.error('Error creating owners:', error);
                alert('An error occurred while saving owner information. Please try again.');
                return;
            }
        } else {
            console.error('Company ID not found in localStorage');
            alert('Company information not found. Please contact support.');
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
                    className=""
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
                />

                <InputField
                    name={`${ownerPrefix}_bank_statement`}
                    label="Local Bank Statement (last 3 months)"
                    type="file"
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

                {watchedValues?.who_manage === 'member_manage' && (
                    <InputField
                        name="member_as_manager"
                        label="Select Member"
                        type="select"
                        required
                        placeholder="Select Member"
                        options={generateOwnerOptions()}
                    />
                )}

                <InputField
                    name="who_manage"
                    label="Who manage?"
                    type="select"
                    required
                    placeholder="Select Manage Type"
                    className={`${watchedValues?.who_manage === 'member_manage' ? '' : 'lg:col-span-2'}`}
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

export default OwnersInfoFormTypeTwo;