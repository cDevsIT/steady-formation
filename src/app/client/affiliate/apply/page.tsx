"use client";
import React, { useState } from "react";
import Image from '@/componant/ui/Image';
import { useRouter } from 'next/navigation';

const payoutMethods = ["Stripe", "Payoneer", "Wise", "Wire Transfer"];
const referralSources = ["Social Media", "Blog/Website", "YouTube", "Podcast", "Other"];

export default function AffiliateApplyPage() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        socialLink: "",
        audienceSize: "",
        payoutMethod: payoutMethods[0],
        country: "",
        website: "",
        referralSource: referralSources[0],
        promotedBefore: "yes",
        promotedExplain: "",
        whyAffiliate: "",
        agree: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const validate = () => {
        const newErrors: any = {};
        if (!form.fullName) newErrors.fullName = "Required";
        if (!form.email) newErrors.email = "Required";
        if (!form.phone) newErrors.phone = "Required";
        if (!form.socialLink) newErrors.socialLink = "Required";
        if (!form.audienceSize) newErrors.audienceSize = "Required";
        if (!form.country) newErrors.country = "Required";
        if (form.promotedBefore === "yes" && !form.promotedExplain) newErrors.promotedExplain = "Required";
        if (!form.whyAffiliate) newErrors.whyAffiliate = "Required";
        if (!form.agree) newErrors.agree = "You must agree to terms";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            setSubmitted(true);
            // Submit logic here
        }
    };

    if (submitted) {
        return (
            <div>
                <div className="flex items-center justify-between mt-8">
                    <div>
                        <h1 className="text-[32px] font-bold leading-[40px] mb-1">Thanks for your registration</h1>
                        <div className="text-[16px] text-[#667085] font-normal leading-[24px]">For the affiliate program&nbsp; We are reversing and get back to soon</div>
                    </div>
                    <span className="inline-block bg-[#F2F4F7] text-[#667085] text-[14px] font-medium rounded px-3 py-1 h-[28px]">Pending</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header with back button and title */}
            <div className="flex items-center justify-center relative h-14 mb-4 border-b border-[#E4E7EC] bg-white md:hidden">
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-gray-100 md:hidden"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <Image url="/client/chevron-left.svg" alt="Back" width={24} height={24} className="w-6 h-6" />
                </button>
                <span className="text-[16px] font-semibold text-[#101828]">Apply As An Affiliate</span>
            </div>
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 md:p-8">
                <h1 className="text-lg font-semibold mb-6">Apply As An Affiliate</h1>
                <form id="affiliate-apply-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Full Name</label>
                            <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                            {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Email</label>
                            <input name="email" value={form.email} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Phone Number with country code</label>
                            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" placeholder="+8812345678" />
                            {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Social Media Link</label>
                            <input name="socialLink" value={form.socialLink} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                            {errors.socialLink && <span className="text-xs text-red-500">{errors.socialLink}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Audience Size</label>
                            <input name="audienceSize" value={form.audienceSize} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                            {errors.audienceSize && <span className="text-xs text-red-500">{errors.audienceSize}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Preferred Payout Method</label>
                            <div className="relative">
                                <select name="payoutMethod" value={form.payoutMethod} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2 appearance-none pr-10">
                                    {payoutMethods.map((m) => <option key={m}>{m}</option>)}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                    <Image url="/client/arrow-down.svg" alt="Dropdown Arrow" width={16} height={16} className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Country/Location</label>
                            <input name="country" value={form.country} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                            {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
                        </div>
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Website Link (Optional)</label>
                            <input name="website" value={form.website} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Referral Source</label>
                        <div className="relative">
                            <select name="referralSource" value={form.referralSource} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2 appearance-none pr-10">
                                {referralSources.map((s) => <option key={s}>{s}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                <Image url="/client/arrow-down.svg" alt="Dropdown Arrow" width={16} height={16} className="w-4 h-4" />
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Have you promoted similar products before?</label>
                        <div className="flex flex-col gap-2 mt-1">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="promotedBefore" value="yes" checked={form.promotedBefore === "yes"} onChange={handleChange} className="accent-[#7856FC]" />
                                Yes
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="promotedBefore" value="no" checked={form.promotedBefore === "no"} onChange={handleChange} className="accent-[#7856FC]" />
                                No
                            </label>
                        </div>
                    </div>
                    {form.promotedBefore === "yes" && (
                        <div>
                            <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Please explain</label>
                            <textarea name="promotedExplain" value={form.promotedExplain} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2 min-h-[60px]" />
                            {errors.promotedExplain && <span className="text-xs text-red-500">{errors.promotedExplain}</span>}
                        </div>
                    )}
                    <div>
                        <label className="block text-[14px] font-medium leading-[20px] text-[#475467] mb-1">Why do you want to be an affiliate?</label>
                        <textarea name="whyAffiliate" value={form.whyAffiliate} onChange={handleChange} className="w-full border border-[#E4E7EC] rounded px-3 py-2 min-h-[60px]" />
                        {errors.whyAffiliate && <span className="text-xs text-red-500">{errors.whyAffiliate}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="accent-purple-500" />
                        <label className="text-[14px] font-medium leading-[20px] text-[#475467]">I Agree Terms & Conditions Checkbox</label>
                        {errors.agree && <span className="text-xs text-red-500 ml-2">{errors.agree}</span>}
                    </div>
                </form>
            </div>
            <div className="flex justify-end mt-4">
                <button type="submit" form="affiliate-apply-form" className="bg-[#7856FC] text-white font-semibold rounded px-8 py-2 mt-2 hover:bg-purple-600 transition disabled:opacity-50" disabled={submitted}>Submit</button>
            </div>
        </div>
    );
} 