'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import Image from './Image';

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
    type: 'text' | 'number' | 'email' | 'select' | 'phone' | 'company' | 'radio' | 'file'; // Added 'radio' and 'file'
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string | number | boolean }[];
    defaultValue?: string;
    control?: any;
    errors?: FieldErrors;
    rules?: any;
    className?: string;
    disabled?: boolean;
    belowText?: string;
    inputClasss?:string;
    supportingText?:string
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
    className = '',
    disabled = false,
    belowText = '',
    inputClasss = '',
    supportingText= ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [selectedCompanyType, setSelectedCompanyType] = useState<CompanyType>(companyTypes[0]);
    const [companyTypeDropdownOpen, setCompanyTypeDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const companyTypeDropdownRef = useRef<HTMLDivElement>(null);

    // File input hooks (moved to top level)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');

    // File input handlers (top-level)
    const handleFileChange = (onChange: (file: File) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };
    const handleDrop = (onChange: (file: File) => void) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileName(e.dataTransfer.files[0].name);
            onChange(e.dataTransfer.files[0]);
        }
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
    };

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
    const RenderInput = (field: any) => {
        const { value, onChange, onBlur } = field;
        const hasError = errors[name];

        switch (type) {
            case 'select':
                return (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => !disabled && setIsOpen(!isOpen)}
                            onBlur={onBlur}
                            disabled={disabled}
                            className={`w-full px-3 py-2 border rounded-md bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
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

                        {isOpen && !disabled && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                {options.map((option, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            onBlur();
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}



                        {belowText && <span className='text-sm font-normal text-gray-600'>{belowText}</span>}
                    </div>
                );

            case 'phone':
                return (
                    <div className="flex">
                        <div className="relative" ref={countryDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                                disabled={disabled}
                                className={`px-3 py-2 border border-r-0 rounded-l-md bg-white flex items-center space-x-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                    } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
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

                            {countryDropdownOpen && !disabled && (
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
                            disabled={disabled}
                            className={`flex-1 px-3 py-2 border rounded-r-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''} ${className}`}
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
                                disabled={disabled}
                                className={`px-3 py-2 border border-r-0 rounded-l-md bg-white flex items-center space-x-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                    } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
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

                            {companyTypeDropdownOpen && !disabled && (
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
                            disabled={disabled}
                            className={`flex-1 px-3 py-2 border rounded-r-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${hasError ? 'border-red-500' : 'border-gray-300'
                                } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
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
                        disabled={disabled}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${hasError ? 'border-red-500' : 'border-gray-300'
                            } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                    />
                );

            case 'radio':
                return (
                    <div className="space-y-2">
                        {options.map((option, idx) => (
                            <label key={idx} className="flex items-center space-x-2 cursor-pointer select-none">
                                <input
                                    type="radio"
                                    name={name}
                                    value={String(option.value)}
                                    checked={value == option.value}
                                    onChange={() => onChange(option.value)}
                                    onBlur={onBlur}
                                    disabled={disabled}
                                    className="accent-[#7856FC] w-4 h-4 border-gray-300 focus:ring-2 focus:ring-[#7856FC]"
                                    required={required}
                                />
                                <span className="text-gray-900 text-[15px]">{option.label}</span>
                            </label>
                        ))}
                        {belowText && <span className='text-sm font-normal text-gray-600'>{belowText}</span>}
                    </div>
                );
            case 'file':
                // Handlers use top-level state/hooks
                return (
                    <div
                        className={`flex flex-col items-center justify-center border ${dragActive ? 'border-[#7856FC]' : 'border-gray-300'}  rounded-xl py-6 px-4 transition-colors duration-200 bg-white cursor-pointer w-full relative`}
                        onClick={() => !disabled && fileInputRef.current?.click()}
                        onDrop={handleDrop(onChange)}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        tabIndex={0}
                        style={{ outline: 'none' }}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange(onChange)}
                            onBlur={onBlur}
                            disabled={disabled}
                            required={required}
                        />
                        <div className="flex flex-col items-center">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F3FF] mb-2">
                                <Image
                                    url='/client/file_upload.svg'
                                    alt='Upload File'
                                    width={40}
                                    height={40}
                                />
                            </span>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-gray-500 text-sm'><span className="text-[#7856FC] font-medium text-base gap-1">Click to upload</span> or drag and drop</p>
                                <p className='text-xs font-normal text-gray-600'>{supportingText}</p>
                            </div>
                            {(fileName || (value && value.name)) && <span className="mt-2 text-gray-700 text-sm">{fileName || (value && value.name)}</span>}
                        </div>
                    </div>
                );

            default:
                return (
                    <input
                        type={type}
                        value={value || ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputClasss} ${hasError ? 'border-red-500' : 'border-gray-300'
                            } ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                    />
                );
        }
    };

    // Set default value for radio and file if not already set
    useEffect(() => {
        if (control && control._formValues && control._formValues[name] === undefined && defaultValue !== undefined) {
            control._formValues[name] = defaultValue;
        }
    }, [control, name, defaultValue]);

    return (
        <div className={`mb-1 col-span-2 lg:col-span-1 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-[#1570EF] ml-1">*</span>}
            </label>

            <Controller
                name={name}
                control={control}
                rules={getValidationRules()}
                render={({ field }) => RenderInput(field)}
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
    formTitle?: string;
    isAgree?: boolean;
    isModal?:boolean
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
    onSubmit,
    children,
    submitText = 'Submit',
    className = '',
    defaultValues = {},
    onFormStateChange,
    formTitle,
    isAgree = false,
    isModal=false
}) => {
    // Collect defaultValue from each InputField child
    let mergedDefaultValues = { ...defaultValues };
    React.Children.forEach(children, (child) => {
        if (
            React.isValidElement(child) &&
            (child.type === InputField || (typeof child.type === 'function' && child.type.name === 'InputField')) &&
            typeof child.props === 'object' &&
            child.props !== null &&
            'name' in child.props &&
            'defaultValue' in child.props &&
            (child.props as Record<string, any>).name &&
            (child.props as Record<string, any>).defaultValue !== undefined
        ) {
            const props = child.props as Record<string, any>;
            if (mergedDefaultValues[props.name] === undefined) {
                mergedDefaultValues[props.name] = props.defaultValue;
            }
        }
    });

    const formMethods = useForm({
        defaultValues: mergedDefaultValues,
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
        <div className='w-full'>
            <div className={`${isModal ?'': 'border border-gray-200 rounded-3xl'} `}>
                {formTitle && <h2 className={`text-lg font-semibold text-black m-0 border-b border-gray-200 py-3 pl-4`}>{formTitle}</h2>} 
                <div className={`space-y-4 grid gap-4 grid-cols-1 lg:grid-cols-2 ${className}  py-3 px-4`}>
                    {enhancedChildren}
                    {isAgree && (
                        <div className="flex justify-start items-center gap-2 col-span-2">
                            <input type="checkbox" id="hireUs" name="hireUs" className="border-gray-300" />
                            <label htmlFor="hireUs" className='text-gray-600'>I Agree Terms & Conditions Checkbox</label>
                        </div>
                    )}
                </div>
            </div>
            <div className='py-3 flex justify-end'>
                <button
                    onClick={handleSubmit(onFormSubmit)}
                    disabled={isSubmitting}
                    className={`bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-2 px-3 rounded-md shadow transition-all text-lg duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isModal ? 'mr-4' : ''}`}
                >
                    {isSubmitting ? 'Submitting...' : submitText}
                </button>
            </div>
        </div>
    );
};