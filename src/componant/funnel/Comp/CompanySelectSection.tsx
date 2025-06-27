'use client';
import Image from '@/componant/ui/Image';
import { useState } from 'react';

const COMPANY_TYPES = [
  {
    key: 'llc',
    title: 'LLC',
    description:
      'Choose an LLC for the ultimate flexibility and protection of your personal assets—streamline your business structure effortlessly.',
  },
  {
    key: 's_corp',
    title: 'S Corp',
    description:
      `Well known for tax benefits and operational flexibility, maintaining your business's growth momentum while enjoying certain corporate structures without double taxation....`,
  },
  {
    key: 'c_corp',
    title: 'C Crop',
    description:
      'Offers advanced business growth and funding opportunities, ensures strong legal separation between company and personal assets, and simplifies access to investment capital.',
  },
  {
    key: 'non_profit',
    title: 'Non Profit',
    description:
      'Offers advanced business growth and funding opportunities, ensures strong legal separation between company and personal assets, and simplifies access to investment capital.',
  },
  {
    key: 'partnership',
    title: 'Partnership',
    description:
      'Offers advanced business growth and funding opportunities, ensures strong legal separation between company and personal assets, and simplifies access to investment capital.',
  },
];

interface CompanySelectSectionProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
  }

const CompanySelectSection: React.FC<CompanySelectSectionProps> = ({selected,setSelected}) => {


  return (
    <div>
      <label className="block text-[16px] font-medium text-gray-900 mb-3">
              Select Company Type <span className="text-[#7856FC]">*</span>
      </label>
      <div className="flex flex-col gap-4">
        {COMPANY_TYPES.map((type) => (
          <button
            type="button"
            key={type.key}
            onClick={() => setSelected(type.key)}
            className={`text-left rounded-2xl border transition-all duration-150 p-5 flex items-center gap-4 focus:outline-none relative
              ${selected === type.key
                ? 'border-[#6941C6] bg-[#F4F3FF] shadow-md'
                : 'border-[#D0D5DD] bg-white hover:border-[#6941C6]'}
            `}
          >
            <span className="mt-1">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-150
                 `}
              >
                {selected === type.key && (
                    <Image url="/icons/checkbox.svg" alt="Date" width={20} height={20} className="w-5 h-5" />
                )}
              </span>
            </span>
            <span>
              <div className="font-semibold text-[18px] text-gray-900 mb-1">{type.title}</div>
              <div className="text-[15px] text-gray-600 leading-snug">{type.description}</div>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanySelectSection;