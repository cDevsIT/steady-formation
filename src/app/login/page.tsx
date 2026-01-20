'use client';

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "@/componant/ui/Image";
import Link from "next/link";
import { API_CONFIG } from "@/config/api";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [urlParams, setUrlParams] = useState<{email?: string, password?: string}>({});
    const router = useRouter();

    const performLogin = useCallback(async (email: string, password: string) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                // Store token
                localStorage.setItem('auth_token', result.data.token);
                
                // Store user info if needed
                localStorage.setItem('user_info', JSON.stringify(result.data.user));
                
                // Redirect to client dashboard
                router.push('/client');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [router]);

    const handleAutoLogin = useCallback(async (email: string, password: string) => {
        await performLogin(email, password);
    }, [performLogin]);

    // Set client-side flag and parse URL parameters
    useEffect(() => {
        setIsClient(true);
        
        // Parse URL parameters manually
        if (typeof window !== 'undefined') {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const email = urlSearchParams.get('email');
            const password = urlSearchParams.get('password');
            
            if (email && password) {
                setUrlParams({ email, password });
                setFormData(prev => ({
                    ...prev,
                    email: email,
                    password: password
                }));
                
                // Auto-submit the form if both email and password are provided
                setTimeout(() => {
                    handleAutoLogin(email, password);
                }, 500); // Small delay to ensure form is updated
            }
        }
    }, [handleAutoLogin]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await performLogin(formData.email, formData.password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">Welcome back! Please enter your details.</p>
                    
                    {isClient && urlParams.email && urlParams.password && (
                        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                                Auto-logging in with provided credentials...
                            </div>
                        </div>
                    )}
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}
                    
                    <form className="w-full" onSubmit={handleSubmit}>
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
                        <div className="mb-2">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                                required
                            />
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
                            <Link href="/forgot-password" className="text-sm text-[#7856FC] hover:underline font-semibold">Forgot password</Link>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                        {/* <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4 transition-colors"
                        >
                            <Image url="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                            Sign in with Google
                        </button> */}
                        <div className="text-center text-sm text-[#475467]">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="text-[#7856FC] hover:underline font-medium">Sign up</Link>
                        </div>
                    </form>
                </div>
                {/* Right: Image */}
                <div className="hidden md:flex flex-shrink-0 w-[590px] h-[840px] items-center justify-center">
                    <Image
                        url="/login-page-steady-formations.png"
                        alt="Login page visual"
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

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}

// Force dynamic rendering to avoid SSR issues with useSearchParams
export const dynamic = 'force-dynamic'; 