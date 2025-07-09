'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';

const ITIN = () => {
    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6">ITIN Application</h1>
            <ReusableForm onSubmit={handleSubmit} submitText="Submit">
                <InputField
                    name="itin_reason"
                    label="Select the reason for your ITIN application"
                    type="radio"
                    required
                    defaultValue="tax"
                    options={[
                        { label: 'U.S. Tax Filing', value: 'tax' },
                        { label: 'Opening a U.S. Bank Account', value: 'bank' },
                        { label: 'Receiving U.S. Income', value: 'income' },
                        { label: 'Other Reason', value: 'other' },
                    ]}
                />
                <InputField
                    name="digital_signature"
                    label="Digital Signature"
                    type="file"
                    required
                />
            </ReusableForm>
        </div>
    );
};

export default ITIN;