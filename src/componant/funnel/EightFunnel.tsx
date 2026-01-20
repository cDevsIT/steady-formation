import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";
import OwnersInfoBlock from "./Comp/OwnersInfoBlock";
import { dataState } from "./Funnel";
import companyFormationService, { CompanyFormationData, useCompanyFormationData } from "@/lib/companyFormationService";
import { industries, usStates } from "./funnel.type";
import { countries, Country } from "../ui/countries";
import { useVisitorCountry } from "@/hooks/useVisitorCountry";

// Custom Dropdown Component
interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError?: boolean;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  hasError = false,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedLabel = (selectedValue: string) => {
    const option = options.find(opt => opt.value === selectedValue);
    return option ? option.label : placeholder;
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onBlur={handleBlur}
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
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, i) => (
            <button
              key={i}
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
};

const initialPersonalInfo = {
  name: "",
  email: "",
  phone: "",
};
const initialBusinessInfo = {
  owner: "",
  state: "",
  type: "",
  members: "",
};
const initialOwnerInfo = {
  name: "Nasir Uddin",
  email: "nasir@gmail.com",
  phone: "+88016100000",
  percent: "100%",
  country: "United States of America",
};

const initialOwnerInfoTwo = {
  name: "Nasir Uddin",
  email: "nasir@gmail.com",
  phone: "+88016100000",
  percent: "100%",
  country: "United States of America",
};

const EightFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  const data = useCompanyFormationData();
  const { countryCode: detectedCountryCode } = useVisitorCountry();
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [ownerInfo, setOwnerInfo] = useState(initialOwnerInfo);
  const [ownerInfoTwo, setOwnerInfoTwo] = useState(initialOwnerInfoTwo)
  const [editSection, setEditSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    return countries.find(c => c.code === detectedCountryCode) || countries.find(c => c.code === 'US') || countries[0];
  });
  const [phoneError, setPhoneError] = useState<string>("");
  const [phoneCountryCode, setPhoneCountryCode] = useState<string>(() => {
    const country = countries.find(c => c.code === detectedCountryCode) || countries.find(c => c.code === 'US') || countries[0];
    return country.dialCode;
  });

  // Extract dial code from phone number if present
  const extractDialCodeFromPhone = (phone: string, defaultDialCode?: string): { dialCode: string; phoneNumber: string } => {
    if (!phone) return { dialCode: defaultDialCode || phoneCountryCode, phoneNumber: "" };
    
    // Check if phone starts with a dial code
    for (const country of countries) {
      if (phone.startsWith(country.dialCode)) {
        return {
          dialCode: country.dialCode,
          phoneNumber: phone.substring(country.dialCode.length).trim()
        };
      }
    }
    
    // If no dial code found, return the phone as-is with default country code
    return { dialCode: defaultDialCode || phoneCountryCode, phoneNumber: phone };
  };

  // Load initial data from localStorage
  useEffect(() => {

    // Fallback: Load directly from localStorage if hook data is empty
    let localStorageData = data;
    if (!data || Object.keys(data).length <= 1) {
      localStorageData = companyFormationService.getFromLocalStorage();
    }

    // Load user info from localStorage
    if (localStorageData?.userInfo) {
      const userInfo = localStorageData.userInfo;
      const phone = userInfo.phone_number || "";
      
      // Extract country code from phone if present
      if (phone) {
        const defaultDialCode = countries.find(c => c.code === detectedCountryCode)?.dialCode || phoneCountryCode;
        const { dialCode } = extractDialCodeFromPhone(phone, defaultDialCode);
        const country = countries.find(c => c.dialCode === dialCode) || selectedCountry;
        setPhoneCountryCode(dialCode);
        setSelectedCountry(country);
      }
      
      setPersonalInfo({
        name: `${userInfo.first_name} ${userInfo.last_name}`.trim(),
        email: userInfo.email || "",
        phone: phone,
      });
    }

    // Load business info from localStorage
    if (localStorageData?.companyName || localStorageData?.businessDetails) {
      setBusinessInfo({
        owner: localStorageData.companyName || "",
        state: localStorageData.businessDetails?.stateName || "",
        type: localStorageData.businessDetails?.industryType || "",
        members: localStorageData.businessDetails?.number_of_ownership?.toString() || "",
      });
    }
  }, [data]);

  // Additional useEffect to load data on component mount
  useEffect(() => {
    const loadInitialData = () => {
      const localStorageData = companyFormationService.getFromLocalStorage();

      // Load user info
      if (localStorageData?.userInfo) {
        const userInfo = localStorageData.userInfo;
        const phone = userInfo.phone_number || "";
        
        // Extract country code from phone if present
        if (phone) {
          const { dialCode } = extractDialCodeFromPhone(phone);
          const country = countries.find(c => c.dialCode === dialCode) || selectedCountry;
          setPhoneCountryCode(dialCode);
          setSelectedCountry(country);
        }
        
        setPersonalInfo({
          name: `${userInfo.first_name} ${userInfo.last_name}`.trim(),
          email: userInfo.email || "",
          phone: phone,
        });
      }

      // Load business info
      if (localStorageData?.companyName || localStorageData?.businessDetails) {
        setBusinessInfo({
          owner: localStorageData.companyName || "",
          state: localStorageData.businessDetails?.stateName || "",
          type: localStorageData.businessDetails?.industryType || "",
          members: localStorageData.businessDetails?.number_of_ownership?.toString() || "",
        });
      }
    };

    loadInitialData();
  }, []);

  const stateFees = data?.stateFees || {
    registration_fee: 100,
    renewal_fee: 50,
    transfer_fee: 25
  };


  const multimemberFee = data?.multimemberFee || 0

  const feeData = [
    {
      id: 1,
      title: "State Fee",
      subtitle: usStates.find(state => state.value === (data?.businessDetails?.stateName || companyFormationService.getFromLocalStorage()?.businessDetails?.stateName))?.label || (data?.businessDetails?.stateName || companyFormationService.getFromLocalStorage()?.businessDetails?.stateName) || "Select State",
      icon: "/icons/overview-company.svg",
      price: `$${stateFees.registration_fee}`
    },
    {
      id: 2,
      title: "Registered Agent Package",
      subtitle: "Free",
      icon: "/icons/overview-free.svg",
      price: "Free"
    },
    {
      id: 3,
      title: "Business Address Package",
      subtitle: "Free",
      icon: "/icons/overview-free.svg",
      price: "Free"
    },
    {
      id: 4,
      title: "Multimember Fee",
      subtitle: multimemberFee > 0 ? "Yes" : "No",
      icon: "/icons/overview-free.svg",
      price: multimemberFee > 0 ? `$${multimemberFee}` : "Free"
    },
    {
      id: 5,
      title: "Registered Agent",
      subtitle: "Free",
      icon: "/icons/overview-free.svg",
      price: "Free"
    },
    {
      id: 6,
      title: "EIN",
      subtitle: `${data?.en_amount === 0 ? 'No' : 'Yes'}`,
      icon: "/icons/overview-ein.svg",
      price: `${data?.en_amount === 0 ? 'Free' : `$${data?.en_amount}`}`
    },
    {
      id: 7,
      title: "Operating Agreement / Bylaws",
      subtitle: `${data?.agreement_amount === 0 ? 'No' : 'Yes'}`,
      icon: "/icons/overview-aggrement.svg",
      price: `${data?.agreement_amount === 0 ? 'Free' : `$${data?.agreement_amount}`}`
    },
    {
      id: 8,
      title: "Expedited Processing",
      subtitle: `${data?.rush_processing_amount === 0 ? 'No' : 'Yes'}`,
      icon: "/icons/overview-processing.svg",
      price: `${data?.rush_processing_amount === 0 ? 'Free' : `$${data?.rush_processing_amount}`}`
    }
  ];

  const singleLLc = data?.businessType === 'llc' && data?.businessDetails?.llcType === 'singleLLC' || data?.businessType === 's_corp'

  const directorInfo = data?.businessType === 'non_profit'

  // Validate phone number based on selected country
  const validatePhone = (phone: string, country: Country): string => {
    if (!phone) return ""; // Phone is optional
    
    // Remove dial code if present for validation
    let phoneNumber = phone;
    if (phone.startsWith(country.dialCode)) {
      phoneNumber = phone.substring(country.dialCode.length).trim();
    }
    
    // Remove any non-digit characters for validation
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    if (!country.phoneRegex.test(phoneNumber)) {
      return `Please use format: ${country.format}`;
    }
    
    return "";
  };

  // Handlers for edit/save/cancel
  const handleEdit = (section: string, data: any) => {
    setEditSection(section);
    
    // Extract country code from phone if editing personal info
    if (section === "personal" && data.phone) {
      const { dialCode, phoneNumber } = extractDialCodeFromPhone(data.phone, phoneCountryCode);
      const country = countries.find(c => c.dialCode === dialCode) || selectedCountry;
      setPhoneCountryCode(dialCode);
      setSelectedCountry(country);
      setTempData({ ...data, phone: phoneNumber });
    } else {
      setTempData(data);
    }
    setPhoneError("");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newTempData = { ...tempData, [e.target.name]: e.target.value };
    setTempData(newTempData);
    
    // Validate phone in real-time
    if (e.target.name === "phone") {
      const error = validatePhone(e.target.value, selectedCountry);
      setPhoneError(error);
    }
  };

  const handleCountryCodeChange = (dialCode: string) => {
    const country = countries.find(c => c.dialCode === dialCode) || selectedCountry;
    setPhoneCountryCode(dialCode);
    setSelectedCountry(country);
    
    // Re-validate phone when country changes
    if (tempData.phone) {
      const error = validatePhone(tempData.phone, country);
      setPhoneError(error);
    }
  };
  const handleSave = () => {
    if (editSection === "personal") {
      // Validate phone before saving
      if (tempData.phone) {
        const error = validatePhone(tempData.phone, selectedCountry);
        if (error) {
          setPhoneError(error);
          return; // Don't save if validation fails
        }
      }

      // Combine country code with phone number
      let phoneNumber = tempData.phone;
      if (phoneNumber && !phoneNumber.startsWith(phoneCountryCode)) {
        phoneNumber = `${phoneCountryCode} ${phoneNumber}`.trim();
      }

      setPersonalInfo({ ...tempData, phone: phoneNumber });
      setPhoneError("");

      // Update localStorage with the new user info
      const nameParts = tempData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const updatedUserInfo = {
        first_name: firstName,
        last_name: lastName,
        email: tempData.email,
        phone_number: phoneNumber,
      };

      // Update the localStorage data
      const currentData = companyFormationService.getFromLocalStorage();
      companyFormationService.saveToLocalStorage({
        ...currentData,
        userInfo: updatedUserInfo
      });
    }
    if (editSection === "business") {
      setBusinessInfo(tempData);

      // Update localStorage with the new business info
      const currentData = companyFormationService.getFromLocalStorage();
      companyFormationService.saveToLocalStorage({
        ...currentData,
        companyName: tempData.owner,
        businessDetails: {
          ...currentData.businessDetails,
          stateName: tempData.state,
          industryType: tempData.type,
          number_of_ownership: parseInt(tempData.members) || 1,
          multi_member_info: currentData.businessDetails?.multi_member_info || []
        }
      });
    }
    if (editSection === "owner") setOwnerInfo(tempData);
    if (editSection === "ownerTwo") setOwnerInfoTwo(tempData);
    setEditSection(null);
    setTempData({});
  };
  const handleCancel = () => {
    setEditSection(null);
    setTempData({});
    setPhoneError("");
  };

  const handleContinue = () => {
    if (handleFormSubmit) handleFormSubmit({ stepEight: { personalInfo, businessInfo, ownerInfo } });
  };

  return (
    <div className="max-w-[728px] w-full">
      <FunnelHeading>
        Overview
      </FunnelHeading>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Personal Info */}
        <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[355px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-black font-semibold">Personal Info</span>
            {editSection !== "personal" && (
              <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("personal", personalInfo)}>
                <Image
                  className="w-[16px]"
                  url='/icons/edit.svg'
                  alt='Edit'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 font-normal">Edit</span>
              </button>
            )}
          </div>
          {editSection === "personal" ? (
            <div className="space-y-2">
              <input 
                name="name" 
                value={tempData.name || ""} 
                onChange={handleInputChange} 
                className="w-full border rounded px-2 py-1" 
                placeholder="Full Name"
              />
              <input 
                name="email" 
                value={tempData.email || ""} 
                onChange={handleInputChange} 
                type="email"
                className="w-full border rounded px-2 py-1" 
                placeholder="Email"
              />
              <div>
                <div className="relative flex items-center">
                  <select
                    value={phoneCountryCode}
                    onChange={(e) => handleCountryCodeChange(e.target.value)}
                    className="absolute left-0 w-[90px] pl-4 pr-8 py-2 bg-transparent border-0 appearance-none z-10 focus:ring-0 text-sm"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.dialCode}>
                        {country.code}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute left-[45px] top-1/2 -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    value={tempData.phone || ""}
                    onChange={handleInputChange}
                    className={`w-full pl-24 pr-4 py-2 border rounded ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={selectedCountry.format || "Enter phone number"}
                  />
                </div>
                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-[#7856FC] text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-person.svg'
                  alt='overview-person'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-mail.svg'
                  alt='overview-mail'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-phone.svg'
                  alt='overview-phone'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.phone}</span>
              </div>
            </div>
          )}
        </div>
        {/* Business Info */}
        <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[355px] overflow-visible">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-black font-semibold">Business info</span>
            {editSection !== "business" && (
              <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("business", businessInfo)}>
                <Image
                  className="w-[16px]"
                  url='/icons/edit.svg'
                  alt='Edit'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 font-normal">Edit</span>
              </button>
            )}
          </div>
          {editSection === "business" ? (
            <div className="space-y-2 relative">
              <input name="owner" value={tempData.owner} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="Company Name" />
              <CustomDropdown
                options={usStates.map(state => ({ label: state.label, value: state.value }))}
                value={tempData.state}
                onChange={(value) => setTempData({ ...tempData, state: value })}
                placeholder="Select State"
              />
              <CustomDropdown
                options={industries.map(industry => ({ label: industry.label, value: industry.value }))}
                value={tempData.type}
                onChange={(value) => setTempData({ ...tempData, type: value })}
                placeholder="Select Industry Type"
              />
              <input name="members" value={tempData.members} onChange={handleInputChange} className="w-full border rounded px-2 py-1" placeholder="Number of Members" />
              <div className="flex gap-2 mt-2">
                <button className="bg-[#7856FC] text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-business-name.svg'
                  alt='overview-business-name'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.owner}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-map.svg'
                  alt='overview-map'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">
                  {usStates.find(state => state.value === businessInfo.state)?.label || businessInfo.state}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-company.svg'
                  alt='overview-company'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">
                  {industries.find(industry => industry.value === businessInfo.type)?.label || businessInfo.type}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-people.svg'
                  alt='overview-people'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.members}</span>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Owners Info */}
      {/* 
      {singleLLc && <OwnersInfoBlock
        data={ownerInfo}
        handleEdit={handleEdit}
        editSection={editSection}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        tempData={tempData}
        editSectionName='owner'
        title="Owners Info"
      />}

      {directorInfo && <>
        <OwnersInfoBlock
          data={ownerInfo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='owner'
          title="Director info 01"
        />

        <OwnersInfoBlock
          data={ownerInfoTwo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='ownerTwo'
          title="Director info 02"
        />
      </>}

      {!singleLLc && !directorInfo && <>
        <OwnersInfoBlock
          data={ownerInfo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='owner'
          title="Owners Info 01"
        />

        <OwnersInfoBlock
          data={ownerInfoTwo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='ownerTwo'
          title="Owners Info 02"
        />
      </>} */}

      {/* Fee Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 relative max-w-[728px]">
        <div className="divide-y divide-gray-200">
          {feeData.map((fee, index) => (
            <div
              key={fee.id}
              className={`flex justify-between items-center px-5 py-3 ${index === 0 ? 'pt-4' : ''}  ${index === feeData.length - 1 ? 'pb-4' : ''}`}
            >
              <div>
                <div className="font-base font-semibold text-black">{fee.title}</div>
                <div className="flex items-center gap-3">
                  <Image
                    className="w-[20px]"
                    url={fee.icon}
                    alt='overview-company'
                    width={50}
                    height={50}
                  />
                  <span className="text-sm text-gray-600 mt-1">{fee.subtitle}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-[#7856FC]">
                {fee.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Continue Button */}
      <button
        type="button"
        onClick={handleContinue}
        className="mt-6 w-full bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-3 rounded-xl shadow transition-all text-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default EightFunnel;