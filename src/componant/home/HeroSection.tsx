"use client";

import { useState } from "react";
import Image from "../ui/Image";

const customerLogos = [
  { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
  { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
  { name: "RateShow", icon: "⭐", url: "/homepage/icons/brand_rotashow.svg" },
  { name: "Travelers", icon: "✈️", url: "/homepage/icons/brand_travelers.svg" },
];

export default function HeroSection() {
  const [businessType, setBusinessType] = useState("LLC");
  const [companyName, setCompanyName] = useState("");
  const [noHiddenFees, setNoHiddenFees] = useState(true);
  const [noDocumentRequired, setNoDocumentRequired] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { businessType, companyName });
  };

  const businessTypes = [
    { value: "LLC", label: "LLC" },
    { value: "Corporation", label: "Corp" },
    { value: "Partnership", label: "Partnership" },
  ];

  return (
    <div className="bg-[#f4f3ff] pt-[65px]">
      <div className="max-w-[1512px] mx-auto px-4 lg:px-6 py-8 lg:py-12 min-h-screen">
        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:h-full lg:items-center">
          {/* Top Left - Heading and Form */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Launch Business in
                <br />
                Any State — <span className="text-emerald-500">0 Cost</span>
                <br />
                for U.S. Residents
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                If you&apos;re a U.S. resident, you can skip the fees and keep
                your cash where it matters — your business.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex">
                {/* Custom Dropdown */}
                <div className="flex border-2 border-gray-200">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-32 h-12 px-3 rounded-l-lg bg-white text-left flex items-center justify-between focus:outline-none focus:border-indigo-500 hover:border-gray-300 transition-colors"
                    >
                      <span className="text-gray-900 font-medium">
                        {businessType}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
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
                      <div className="absolute top-full left-0 w-full bg-white border-2 border-gray-200 border-t-0 rounded-b-lg shadow-lg z-10">
                        {businessTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => {
                              setBusinessType(type.value);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900 first:rounded-t-none last:rounded-b-lg"
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
                    className="flex-1 h-12 px-4 bg-white rounded-r-none focus:outline-none focus:border-indigo-500 placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 px-8 ml-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Start Now
                </button>
              </div>

              <div className="flex gap-8">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noHiddenFees}
                    onChange={(e) => setNoHiddenFees(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    No Hidden Fees
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noDocumentRequired}
                    onChange={(e) => setNoDocumentRequired(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    No Document Required
                  </span>
                </label>
              </div>
            </form>
          </div>

          {/* Top Right - Hero Image */}
          <div className="relative">
            <Image
              className=""
              url="/homepage/steady_formation_hero_image.png"
              alt="Steady Formation Hero Image"
            />
          </div>

          {/* Bottom Left - Rating Section */}
          <div className="flex justify-center">
            <div className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-gray-900">4.8</div>
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-medium">502 reviews</p>
              </div>
            </div>
          </div>

          {/* Bottom Right - Customer Satisfaction */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600 font-medium">
                Total Satisfied Customers Worldwide
              </p>
            </div>

            <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4">
              <div className="flex animate-scroll">
                {customerLogos?.map((logo, index) => (
                  <>
                    <Image
                      className="h-[37px]"
                      url={logo.url}
                      alt="Client Brand Image"
                      key={index}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
      </div>
    </div>
  );
}
