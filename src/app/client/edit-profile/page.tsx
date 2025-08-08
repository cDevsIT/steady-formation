'use client';
import React, { useState, useEffect } from 'react';
import Image from '@/componant/ui/Image';
import Button from '@/componant/ui/Button';
import { getUserProfile, updateUserProfile, updateUserPassword, UserProfile, UpdateProfileData, UpdatePasswordData } from '@/services/userService';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/api';
import { countries } from '@/lib/countries';
import { timezones } from '@/lib/timezones';

export default function EditProfile() {
    const router = useRouter();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    // Profile form state
    const [profileData, setProfileData] = useState<UpdateProfileData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country_of_residence: 'USA',
        timezone: 'America/New_York'
    });

    // Avatar upload state
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarUploading, setAvatarUploading] = useState(false);

    // Password form state
    const [passwordData, setPasswordData] = useState<UpdatePasswordData>({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    // Load user profile data
    const loadProfile = async () => {
        try {
            setLoading(true);
            const profile = await getUserProfile();
            
                            const newProfileData = {
                    first_name: profile.first_name || '',
                    last_name: profile.last_name || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    country_of_residence: profile.country_of_residence || 'USA',
                    timezone: profile.timezone || 'America/New_York',
                    avatar: profile.avatar || null
                };
            
            setProfileData(newProfileData);
            setError(null);
        } catch (err) {
            console.error('Error loading profile:', err);
            setError(err instanceof Error ? err.message : 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    // Handle profile form input changes
    const handleProfileChange = (field: keyof UpdateProfileData, value: string) => {
        console.log(`Updating ${field} to:`, value);
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle password form input changes
    const handlePasswordChange = (field: keyof UpdatePasswordData, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle avatar file selection
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setAvatar(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    // Handle avatar upload
    const handleAvatarUpload = async () => {
        if (!avatar) {
            setError('Please select an image to upload');
            return;
        }

        try {
            setAvatarUploading(true);
            setError(null);

            const formData = new FormData();
            formData.append('avatar', avatar);

            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPLOAD_AVATAR}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to upload avatar');
            }

            const result = await response.json();
            setSuccess('Avatar uploaded successfully!');
            
            // Clear avatar state
            setAvatar(null);
            setAvatarPreview(null);
            
            // Reload profile to get updated avatar
            await loadProfile();
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload avatar');
        } finally {
            setAvatarUploading(false);
        }
    };

    // Handle profile form submission
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            // Validate required fields
            if (!profileData.first_name?.trim()) {
                setError('First name is required');
                return;
            }
            if (!profileData.last_name?.trim()) {
                setError('Last name is required');
                return;
            }

            // Prepare update data
            const updateData = {
                first_name: profileData.first_name.trim(),
                last_name: profileData.last_name.trim(),
                phone: profileData.phone?.trim() || null,
                country_of_residence: profileData.country_of_residence?.trim() || null,
                timezone: profileData.timezone?.trim() || null
            };

            await updateUserProfile(updateData);
            setSuccess('Profile updated successfully!');
            
            // Redirect to my-profile page after 2 seconds
            setTimeout(() => {
                router.push('/client/my-profile');
            }, 1000);
        } catch (err) {
            if (err instanceof Error) {
                // Try to parse error message for validation errors
                try {
                    const errorData = JSON.parse(err.message);
                    if (errorData.errors) {
                        const errorMessages = Object.values(errorData.errors).flat();
                        setError(`Validation failed: ${errorMessages.join(', ')}`);
                    } else {
                        setError(errorData.message || err.message);
                    }
                } catch {
                    setError(err.message);
                }
            } else {
                setError('Failed to update profile');
            }
            console.error('Error updating profile:', err);
        } finally {
            setSaving(false);
        }
    };

    // Handle password form submission
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            setPasswordError(null);

            // Validate required fields
            if (!passwordData.current_password?.trim()) {
                setPasswordError('Current password is required');
                setSaving(false);
                return;
            }
            if (!passwordData.new_password?.trim()) {
                setPasswordError('New password is required');
                setSaving(false);
                return;
            }
            if (!passwordData.confirm_password?.trim()) {
                setPasswordError('Confirm password is required');
                setSaving(false);
                return;
            }

            if (passwordData.new_password !== passwordData.confirm_password) {
                setPasswordError('New passwords do not match');
                setSaving(false);
                return;
            }

            // Ensure minimum password length
            if (passwordData.new_password.length < 8) {
                setPasswordError('New password must be at least 8 characters long');
                setSaving(false);
                return;
            }

            const updatePasswordData = {
                current_password: passwordData.current_password.trim(),
                new_password: passwordData.new_password.trim(),
                confirm_password: passwordData.confirm_password.trim()
            };

            await updateUserPassword(updatePasswordData);
            setSuccess('Password updated successfully!');
            setPasswordError(null); // Clear any error messages
            setShowPasswordModal(false);
            
            // Clear password form
            setPasswordData({
                current_password: '',
                new_password: '',
                confirm_password: ''
            });

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            if (err instanceof Error) {
                // Try to parse error message for validation errors
                try {
                    const errorData = JSON.parse(err.message);
                    console.log('Password error data:', errorData);
                    
                    if (errorData.errors) {
                        // Check if all password fields are showing as required - this usually means wrong current password
                        const allFieldsRequired = errorData.errors.current_password && 
                                               errorData.errors.new_password && 
                                               errorData.errors.confirm_password &&
                                               errorData.errors.current_password.includes('required') &&
                                               errorData.errors.new_password.includes('required') &&
                                               errorData.errors.confirm_password.includes('required');
                        
                        if (allFieldsRequired) {
                            setPasswordError('Current password is incorrect');
                        } else if (errorData.errors.current_password && errorData.errors.current_password.includes('required')) {
                            setPasswordError('Current password is required');
                        } else if (errorData.errors.new_password && errorData.errors.new_password.includes('required')) {
                            setPasswordError('New password is required');
                        } else if (errorData.errors.confirm_password && errorData.errors.confirm_password.includes('required')) {
                            setPasswordError('Confirm password is required');
                        } else {
                            const errorMessages = Object.values(errorData.errors).flat();
                            setPasswordError(`Validation failed: ${errorMessages.join(', ')}`);
                        }
                    } else {
                        setPasswordError(errorData.message || err.message);
                    }
                } catch {
                    setPasswordError(err.message);
                }
            } else {
                setPasswordError('Failed to update password');
            }
            console.error('Error updating password:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-lg">Loading profile...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFB] flex flex-col items-center py-8 px-2">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow border border-[#E4E7EC] pt-4 pb-10">
                {/* Header */}
                <div className="flex items-center border-b border-[#E4E7EC] pb-4 mb-8">
                    <h2 className="text-lg font-semibold pl-6">My Profile</h2>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mx-6 mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mx-6 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Profile Image with Upload */}
                <div className="flex items-center gap-4 mb-8 pl-6">
                    <div className="relative w-20 h-20">
                        {avatarPreview ? (
                            <img 
                                src={avatarPreview} 
                                alt="Profile Preview" 
                                className="rounded-full object-cover w-20 h-20"
                            />
                        ) : profileData.avatar ? (
                            <img 
                                src={`${API_CONFIG.BASE_URL.replace('/api', '')}/storage/${profileData.avatar}`}
                                alt="Profile Avatar" 
                                className="rounded-full object-cover w-20 h-20"
                            />
                        ) : (
                            <Image 
                                url="/client/profile-icon1.svg" 
                                alt="Profile Icon" 
                                width={80} 
                                height={80} 
                                className="rounded-full object-cover w-20 h-20" 
                            />
                        )}
                        
                        {/* File input (hidden) */}
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                        
                        {/* Upload button */}
                        <label 
                            htmlFor="avatar-upload"
                            className="absolute -bottom-1 -right-1 bg-[#7856FC] rounded-full p-1 border-2 border-white shadow flex items-center justify-center cursor-pointer hover:bg-[#6840e0] transition-colors"
                        >
                            <Image url="/client/upload-icon1.svg" alt="Upload Icon" width={20} height={20} className="w-5 h-5" />
                        </label>
                    </div>
                    
                    {/* Upload button for selected file */}
                    {avatar && (
                        <div className="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={handleAvatarUpload}
                                disabled={avatarUploading}
                                className="px-4 py-2 bg-[#7856FC] text-white rounded-lg hover:bg-[#6840e0] transition-colors disabled:opacity-50 text-sm"
                            >
                                {avatarUploading ? 'Uploading...' : 'Upload Avatar'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setAvatar(null);
                                    setAvatarPreview(null);
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">First Name</label>
                        <input 
                            type="text"
                            value={profileData.first_name}
                            onChange={(e) => handleProfileChange('first_name', e.target.value)}
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" 
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">Last Name</label>
                        <input 
                            type="text"
                            value={profileData.last_name}
                            onChange={(e) => handleProfileChange('last_name', e.target.value)}
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" 
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">Phone</label>
                        <input 
                            type="tel"
                            value={profileData.phone || ''}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]" 
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">Country Of Residence</label>
                        <select 
                            value={profileData.country_of_residence || ''}
                            onChange={(e) => handleProfileChange('country_of_residence', e.target.value)}
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]"
                        >
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">Timezone</label>
                        <select 
                            value={profileData.timezone || ''}
                            onChange={(e) => handleProfileChange('timezone', e.target.value)}
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]"
                        >
                            <option value="">Select a timezone</option>
                            {timezones.map((timezone) => (
                                <option key={timezone.value} value={timezone.value}>
                                    {timezone.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[#475467] text-[14px] leading-5 font-medium">Password</label>
                        <input 
                            type="password" 
                            value="********" 
                            disabled
                            className="border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC] pr-10 bg-gray-100" 
                        />
                        <button type="button" className="absolute right-3 top-10 text-gray-400">
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path d="M10 4C5.45455 4 2 10 2 10C2 10 5.45455 16 10 16C14.5455 16 18 10 18 10C18 10 14.5455 4 10 4Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="10" cy="10" r="2.5" stroke="#667085" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button 
                            type="button"
                            onClick={() => {
                                setShowPasswordModal(true);
                                setPasswordError(null); // Clear any existing errors when opening modal
                            }} 
                            className="text-[#7856FC] text-[14px] leading-5 font-semibold absolute right-0 -bottom-7 hover:underline"
                        >
                            Change password
                        </button>
                    </div>
                </form>
            </div>

            {/* Save Button outside the box */}
            <div className="flex justify-end w-full max-w-5xl mt-6">
                <button 
                    type="button"
                    onClick={handleProfileSubmit}
                    disabled={saving}
                    className="w-full md:w-auto px-8 bg-[#7856FC] hover:bg-[#6840e0] text-white font-semibold py-3 rounded-xl shadow transition disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setShowPasswordModal(false);
                                setPasswordError(null); // Clear error when closing modal
                            }}
                            className="absolute -top-5 -right-6 cursor-pointer bg-white rounded-full shadow p-1 flex items-center justify-center"
                            aria-label="Close"
                        >
                            <Image url="/client/cross-icon.svg" alt="Close" width={24} height={24} />
                        </button>
                        
                        {/* Title */}
                        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
                        <div className="border-b" style={{ borderColor: '#E4E7EC' }}></div>
                        
                        {/* Error Message in Modal */}
                        {passwordError && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {passwordError}
                            </div>
                        )}
                        
                        {/* Form */}
                        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Current Password <span className="text-[#7856FC]">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) => handlePasswordChange('current_password', e.target.value)}
                                    className="w-full border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password <span className="text-[#7856FC]">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.new_password}
                                    onChange={(e) => handlePasswordChange('new_password', e.target.value)}
                                    className="w-full border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password <span className="text-[#7856FC]">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirm_password}
                                    onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                                    className="w-full border border-[#E4E7EC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7856FC]"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-[#7856FC] text-white font-semibold rounded-lg py-2 mt-2 hover:bg-[#6840e0] transition disabled:opacity-50"
                            >
                                {saving ? 'Updating...' : 'Save Password'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 