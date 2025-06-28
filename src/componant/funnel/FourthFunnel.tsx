import { useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { CustomFormData } from "../ui/FormSample";
import { FunnelHeading, FunnelSubHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";
import RegisterAgentOption from "./Comp/RegisterAgentOption";

// Data for the benefits cards
const benefitsData = [
  {
    id: 1,
    icon: "/icons/free.svg",
    title: "Free for the First Year",
    description: "Every new formation comes with 1 year of Registered Agent service, free of charge. Cancel anytime if you switch your agent."
  },
  {
    id: 2,
    icon: "/icons/guarantee.svg",
    title: "Guaranteed Renewal Rate",
    description: "Every new formation comes with 1 year of Registered Agent service, free of charge. Cancel anytime if you switch your agent."
  },
  {
    id: 3,
    icon: "/icons/save_money.svg",
    title: "No Extra Fees",
    description: "Every new formation comes with 1 year of Registered Agent service, free of charge. Cancel anytime if you switch your agent."
  },
  {
    id: 4,
    icon: "/icons/junk-mail.svg",
    title: "Reduce Junk Mail",
    description: "Every new formation comes with 1 year of Registered Agent service, free of charge. Cancel anytime if you switch your agent."
  }
];

const FourthFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<'steady' | 'own'>("steady");

  // Always pass an object to handleFormSubmit
  const handleSteadyContinue = () => {
    handleFormSubmit({ stepFour: { type: selectedOption } });
  };

  const handleOwnContinue = (data: CustomFormData) => {
    handleFormSubmit({ stepFour: {...data, type: selectedOption } });
  };


  // SVG icons
  const BulletIcon = ({ selected }: { selected: boolean }) => (
    selected ? (
      <Image className="h-[20px]" url="/icons/checkbox.svg" alt="Check Box" />
    ) : (
        <Image className="h-[20px]" url="/icons/checkbox-ring.svg" alt="Check Box Ring" />
    )
  );

  return (
    <section className="lg:max-w-[728px]">
      <FunnelHeading>
        Registered Agent Information
      </FunnelHeading>
      <FunnelSubHeading className="!font-semibold mt-3 mb-2">
        Every business is required to appoint a Registered Agent.
      </FunnelSubHeading>
      <p className="mb-6 text-gray-600 text-[16px]">
        Steady provides 1 full year of Registered Agent service — FREE with your business formation (a $99 value).
      </p>

      <div className="space-y-4 mb-8">
        <fieldset className="space-y-2 border-0 p-0">
          <legend className="sr-only">Registered Agent Options</legend>
          <div
            role="button"
            tabIndex={0}
            aria-pressed={selectedOption === 'steady'}
            onClick={() => setSelectedOption('steady')}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors outline-none ${selectedOption === 'steady' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'}`}
          >
            <span className="mr-3 flex items-center justify-center mt-1">
              <BulletIcon selected={selectedOption === 'steady'} />
            </span>
            <div>
              <span className="text-[16px] font-semibold">Assign Steady as My Registered Agent — FREE for 1 Year</span>
              <p className="text-gray-600 text-sm max-w-[530px]">Enjoy peace of mind knowing Steady will handle your legal documents and state correspondence confidentially.</p>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-pressed={selectedOption === 'own'}
            onClick={() => setSelectedOption('own')}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors outline-none ${selectedOption === 'own' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'}`}
          >
            <span className="mr-3 flex items-center justify-center mt-1">
              <BulletIcon selected={selectedOption === 'own'} />
            </span>
            <div>
              <span className="text-[16px] font-semibold">I prefer to act as my own Registered Agent</span>
              <p className="text-gray-600 text-sm max-w-[400px]">You&apos;ll be responsible for receiving all legal and government notices directly…</p>
            </div>
          </div>
        </fieldset>
      </div>

      {selectedOption === 'steady' ? (
        <>
          <FunnelSubHeading className="!font-semibold mt-3 mb-2">
            Why Choose Steady?
          </FunnelSubHeading>
          <p className="mb-6 text-gray-600 text-[16px]">
            A Registered Agent is a designated individual or service responsible for receiving important legal and government documents on behalf of your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="lg:max-w-[357px] p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-start">
                <Image className="h-[56px] mb-4" width={56} height={56} url={benefit.icon} alt={benefit.title} />
                <span className="font-bold text-[18px] mb-3">{benefit.title}</span>
                <p className="text-gray-600 text-[16px]">{benefit.description}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSteadyContinue}
            className="w-full py-3 bg-[#7856FC] text-white font-semibold rounded-lg hover:bg-[#7856FF]transition-colors text-lg mt-4"
          >
            Continue
          </button>
        </>
      ) : (
          <RegisterAgentOption handleSubmit={handleOwnContinue} />
      )}

      
    </section>
  );
};

export default FourthFunnel;