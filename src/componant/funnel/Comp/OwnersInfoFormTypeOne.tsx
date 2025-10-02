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



    const handleSubmit = (data: CustomFormData) => {
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




            </ReusableForm>

        </div>
    );
};

export default OwnersInfoFormTypeOne;