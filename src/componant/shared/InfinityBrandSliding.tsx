import Image from "../ui/Image";

const customerLogos = [
    { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
    { name: "Waves", icon: "🌊", url: "/homepage/icons/brand_waves.svg" },
    { name: "RateShow", icon: "⭐", url: "/homepage/icons/brand_rotashow.svg" },
    { name: "Travelers", icon: "✈️", url: "/homepage/icons/brand_travelers.svg" },
  ];

const InfinityBrandSliding = () => {
  return (
      <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 max-w-[697px]">
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
  );
};

export default InfinityBrandSliding;