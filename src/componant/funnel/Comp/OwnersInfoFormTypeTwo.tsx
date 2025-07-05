import { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries, manageTypes } from "../funnel.type";

const OwnersInfoFormTypeTwo: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
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


    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
                who_manage: "member_manage",
                //remove this
                owner_one_name: "Owner One",
                owner_one_email: "demo@email.com",
                owner_one_mobile: "2345678901",
                owner_one_country: "us",
                owner_one_city: 'New York',
                owner_one_state: 'Manhattan',
                owner_one_zipCode: '22011',
                owner_one_streetAddress: '111, manhattan, new work',
                owner_one_ownersPercentage: '100',

                owner_two_name: "Owner two",
                owner_two_email: "demo@email.com",
                owner_two_mobile: "2345678901",
                owner_two_country: "us",
                owner_two_city: 'New York',
                owner_two_state: 'Manhattan',
                owner_two_zipCode: '22011',
                owner_two_streetAddress: '111, manhattan, new work',
                owner_two_ownersPercentage: '100',
            });
        }
    }, [data, formMethods]);

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
    return (
        <div className="max-w-[758px] mx-auto py-24">
            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">Owner Info 01</h2>

                <InputField
                    name="owner_one_name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className=""
                />

                <InputField
                    name="owner_one_email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name="owner_one_mobile"
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />

                <InputField
                    name="owner_one_percentage"
                    label="Ownership Percentage"
                    type="text"
                    required
                    placeholder="Enter Ownership Percentage"
                />
                <InputField
                    name="owner_one_country"
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                />

                <InputField
                    name="owner_one_city"
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name="owner_one_state"
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />
                <InputField
                    name="owner_one_zipCode"
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name="owner_one_streetAddress"
                    label="Streen Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                    className="lg:col-span-2 "
                />


                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">Owner Info 02</h2>

                <InputField
                    name="owner_two_name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className=""
                />

                <InputField
                    name="owner_two_email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name="owner_two_mobile"
                    label="Mobile Number"
                    type="text"
                    required
                    placeholder="Enter mobile number"
                />

                <InputField
                    name="owner_two_percentage"
                    label="Ownership Percentage"
                    type="phone"
                    required
                    placeholder="Enter Ownership Percentage"
                />
                <InputField
                    name="owner_two_country"
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                />

                <InputField
                    name="owner_two_city"
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name="owner_two_state"
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />
                <InputField
                    name="owner_two_zipCode"
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name="owner_two_streetAddress"
                    label="Streen Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                    className="lg:col-span-2 "
                />


                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">Manage type</h2>

                {watchedValues?.who_manage === 'member_manage' && <InputField
                    name="member_as_manager"
                    label="Select Member"
                    type="select"
                    required
                    placeholder="Select Member"
                    options={[
                        { label: watchedValues?.owner_one_name, value: watchedValues?.owner_one_name },
                        { label: watchedValues?.owner_two_name, value: watchedValues?.owner_two_name },
                    ]}
                />}



                <InputField
                    name="who_manage"
                    label="Who manage?"
                    type="select"
                    required
                    placeholder="Select Manage Type"
                    className={`${watchedValues?.who_manage === 'member_manage' ? '' : 'lg:col-span-2'}`}
                    options={manageTypes}
                />

                {watchedValues?.who_manage === 'member_manage' && <InputField
                    name="owner_as_manager"
                    label="Select One of the Owenr As a Manager "
                    type="select"
                    required
                    placeholder="Select Owner"
                    className="lg:col-span-2"
                    options={[
                        { label: watchedValues?.owner_one_name, value: watchedValues?.owner_one_name },
                        { label: watchedValues?.owner_two_name, value: watchedValues?.owner_two_name },
                    ]}
                />}

                {/* {watchedValues?.who_manage === 'manager_manage' &&
                } */}

                {/* Manager Manage Section  */}

                {watchedValues?.who_manage === 'manager_manage' && <InputField
                    name="manager_name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2 "
                />
                }
                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_email"
                        label="Email"
                        placeholder="Enter your email"
                        required
                        type="text"
                        className=''
                    />
                }

                    
                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_mobile"
                        label="Mobile Number"
                        type="phone"
                        required
                        placeholder="Enter mobile number"
                    />
                }
                    

                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_country"
                        label="Country"
                        type="select"
                        required
                        placeholder="Select Country"
                        className=""
                        options={countries}
                    />
                }
                    

                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_city"
                        label="City"
                        type="text"
                        required
                        placeholder="Enter City"
                    />
                }
                   

                {watchedValues?.who_manage === 'manager_manage' &&

<InputField
                        name="manager_state"
                        label="State"
                        type="text"
                        required
                        placeholder="Enter State"
                    />
                }


                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_zipCode"
                        label="Zip Code"
                        type="text"
                        required
                        placeholder="Enter Zip Code"
                    />
                }
                    

                {watchedValues?.who_manage === 'manager_manage' &&
                    <InputField
                        name="manager_streetAddress"
                        label="Streen Address"
                        type="text"
                        required
                        placeholder="Enter Street Address"
                        className="lg:col-span-2 "
                    />
                }

                    



            </ReusableForm>

        </div>
    );
};

export default OwnersInfoFormTypeTwo;