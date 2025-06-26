import { useEffect, useState } from "react";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";

interface dataState {
    companyName?: string;
    step?: number;
    stepOne?: {
        fullName?: string;
        email?: string;
        primaryPhone?: string;
        secondaryPhone?: string
    }

}

const FirstFunnel = () => {
    const [data, setData] = useState<dataState>({});
    const [formSubmissions, setFormSubmissions] = useState<CustomFormData[]>([]);
    const [formMethods, setFormMethods] = useState<any>(null);
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
        if (!formMethods) return;

        const subscription = formMethods.watch((value: any) => {
            setWatchedValues(value);
        });

        return () => subscription.unsubscribe();
    }, [formMethods]);

    useEffect(() => {
        if (formMethods && Object.keys(data).length > 0) {
            formMethods.reset({
                companyName: data.companyName || "",
            });
        }
    }, [data, formMethods]);

    console.log(data?.companyName)

    const handleFormSubmit = (data: CustomFormData) => {
        console.log('Form submitted successfully:', data);
        setFormSubmissions(prev => [...prev, data]);
        updateCompanyData(data)

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

    const updateCompanyData = (newData: any) => {
        const updatedData = { ...data, ...newData };
        setData(updatedData);
        localStorage.setItem('companyData', JSON.stringify(updatedData));
    };

    const defaultFormValues: CustomFormData = {
        companyName: data?.companyName || "",
    };
    return (
        <div>
            <FunnelHeading>
                Start Your Free Registration
            </FunnelHeading>
            <FunnelSubHeading className="!text-[#475467]">
                Complete a Simple Form
            </FunnelSubHeading>
            <div className="mt-6 max-w-[615px] mx-auto">
                <ReusableForm
                    onSubmit={handleFormSubmit}
                    defaultValues={defaultFormValues}
                    submitText="Continue"
                    onFormStateChange={handleFormStateChange}
                >
                    <InputField
                        name="companyName"
                        label="Proposed Company Name"
                        placeholder="Enter your company name"
                        required
                        type="text"
                        className='col-span-2 mb-1'
                    />
                    <span className="text-[12px] leading-[18px] col-span-2 max-w-[591px]text-start">*The entered name will be validated later. You Don’t have to add “LLC,” “Inc.” “Corp” etc. in this box. If your chosen name is unavailable, together we&apos;ll work on an alternative.</span>

                    <FunnelSubHeading className="font-semibold mt-4 col-span-2">
                        Primary Contact
                    </FunnelSubHeading>

                    <InputField
                        name="fullName"
                        label="Full Name"
                        placeholder="Enter your full name"
                        required
                        type="text"
                        className=''
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
                        name="primaryPhone"
                        label="Primery Mobile Phone"
                        type="phone"
                        required
                        placeholder="Enter primary number"
                    />
                    <InputField
                        name="secondaryPhone"
                        label="Secondary Mobile Number"
                        type="phone"
                        required
                        placeholder="Enter secondary number"
                        className=""
                    />

                </ReusableForm>
            </div>
        </div>
    );
};

export default FirstFunnel;