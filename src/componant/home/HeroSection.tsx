"use client";

import { useState } from "react";
import Image from "../ui/Image";
import Rating from "../shared/Rating";
import StartFunnelInput from "../shared/StartFunnelInput";

const customerLogos = [
  { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
  { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
  { name: "RateShow", icon: "⭐", url: "/homepage/icons/brand_rotashow.svg" },
  { name: "Travelers", icon: "✈️", url: "/homepage/icons/brand_travelers.svg" },
];

export default function HeroSection() {
  const [businessType, setBusinessType] = useState("LLC");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { businessType, companyName });
  };

  return (
    <section className="bg-[#f4f3ff] pt-[65px] px-4">
      <div className="max-w-[1512px] mx-auto flex flex-col justify-center gap-3">
        {/* Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-[50px] justify-center items-center">
          {/* Top Left - Heading and Form */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <h1 className="text-[36px] leading-[44px] lg:text-[60px] lg:leading-[78px] font-bold text-gray-900 m-0 max-w-lg">
                Launch Business in Any State —
                <span className="text-[#7856FC] bg-[#aaf0c4] px-3 rounded-full mx-2 whitespace-nowrap">0 Cost</span>
                for U.S. Residents
              </h1>
              <p className="text-[16px] lg:text-[18px] text-gray-600 leading-relaxed max-w-lg">
                If you&apos;re a U.S. resident, you can skip the fees and keep
                your cash where it matters — your business.
              </p>
            </div>

            <StartFunnelInput
              handleSubmit={handleSubmit}
              businessType={businessType}
              setBusinessType={setBusinessType}
              companyName={companyName}
              setCompanyName={setCompanyName}
            />
          </div>

          {/* Top Right - Hero Image */}
          <div className="relative max-w-[612px]">
            <Image
              className=""
              url="/homepage/steady_formation_hero_image.png"
              alt="Steady Formation Hero Image"
            />
          </div>
        </div>

        {/* Bottom Left - Rating Section */}


        <div className="grid grid-cols-2 justify-items-center gap-[50px]">
          <Rating className="whitespace-nowrap col-span-2 lg:col-span-1" radius={true} />

          {/* Bottom Right - Customer Satisfaction */}
          <div className="max-w-700px col-span-2 lg:col-span-1 self-end mb-[10px]">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-[20px] leading-[175%]">
                <span className=" font-bold text-[#7856FC]">500+</span>
                Total Satisfied Customers Worldwide
              </p>
            </div>

            <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4">
              <div className="flex animate-scroll">
                {customerLogos?.map((logo, index) => (
                  <Image
                    className="h-[37px]"
                    url={logo.url}
                    alt="Client Brand Image"
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
      </div>
    </section>
  );
}
