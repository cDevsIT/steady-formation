import React from 'react';
import Image from '@/componant/ui/Image';
import Button from '@/componant/ui/Button';
import Link from 'next/link';

export default function MyProfile() {
    return (
        <div className="min-h-screen bg-[#FAFAFB] w-[92%] sm:w-full mx-4 md:mx-0">
            <div className="w-full bg-white rounded-2xl shadow border border-[#E4E7EC] py-[15px] min-h-screen">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E4E7EC] pb-4 mb-4">
                    <h2 className="text-lg font-semibold pl-[24px]">My Profile</h2>
                </div>

                {/* Profile Row */}
                <div className="flex flex-row justify-between border-b border-[#E4E7EC] pb-4 mb-8">
                    <div className='flex flex-row items-center space-x-3 pl-[24px]'>
                        <Image url="/client/profile-icon1.svg" alt="Profile Icon" width={56} height={56} className="rounded-full object-cover bg-[#F4F3FF]" />
                        <span className="font-semibold text-base">Nasir Uddin</span>
                    </div>
                    <div className='mr-[24px]' >
                        <Link href="/client/edit-profile">
                            <Button theme="secondary" className="px-4 py-2 h-8 text-sm leading-5 text-[#475467] cursor-pointer mt-0">Edit</Button>
                        </Link>
                    </div>
                </div>

                {/* Details - Two Columns */}
                <div className="grid grid-cols-2 pl-[24px]">
                    {/* Field Names */}
                    <div className="flex flex-col space-y-4 w-[90%] sm:w-[40%]">
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Email:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Phone:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Country of Residence:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Timezone:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Password:</span>
                    </div>
                    {/* Field Values */}
                    <div className="flex flex-col space-y-4 w-[30%] sm:w-[10%] items-end">
                        <span className="text-black font-normal text-[16px] leading-6">nasirudding@gmail.com</span>
                        <span className="text-black font-normal text-[16px] leading-6">+88014517522</span>
                        <span className="text-black font-normal text-[16px] leading-6">USA</span>
                        <span className="text-black font-normal text-[16px] leading-6">USA</span>
                        <span className="text-black font-normal text-[16px] leading-6">*********</span>
                    </div>
                </div>

            </div>
        </div>
    );
} 