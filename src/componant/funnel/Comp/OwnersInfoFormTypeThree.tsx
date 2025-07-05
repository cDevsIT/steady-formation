import { useEffect, useState } from "react";
import { ChildComponentProps } from "../SecondFunnel";
import { dataState } from "../Funnel";
import { CustomFormData } from "@/componant/ui/FormSample";
import { InputField, ReusableForm } from "@/componant/ui/ReusableForm";
import { countries } from "../funnel.type";

const OwnersInfoFormTypeThree: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [formMethods, setFormMethods] = useState<any>(null);
    const [data, setData] = useState<dataState>({});

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
                director_one_name: "SHIKHOR",
                director_one_email: "demo@email.com",
                director_one_mobile: "2345678901",
                director_one_country: "us",
                director_one_city: 'New York',
                director_one_state: 'Manhattan',
                director_one_zipCode: '22011',
                director_one_streetAddress: '111, manhattan, new work',
                director_two_name: "SHIKHOR",
                director_two_email: "demo@email.com",
                director_two_mobile: "2345678901",
                director_two_country: "us",
                director_two_city: 'New York',
                director_two_state: 'Manhattan',
                director_two_zipCode: '22011',
                director_two_streetAddress: '111, manhattan, new work',
            });
        }
    }, [data, formMethods]);

    const handleSubmit = (data: CustomFormData) => {
        handleFormSubmit({ OwnersInfo: data, isOwnersInfoComplete: true })
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);

    };
    return (
        <div className="max-w-[758px] mx-auto py-24">
            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                <div className="lg:col-span-2 ">
                    <h2 className="text-[30px] font-semibold text-black"> Director Info 1 </h2>
                    <p className="text-base font-normal text-gray-600">On of the director must be US resident</p>
                </div>
                
                <InputField
                    name="director_one_name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2 "
                />

                <InputField
                    name="director_one_email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name="director_one_mobile"
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />
                <InputField
                    name="director_one_country"
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                    belowText= 'One of director must be from USA'
                />

                <InputField
                    name="director_one_city"
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name="director_one_state"
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />
                <InputField
                    name="director_one_zipCode"
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name="director_one_streetAddress"
                    label="Streen Address"
                    type="text"
                    required
                    placeholder="Enter Street Address"
                    className="lg:col-span-2 "
                />



                <div className="lg:col-span-2 ">
                    <h2 className="text-[30px] font-semibold text-black"> Director Info 2 </h2>
                    <p className="text-base font-normal text-gray-600">On of the director must be US resident</p>
                </div>

                <InputField
                    name="director_two_name"
                    label="Name"
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    className="lg:col-span-2 "
                />

                <InputField
                    name="director_two_email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    type="text"
                    className=''
                />

                <InputField
                    name="director_two_mobile"
                    label="Mobile Number"
                    type="phone"
                    required
                    placeholder="Enter mobile number"
                />
                <InputField
                    name="director_two_country"
                    label="Country"
                    type="select"
                    required
                    placeholder="Select Country"
                    className=""
                    options={countries}
                    belowText='One of director must be from USA'
                />

                <InputField
                    name="director_two_city"
                    label="City"
                    type="text"
                    required
                    placeholder="Enter City"
                />

                <InputField
                    name="director_two_state"
                    label="State"
                    type="text"
                    required
                    placeholder="Enter State"
                />
                <InputField
                    name="director_two_zipCode"
                    label="Zip Code"
                    type="text"
                    required
                    placeholder="Enter Zip Code"
                />

                <InputField
                    name="director_two_streetAddress"
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

export default OwnersInfoFormTypeThree;