'use client'
import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";

const plans = [
    {
        name: "Free",
        price: 0,
        period: "",
        description: [
            "Basic features for getting started",
            "Use my own address as the primary business address",
            "Public residential addresses will be listed"
        ],
        selected: true,
    },
    {
        name: "Monthly",
        price: 10,
        period: "Monthly",
        description: [
            "Enhanced features and basic automation",
            "Use my address or a provided one",
            "Provided business address for public listing"
        ],
        selected: false,
    },
    {
        name: "Yearly",
        price: 99,
        period: "Yearly",
        description: [
            "Premium features, full automation, and advanced reporting",
            "Provided professional business address",
            "Residential addresses kept private"
        ],
        selected: false,
    },
];

const checklist = [
    "Are you sure you can meet this state requirement?",
    "You must provide a physical address for your Registered Agent in the state where your business operates (no PO Boxes or PMBs allowed).",
    "In some states, this address (registered agent/business address) may appear on public records along with your name, phone number, and email address.",
    "If You Don't Have One, Choose a Monthly/Yearly Package for Registered Agent Address."
];

const CheckIcon = () => (
    <svg className="w-5 h-5 text-purple-600 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ThirdFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [selected, setSelected] = useState(0);
    const [data, setData] = useState<dataState>({});
    const [formMethods, setFormMethods] = useState<any>(null);

    // Load initial data from localStorage
    useEffect(() => {
        const localData = localStorage.getItem('companyData');
        if (localData) {
            const parsedData = JSON.parse(localData);
            setData(parsedData);
            setSelected(parsedData?.businessType)
        }
    }, []);


    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
                companyName: data.companyName || "",
                country: "USA",
                //remove This
                city: 'New York',
                state: 'Manhattan',
                zipCode: '22011',
                streetAddress: '111, manhattan, new work'
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {

        const finalData = { ...data, selectedPlan: plans[selected]?.name }

        handleFormSubmit({ stepThree: finalData })

    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };
    return (
        <div className="lg:max-w-[728px]">
            <FunnelHeading >
                Business Address
            </FunnelHeading>

            <FunnelSubHeading className="!font-semibold mt-3 mb-2">
                Select Business Address Package *
            </FunnelSubHeading>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {plans.map((plan, idx) => (
                    <div
                        key={plan.name}
                        className={`flex-1 lg:max-w-[236px] border rounded-xl p-6 bg-white shadow-sm transition-all duration-200 ${selected === idx
                            ? "border-purple-600 ring-2 ring-purple-200"
                            : "border-gray-200"
                            } flex flex-col justify-between`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[20px] font-semibold">{plan.name}</span>
                            </div>
                            <p className="text-[16px] font-normal mb-2"><span className="text-[36px] font-bold text-black">${plan.price}</span>.00</p>
                            <p className="text-sm font-normal text-black mb-3">Advanced features and reporting, better workflows and automation.</p>
                            <ul className="mb-4 space-y-2">
                                {plan.description.map((desc, i) => (
                                    <li key={i} className="grid grid-cols-[10%_90%] gap-3 text-sm text-gray-700">
                                        <Image className="h-[20px]" url="/icons/check-circle.svg" alt="Check Circle" />
                                        <span> {desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className={`mt-2 w-full py-2 rounded-xl font-semibold border transition-all duration-150 ${selected === idx
                                ? "bg-primary text-white border-primary cursor-default"
                                : "bg-white text-gray-600 border-gray-200 hover:text-white hover:bg-primary-hover"
                                }`}
                            disabled={selected === idx}
                            onClick={() => setSelected(idx)}
                        >
                            {selected === idx ? "Selected" : "Select"}
                        </button>
                    </div>
                ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-[20px] font-semibold mb-3">Checklist</h3>
                <ul className="list-disc pl-5 space-y-2 text-[#475467] text-[16px]">
                    {checklist.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>



            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                <h4 className="text-[16px] font-semibold lg:col-span-2 mb-1">Your Registered Agent Address *</h4>
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
        </div>
    );
};

export default ThirdFunnel;