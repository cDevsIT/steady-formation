'use client';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { contactService, ContactFormData } from '@/services/contactService';
import TrustedCustomerSection from '@/componant/shared/TrustedCustomerSection';
import Image from '@/componant/ui/Image';
import PageHeader from '@/componant/ui/PageHeader';
import { useVisitorCountry } from '@/hooks/useVisitorCountry';
import { countries, Country } from '@/componant/ui/countries';

// Generate country codes from countries list
const countryCodes = countries.map(country => ({
    code: country.dialCode,
    country: country.code
}));

export default function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { countryCode: detectedCountryCode } = useVisitorCountry();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    
    // Get dial code from country code
    const getDialCodeFromCountryCode = (countryCode: string): string => {
        const country = countries.find(c => c.code === countryCode);
        return country?.dialCode || '+1';
    };

    const defaultDialCode = getDialCodeFromCountryCode(detectedCountryCode);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        trigger
    } = useForm<ContactFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            countryCode: defaultDialCode,
            subject: '',
            message: '',
            privacy: false
        }
    });

    // Watch country code changes
    const currentCountryCode = watch('countryCode');

    // Initialize selected country on mount
    useEffect(() => {
        const dialCode = getDialCodeFromCountryCode(detectedCountryCode);
        const country = countries.find(c => c.dialCode === dialCode);
        if (country) {
            setSelectedCountry(country);
        }
    }, []);

    // Update country code when detected country changes
    useEffect(() => {
        const dialCode = getDialCodeFromCountryCode(detectedCountryCode);
        setValue('countryCode', dialCode);
        const country = countries.find(c => c.dialCode === dialCode);
        if (country) {
            setSelectedCountry(country);
        }
        // Re-validate phone when country changes
        trigger('phone');
    }, [detectedCountryCode, setValue, trigger]);

    // Update selected country when countryCode changes
    useEffect(() => {
        if (currentCountryCode) {
            const country = countries.find(c => c.dialCode === currentCountryCode);
            if (country) {
                setSelectedCountry(country);
            }
        }
    }, [currentCountryCode]);

    const privacyAccepted = watch('privacy');

    const onSubmit = async (data: ContactFormData) => {
        if (!data.privacy) {
            toast.error('Please accept the privacy policy');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await contactService.submitContactForm(data);

            if (response.success) {
                toast.success(response.message);
                reset();
            } else {
                throw new Error(response.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
       <div>
            <PageHeader
                title="Get in Touch"
                subTitle="Contact our expert support team. Ask query to our team and get solutions 24/7 from anywhere."
                page="Contact Us"
            />
            <main className="w-full max-w-[390px] md:max-w-[980px] xl:max-w-[1512px] mx-auto min-h-screen bg-white text-black">


                <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-8 md:py-12 lg:py-16 px-0 sm:px-6 lg:px-8">

                    <h2 className="text-[30px] md:text-[40px] lg:text-[48px] font-semibold text-left mt-10 md:mt-16 lg:mt-20 w-full md:w-3/4 lg:w-2/4 leading-[38px] md:leading-[52px] lg:leading-[60px] font-inter lg:mb-6">
                        Our friendly team would love to hear from you.
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mt-6">
                        {/* Left side - Contact Form */}
                        <div className="w-full lg:w-[52%]">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Name Fields Row */}
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-1/2">
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            rules={{ required: 'First name is required' }}
                                            render={({ field }) => (
                                                <div>
                                                    <label htmlFor="firstName" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                        First Name *
                                                    </label>
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        id="firstName"
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                        placeholder="First name"
                                                    />
                                                    {errors.firstName && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            rules={{ required: 'Last name is required' }}
                                            render={({ field }) => (
                                                <div>
                                                    <label htmlFor="lastName" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                        Last Name *
                                                    </label>
                                                    <input
                                                        {...field}
                                                        type="text"
                                                        id="lastName"
                                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                        placeholder="Last name"
                                                    />
                                                    {errors.lastName && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="mt-6">
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please enter a valid email address'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <div>
                                                <label htmlFor="email" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                    Email *
                                                </label>
                                                <input
                                                    {...field}
                                                    type="email"
                                                    id="email"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    placeholder="you@company.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                                

                                {/* Phone Field */}
                                <div className="mt-6">
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            validate: (value: string | undefined) => {
                                                if (!value) return true; // Phone is optional
                                                if (!selectedCountry || !selectedCountry.phoneRegex) return true;
                                                if (!selectedCountry.phoneRegex.test(value)) {
                                                    return `Please use format: ${selectedCountry.format}`;
                                                }
                                                return true;
                                            }
                                        }}
                                        render={({ field }) => {
                                            const placeholder = selectedCountry?.format || 'Enter phone number';
                                            
                                            return (
                                                <div>
                                                    <label htmlFor="phone" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                        Phone Number
                                                    </label>
                                                    <div className="relative flex items-center">
                                                        <Controller
                                                            name="countryCode"
                                                            control={control}
                                                            render={({ field: countryField }) => (
                                                                <select
                                                                    {...countryField}
                                                                    onChange={(e) => {
                                                                        countryField.onChange(e);
                                                                        const country = countries.find(c => c.dialCode === e.target.value);
                                                                        if (country) {
                                                                            setSelectedCountry(country);
                                                                        }
                                                                        // Re-validate phone when country changes
                                                                        setTimeout(() => trigger('phone'), 0);
                                                                    }}
                                                                    className="absolute left-0 w-[90px] pl-4 pr-8 py-3 bg-transparent border-0 appearance-none z-10 focus:ring-0"
                                                                >
                                                                    {countryCodes.map((country) => (
                                                                        <option key={country.code} value={country.code}>
                                                                            {country.country}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        />
                                                        <div className="pointer-events-none absolute left-[45px] top-1/2 -translate-y-1/2">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            {...field}
                                                            type="tel"
                                                            id="phone"
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                // Trigger validation on input change
                                                                setTimeout(() => trigger('phone'), 0);
                                                            }}
                                                            className={`w-full pl-24 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                                            placeholder={placeholder}
                                                        />
                                                    </div>
                                                    {errors.phone && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                                    )}
                                                </div>
                                            );
                                        }}
                                    />
                                </div>

                                {/* Subject Field */}
                                <div className="mt-6">
                                    <Controller
                                        name="subject"
                                        control={control}
                                        rules={{ required: 'Subject is required' }}
                                        render={({ field }) => (
                                            <div>
                                                <label htmlFor="subject" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                    Subject *
                                                </label>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    id="subject"
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    placeholder="Subject"
                                                />
                                                {errors.subject && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="mt-6">
                                    <Controller
                                        name="message"
                                        control={control}
                                        rules={{
                                            required: 'Message is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Message must be at least 10 characters'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <div>
                                                <label htmlFor="message" className="block text-[14px] font-medium text-[#344054] mb-2 font-inter leading-[20px]">
                                                    Message *
                                                </label>
                                                <textarea
                                                    {...field}
                                                    id="message"
                                                    rows={4}
                                                    className={`w-full px-4 py-5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    placeholder="Leave us a message..."
                                                />
                                                {errors.message && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Privacy Policy Checkbox */}
                                <div className="mt-6 flex items-start gap-3">
                                    <Controller
                                        name="privacy"
                                        control={control}
                                        rules={{ required: 'You must accept the privacy policy' }}
                                        render={({ field }) => (
                                            <div className="flex items-center h-6">
                                                <input
                                                    id="privacy"
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) => field.onChange(e.target.checked)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                            </div>
                                        )}
                                    />
                                    <label htmlFor="privacy" className="text-[14px] text-[#344054] font-inter leading-[20px] cursor-pointer">
                                        You agree to our friendly <span className="underline">privacy policy</span>.
                                    </label>
                                </div>
                                {errors.privacy && (
                                    <p className="text-red-500 text-sm mt-1">{errors.privacy.message}</p>
                                )}

                                {/* Send Message Button */}
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7856FC] focus:ring-offset-2 transition-colors ${isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[#7856FC] hover:bg-[#6745e3] text-white'
                                            }`}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send message'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right side - Image */}
                        <div className="w-full lg:w-[48%] lg:flex lg:items-stretch">
                            <div className="w-full h-full relative flex items-center justify-center">
                                <Image
                                    url="/steady-formations-contact-page.png"
                                    alt="Contact Us"
                                    className="w-full h-full object-cover rounded-lg"
                                    fill={true}
                                    priority={true}
                                />
                                {/* Overlayed Icons - individually positioned */}
                                <span className="absolute top-[15%] right-[40%] bg-white rounded-full shadow-md flex items-center justify-center w-16 h-16 z-10">
                                    <Image url="/call-icon.svg" alt="Call" width={30} height={30} />
                                </span>
                                <span className="absolute top-[10%] right-[18%] -translate-x-1/2 bg-white rounded-full shadow-md flex items-center justify-center w-16 h-16 z-10">
                                    <Image url="/inbox-icon.svg" alt="Inbox" width={30} height={30} />
                                </span>
                                <span className="absolute top-[12%] right-[8%] bg-white rounded-full shadow-md flex items-center justify-center w-16 h-16 z-10">
                                    <Image url="/chat-icon.svg" alt="Chat" width={30} height={30} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Cards Section */}
                <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-8 md:py-12 px-0 sm:px-6 lg:px-8 mt-[40px] mb-[80px]">
                    <h2 className="text-[38px] md:text-[48px] font-semibold text-center mb-[10px] font-inter leading-[38px] md:leading-[60px] text-[#000000]">
                        We&apos;d love to hear from you
                    </h2>
                    <h3 className="text-[16px] md:text-[20px] font-normal text-center mb-[32px] font-inter leading-[24px] md:leading-[30px] text-[#475467]">
                        Our friendly team is always here to chat.
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Chat to sales Card */}
                        <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                            <div className="mb-8">
                                <Image url="/steady-formation-smile-icon.svg" alt="Support icon" width={48} height={48} />
                            </div>
                            <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Chat to sales</h4>
                            <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Speak to our friendly team.</p>
                            <a href="mailto:info@steadyformation.com" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px] overflow-auto break-all">
                                info@steadyformation.com
                            </a>
                        </div>

                        {/* Chat to support Card */}
                        <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                            <div className="mb-8">
                                <Image url="/steady-formation-chat-icon.svg" alt="Chat icon" width={48} height={48} />
                            </div>
                            <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Chat to support</h4>
                            <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">We&apos;re here to help.</p>
                            <a href="mailto:info@steadyformation.com" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px] overflow-auto break-all">
                                info@steadyformation.com
                            </a>
                        </div>

                        {/* Visit us Card */}
                        <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                            <div className="mb-8">
                                <Image url="/steady-formation-visit-us-icon.svg" alt="Location icon" width={48} height={48} />
                            </div>
                            <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Visit us</h4>
                            <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Visit our office HQ.</p>
                            <p className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                                75 E 3RD ST STE <br />
                                A70 SHERIDAN, WY 82801
                            </p>
                        </div>

                        {/* Call us Card */}
                        <div className="p-6 rounded-lg border border-gray-200 flex flex-col items-start text-left">
                            <div className="mb-8">
                                <Image url="/steady-formation-phone-icon.svg" alt="Phone icon" width={48} height={48} />
                            </div>
                            <h4 className="text-[20px] font-semibold mb-[20px] font-inter leading-[30px]">Call us</h4>
                            <p className="text-[16px] font-normal text-[#475467] mb-[16px] font-inter leading-[24px]">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+1555000-0000" className="text-[16px] text-[#7856FC] font-semibold font-inter leading-[24px]">
                                +1 (307) 400-1051
                            </a>
                        </div>
                    </div>
                </div>

                {/* Trusted Customers Section */}
                <div className='mb-36'>
                    <TrustedCustomerSection />
                </div>
            </main>
       </div>
    );
} 