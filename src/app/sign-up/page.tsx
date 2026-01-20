'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/componant/ui/Image";
import Link from "next/link";
import { API_CONFIG } from "@/config/api";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        remember: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            console.log('Submitting signup form...');
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.SIGNUP}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    phone: formData.phone,
                }),
            });

            const result = await response.json();
            console.log('Signup response:', result);

            if (result.status === 'success') {
                console.log('Signup successful, storing token and redirecting...');
                // Store token
                localStorage.setItem('auth_token', result.data.token);
                
                // Store user info if needed
                localStorage.setItem('user_info', JSON.stringify(result.data.user));
                
                // Small delay to ensure localStorage is updated
                setTimeout(() => {
                    console.log('Redirecting to /client...');
                    router.push('/client');
                }, 100);
            } else {
                // Handle validation errors
                if (result.errors) {
                    const errorMessages = Object.values(result.errors).flat();
                    setError(errorMessages.join(', '));
                } else {
                    setError(result.message || 'Registration failed');
                }
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl leading-9 font-semibold mb-2">Sign Up</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">Start for free</p>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}
                    
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Phone (Optional)</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#98A2B3" strokeWidth="1.5" />
                                            <line x1="1" y1="1" x2="23" y2="23" stroke="#98A2B3" strokeWidth="1.5" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                            <path d="M12 17c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#98A2B3" strokeWidth="1.5" />
                                            <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12z" stroke="#98A2B3" strokeWidth="1.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                    {showConfirmPassword ? (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#98A2B3" strokeWidth="1.5" />
                                            <line x1="1" y1="1" x2="23" y2="23" stroke="#98A2B3" strokeWidth="1.5" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                            <path d="M12 17c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#98A2B3" strokeWidth="1.5" />
                                            <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12z" stroke="#98A2B3" strokeWidth="1.5" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm leading-5 font-medium text-[#344054]">
                                <input 
                                    type="checkbox" 
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleInputChange}
                                    className="mr-2 rounded" 
                                />
                                Remember for 30 days
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                        {/* <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4 transition-colors"
                        >
                            <Image url="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                            Sign up with Google
                        </button> */}
                        <div className="text-center text-sm text-[#475467]">
                            Have an account?{' '}
                            <Link href="/login" className="text-[#7856FC] hover:underline font-medium">Log in</Link>
                        </div>
                    </form>
                </div>
                {/* Right: Image and Testimonial */}
                <div className="hidden md:flex flex-shrink-0 w-[590px] h-[840px] items-center justify-center relative">
                    <Image
                        url="/sign-up-page-steady-formations.png"
                        alt="Sign up page visual"
                        width={590}
                        height={840}
                        className="rounded-2xl object-cover w-[590px] h-[840px]"
                        priority={true}
                    />
                    {/* Testimonial Card */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg px-6 py-5 w-[90%] max-w-[500px] flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Image url="/rating-signup-icon.svg" alt="Rating" width={80} height={20} />
                        </div>
                        <div className="text-[#344054] text-[15px] leading-6 font-normal">
                            Their operating agreement service was on point my business setup process was smoother than expected team really know their job very happy.
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Image url="/daniel-avatar.svg" alt="Daniel Romero" width={32} height={32} className="rounded-full" />
                            <span className="text-[#344054] font-semibold text-[15px]">Daniel Romero</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 