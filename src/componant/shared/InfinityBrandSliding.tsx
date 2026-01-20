import Image from "../ui/Image";

const customerLogos = [
    { name: "Adam Smith", url: "/homepage/icons/adam_smith_logo.jpeg" },
    { name: "Dalia Matt", url: "/homepage/icons/dalia_matt_logo.jpeg" },
    { name: "Dominic", url: "/homepage/icons/dominic_logo.jpeg" },
    { name: "Harry Devis", url: "/homepage/icons/harry_devis_logo.jpeg" },
    { name: "Henry", url: "/homepage/icons/henry_logo.jpeg" },
    { name: "Mason", url: "/homepage/icons/mason_logo.jpeg" },
    { name: "Maxon Jed", url: "/homepage/icons/maxon_jed_logo.jpeg" },
    { name: "Morgan Logo", url: "/homepage/icons/morgan_logo.jpeg" },
    { name: "Olieweya", url: "/homepage/icons/olieweya_logo.jpeg" }
  ];

const InfinityBrandSliding = () => {
  return (
      <div className="relative overflow-hidden backdrop-blur-sm rounded-2xl p-4 max-w-[697px]">
          <div className="flex animate-scroll">
              {customerLogos?.map((logo, index) => (
                  <Image
                      className="h-[60px] w-full ml-2"
                      url={logo.url}
                      alt="Client Brand Image"
                      key={index}
                      width={100}
                      height={37}
                  />
              ))}
          </div>
      </div>
  );
};

export default InfinityBrandSliding;