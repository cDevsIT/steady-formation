'use client'
import { useState } from "react";
import Rating from "./Rating";
import StartFunnelInput from "./StartFunnelInput";
import InfinityBrandSliding from "./InfinityBrandSliding";

const TrustedCustomerSection = () => {
    const [businessType, setBusinessType] = useState("LLC");
      const [companyName, setCompanyName] = useState("");
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { businessType, companyName });
      };
    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1512px] mx-auto flex flex-col items-center justify-center gap-3">
                <Rating className="" radius={false} />

                <h2 className="max-w-[1200px] text-[30px] lg:text-[60px] leading-[120%] text-[#6634F3] text-center font-bold mb-4">We are trusted by over 500+ customers. Join them now and grow your business.</h2>

                <StartFunnelInput
                    handleSubmit={handleSubmit}
                    businessType={businessType}
                    setBusinessType={setBusinessType}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                />

                <InfinityBrandSliding />

            </div>
        </section>
    );
};

export default TrustedCustomerSection;