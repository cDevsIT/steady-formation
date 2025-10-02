'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/componant/ui/Image";
import Link from "next/link";
import { API_CONFIG } from "@/config/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setSuccess(true);
                // Redirect to OTP verification page after 2 seconds
                setTimeout(() => {
                    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
                }, 2000);
            } else {
                setError(result.message || 'Failed to send OTP');
            }
        } catch (err) {
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
                    <h2 className="text-3xl font-semibold mb-2">Forgot your password?</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">
                        Don't worry! Enter your email address and we'll send you a verification code to reset your password.
                    </p>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            OTP sent successfully! Redirecting to verification page...
                        </div>
                    )}
                    
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                required
                                disabled={loading}
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>

                        <div className="text-center text-sm text-[#475467]">
                            Remember your password?{' '}
                            <Link href="/login" className="text-[#7856FC] hover:underline font-medium">Sign in</Link>
                        </div>
                    </form>
                </div>
                {/* Right: Image */}
                <div className="hidden md:flex flex-shrink-0 w-[590px] h-[840px] items-center justify-center">
                    <Image
                        url="/login-page-steady-formations.png"
                        alt="Forgot password page visual"
                        width={590}
                        height={840}
                        className="rounded-2xl object-cover w-[590px] h-[840px]"
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
}
