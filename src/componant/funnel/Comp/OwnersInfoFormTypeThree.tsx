import React, { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries } from "../funnel.type";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";
import ownerDocumentsService from "@/services/ownerDocumentsService";

const OwnersInfoFormTypeThree: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [formMethods, setFormMethods] = useState<any>(null);
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
        // Transform director data to multi_member_info format
        const multiMemberInfo = [];
        for (let i = 1; i <= numberOfOwners; i++) {
            const directorPrefix = `director_${i}`;
            multiMemberInfo.push({
                name: data[`${directorPrefix}_name`] as string,
                email: data[`${directorPrefix}_email`] as string,
                phone: data[`${directorPrefix}_mobile`] as string,
                ownership_percentage: 0, // Directors don't have ownership percentage
                street_address: data[`${directorPrefix}_streetAddress`] as string,
                city: data[`${directorPrefix}_city`] as string,
                state: data[`${directorPrefix}_state`] as string,
                zip_code: data[`${directorPrefix}_zipCode`] as string,
                country: data[`${directorPrefix}_country`] as string,
            });
        }

        // Update localStorage with director data
        const currentData = companyFormationService.getFromLocalStorage();
        companyFormationService.saveToLocalStorage({
            ...currentData,
            businessDetails: {
                ...currentData.businessDetails,
                multi_member_info: multiMemberInfo
            }
        });

        // Call API to create directors in the database
        const companyId = currentData.company_id;
        if (companyId) {
            try {
                const response = await ownerDocumentsService.storeOwners(companyId, multiMemberInfo);
                if (response.status === 'success') {
                    console.log('Directors created successfully:', response.data);
                    
                    // Upload documents for each director if files are provided
                    const ownerIds = response.data?.owner_ids || [];
                    for (let i = 0; i < ownerIds.length; i++) {
                        const directorPrefix = `director_${i + 1}`;
                        const passportFile = data[`${directorPrefix}_scanned_passport_copy`];
                        const bankFile = data[`${directorPrefix}_bank_statement`];
                        
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
                                        console.log(`Documents uploaded for director ${i + 1}:`, uploadResponse.data);
                                    } else {
                                        console.warn(`Failed to upload documents for director ${i + 1}:`, uploadResponse.message);
                                    }
                                }
                            } catch (uploadError) {
                                console.error(`Error uploading documents for director ${i + 1}:`, uploadError);
                                // Don't block the flow if document upload fails
                            }
                        }
                    }
                } else {
                    console.error('Failed to create directors:', response.message);
                    alert('Failed to save director information. Please try again.');
                    return;
                }
            } catch (error) {
                console.error('Error creating directors:', error);
                alert('An error occurred while saving director information. Please try again.');
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
                />

                <InputField
                    name={`${directorPrefix}_bank_statement`}
                    label="Local Bank Statement (last 3 months)"
                    type="file"
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