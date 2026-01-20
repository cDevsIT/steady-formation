'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "@/componant/ui/Image";
import Link from "next/link";
import { API_CONFIG } from "@/config/api";

function ResetPasswordContent() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const emailParam = searchParams.get('email');
        const tokenParam = searchParams.get('token');
        
        if (emailParam && tokenParam) {
            setEmail(emailParam);
            setToken(tokenParam);
        } else {
            // Redirect to forgot password if no token or email
            router.push('/forgot-password');
        }
    }, [searchParams, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePassword = (password: string) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
            errors: {
                minLength,
                hasUpperCase,
                hasLowerCase,
                hasNumbers,
                hasSpecialChar
            }
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            setError('Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setSuccess(true);
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(result.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const passwordValidation = validatePassword(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-2">Reset your password</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">
                        Please enter your new password below. Make sure it&apos;s secure and easy for you to remember.
                    </p>
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                            Password reset successfully! Redirecting to login...
                        </div>
                    )}
                    
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your new password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your new password"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Password Requirements */}
                        {formData.password && (
                            <div className="mb-6 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                                <ul className="text-xs space-y-1">
                                    <li className={`flex items-center ${passwordValidation.errors.minLength ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="mr-2">{passwordValidation.errors.minLength ? '✓' : '✗'}</span>
                                        At least 8 characters
                                    </li>
                                    <li className={`flex items-center ${passwordValidation.errors.hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="mr-2">{passwordValidation.errors.hasUpperCase ? '✓' : '✗'}</span>
                                        One uppercase letter
                                    </li>
                                    <li className={`flex items-center ${passwordValidation.errors.hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="mr-2">{passwordValidation.errors.hasLowerCase ? '✓' : '✗'}</span>
                                        One lowercase letter
                                    </li>
                                    <li className={`flex items-center ${passwordValidation.errors.hasNumbers ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="mr-2">{passwordValidation.errors.hasNumbers ? '✓' : '✗'}</span>
                                        One number
                                    </li>
                                    <li className={`flex items-center ${passwordValidation.errors.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="mr-2">{passwordValidation.errors.hasSpecialChar ? '✓' : '✗'}</span>
                                        One special character
                                    </li>
                                </ul>
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            disabled={loading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            {loading ? 'Resetting Password...' : 'Reset Password'}
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
                        alt="Reset password page visual"
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
