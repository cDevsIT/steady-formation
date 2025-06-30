import React from "react";
import Image from "../ui/Image";
import { ChildComponentProps } from "./SecondFunnel";

const RegisterConfirm: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {

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
              { label: 'Name', value: 'Nasir Uddin' },
              { label: 'Email', value: 'nasir@gmail.com' },
              { label: 'Transaction ID', value: 'Thbd254 2543 21452' },
              { label: 'Time', value: '10:00 AM' },
              { label: 'Date', value: 'Jun 6, 2025' },
              { label: 'Payment Method', value: 'Stripe' },
              { label: 'Total Amount', value: '$100.00' },
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