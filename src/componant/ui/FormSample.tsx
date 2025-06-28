'use client';
import { useState } from "react";
import { InputField, ReusableForm } from "./ReusableForm";

// Use the same custom interface as in the form component
export interface CustomFormData {
    [key: string]: any;
}

const FormSample = () => {
    const [formSubmissions, setFormSubmissions] = useState<CustomFormData[]>([]);
    const [formMethods, setFormMethods] = useState<any>(null);
    const [watchedValues, setWatchedValues] = useState<any>({});

    const handleFormSubmit = (data: CustomFormData) => {
        console.log('Form submitted successfully:', data);
        setFormSubmissions(prev => [...prev, data]);

        // Show success message with submitted data
        const dataString = JSON.stringify(data, null, 2);
        alert(`Form submitted successfully!\n\nSubmitted data:\n${dataString}`);
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

    // Example methods to demonstrate form control
    const handleSetRandomAge = () => {
        if (formMethods) {
            const randomAge = Math.floor(Math.random() * 80) + 18;
            formMethods.setFieldValue('age', randomAge);
        }
    };

    const handleGetCurrentValues = () => {
        if (formMethods) {
            const currentValues = formMethods.getAllValues();
            alert(`Current form values:\n${JSON.stringify(currentValues, null, 2)}`);
        }
    };

    const handleValidateForm = async () => {
        if (formMethods) {
            const isValid = await formMethods.validateForm();
            alert(`Form is ${isValid ? 'valid' : 'invalid'}`);
        }
    };

    const handleResetForm = () => {
        if (formMethods) {
            formMethods.resetForm();
            setWatchedValues({});
        }
    };

    const sampleOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Very Long Option Name That Tests Overflow', value: 'option4' }
    ];

    const defaultFormValues: CustomFormData = {
        firstName: '',
        age: '',
        email: '',
        country: '',
        phone: '',
        companyName: ''
    };

    return (
        <section className="bg-white pt-[70px] px-4">
            <div className="max-w-[1512px] mx-auto">
                <h1 className="text-2xl font-bold mb-6">Contact Form</h1>

                {/* Form control buttons for testing */}
                <div className="mb-6 flex flex-wrap gap-2">
                    <button
                        onClick={handleSetRandomAge}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                        Set Random Age
                    </button>
                    <button
                        onClick={handleGetCurrentValues}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                        Get Current Values
                    </button>
                    <button
                        onClick={handleValidateForm}
                        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                    >
                        Validate Form
                    </button>
                    <button
                        onClick={handleResetForm}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                        Reset Form
                    </button>
                </div>

                <ReusableForm
                    onSubmit={handleFormSubmit}
                    defaultValues={defaultFormValues}
                    submitText="Submit Form"
                    onFormStateChange={handleFormStateChange}
                >
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
                        rules={{
                            min: { value: 1, message: 'Age must be at least 1' },
                            max: { value: 120, message: 'Age must be less than 120' }
                        }}
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

                    <InputField
                        name="companyName"
                        label="Company Name"
                        type="company"
                        required
                        placeholder="Enter company name"
                    />
                </ReusableForm>

                {/* Display watched values for debugging */}
                {Object.keys(watchedValues).length > 0 && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-md">
                        <h3 className="font-semibold mb-2">Current Form Values:</h3>
                        <pre className="text-sm text-gray-700">
                            {JSON.stringify(watchedValues, null, 2)}
                        </pre>
                    </div>
                )}

                {/* Display form submissions */}
                {formSubmissions.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-semibold mb-4">Form Submissions ({formSubmissions.length}):</h3>
                        {formSubmissions.map((submission, index) => (
                            <div key={index} className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                                <h4 className="font-medium text-green-800 mb-2">Submission #{index + 1}</h4>
                                <pre className="text-sm text-green-700 whitespace-pre-wrap">
                                    {JSON.stringify(submission, null, 2)}
                                </pre>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FormSample;