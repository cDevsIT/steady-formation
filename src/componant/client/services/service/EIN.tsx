'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import Link from 'next/link';

const EIN = () => {
    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
    };

    return (
        <div className="">
            <div className="w-full max-w-lg mb-6">
                <Link href="/services">
                    <button className="flex items-center gap-2 text-[#7856FC] border border-gray-200 bg-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                        &#8592; Back to Services
                    </button>
                </Link>
            </div>
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

export default EIN;