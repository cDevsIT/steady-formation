import { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries } from "../funnel.type";
import companyFormationService from "@/lib/companyFormationService";
import ownerDocumentsService from "@/services/ownerDocumentsService";

const OwnersInfoFormTypeOne: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [formMethods, setFormMethods] = useState<any>(null);
    const [data, setData] = useState<dataState>({});
    const [watchedValues, setWatchedValues] = useState<any>({});

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
        }
    }, []);



    const handleSubmit = async (data: CustomFormData) => {
        if (!formMethods) return;
        const value = parseFloat(String(data.ownersPercentage));
        if (Number.isNaN(value)) {
            formMethods.setError('ownersPercentage', { type: 'manual', message: 'Enter a valid percentage' });
            return;
        }
        const rounded = Math.round(value * 100) / 100;
        if (rounded !== 100) {
            formMethods.setError('ownersPercentage', { type: 'manual', message: 'Ownership percentage must be exactly 100%' });
            return;
        }

        // Transform and save owner data to businessDetails.multi_member_info
        const ownerInfo = {
            name: data.name as string,
            email: data.email as string,
            phone: data.mobile as string,
            ownership_percentage: parseFloat(String(data.ownersPercentage)),
            street_address: data.streetAddress as string,
            city: data.city as string,
            state: data.state as string,
            zip_code: data.zipCode as string,
            country: data.country as string,
        };

        // Update localStorage with owner data
        const currentData = companyFormationService.getFromLocalStorage();
        companyFormationService.saveToLocalStorage({
            ...currentData,
            businessDetails: {
                industryType: currentData.businessDetails?.industryType || '',
                stateName: currentData.businessDetails?.stateName || '',
                number_of_ownership: currentData.businessDetails?.number_of_ownership || 1,
                ...currentData.businessDetails,
                multi_member_info: [ownerInfo]
            }
        });

        // Call API to create owners in the database
        const companyId = currentData.company_id;
        if (companyId) {
            try {
                const response = await ownerDocumentsService.storeOwners(companyId, [ownerInfo]);
                if (response.status === 'success') {
                    console.log('Owners created successfully:', response.data);
                    
                    // Upload documents if files are provided
                    const ownerIds = response.data?.owner_ids || [];
                    if (ownerIds.length > 0 && (data.owners_scanned_passport_copy || data.owners_bank_statement)) {
                        try {
                            const files: { scanned_passport_copy?: File; bank_statement?: File } = {};
                            
                            if (data.owners_scanned_passport_copy instanceof File) {
                                files.scanned_passport_copy = data.owners_scanned_passport_copy;
                            }
                            
                            if (data.owners_bank_statement instanceof File) {
                                files.bank_statement = data.owners_bank_statement;
                            }

                            if (Object.keys(files).length > 0) {
                                const uploadResponse = await ownerDocumentsService.uploadDocuments(ownerIds[0], files);
                                if (uploadResponse.status === 'success') {
                                    console.log('Documents uploaded successfully:', uploadResponse.data);
                                } else {
                                    console.warn('Failed to upload documents:', uploadResponse.message);
                                }
                            }
                        } catch (uploadError) {
                            console.error('Error uploading documents:', uploadError);
                            // Don't block the flow if document upload fails
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
    return (
        <div className="max-w-[758px] mx-auto py-24">
            <h2 className="text-[30px] font-semibold text-black">Owners Info </h2>
            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >

                <InputField
                    name="name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2 "
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name="mobile"
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />
                <InputField
                    name="country"
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                />

                <InputField
                    name="city"
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name="state"
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />
                <InputField
                    name="zipCode"
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name="streetAddress"
                    label="Streen Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                />

                <InputField
                    name="ownersPercentage"
                    label="Ownership Percentage"
                    type="number"
                    required
                    placeholder="Enter Ownership Percentage"
                />


                <InputField
                    name={`owners_scanned_passport_copy`}
                    label="Scanned Passport Copy"
                    type="file"
                />

                <InputField
                    name={`owners_bank_statement`}
                    label="Local Bank Statement (last 3 months)"
                    type="file"
                />

            </ReusableForm>

        </div>
    );
};

export default OwnersInfoFormTypeOne;