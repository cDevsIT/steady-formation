import React from "react";

const RegisterConfirm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8 px-2">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full p-6 sm:p-10">
        {/* Confirmation Icon */}
        <div className="flex flex-col items-center">
          <div className="bg-purple-100 rounded-full p-4 mb-4">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-600 w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-2">Your Register is Confirmed.</h2>
          <p className="text-gray-500 text-center mb-4 text-sm sm:text-base">Thank you for Register with Steady Formation!  Please fill up the owner information</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md px-6 py-2 mb-6 transition">Fill Up Owner Information</button>
        </div>
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mt-2">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          <div className="mb-2">
            <span className="font-semibold">LLC</span>
            <p className="text-xs text-gray-500 mt-1">Choose an LLC for the ultimate flexibility and protection of your personal assets—streamline your business structure effortlessly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm mt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Name</span>
              <span className="font-medium text-right">Nasir Uddin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-right">nasir@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium text-right">Thbd254 2543 21452</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-medium text-right">10:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-right">Jun 6, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium text-right">Stripe</span>
            </div>
            <div className="flex justify-between sm:col-span-2 border-t pt-2 mt-2">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-semibold text-right">$100.00</span>
            </div>
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