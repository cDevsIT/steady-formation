'use client';
import React from 'react';
import { ReusableForm, InputField } from '../../../ui/ReusableFormTwo';
import { companyTypes, serviceTypes, usStates, YesNo } from '@/componant/funnel/funnel.type';

const TransferRegisterAgent = () => {
    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
    };

    return (
        <ReusableForm onSubmit={handleSubmit} submitText="Continue" formTitle="Submit Company Transfer Information">
            <InputField
                name="state"
                label="State"
                type="select"
                required
                placeholder="Select State"
                options={usStates}
            />

            <InputField
                name="companyType"
                label="Company Type"
                type="select"
                required
                placeholder="Select Company Type"
                options={companyTypes}
            />

            <InputField
                name="companyName"
                label="Company Name"
                type="text"
                required
                placeholder="Type Company Name"
            />

            <InputField
                name="serviceType"
                label="Service Type"
                type="select"
                required
                placeholder="Select Service Type"
                options={serviceTypes}
            />

            <InputField
                name="notifyAttorney"
                label="Notify Your Attorney"
                type="select"
                required
                placeholder="Select Service Type"
                options={YesNo}
                defaultValue='yes'
            />

            <InputField
                name="attorneyEmail"
                label="Your attorney Email"
                type="email"
                required
                placeholder="Type Attorney Emal"
            />

            <div className=' flex justify-start items-center gap-2'>
                <input type="checkbox" name="hireUs" className='border-gray-300' />
                <span>Hire us to transfer registered agent </span>
            </div>


        </ReusableForm>
    );
};

export default TransferRegisterAgent;