'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import Image from '@/componant/ui/Image';
import { useRouter } from 'next/navigation';

type ITINProps = {
    setIsSubmit: (value: boolean) => void;
};

const ITIN = ({ setIsSubmit }: ITINProps) => {
    const router = useRouter();


    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
        router.push("/client/services/info-submitted");
    };

    const handleBack = () => {
        setIsSubmit(false)
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
            <ReusableForm formTitle="Individual Taxpayer Identification Number" onSubmit={handleSubmit} submitText="Submit" isAgree={true}>

                <InputField
                    name="real_estate_sales_contract"
                    label="Real estate sales contract OR Settlement Statement (HUD-1)"
                    type="file"
                    required
                />

                <InputField
                    name="form_8288"
                    label="Completed Form 8288 or Form 8288-A or Form 8288-B"
                    type="file"
                    required
                />

                <InputField
                    name="passport_scan"
                    label="Passport Scan PDF (Applicant)"
                    type="file"
                    required
                />

                <InputField
                    name="home_country_address"
                    label="Your Home Country Address (Bank Statement Or Utility Bill)"
                    type="file"
                    required
                />

                <InputField
                    name="digital_signature"
                    label="Digital Signature"
                    type="file"
                    required
                    className='lg:col-span-2!'
                />
            </ReusableForm>
        </div>
    );
};

export default ITIN;