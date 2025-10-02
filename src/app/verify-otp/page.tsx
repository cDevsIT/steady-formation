'use client';

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "@/componant/ui/Image";
import Link from "next/link";
import { API_CONFIG } from "@/config/api";

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        } else {
            // Redirect to forgot password if no email
            router.push('/forgot-password');
        }
    }, [searchParams, router]);

    useEffect(() => {
        // Start resend cooldown timer
        setResendCooldown(60);
        const timer = setInterval(() => {
            setResendCooldown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
        if (value.length <= 6) {
            setOtp(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setSuccess(true);
                // Redirect to reset password page after 1 second
                setTimeout(() => {
                    router.push(`/reset-password?token=${result.data.token}&email=${encodeURIComponent(email)}`);
                }, 1000);
            } else {
                setError(result.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendCooldown > 0) return;

        setResendLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/resend-otp`, {
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
                setResendCooldown(60);
                // Start cooldown timer again
                const timer = setInterval(() => {
                    setResendCooldown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                setError(result.message || 'Failed to resend OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-2">Verify your email</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">
                        We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter the code below.
                    </p>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            OTP verified successfully! Redirecting...
                        </div>
                    )}
                    
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Verification Code</label>
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                placeholder="Enter 6-digit code"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 text-center text-2xl tracking-widest"
                                required
                                disabled={loading}
                                maxLength={6}
                                autoComplete="off"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <div className="text-center text-sm text-[#475467] mb-4">
                            Didn't receive the code?{' '}
                            {resendCooldown > 0 ? (
                                <span className="text-gray-500">Resend in {resendCooldown}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={resendLoading}
                                    className="text-[#7856FC] hover:underline font-medium"
                                >
                                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                                </button>
                            )}
                        </div>

                        <div className="text-center text-sm text-[#475467]">
                            <Link href="/login" className="text-[#7856FC] hover:underline font-medium">Back to Sign in</Link>
                        </div>
                    </form>
                </div>
                {/* Right: Image */}
                <div className="hidden md:flex flex-shrink-0 w-[590px] h-[840px] items-center justify-center">
                    <Image
                        url="/login-page-steady-formations.png"
                        alt="OTP verification page visual"
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
