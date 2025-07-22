'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import Link from 'next/link';
import Image from '@/componant/ui/Image';
import { useRouter } from 'next/navigation';
import { companyTypes, serviceTypes } from '@/componant/funnel/funnel.type';

const OparetingAgreement = () => {
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
            <ReusableForm formTitle="Operating Agreement" onSubmit={handleSubmit} submitText="Submit" isAgree={true}>

                <InputField
                    name="company_document"
                    label="Company Document"
                    type="file"
                    required
                />

                <InputField
                    name="personal_identification_document"
                    label="Personal Identification Document"
                    type="file"
                    required
                />

                <InputField
                    name="proof_residential_address"
                    label="Proof of Residential Address"
                    type="text"
                    required
                    className='lg:col-span-2!'
                />

            </ReusableForm>
        </div>
    );
};

export default OparetingAgreement;