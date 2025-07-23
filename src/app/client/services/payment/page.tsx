'use client';
import Payment from "@/componant/client/services/service/Payment";
import { CustomFormData } from "@/componant/ui/FormSample";

const page = () => {
    const handleFormSubmit = (data: CustomFormData) => {
        console.log(data)
    };
    return (
        <Payment handleFormSubmit={handleFormSubmit} />
    );
};

export default page;