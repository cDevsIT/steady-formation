import StatisticsSection from "../home/StatisticsSection";
import ServicesSection from "../shared/ServiceSection";
import TrustedCustomerSection from "../shared/TrustedCustomerSection";
import AboutHelpSection from "./AboutHelpSection";
import BrandSection from "./BrandSection";
import HowWeThinkSection from "./HowWeThinkSection";

const AboutPage = () => {
    return (
        <div className="max-w-[1020px] xl:max-w-[1150px] 2xl:max-w-[1392px] mx-auto px-3">
            <AboutHelpSection />
            <HowWeThinkSection />
            <BrandSection/>
            <StatisticsSection />
            <ServicesSection />
            <TrustedCustomerSection />
        </div>
    );
};

export default AboutPage;