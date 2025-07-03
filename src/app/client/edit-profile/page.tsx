import React from 'react';
import Image from '@/componant/ui/Image';
import Button from '@/componant/ui/Button';

export default function EditProfile() {
    return (
        <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                {/* Header */}
                <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                    <h2 className="text-lg font-semibold pl-6">My Profile</h2>
                </div>
                {/* Profile Image with Upload */}
                <div className="flex items-center gap-4 mb-8 pl-6">
                    <div className="relative w-20 h-20">
                        <Image url="/client/profile-icon1.svg" alt="Profile Icon" width={80} height={80} className="rounded-full object-cover w-20 h-20" />
                        <button className="absolute -bottom-1 -right-1 bg-[#7856FC] rounded-full p-1 border-2 border-white shadow flex items-center justify-center">
                            <Image url="/client/upload-icon1.svg" alt="Upload Icon" width={20} height={20} className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                {/* Form Fields */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[15px] font-medium">Full Name</label>
                        <input className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" defaultValue="Nurency" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[15px] font-medium">Email</label>
                        <input className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" defaultValue="Nurency" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[15px] font-medium">Phone</label>
                        <input className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" defaultValue="Nurency" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[15px] font-medium">Country Of Residence</label>
                        <select className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]">
                            <option>USA</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[15px] font-medium">Timezone</label>
                        <select className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]">
                            <option>USA</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[#475467] text-[15px] font-medium">Password</label>
                        <input type="password" className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC] pr-10" defaultValue="********" />
                        <button type="button" className="absolute right-3 top-9 text-gray-400">
                            {/* Eye icon placeholder */}
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 4C5.45455 4 2 10 2 10C2 10 5.45455 16 10 16C14.5455 16 18 10 18 10C18 10 14.5455 4 10 4Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="10" r="2.5" stroke="#667085" strokeWidth="1.5" /></svg>
                        </button>
                        <a href="#" className="text-[#7856FC] text-xs absolute right-0 -bottom-6 hover:underline">Change password</a>
                    </div>
                </form>
            </div>
            {/* Save Button outside the box */}
            <div className="flex justify-end w-full max-w-5xl mt-6">
                <Button theme="primary" className="px-8">Save Change</Button>
            </div>
        </div>
    );
} 