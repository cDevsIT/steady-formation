'use client'
import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import companyFormationService, { useCompanyFormationData, CompanyFormationData } from "@/lib/companyFormationService";
import { useStates } from "@/hooks/useStates";

const plans = [
    {
        name: "Free",
        price: 0,
        period: "",
        title: "Basic tools with limited reporting, simple workflows, and entry-level automation for getting started.",
        description: [
            "Basic address option to get started",
            "Use my own U.S. address as the business address",
            "Public residential addresses will be visible"
        ],
        selected: true,
    },
    {
        name: "Half-Yearly",
        price: 59,
        period: "Half-Yearly",
        title: "Enhanced features, better reporting, and flexible automation, billed on a Half-Yearly basis.",
        description: [
            "Enhanced features with flexible billing",
            "Use my own address or a provided one",
            "Business address included for public records"
        ],
        selected: false,
    },
    {
        name: "Yearly",
        price: 99,
        period: "Yearly",
        title: "Premium features, full automation, and advanced reporting with annual savings built in.",
        description: [
            "Premium features with full coverage",
            "Provided professional business address",
            "Residential addresses remain private"
        ],
        selected: false,
    },
];

const checklist = [
    "A physical street address is required in the state where your business operates.",
    "P.O. Boxes or PMBs cannot be used.",
    "Your business address may appear on public records with your name, phone, and email.",
    "If you don’t have a business address, you can use your Registered Agent’s address (if allowed in your state) or select one of our Half-Yearly/Yearly packages."
];

const CheckIcon = () => (
    <svg className="w-5 h-5 text-purple-600 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const ThirdFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [selected, setSelected] = useState(0); // Default to Free plan (index 0)
    const data = useCompanyFormationData();
    const [formMethods, setFormMethods] = useState<any>(null);
    const { states: usStates, isLoading: isLoadingStates } = useStates();

    // Load initial data and set selected plan
    useEffect(() => {
        if (data.plan?.plan_name) {
            const findCurrentSelect = plans.findIndex(plan => plan.name === data.plan?.plan_name)
            if (findCurrentSelect !== -1) {
                setSelected(findCurrentSelect)
            }
        } else {
            // Default to Free plan (index 0) if no plan is selected
            setSelected(0)

        }
    }, [data.plan?.plan_name, data]);


    useEffect(() => {
        if (formMethods) {
            formMethods.reset({
                country: "USA",
                state: data?.businessDetails?.stateName || undefined,
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        const selectedPlan = plans[selected];
        
        // Save plan data to localStorage
        companyFormationService.saveToLocalStorage({
            ...data,
            plan: {
                plan_name: selectedPlan.name,
                plan_price: selectedPlan.price,
                free_plan_details: selectedPlan.name === 'Free' ? {
                    street_address: data.streetAddress,
                    step4_city: data.city,
                    step4_state: data.state,
                    step4_zip_code: data.zipCode,
                    step4_country: data.country
                } : undefined
            },
            currentStep: 4
        });

        const finalData = { ...data, selectedPlan: selectedPlan.name };
        handleFormSubmit({ stepThree: finalData });
    };

    const handlePremiumSubmit = () => {
        const selectedPlan = plans[selected];

        // Save plan data to localStorage
        companyFormationService.saveToLocalStorage({
            ...data,
            plan: {
                plan_name: selectedPlan.name,
                plan_price: selectedPlan.price
            },
            currentStep: 4
        });

        const finalData = { ...data, selectedPlan: selectedPlan.name };
        handleFormSubmit({ stepThree: finalData });
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    // Handle plan selection and save to localStorage
    const handlePlanSelection = (idx: number) => {
        setSelected(idx);
        // Save plan data to localStorage instantly when selected
        const selectedPlan = plans[idx];
        companyFormationService.saveToLocalStorage({
            ...data,
            plan: {
                plan_name: selectedPlan.name,
                plan_price: selectedPlan.price,
            }
        });
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
                        
                        onClick={() => handlePlanSelection(idx)}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[20px] font-semibold">{plan.name}</span>
                            </div>
                            <p className="text-[16px] font-normal mb-2"><span className="text-[36px] font-bold text-black">${plan.price}</span>.00</p>
                            <p className="text-sm font-normal text-black mb-3">{plan.title}</p>
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
                            
                        >
                            {selected === idx ? "Selected" : "Select"}
                        </button>
                    </div>
                ))}
            </div>

            {selected === 0 ? 
            <>
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
                            type="select"
                            required
                            placeholder={isLoadingStates ? "Loading states..." : "Select State"}
                            options={usStates}
                            disabled={isLoadingStates}
                            defaultValue={data?.businessDetails?.stateName}
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
            </> 
            : 
            <>
                    <h3 className="font-semibold text-xl mb-3">Address Vailed for {selected === 1 ? 'Six Month': 'One Year'}</h3>
                    <button
                        onClick={handlePremiumSubmit}
                        className="w-full bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-3 rounded-lg shadow transition-all text-lg duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
            </>}
            
        </div>
    );
};

export default ThirdFunnel;