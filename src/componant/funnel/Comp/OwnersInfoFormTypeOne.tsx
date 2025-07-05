import { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries } from "../funnel.type";

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


    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
                //remove this
                name: "SHIKHOR",
                email: "demo@email.com",
                mobile: "2345678901",
                country: "us",
                city: 'New York',
                state: 'Manhattan',
                zipCode: '22011',
                streetAddress: '111, manhattan, new work',
                ownersPercentage: '100',
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
            console.log('Field changed:', { name, type, value: value[name], allValues: value });
        });

        // Cleanup subscription when component unmounts or form changes
        return () => subscription.unsubscribe();
    };
    return (
        <div className="max-w-[758px] mx-auto py-24">
            <h2 className="text-[30px] font-semibold text-black"> This is OwnersInfo Component </h2>
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
                    type="text"
                    required
                    placeholder="Enter Ownership Percentage"
                />




            </ReusableForm>

        </div>
    );
};

export default OwnersInfoFormTypeOne;