import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import Image from "../ui/Image";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";

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
  const data = useCompanyFormationData();
  const [expressOption, setExpressOption] = useState<string>("no");

  useEffect(() => {
      // Set EIN option based on existing data
    if (data?.agreement_amount === 99) {
        setExpressOption("yes");
      } else if (data?.agreement_amount === 0 || !data?.agreement_amount) {
        setExpressOption("no");
      }
    }, [data?.agreement_amount]);

  const handleContinue = () => {
    const price = expressOption === 'yes' ? 99 : 0
    if (handleFormSubmit) handleFormSubmit({ stepSix: { expressOption: expressOption, }, agreement_amount: price });
  };

  const handlePlanSelection = (option: string) => {
      let price = 0
      if (option === "yes") {
        price = 99
      } else if (option === "no") {
        price = 0
      } 
    setExpressOption(option);
      companyFormationService.saveToLocalStorage({
        ...data,
        agreement_amount: price
      });
    };
  return (
    <div className="max-w-[728px]">
      <FunnelHeading>
        Operating Agreement / Corporate Bylaws
      </FunnelHeading>
      <FunnelSubHeading className="!font-semibold mt-3 mb-2">
        Choose Your Operating Agreement Option:
      </FunnelSubHeading>
      <div className="flex flex-col sm:flex-row gap-4 mb-3">
        <div
          className={`flex items-center gap-4 p-[20px] w-full h-[120px] rounded-xl border-2 cursor-pointer transition-all duration-150 ${expressOption === "yes" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
          onClick={() => handlePlanSelection("yes")}
        >
          <CheckIcon isSelected={expressOption === "yes"} />
          <div className="flex flex-col">
            <h5 className="font-semibold text-base">Operating Agreement – $99</h5>
            <span className="text-sm text-gray-600">Let us prepare your Operating Agreement/Corporate Bylaws so your business is legally protected and structured properly.</span>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${expressOption === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
          onClick={() => handlePlanSelection("no")}
        >
          <CheckIcon isSelected={expressOption === "no"} />
          <div className="flex flex-col">
            <h5 className="font-semibold text-base">No, skip</h5>
            <span className="text-sm text-gray-600">I’ll create and manage my own documents.</span>
          </div>
        </div>
      </div>


      {/* Info Section */}
      <div className="">
        <FunnelSubHeading className="!font-semibold mb-2">
          Why an Operating Agreement Matters
        </FunnelSubHeading>
        <p className="text-[16px] font-normal text-gray-600 mb-2">
          An Operating Agreement (or Corporate Bylaws) defines ownership, responsibilities, and decision-making rules. It helps prevent disputes, strengthens credibility, and may be required when opening a business bank account.
        </p>
        <FunnelSubHeading className="!font-semibold mt-3 mb-2">
          Without an Operating Agreement, your business may face:
        </FunnelSubHeading>
        <ul className="list-disc ml-6 text-[16px] font-normal text-gray-600">
          <li>Internal disputes between owners</li>
          <li>Challenges opening bank accounts or securing funding</li>
          <li>Weak legal protection in case of conflicts</li>
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