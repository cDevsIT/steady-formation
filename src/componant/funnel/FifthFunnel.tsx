import React, { useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";

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
    if (handleFormSubmit) handleFormSubmit({});
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-gray-900">EIN (Employer Identification Number)</h1>
        <div className="mb-6">
          <div className="font-semibold text-base mb-3">Choose Your EIN Option:</div>
          <div className="flex flex-col gap-4">
            {/* Option 1 */}
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "add" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}>
              <input
                type="radio"
                name="einOption"
                value="add"
                checked={einOption === "add"}
                onChange={() => setEinOption("add")}
                className="mt-1 accent-[#7856FC] w-5 h-5"
              />
              <div>
                <div className="font-semibold text-gray-900">Add EIN for Just $69</div>
                <div className="text-sm text-gray-500 mt-1">Let us handle the paperwork and speed things up</div>
              </div>
            </label>
            {/* Option 2 */}
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "expedite" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}>
              <input
                type="radio"
                name="einOption"
                value="expedite"
                checked={einOption === "expedite"}
                onChange={() => setEinOption("expedite")}
                className="mt-1 accent-[#7856FC] w-5 h-5"
              />
              <div>
                <div className="font-semibold text-gray-900">Expedite EIN for $149</div>
                <div className="text-sm text-gray-500 mt-1">Get your EIN faster 10-14 days</div>
              </div>
            </label>
            {/* Option 3 */}
            <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${einOption === "skip" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}>
              <input
                type="radio"
                name="einOption"
                value="skip"
                checked={einOption === "skip"}
                onChange={() => setEinOption("skip")}
                className="mt-1 accent-[#7856FC] w-5 h-5"
              />
              <div>
                <div className="font-semibold text-gray-900">No, Skip</div>
                <div className="text-sm text-gray-500 mt-1">I&apos;ll handle it on my own</div>
              </div>
            </label>
          </div>
        </div>

        {/* Only show express EIN and SSN if not skipping */}
        {showExpressSection && (
          <div className="mb-6">
            <div className="font-semibold text-base mb-2">Do you Need Express EIN for free?</div>
            <div className="text-xs text-gray-500 mb-3">
              If you are a U.S resident, you can get express EIN, within 2-4 business days. And it&apos;s free from us.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-150 ${expressOption === "yes" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}>
                <input
                  type="radio"
                  name="expressOption"
                  value="yes"
                  checked={expressOption === "yes"}
                  onChange={() => setExpressOption("yes")}
                  className="accent-[#7856FC] w-5 h-5"
                />
                <span className="text-sm text-gray-900">You have to provide SS number for free express EIN</span>
              </label>
              <label className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-150 ${expressOption === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}>
                <input
                  type="radio"
                  name="expressOption"
                  value="no"
                  checked={expressOption === "no"}
                  onChange={() => setExpressOption("no")}
                  className="accent-[#7856FC] w-5 h-5"
                />
                <span className="text-sm text-gray-900">I&apos;ll handle it on my own</span>
              </label>
            </div>
            {/* SSN input only if Yes is selected */}
            {expressOption === "yes" && (
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1 text-gray-900">Your SSN Number</label>
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
      <div className="bg-[#F9FAFB] rounded-xl p-5 mt-2">
        <div className="font-semibold mb-1 text-gray-900">Fast & Reliable EIN Filing</div>
        <div className="text-sm text-gray-600 mb-2">
          Standard IRS processing takes 10–25 days, and during peak tax season, it may take up to 30–120 days.<br />
          Our Expedited EIN Service submits your application within 1-3 business days, and we&apos;ll keep you updated throughout the process.
        </div>
        <div className="font-semibold mb-1 text-gray-900">Without an EIN, your business may face:</div>
        <ul className="list-disc ml-6 text-sm text-gray-600">
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