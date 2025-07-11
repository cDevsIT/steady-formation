import React from "react";
import Image from "@/componant/ui/Image";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white" style={{ marginTop: '30px' }}>
            <div className="w-full max-w-[1200px] flex flex-row items-center justify-center md:items-center md:justify-start space-x-[120px] px-4">
                {/* Left: Texts and Form */}
                <div className="flex-1 max-w-[440px] mx-auto text-center md:text-left">
                    <h2 className="text-3xl leading-9 font-semibold mb-2">Sign Up</h2>
                    <p className="text-[#475467] mb-8 text-[16px] leading-6 font-normal">Start for free</p>
                    <form className="w-full">
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#98A2B3" strokeWidth="1.5" /><path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12z" stroke="#98A2B3" strokeWidth="1.5" /></svg>
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm leading-5 font-medium text-[#344054] mb-1 text-left md:text-left">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 17c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="#98A2B3" strokeWidth="1.5" /><path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12z" stroke="#98A2B3" strokeWidth="1.5" /></svg>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm leading-5 font-medium text-[#344054]">
                                <input type="checkbox" className="mr-2 rounded" />
                                Remember for 30 days
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#7856FC] hover:bg-[#7756fcbd] text-white font-semibold py-2.5 rounded-md mb-3 transition-colors"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4 transition-colors"
                        >
                            <Image url="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
                            Sign in with Google
                        </button>
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