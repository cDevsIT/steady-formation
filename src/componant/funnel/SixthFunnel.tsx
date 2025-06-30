import { useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import Image from "../ui/Image";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";

// Custom Check Icon Component
export const CheckIcon: React.FC<{ isSelected: boolean }> = ({ isSelected }) => {
  return (
    isSelected ? (
      <Image className="h-[20px]" url="/icons/checkbox.svg" alt="Check Box" />
    ) : (
      <Image className="h-[20px]" url="/icons/checkbox-ring.svg" alt="Check Box Ring" />
    )
  );
};

const SixthFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  const [expressOption, setExpressOption] = useState<string>("");

  const handleContinue = () => {
    if (handleFormSubmit) handleFormSubmit({ stepSix: { expressOption: expressOption, } });
  };
  return (
    <div className="max-w-[728px]">
      <FunnelHeading>
        Operating Agreement / Corporate Bylaws
      </FunnelHeading>
      <FunnelSubHeading className="!font-semibold mt-3 mb-2">
        Choose Your EIN Option:
      </FunnelSubHeading>
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

export default SixthFunnel;