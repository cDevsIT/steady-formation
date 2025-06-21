import StatisticsSection from "../home/StatisticsSection";
import ServicesSection from "../shared/ServiceSection";
import TrustedCustomerSection from "../shared/TrustedCustomerSection";
import AboutHelpSection from "./AboutHelpSection";
import HowWeThinkSection from "./HowWeThinkSection";

const AboutPage = () => {
    return (
        <div className="max-w-[1512px] mx-auto px-3">
            <AboutHelpSection />
            <HowWeThinkSection />
            <StatisticsSection />
            <ServicesSection />
            <TrustedCustomerSection />
        </div>
    );
};

export default AboutPage;