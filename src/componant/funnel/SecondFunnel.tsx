import { useEffect, useState } from "react";
import { FunnelHeading } from "../ui/FunnelHeading";
import CompanySelectSection from "./Comp/CompanySelectSection";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { industries, llcTypes, numOfOwnerShip, usStates } from "./funnel.type";
export interface ChildComponentProps {
    handleFormSubmit: (data: CustomFormData) => void;
}

const SecondFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [data, setData] = useState<dataState>({});
    const [selected, setSelected] = useState(data?.businessType || 'llc');
    const [formMethods, setFormMethods] = useState<any>(null);

    const [watchedValues, setWatchedValues] = useState<any>({});

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
                //remove This
                llcType: "singleLLC",
                industryType: "",
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ stepTwo: data })

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
        <div className="lg:max-w-[730px]">
            <FunnelHeading>
                Business Info
            </FunnelHeading>

            <CompanySelectSection selected={selected} setSelected={setSelected} />

            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >

                <InputField
                    name="llcType"
                    label="Select LLC Type"
                    type="select"
                    required
                    placeholder="Select llc type"
                    options={llcTypes}
                    className="lg:col-span-2 mb-1"
                />

                <InputField
                    name="stateName"
                    label="State Name"
                    type="select"
                    required
                    placeholder="Select State Name"
                    options={usStates}
                    className="mb-1"
                />

                <InputField
                    name="industryType"
                    label="Type of Industry"
                    type="select"
                    required
                    placeholder="Select Industry Type"
                    options={industries}
                    className="mb-1"
                />

                {watchedValues.llcType === 'multiLLC' && 
                <InputField
                    name="numOfOwnerShip"
                    label="Number Of Ownership"
                    type="select"
                    required
                    placeholder="Select Num of Ownership"
                    options={numOfOwnerShip}
                    className="lg:col-span-2 mb-1"
                />}

                <div className="lg:col-span-2 mb-1">
                    <p className="text-sm font-medium text-black">State governments charge a one-time LLC formation fee which varies by state. This fee is required to legally register your business. Based on your selected state, we&apos;ll show the exact amount on the next step.</p>
                    <h4 className="font-bold text-[18px] text-black mt-3 mb-4">In Wyoming, the filing fee is $100</h4>
                </div>

                

            </ReusableForm>
        </div>
    );
};

export default SecondFunnel;