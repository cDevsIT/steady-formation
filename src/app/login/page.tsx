import React from "react";
import Image from "@/componant/ui/Image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">Welcome back! Please enter your details.</p>
                    <form className="w-full">
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm leading-5 font-medium text-[#344054]">
                                <input type="checkbox" className="mr-2 rounded" />
                                Remember for 30 days
                            </label>
                            <Link href="#" className="text-sm text-[#7856FC] hover:underline font-semibold">Forgot password</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4 transition-colors"
                        >
                            <Image url="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                            Sign in with Google
                        </button>
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