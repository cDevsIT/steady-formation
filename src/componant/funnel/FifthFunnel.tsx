import React, { useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";

// Custom Check Icon Component
const CheckIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  return (
    isSelected ? (
      <Image className="h-[20px]" url="/icons/checkbox.svg" alt="Check Box" />
    ) : (
      <Image className="h-[20px]" url="/icons/checkbox-ring.svg" alt="Check Box Ring" />
    )
  );
};

const FifthFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  // State for EIN option and express EIN option
  const [einOption, setEinOption] = useState<string>("");
  const [expressOption, setExpressOption] = useState<string>("");
  const [ssn, setSSN] = useState("");

  // Helper to check if 'No, Skip' is selected
  const isSkip = einOption === "skip";

  // Only show express EIN and SSN if 'add' or 'expedite' is selected
  const showExpressSection = einOption === "add" || einOption === "expedite";

  // Handle continue (for demo, just calls handleFormSubmit if provided)
  const handleContinue = () => {
    if (handleFormSubmit) handleFormSubmit({ stepFive: { einOption: einOption, expressOption: expressOption, ssn: ssn } });
  };

  return (
    <div className=" bg-white max-w-[728px] flex flex-col gap-8">
      <div>
        <FunnelHeading>
          EIN (Employer Identification Number)
        </FunnelHeading>
        <div className="mb-6">
          <FunnelSubHeading className="!font-semibold mt-3 mb-2">
            Choose Your EIN Option:
          </FunnelSubHeading>
          <div className="flex flex-col gap-4">
            {/* Option 1 */}
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "add" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
              onClick={() => setEinOption("add")}
            >
              <CheckIcon isSelected={einOption === "add"} />
              <div>
                <h4 className="font-semibold text-[16px] text-black">Add EIN for Just $69</h4>
                <p className="text-sm font-normal text-gray-600 mt-1">Let us handle the paperwork and speed things up</p>
              </div>
            </div>
            {/* Option 2 */}
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "expedite" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
              onClick={() => setEinOption("expedite")}
            >
              <CheckIcon isSelected={einOption === "expedite"} />
              <div>
                <h4 className="font-semibold text-[16px] text-black">Expedite EIN for $149</h4>
                <p className="text-sm font-normal text-gray-600 mt-1">Get your EIN faster 10-14 days</p>
              </div>
            </div>
            {/* Option 3 */}
            <div 
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "skip" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
              onClick={() => setEinOption("skip")}
            >
              <CheckIcon isSelected={einOption === "skip"} />
              <div>
                <h4 className="font-semibold text-[16px] text-black">No, Skip</h4>
                <p className="text-sm font-normal text-gray-600 mt-1">I&apos;ll handle it on my own</p>
              </div>
            </div>
          </div>
        </div>

        {/* Only show express EIN and SSN if not skipping */}
        {showExpressSection && (
          <div className="">
            <h4 className="font-semibold text-base mb-2">Do you Need Express EIN for free?</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you are a U.S resident, you can get express EIN, within 2-4 business days. And it&apos;s free from us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              <div 
                className={`flex items-center gap-4 p-[20px] w-full h-[120px] rounded-xl border-2 cursor-pointer transition-all duration-150 ${expressOption === "yes" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                onClick={() => setExpressOption("yes")}
              >
                <CheckIcon isSelected={expressOption === "yes"} />
                <div className="flex flex-col">
                  <h5 className="font-semibold text-base">Yes</h5>
                  <span className="text-sm text-gray-600">You have to provide SS number for free express EIN</span>
                </div>
              </div>
              <div 
                className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${expressOption === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                onClick={() => setExpressOption("no")}
              >
                <CheckIcon isSelected={expressOption === "no"} />
                <div className="flex flex-col">
                  <h5 className="font-semibold text-base">No, skip</h5>
                  <span className="text-sm text-gray-600">I&apos;ll handle it on my own</span>
                </div>
              </div>
            </div>
            {/* SSN input only if Yes is selected */}
            {expressOption === "yes" && (
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1 text-gray-600">Your SSN Number</label>
                <input
                  type="text"
                  placeholder="AAA-GG-SSSS"
                  value={ssn}
                  onChange={e => setSSN(e.target.value)}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-[#7856FC] focus:border-[#7856FC] border-gray-200 text-gray-900 placeholder-gray-400"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="">
        <FunnelSubHeading className="!font-semibold mb-2">
          Fast & Reliable EIN Filing
        </FunnelSubHeading>
        <p className="text-[16px] font-normal text-gray-600 mb-2">
          Standard IRS processing takes 10–25 days, and during peak tax season, it may take up to 30–120 days.<br />
          Our Expedited EIN Service submits your application within 1-3 business days, and we&apos;ll keep you updated throughout the process.
        </p>
        <FunnelSubHeading className="!font-semibold mt-3 mb-2">
          Without an EIN, your business may face:
        </FunnelSubHeading>
        <ul className="list-disc ml-6 text-[16px] font-normal text-gray-600">
          <li>IRS penalties</li>
          <li>Issues with payroll and banking</li>
          <li>Delays in operations</li>
        </ul>
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

export default FifthFunnel;