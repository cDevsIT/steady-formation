'use client';
import React, { useState } from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import ITIN from './ITIN';

const ApplyITIN = () => {
    const [isSubmit,setIsSubmit]=useState(false)
    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
        setIsSubmit(true)
    };

    if(isSubmit){
        return <ITIN setIsSubmit={setIsSubmit}/>
    }

    return (
        <ReusableForm onSubmit={handleSubmit} submitText="Continue" formTitle="Reason for Applying for ITIN" className=' min-h-[500px]'>
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
        </ReusableForm>
    );
};

export default ApplyITIN;