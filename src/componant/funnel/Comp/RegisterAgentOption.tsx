import { useEffect, useState } from "react";
import Image from "../../ui/Image";
import { CustomFormData } from "@/componant/ui/FormSample";
import { dataState } from "../Funnel";
import { FunnelHeading, FunnelSubHeading } from "@/componant/ui/FunnelHeading";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";

const options = [
    {
        key: "individual",
        title: "Individual",
        description: "A specific person will serve as the registered agent.",
    },
    {
        key: "company",
        title: "Company",
        description: "A business entity will act as the registered agent.",
    },
];

export interface ChildComponentProps {
    handleSubmit: (data: CustomFormData) => void;
}

const RegisterAgentOption: React.FC<ChildComponentProps> = ({ handleSubmit }) => {
    const [selected, setSelected] = useState<"individual" | "company">("individual");
    const isIndividual = selected === 'individual';
    const [data, setData] = useState<dataState>({});
    const [formMethods, setFormMethods] = useState<any>(null);

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
            if (parsedData?.businessType === "individual" || parsedData?.businessType === "company") {
                setSelected(parsedData.businessType);
            } else {
                setSelected("individual");
            }
        } else {
            setSelected("individual");
        }
    }, []);


    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
                name: 'SHIKHOR',
                //remove This
                country: "USA",
                city: 'New York',
                state: 'Manhattan',
                zipCode: '22011',
                streetAddress: '111, manhattan, new work'
            });
        }
    }, [data, formMethods]);

    const handleFormSubmit = (data: CustomFormData) => {

        handleSubmit({ ...data, companyType: selected })

    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };


    return (
        <section className="">
            <FunnelSubHeading className="!font-semibold mt-3 mb-2">
                Agent Information
            </FunnelSubHeading>
            <p className="mb-4 text-gray-600 text-[16px]">
                A Registered Agent is a designated individual or service responsible for receiving important legal and government documents on behalf of your business.
            </p>
            <p className="text-[14px] text-black mb-6">
                <span className="font-bold">Note:</span> PO Boxes are not allowed.
            </p>

            <h3 className="text-[20px] font-semibold mb-4">Who Will Be the Registered Agent?</h3>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {options.map((opt) => (
                    <div
                        key={opt.key}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected === opt.key}
                        onClick={() => setSelected(opt.key as "individual" | "company")}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") setSelected(opt.key as "individual" | "company");
                        }}
                        className={`flex-1 flex items-start gap-3 p-5 border rounded-xl cursor-pointer transition-colors outline-none
              ${selected === opt.key
                                ? "border-[#7856FC] bg-purple-50"
                                : "border-gray-200 bg-white"}
            `}
                    >
                        <span className="mt-1">
                            <Image
                                className="h-5 w-5"
                                url={selected === opt.key ? "/icons/checkbox.svg" : "/icons/checkbox-ring.svg"}
                                alt={selected === opt.key ? "Selected" : "Not selected"}
                            />
                        </span>
                        <div>
                            <div className="font-semibold text-[16px] mb-1">{opt.title}</div>
                            <div className="text-gray-600 text-[15px]">{opt.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <ReusableForm
                onSubmit={handleFormSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                <h4 className="text-[16px] font-semibold lg:col-span-2 mb-1">Your Registered Agent Address *</h4>


                {isIndividual ?
                    <InputField
                        name="name"
                        label="Name"
                        type="text"
                        required
                        placeholder="Enter Name"
                        className="lg:col-span-2 mb-1"
                    />
                    :
                    <InputField
                        name="name"
                        label="Company Name"
                        type="text"
                        required
                        placeholder="Enter Company Name"
                        className="lg:col-span-2 mb-1"
                    />
                }

                <InputField
                    name="country"
                    label="Country"
                    type="text"
                    required
                    placeholder="Country"
                    disabled={true}
                    defaultValue="USA"
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




            </ReusableForm>

        </section>
    );
};

export default RegisterAgentOption;