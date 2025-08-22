import React, { useEffect, useState } from "react";
import Image from "../ui/Image";
import { ChildComponentProps } from "./SecondFunnel";
import companyFormationService, { useCompanyFormationData } from "@/lib/companyFormationService";
const initialInfo = {
  name: "",
  email: "",
  traID: 'Thbd254 2543 21452',
  time: "10:00 AM",
  date: "Jun 6, 2025",
  paymentMethod: "",
  totalAmount: "$0.00"
};

const RegisterConfirm: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {

  const data = useCompanyFormationData();
  const [personalInfo, setPersonalInfo] = useState(initialInfo);

  // Load initial data from localStorage
  useEffect(() => {
    let localStorageData = data;
    if (!data || Object.keys(data).length <= 1) {
      localStorageData = companyFormationService.getFromLocalStorage();
      console.log("Fallback - Loading directly from localStorage:", localStorageData);
    }

    // Load user info from localStorage
    setPersonalInfo({
      name: `${localStorageData?.userInfo?.first_name} ${localStorageData?.userInfo?.last_name}`.trim(),
      email: localStorageData?.userInfo?.email || "",
      traID: initialInfo.traID,
      time: initialInfo.time,
      date: initialInfo.date,
      paymentMethod: localStorageData?.payment?.method || '',
      totalAmount: `$${localStorageData?.payment?.amount.toFixed(2)}`,
    });
  }, []);
  const handleSubmit = () => {
    handleFormSubmit({ registrationConfrim: true });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-8 px-2">
      <div className="bg-gray-100 rounded-2xl max-w-[717px] w-full p-6 sm:p-10">
        {/* Confirmation Icon */}
        <div className="flex flex-col items-center gap-3">
          <Image className="w-[76px]" url="/icons/confirm.svg" width={76} height={76} alt="Confirm" />
          <h2 className="text-[24px] lg:text-[30px] font-semibold text-center mb-2">Your Register is Confirmed.</h2>
          <p className="text-[#6B7280] text-center mb-4 text-base font-normal">Thank you for Register with Steady Formation!  Please fill up the owner information</p>
          <button onClick={handleSubmit} className="bg-[#7856FC] hover:bg-[#6156fc] text-white font-medium rounded-md px-6 py-2 mb-6 transition">Fill Up Owner Information</button>
        </div>
        {/* Order Summary */}
        <div className="max-w-[605px] mx-auto">
          <h3 className="font-bold text-xl mb-2">Order Summary</h3>
          <div className="mb-2">
            <span className="font-medium text-base text-black">LLC</span>
            <p className="text-xm font-normal text-gray-600 mt-1">Choose an LLC for the ultimate flexibility and protection of your personal assets—streamline your business structure effortlessly.</p>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {[
              { label: 'Name', value: personalInfo.name },
              { label: 'Email', value: personalInfo.email },
              { label: 'Transaction ID', value: personalInfo.traID },
              { label: 'Time', value: personalInfo.time },
              { label: 'Date', value: personalInfo.date },
              { label: 'Payment Method', value: personalInfo.paymentMethod },
              { label: 'Total Amount', value: personalInfo.totalAmount },
            ].map((item, idx) => (
              <div className="flex justify-between" key={item.label}>
                <span className="text-black text-base font-normal">{item.label}</span>
                <span className="text-black text-base font-normal text-right">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md px-5 py-2 text-sm border border-gray-200 transition">Download Receipt</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterConfirm;