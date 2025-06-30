import React from "react";
import Image from "../ui/Image";
import { useRouter } from "next/navigation";

const OwnersInfoComplete = () => {
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/');
    };
    return (
        <div className="flex justify-center items-start min-h-[70vh] mt-10 bg-white py-8 px-2">
            <div className="bg-gray-100 rounded-2xl max-w-[717px] w-full p-6 sm:p-10">
                {/* Confirmation Icon */}
                <div className="flex flex-col items-center gap-3 max-w-[525px] mx-auto">
                    <Image className="w-[76px]" url="/icons/confirm.svg" width={76} height={76} alt="Confirm" />
                    <h2 className="text-[24px] lg:text-[30px] font-semibold text-center mb-2">Owner information Submited!</h2>
                    <p className="text-[#6B7280] text-center mb-4 text-base font-normal">We will review your application 2 or 3 business days after complete, we&apos;re will inform you</p>
                    <button onClick={handleSubmit} className="bg-[#7856FC] hover:bg-[#6156fc] text-white font-medium rounded-md px-6 py-2 mb-6 transition">Go To Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default OwnersInfoComplete;