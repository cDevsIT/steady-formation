import { useEffect, useState } from "react";
import { FunnelHeading } from "../ui/FunnelHeading";
import CompanySelectSection from "./Comp/CompanySelectSection";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
interface ChildComponentProps {
    handleFormSubmit: (data: CustomFormData) => void;
}

const SecondFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [data, setData] = useState<dataState>({});
    const [selected, setSelected] = useState(data?.businessType || 'llc');
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
        if (formMethods && Object.keys(data).length > 0) {
            formMethods.reset({
                companyName: data.companyName || "",
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ stepTwo: data })

    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);
    };

    const defaultFormValues: CustomFormData = {
        llcType: "singleLLC",
    };

    const llcTypes = [
        { label: 'Single Member LLC', value: 'singleLLC' },
        { label: 'Multi Member LLC', value: 'multiLLC' },
    ];

    return (
        <div className="lg:max-w-[730px]">
            <FunnelHeading>
                Business Info
            </FunnelHeading>

            <CompanySelectSection selected={selected} setSelected={setSelected} />

            <ReusableForm
                onSubmit={handleSubmit}
                defaultValues={defaultFormValues}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5"
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

            </ReusableForm>
        </div>
    );
};

export default SecondFunnel;