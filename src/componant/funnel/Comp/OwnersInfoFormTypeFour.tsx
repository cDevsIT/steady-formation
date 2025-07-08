import { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries, manageTypes } from "../funnel.type";

const OwnersInfoFormTypeFour: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
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
                name: "Owner One",
                email: "demo@email.com",
                mobile: "2345678901",
                country: "us",
                city: 'New York',
                state: 'Manhattan',
                zipCode: '22011',
                streetAddress: '111, manhattan, new work',
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
                <h2 className="text-[30px] font-semibold text-black lg:col-span-2">Owner Info</h2>

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
                    className="lg:col-span-2 "
                />

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

                {watchedValues?.who_manage === 'member_manage' && <InputField
                    name="owner_as_manager"
                    label="Select One of the Owenr As a Manager "
                    type="select"
                    required
                    placeholder="Select Owner"
                    className="lg:col-span-2"
                    options={[
                        { label: watchedValues?.name, value: watchedValues?.name },
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

export default OwnersInfoFormTypeFour;