import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';

// Types
interface Country {
    name: string;
    code: string;
    dialCode: string;
    flag: string;
    phoneRegex: RegExp;
    format: string;
}

interface CompanyType {
    label: string;
    value: string;
    abbreviation: string;
}

interface InputFieldProps {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'phone' | 'company';
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    control?: any;
    errors?: FieldErrors;
    rules?: any;
    className?: string;
}

// Custom form data interface to avoid conflict with built-in FormData
interface CustomFormData {
    [key: string]: any;
}

// Country data with phone regex patterns and formats
const countries: Country[] = [
    { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸', phoneRegex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, format: '(XXX) XXX-XXXX' },
    { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧', phoneRegex: /^7\d{9}$/, format: '7XXX XXXXXX' },
    { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦', phoneRegex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/, format: '(XXX) XXX-XXXX' },
    { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺', phoneRegex: /^4\d{8}$/, format: '4XX XXX XXX' },
    { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪', phoneRegex: /^1[5-7]\d{8,9}$/, format: '1XX XXXX XXXX' },
    { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷', phoneRegex: /^[67]\d{8}$/, format: 'XX XX XX XX XX' },
    { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳', phoneRegex: /^[6-9]\d{9}$/, format: 'XXXXX XXXXX' },
    { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵', phoneRegex: /^[789]0\d{8}$/, format: 'XX XXXX XXXX' },
    { name: 'China', code: 'CN', dialCode: '+86', flag: '🇨🇳', phoneRegex: /^1[3-9]\d{9}$/, format: '1XX XXXX XXXX' },
    { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷', phoneRegex: /^[1-9]\d{10}$/, format: 'XX XXXXX XXXX' },
    { name: 'Bangladesh', code: 'BD', dialCode: '+880', flag: '🇧🇩', phoneRegex: /^1[3-9]\d{8}$/, format: '1XXX XXXXXX' }
];

// Company types data
const companyTypes: CompanyType[] = [
    { label: 'Limited Liability Company', value: 'llc', abbreviation: 'LLC' },
    { label: 'Corporation', value: 'corp', abbreviation: 'Corp' },
    { label: 'Incorporated', value: 'inc', abbreviation: 'Inc' },
    { label: 'Limited', value: 'ltd', abbreviation: 'Ltd' },
    { label: 'Partnership', value: 'partnership', abbreviation: 'LP' },
    { label: 'Limited Partnership', value: 'lp', abbreviation: 'LP' },
    { label: 'Professional Corporation', value: 'pc', abbreviation: 'PC' },
    { label: 'Limited Liability Partnership', value: 'llp', abbreviation: 'LLP' },
    { label: 'Public Limited Company', value: 'plc', abbreviation: 'PLC' },
    { label: 'Private Limited Company', value: 'pvt', abbreviation: 'Pvt Ltd' }
];

// Input Field Component
export const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    type,
    required = false,
    placeholder,
    options = [],
    defaultValue = '',
    control,
    errors = {},
    rules = {},
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState<CompanyType>(companyTypes[0]);
    const [companyTypeDropdownOpen, setCompanyTypeDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const companyTypeDropdownRef = useRef<HTMLDivElement>(null);

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setCountryDropdownOpen(false);
            }
            if (companyTypeDropdownRef.current && !companyTypeDropdownRef.current.contains(event.target as Node)) {
                setCompanyTypeDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Email validation
    const emailValidation = {
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    };

    // Phone validation
    const phoneValidation = {
        validate: (value: string) => {
            if (!value) return true;
            if (!selectedCountry.phoneRegex.test(value)) {
                return `Please use format: ${selectedCountry.format}`;
            }
            return true;
        }
    };

    // Company name validation
    const companyValidation = {
        validate: (value: string) => {
            if (!value) return true;
            if (value.length < 2) {
                return 'Company name must be at least 2 characters';
            }
            if (value.length > 100) {
                return 'Company name must be less than 100 characters';
            }
            return true;
        }
    };

    // Get validation rules based on type
    const getValidationRules = () => {
        const baseRules = { ...rules };

        if (required) {
            baseRules.required = `${label} is required`;
        }

        switch (type) {
            case 'email':
                return { ...baseRules, ...emailValidation };
            case 'phone':
                return { ...baseRules, ...phoneValidation };
            case 'company':
                return { ...baseRules, ...companyValidation };
            default:
                return baseRules;
        }
    };

    // Get selected option label
    const getSelectedLabel = (value: string) => {
        if (!value) return placeholder || 'Select an option';
        const selectedOption = options.find(option => option.value === value);
        return selectedOption ? selectedOption.label : placeholder || 'Select an option';
    };

    // Early return if no control is provided
    // if (!control) {
    //     return (
    //         <div className="mb-4">

    //             <label className="block text-sm font-medium text-gray-700 mb-1">
    //                 {label}
    //                 {required && <span className="text-red-500 ml-1">*</span>}
    //             </label>
    //             <div className="text-red-500 text-sm">Error: Control prop is required</div>
    //         </div>
    //     );
    // }

    // Render different input types
    const renderInput = (field: any) => {
        const { value, onChange, onBlur } = field;
        const hasError = errors[name];

        switch (type) {
            case 'select':
                return (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            onBlur={onBlur}
                            className={`w-full px-3 py-2 border rounded-md bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                                {getSelectedLabel(value)}
                            </span>
                            <svg
                                className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${isOpen ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {isOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'phone':
                return (
                    <div className="flex">
                        <div className="relative" ref={countryDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                                className={`px-3 py-2 border border-r-0 rounded-l-md bg-white flex items-center space-x-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <span className='text-[16px] text-[#344054]'>{selectedCountry.code}</span>
                                {/* <span className="text-sm">{selectedCountry.dialCode}</span> */}

                                <svg
                                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${countryDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {countryDropdownOpen && (
                                <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {countries.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCountry(country);
                                                setCountryDropdownOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center space-x-2"
                                        >
                                            <span>{country.flag}</span>
                                            <span>{country.name}</span>
                                            <span className="text-gray-500">{country.dialCode}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="tel"
                            value={value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            className={`flex-1 px-3 py-2 border rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                } ${className}`}
                        />
                    </div>
                );

            case 'company':
                return (
                    <div className="flex">
                        <div className="relative" ref={companyTypeDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setCompanyTypeDropdownOpen(!companyTypeDropdownOpen)}
                                className={`px-3 py-2 border border-r-0 rounded-l-md bg-white flex items-center space-x-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <span className="font-medium">{selectedCompanyType.abbreviation}</span>

                                <svg
                                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${companyTypeDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {companyTypeDropdownOpen && (
                                <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {companyTypes.map((companyType) => (
                                        <button
                                            key={companyType.value}
                                            type="button"
                                            onClick={() => {
                                                setSelectedCompanyType(companyType);
                                                setCompanyTypeDropdownOpen(false);
                                            }}
                                            className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{companyType.label}</span>
                                                <span className="text-gray-500 text-sm font-medium">{companyType.abbreviation}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            value={value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            className={`flex-1 px-3 py-2 border rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                    </div>
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${hasError ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                );

            default:
                return (
                    <input
                        type={type}
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                );
        }
    };

    return (
        <div className={`mb-1 col-span-2 lg:col-span-1 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-[#1570EF] ml-1">*</span>}
            </label>

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={getValidationRules()}
                render={({ field }) => renderInput(field)}
            />

            {errors[name] && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                    <span className="text-red-500 mr-1">⚠</span>
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    );
};

// Reusable Form Component
interface ReusableFormProps {
    onSubmit: (data: CustomFormData) => void;
    children: React.ReactNode;
    submitText?: string;
    className?: string;
    defaultValues?: CustomFormData;
    onFormStateChange?: (formMethods: any) => void;
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
    onSubmit,
    children,
    submitText = 'Submit',
    className = '',
    defaultValues = {},
    onFormStateChange
}) => {
    const formMethods = useForm({
        defaultValues,
        mode: 'onBlur'
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
        watch,
        setValue,
        getValues,
        trigger
    } = formMethods;

    useEffect(() => {
        if (onFormStateChange) {
            onFormStateChange({
                control,
                handleSubmit,
                formState: { errors, isSubmitting, isDirty, isValid },
                reset,
                watch,
                setValue,
                getValues,
                trigger,
                resetForm: () => reset(),
                setFieldValue: (name: string, value: any) => setValue(name, value),
                getFieldValue: (name: string) => getValues(name),
                getAllValues: () => getValues(),
                validateField: (name: string) => trigger(name),
                validateForm: () => trigger()
            });
        }
        // Only run once when component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFormSubmit = (data: CustomFormData) => {
        console.log('Form submitted successfully:', data);
        onSubmit(data);
    };

    // Clone children and pass required props
    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === InputField) {
            return React.cloneElement(child as React.ReactElement<InputFieldProps>, {
                control,
                errors
            });
        }
        return child;
    });

    return (
        <div className={`space-y-4 grid gap-2 grid-cols-1 lg:grid-cols-2 ${className}`}>
            {enhancedChildren}
            <button
                onClick={handleSubmit(onFormSubmit)}
                disabled={isSubmitting}
                className="col-span-1 lg:col-span-2 flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : submitText}
            </button>
        </div>
    );
};