'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import Link from 'next/link';
import Image from '@/componant/ui/Image';
import { useRouter } from 'next/navigation';

const EIN = () => {
    const router = useRouter();


    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="">
            <button
                onClick={handleBack}
                className="cursor-pointer flex items-center justify-center gap-2"
                aria-label="Go back"
            >

                <Image
                    className="w-full"
                    url="/icons/arrow_left_two.svg"
                    alt="Arrow Left"
                    width={5}
                    height={10}
                />
                <span className='text-[16px] font-medium'>Back</span>
            </button>
            <ReusableForm formTitle="Employer Identification Number" onSubmit={handleSubmit} submitText="Submit" isAgree={true}>

                <InputField
                    name="company_document"
                    label="Company Document"
                    type="file"
                    required
                />

                <InputField
                    name="proof_residentail_address"
                    label="Proof of Residential Address"
                    type="file"
                    required
                />

                <InputField
                    name="business_description"
                    label="Business Description"
                    type="text"
                    inputClasss='h-[120px] rounded-xl'
                />
                <InputField
                    name="digital_signature"
                    label="Digital Signature*"
                    type="file"
                    required
                />
            </ReusableForm>
        </div>
    );
};

export default EIN;