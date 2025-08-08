'use client';
import React, { useEffect, useState } from 'react';
import Image from '@/componant/ui/Image';
import Button from '@/componant/ui/Button';
import Link from 'next/link';
import { getUserProfile, UserProfile } from '@/services/userService';
import { getCountryName } from '@/lib/countries';
import { getTimezoneName } from '@/lib/timezones';
import { API_CONFIG } from '@/config/api';

export default function MyProfile() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching user profile...');
            
            const profile = await getUserProfile();
            console.log('Profile loaded:', profile);
            
            setUserProfile(profile);
        } catch (err) {
            console.error('Error fetching user profile:', err);
            setError(err instanceof Error ? err.message : 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Refresh profile data when returning from edit page
    useEffect(() => {
        const handleFocus = () => {
            fetchUserProfile();
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] w-[92%] sm:w-full mx-4 md:mx-0">
                <div className="w-full bg-white rounded-2xl shadow border border-[#E4E7EC] py-[15px] min-h-screen">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg">Loading profile...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] w-[92%] sm:w-full mx-4 md:mx-0">
                <div className="w-full bg-white rounded-2xl shadow border border-[#E4E7EC] py-[15px] min-h-screen">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg text-red-600">Error: {error}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] w-[92%] sm:w-full mx-4 md:mx-0">
                <div className="w-full bg-white rounded-2xl shadow border border-[#E4E7EC] py-[15px] min-h-screen">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg">No profile data available</div>
                    </div>
                </div>
            </div>
        );
    }

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
                        {userProfile.avatar ? (
                            <img 
                                src={`${API_CONFIG.BASE_URL.replace('/api', '')}/storage/${userProfile.avatar}`}
                                alt="Profile Avatar" 
                                width={56} 
                                height={56} 
                                className="rounded-full object-cover bg-[#F4F3FF]" 
                            />
                        ) : (
                            <Image url="/client/profile-icon1.svg" alt="Profile Icon" width={56} height={56} className="rounded-full object-cover bg-[#F4F3FF]" />
                        )}
                        <span className="font-semibold text-base">{userProfile.full_name}</span>
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
                    <div className="flex flex-col space-y-4">
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Email:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Phone:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Country of Residence:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Timezone:</span>
                        <span className="text-[#475467] font-normal text-[16px] leading-6">Password:</span>
                    </div>
                    {/* Field Values */}
                    <div className="flex flex-col space-y-4">
                        <span className="text-black font-normal text-[16px] leading-6">{userProfile.email}</span>
                        <span className="text-black font-normal text-[16px] leading-6">{userProfile.phone || 'Not provided'}</span>
                        <span className="text-black font-normal text-[16px] leading-6">
                            {userProfile.country_of_residence ? getCountryName(userProfile.country_of_residence) : 'Not provided'}
                        </span>
                        <span className="text-black font-normal text-[16px] leading-6">
                            {userProfile.timezone ? getTimezoneName(userProfile.timezone) : 'Not provided'}
                        </span>
                        <span className="text-black font-normal text-[16px] leading-6">*********</span>
                    </div>
                </div>

            </div>
        </div>
    );
} 