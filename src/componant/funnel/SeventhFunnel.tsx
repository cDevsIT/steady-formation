import { useState } from "react";
import { FunnelHeading } from "../ui/FunnelHeading";
import { ChildComponentProps } from "./SecondFunnel";
import { CheckIcon } from "./SixthFunnel";

const SeventhFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [processing, setProcessing] = useState<string>("");

    const handleContinue = () => {
        if (handleFormSubmit) handleFormSubmit({ stepSeven: { processing: processing } });
    };
    return (
        <div className="max-w-[728px]">
            <FunnelHeading>
                Expedited Filing
            </FunnelHeading>
            <p className="text-base font-normal text-gray-600 mb-4 mt-2">Get the fastest filing with our Expedited Filing service when you need it urgently. Standard processing may require more days or weeks. </p>
            <p className="text-base font-normal text-gray-600">
                Jumpstart your business with our Expedited Filing! Get legal fast, skip the wait, and dive into the market. Quick, easy, and ready for success. Let&apos;s go!</p>
            <p className="text-base font-normal text-black bg-gray-50 rounded-2xl mt-4 p-7">
                Note: Expedited filing service includes company formation, operating agreement, and registered agent within 1-3 business days. EIN form submission will be done within this timeframe; processing depends on the IRS.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-3 mt-6">
                <div
                    className={`flex items-center gap-4 p-[20px] w-full h-[120px] rounded-xl border-2 cursor-pointer transition-all duration-150 ${processing === "yes" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setProcessing("Expedited Processing")}
                >
                    <CheckIcon isSelected={processing === "Expedited Processing"} />
                    <div className="flex flex-col">
                        <h5 className="font-semibold text-base">Expedited Processing  $99</h5>
                        <ul className="list-disc ml-6 text-[16px] font-normal text-gray-600">
                            <li>1-3 business days</li>
                            <li>Company formation only</li>
                        </ul>
                    </div>
                </div>
                <div
                    className={`flex items-center gap-2 p-[20px] h-[120px] w-full rounded-xl border-2 cursor-pointer transition-all duration-150 ${processing === "no" ? "border-[#7856FC] bg-[#F5F3FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#C7B6F7]"}`}
                    onClick={() => setProcessing("Standard Processing")}
                >
                    <CheckIcon isSelected={processing === "Standard Processing"} />
                    <div className="flex flex-col">
                        <h5 className="font-semibold text-base">No, I&apos;ll wait for the standard Processing</h5>
                        <ul className="list-disc ml-6 text-[16px] font-normal text-gray-600">
                            <li>1-15 business days</li>
                        </ul>
                    </div>
                </div>
            </div>
            <span className="text-sm font-normal text-gray-600">Note: Service Provider Expedited Service. State level Expedited service is not included here.</span>

            <p className="text-base font-medium text-black my-5">The processing times will be determined based on the current state turnaround times and are subject to change based on state processing.</p>

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

export default SeventhFunnel;