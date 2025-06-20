import { useState } from "react";
import Image from "../ui/Image";

type CustomStartFunnelInputProps = {
    handleSubmit: (e: React.FormEvent) => void;
    businessType: string;
    setBusinessType: (value: string) => void;
    companyName: string;
    setCompanyName: (value: string) => void;
  };

const StartFunnelInput: React.FC<CustomStartFunnelInputProps> = ({ handleSubmit, businessType, setBusinessType, companyName, setCompanyName }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const businessTypes = [
        { value: "LLC", label: "LLC" },
        { value: "Corporation", label: "Corp" },
        { value: "Partnership", label: "Partnership" },
      ];
  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row gap-2">
              {/* Custom Dropdown */}
              <div className="flex justify-center items-center">
                  <div className="relative w-full max-w-md flex">
                      <div className="relative flex-shrink-0">
                          <button
                              type="button"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              className="w-20 xs:w-24 sm:w-32 h-12 px-2 xs:px-3 rounded-l-lg bg-white text-left flex items-center justify-between focus:outline-none focus:border-indigo-500 hover:border-gray-300 transition-colors border border-gray-200"
                          >
                              <span className="text-gray-900 font-medium text-xs xs:text-sm sm:text-[14px] truncate">
                                  {businessType}
                              </span>
                              <svg
                                  className={`w-3 h-3 xs:w-4 xs:h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${isDropdownOpen ? "rotate-180" : ""
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
                              <div className="absolute top-full left-0 w-32 xs:w-36 sm:w-40 bg-white border-2 border-gray-200 border-t-0 rounded-b-lg shadow-lg z-10">
                                  {businessTypes.map((type) => (
                                      <button
                                          key={type.value}
                                          type="button"
                                          onClick={() => {
                                              setBusinessType(type.value);
                                              setIsDropdownOpen(false);
                                          }}
                                          className="w-full px-2 xs:px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900 text-xs xs:text-sm first:rounded-t-none last:rounded-b-lg"
                                      >
                                          {type.label}
                                      </button>
                                  ))}
                              </div>
                          )}
                      </div>

                      <input
                          type="text"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="flex-1 min-w-0 h-12 px-2 xs:px-3 sm:px-4 bg-white rounded-r-lg border border-l-0 border-gray-200 focus:outline-none focus:border-indigo-500 placeholder:text-gray-400 text-sm"
                      />
                  </div>
              </div>

              <button
                  type="submit"
                  className="h-12 px-8 my-2 lg:my-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs xs:text-sm sm:text-[14px] font-semibold rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
              >
                  Start Now
              </button>
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
                  <span className="text-[10px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
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
                  <span className="text-[10px] md:text-sm font-medium text-gray-700 whitespace-nowrap">
                      No Document Required
                  </span>
              </label>
          </div>
      </form>
  );
};

export default StartFunnelInput;