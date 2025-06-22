import Image from "../ui/Image";
import Rating from "../shared/Rating";
import StartFunnelInput from "../shared/StartFunnelInput";
import InfinityBrandSliding from "../shared/InfinityBrandSliding";

export default function HeroSection() {


  return (
    <section className="bg-[#f4f3ff] pt-[65px] px-4">
      <div className="max-w-[1512px] mx-auto flex flex-col justify-center gap-3">
        {/* Desktop Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-[50px] justify-between items-center">
          {/* Top Left - Heading and Form */}
          <div className="flex flex-col gap-3 items-center lg:items-start">
            <div className="flex flex-col gap-3">
              <h1 className="text-[36px] leading-[44px] lg:text-[60px] lg:leading-[78px] font-bold text-gray-900 m-0 max-w-[700px]">
                Launch Business in Any State —
                <span className="text-[#7856FC] bg-[#aaf0c4] px-3 rounded-full mx-2 whitespace-nowrap"> 0 Cost </span>
                for U.S. Residents
              </h1>
              <p className="text-[16px] lg:text-[18px] text-gray-600 leading-relaxed max-w-lg">
                If you&apos;re a U.S. resident, you can skip the fees and keep
                your cash where it matters — your business.
              </p>
            </div>

            <StartFunnelInput
            />
          </div>

          {/* Top Right - Hero Image */}
          <div className="relative max-w-[612px]">
            <Image
              className="w-[612px]"
              url="/homepage/steady_formation_hero_image.png"
              alt="Steady Formation Hero Image"
              width={612}
              height={524}
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

            <InfinityBrandSliding />
          </div>
        </div>

        {/* Mobile Layout */}
      </div>
    </section>
  );
}
