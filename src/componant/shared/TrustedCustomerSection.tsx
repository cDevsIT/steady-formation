
import Rating from "./Rating";
import StartFunnelInput from "./StartFunnelInput";
import InfinityBrandSliding from "./InfinityBrandSliding";

const TrustedCustomerSection = () => {

    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1062px] mx-auto flex flex-col items-center justify-center gap-3">
                <Rating className="" radius={false} />

                <h2 className="text-[30px] lg:text-[60px] leading-[120%] tracking-tighter text-[#6634F3] text-center font-semibold mb-4">We are trusted by over 500+ customers. Join them now and grow your business.</h2>

                <StartFunnelInput
                />

                <InfinityBrandSliding />

            </div>
        </section>
    );
};

export default TrustedCustomerSection;