'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import Link from 'next/link';
import Image from '@/componant/ui/Image';
import { useRouter } from 'next/navigation';
import { serviceTypes } from '@/componant/funnel/funnel.type';

const EIN = () => {
    const router = useRouter();


    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
        router.push("/client/services/info-submitted");
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
                    label="Digital Signature"
                    type="file"
                    required
                />

                <InputField
                    name="ssn_itin"
                    label="SSN or ITIN (IF any)"
                    type="file"
                />

                <InputField
                    name="personal_identification"
                    label="Personal Identification Document"
                    type="file"
                    required
                />

                <InputField
                    name="us_mailing_address"
                    label="US Mailing Address"
                    type="text"
                    inputClasss=''
                />

                <InputField
                    name="service_type"
                    label="Service Type"
                    type="select"
                    required
                    placeholder="Select Service Type"
                    options={serviceTypes}
                />
            </ReusableForm>
        </div>
    );
};

export default EIN;