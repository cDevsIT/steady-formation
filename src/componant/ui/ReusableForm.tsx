
import React, { useState, useRef, useEffect } from 'react';

// Types
interface Country {
    name: string;
    code: string;
    dialCode: string;
    flag: string;
    phoneRegex: RegExp;
    format: string;
}

interface InputFieldProps {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'select' | 'phone';
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[];
    defaultValue?: string;
    onChange?: (name: string, value: string) => void;
    error?: string;
    registerInput?: (inputRef: InputFieldRef) => void;
}

export interface SimpleFormData {
    [key: string]: string;
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

// Input Field Component
export const InputField: React.FC<InputFieldProps> = ({
    name,
    label,
    type,
    required = false,
    placeholder,
    options = [],
    defaultValue = '',
    onChange,
    error
}) => {
    const [value, setValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [localError, setLocalError] = useState('');

    const dropdownRef = useRef<HTMLDivElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setCountryDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Validation function
    const validateInput = (inputValue: string, inputType: string): string => {
        if (required && !inputValue.trim()) {
            return `${label} is required`;
        }

        switch (inputType) {
            case 'email':
                if (inputValue && !emailRegex.test(inputValue)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'phone':
                if (inputValue && !selectedCountry.phoneRegex.test(inputValue)) {
                    return `Please use format: ${selectedCountry.format}`;
                }
                break;
        }
        return '';
    };

    // Handle input change with proper validation feedback
    const handleInputChange = (newValue: string) => {
        setValue(newValue);

        // Always update form data first
        onChange?.(name, newValue);

        // Then validate and show local error
        const validationError = validateInputWithCountry(newValue, type);
        setLocalError(validationError);
    };

    // Handle select option
    const handleSelectOption = (optionValue: string) => {
        setValue(optionValue);
        setIsOpen(false);
        setLocalError('');

        // Update form data immediately
        onChange?.(name, optionValue);
    };

    // Handle country selection with revalidation
    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setCountryDropdownOpen(false);

        // Revalidate current phone number with new country
        if (value) {
            const validationError = validateInputWithCountry(value, 'phone', country);
            setLocalError(validationError);
        }
    };

    // Validation function with country parameter for phone validation
    const validateInputWithCountry = (inputValue: string, inputType: string, country?: Country): string => {
        if (required && !inputValue.trim()) {
            return `${label} is required`;
        }

        switch (inputType) {
            case 'email':
                if (inputValue && !emailRegex.test(inputValue)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'phone':
                const phoneCountry = country || selectedCountry;
                if (inputValue && !phoneCountry.phoneRegex.test(inputValue)) {
                    return `Please use format: ${phoneCountry.format}`;
                }
                break;
        }
        return '';
    };

    // Get selected option label
    const getSelectedLabel = () => {
        const selectedOption = options.find(option => option.value === value);
        return selectedOption ? selectedOption.label : placeholder || 'Select an option';
    };

    // Render different input types
    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-full px-3 py-2 border rounded-md bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error || localError ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
                                {getSelectedLabel()}
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
                                        onClick={() => handleSelectOption(option.value)}
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
                                className={`px-3 py-2 border border-r-0 rounded-l-md bg-white flex items-center space-x-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error || localError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <span>{selectedCountry.flag}</span>
                                <span className="text-sm">{selectedCountry.dialCode}</span>

                                <svg
                                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${countryDropdownOpen ? "rotate-180" : ""
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
                                            onClick={() => handleCountrySelect(country)}
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
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder={placeholder}
                            className={`flex-1 px-3 py-2 border rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error || localError ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                    </div>
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={placeholder}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${error || localError ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                );

            default:
                return (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={placeholder}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error || localError ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                );
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderInput()}
            {(error || localError) && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                    <span className="text-red-500 mr-1">⚠</span>
                    {error || localError}
                </p>
            )}
        </div>
    );
};

// Reusable Form Component
interface ReusableFormProps {
    onSubmit: (data: SimpleFormData) => void;
    children: React.ReactNode;
    submitText?: string;
    className?: string;
}

interface InputFieldRef {
    name: string;
    type: string;
    required: boolean;
    value: string;
    validate: () => string;
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
    onSubmit,
    children,
    submitText = 'Submit',
    className = ''
}) => {
    const [formData, setFormData] = useState<SimpleFormData>({});
    const [errors, setErrors] = useState<SimpleFormData>({});
    const [inputRefs, setInputRefs] = useState<InputFieldRef[]>([]);

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const registerInput = (inputRef: InputFieldRef) => {
        setInputRefs(prev => {
            const existing = prev.find(ref => ref.name === inputRef.name);
            if (existing) {
                return prev.map(ref => ref.name === inputRef.name ? inputRef : ref);
            }
            return [...prev, inputRef];
        });
    };

    const handleSubmit = () => {
        const newErrors: SimpleFormData = {};
        let hasErrors = false;

        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate each child input directly
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === InputField) {
                const inputChild = child as React.ReactElement<InputFieldProps>;
                const { name, type, required } = inputChild.props;
                const value = formData[name] || '';

                // Check required fields
                if (required && (!value || value.trim() === '')) {
                    newErrors[name] = `This field is required`;
                    hasErrors = true;
                    return;
                }

                // Skip validation if field is empty and not required
                if (!value || value.trim() === '') {
                    return;
                }

                // Validate based on type
                switch (type) {
                    case 'email':
                        if (!emailRegex.test(value)) {
                            newErrors[name] = 'Please enter a valid email address';
                            hasErrors = true;
                        }
                        break;

                    case 'phone':
                        // Get the selected country for this phone field
                        const phoneInputRef = inputRefs.find(ref => ref.name === name);
                        if (phoneInputRef) {
                            const error = phoneInputRef.validate();
                            if (error) {
                                newErrors[name] = error;
                                hasErrors = true;
                            }
                        } else {
                            // Fallback validation with default country (Bangladesh)
                            const bangladeshRegex = /^1[3-9]\d{8}$/;
                            if (!bangladeshRegex.test(value)) {
                                newErrors[name] = 'Please use format: 1XXX XXXXXX';
                                hasErrors = true;
                            }
                        }
                        break;
                }
            }
        });

        // If there are any errors, show them and prevent submission
        if (hasErrors || Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log('Form validation failed:', newErrors);
            alert('Please fix the errors before submitting');
            return;
        }

        // Clear any previous errors
        setErrors({});
        console.log('Form validation passed, submitting:', formData);
        onSubmit(formData);
    };

    // Clone children and pass props
    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === InputField) {
            const inputChild = child as React.ReactElement<InputFieldProps>;
            const fieldName = inputChild.props.name;
            return React.cloneElement(child as React.ReactElement<InputFieldProps>, {
                onChange: handleInputChange,
                error: errors[fieldName],
                registerInput: registerInput
            });
        }
        return child;
    });

    return (
        <div className={`space-y-4 ${className}`}>
            {enhancedChildren}
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
                {submitText}
            </button>
        </div>
    );
};