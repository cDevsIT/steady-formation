import { useEffect, useState } from "react";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import Rating from "../shared/Rating";
import { dataState } from "./Funnel";

interface ChildComponentProps {
    handleFormSubmit: (data: CustomFormData) => void;
  }

const FirstFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [data, setData] = useState<dataState>({});
    const [formMethods, setFormMethods] = useState<any>(null);

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
        }
    }, []);


    useEffect(() => {
        if (formMethods && Object.keys(data).length > 0) {
            formMethods.reset({
                companyName: data.companyName || "",
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({stepOne: data})

    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    const defaultFormValues: CustomFormData = {
        companyName: data?.companyName || "",
        fullName: 'SHIKHOR',
        email: 'demo@email.com',
        primaryPhone: '2345678901',
        secondaryPhone: '2345678901'
    };
    return (
        <div>
            <FunnelHeading>
                Start Your Free Registration
            </FunnelHeading>
            <FunnelSubHeading className="!text-[#475467]">
                Complete a Simple Form
            </FunnelSubHeading>
            <div className="mt-6 lg:max-w-[615px] mx-auto lg:mx-0 ">
                <ReusableForm
                    onSubmit={handleSubmit}
                    defaultValues={defaultFormValues}
                    submitText="Continue"
                    onFormStateChange={handleFormStateChange}
                    className="mb-5"

                >
                    <InputField
                        name="companyName"
                        label="Proposed Company Name"
                        placeholder="Enter your company name"
                        required
                        type="text"
                        className='lg:col-span-2 mb-1'
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

                <Rating maxWidth={false} className="border w-full border-[#E4E7EC] hidden lg:flex" radius={false} />
            </div>
        </div>
    );
};

export default FirstFunnel;