import { useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";

type CustomStartFunnelInputProps = {
    handleSubmit: (e: React.FormEvent) => void;
    businessType: string;
    setBusinessType: (value: string) => void;
    companyName: string;
    setCompanyName: (value: string) => void;
    className?: string;
    theme?: 'light' | 'dark'
  };

const StartFunnelInput: React.FC<CustomStartFunnelInputProps> = (
    {   handleSubmit, 
        businessType, 
        setBusinessType, 
        companyName, 
        setCompanyName,
        className='',
        theme='light'
    }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const businessTypes = [
        { value: "LLC", label: "LLC" },
        { value: "Corporation", label: "Corp" },
        { value: "Partnership", label: "Partnership" },
      ];
  return (
      <form onSubmit={handleSubmit} className={`flex flex-col gap-3 justify-center ${className}`}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch w-full">
              {/* Custom Dropdown and Input Container */}
              <div className="flex justify-center items-center w-full max-w-md mx-auto sm:mx-0">
                  <div className="relative w-full flex min-w-0">
                      {/* Dropdown */}
                      <div className="relative flex-shrink-0">
                          <button
                              type="button"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              className="w-16 sm:w-20 md:w-24 lg:w-28 h-12 px-2 sm:px-3 rounded-l-lg bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-gray-300 transition-all border border-gray-200"
                          >
                              <span className="text-gray-900 font-medium text-xs sm:text-sm truncate">
                                  {businessType}
                              </span>
                              <svg
                                  className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${isDropdownOpen ? "rotate-180" : ""
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

                          {isDropdownOpen && (
                              <>
                                  {/* Overlay for mobile to close dropdown */}
                                  <div
                                      className="fixed inset-0 z-10 sm:hidden"
                                      onClick={() => setIsDropdownOpen(false)}
                                  />
                                  <div className="absolute top-full left-0 w-32 sm:w-36 md:w-40 bg-white border border-gray-200 rounded-b-lg shadow-lg z-20">
                                      {businessTypes.map((type) => (
                                          <button
                                              key={type.value}
                                              type="button"
                                              onClick={() => {
                                                  setBusinessType(type.value);
                                                  setIsDropdownOpen(false);
                                              }}
                                              className="w-full px-2 sm:px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900 text-xs sm:text-sm first:rounded-t-none last:rounded-b-lg transition-colors"
                                          >
                                              {type.label}
                                          </button>
                                      ))}
                                  </div>
                              </>
                          )}
                      </div>

                      {/* Company Name Input */}
                      <input
                          type="text"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="flex-1 min-w-0 h-12 px-3 sm:px-4 bg-white rounded-r-lg border border-l-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 text-sm"
                      />
                  </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-start">
                  <Button type="submit" className="w-full sm:w-auto min-w-[120px]">
                      Start Now
                  </Button>
              </div>
          </div>

          <div className="flex justify-center items-center gap-2 mg:gap-4 lg:gap-8">
              <label className="flex justify-center items-center space-x-1">
                  <Image
                      className="w-4"
                      url='/icons/check_green.svg'
                      alt='check box'
                      width={16}
                      height={16}
                  />
                  <span className={`text-[10px] md:text-sm font-medium whitespace-nowrap ${theme === 'light' ?'text-gray-700':'text-white'}`}>
                      No Hidden Fees
                  </span>
              </label>

              <label className="flex items-center space-x-1">
                  <Image
                      className="w-4"
                      url='/icons/check_green.svg'
                      alt='check box'
                      width={16}
                      height={16}
                  />
                  <span className={`text-[10px] md:text-sm font-medium whitespace-nowrap ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
                      No Document Required
                  </span>
              </label>
          </div>
      </form>
  );
};

export default StartFunnelInput;