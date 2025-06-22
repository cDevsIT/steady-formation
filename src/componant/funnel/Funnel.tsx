'use client';
import { useState } from "react";
import { InputField, ReusableForm, SimpleFormData } from "../ui/ReusableForm";


const Funnel = () => {
    const [formSubmissions, setFormSubmissions] = useState<SimpleFormData[]>([]);

    const handleFormSubmit = (data: SimpleFormData) => {
        console.log('Form submitted successfully:', data);
        setFormSubmissions(prev => [...prev, data]);

        // Show success message with submitted data
        const dataString = JSON.stringify(data, null, 2);
        alert(`Form submitted successfully!\n\nSubmitted data:\n${dataString}`);
    };

    const sampleOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Very Long Option Name That Tests Overflow', value: 'option4' }
    ];
    return (
        <section className="bg-white pt-[65px] px-4">
            <div className="max-w-[1512px] mx-auto">
                <ReusableForm onSubmit={handleFormSubmit}>
                    <InputField
                        name="firstName"
                        label="First Name"
                        type="text"
                        required
                        placeholder="Enter your first name"
                    />

                    <InputField
                        name="age"
                        label="Age"
                        type="number"
                        placeholder="Enter your age"
                    />

                    <InputField
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        placeholder="Enter your email"
                    />

                    <InputField
                        name="country"
                        label="Country"
                        type="select"
                        required
                        placeholder="Select your country"
                        options={sampleOptions}
                    />

                    <InputField
                        name="phone"
                        label="Phone Number"
                        type="phone"
                        required
                        placeholder="Enter phone number"
                    />
                </ReusableForm>
            </div>

        </section >
    );
};

export default Funnel;