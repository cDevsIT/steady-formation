
import Rating from "./Rating";
import StartFunnelInput from "./StartFunnelInput";
import InfinityBrandSliding from "./InfinityBrandSliding";

const TrustedCustomerSection = () => {

    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[980px] xl:max-w-[1062px] mx-auto flex flex-col items-center justify-center gap-3">
                <Rating className="" radius={false} />

                <h2 className="text-[30px] lg:text-[60px] leading-[120%] tracking-tighter text-[#6634F3] text-center font-semibold mb-4">We are trusted by over 1000+ customers. Join them now and grow your business.</h2>

                {/* Highlighted Form Container */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 lg:p-8 shadow-lg border border-blue-100 w-full max-w-2xl">
                    <StartFunnelInput />
                </div>

                <InfinityBrandSliding />

            </div>
        </section>
    );
};

export default TrustedCustomerSection;