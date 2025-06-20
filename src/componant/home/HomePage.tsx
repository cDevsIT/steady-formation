import { sampleReviews } from "../data/review";
import ReviewsSection from "../shared/ReviewSection";
import ServicesSection from "../shared/ServiceSection";
import TrustedCustomerSection from "../shared/TrustedCustomerSection";
import AdvantageSection from "./AdvantageSection";
import DashboardSection from "./DashboardSection";
import FacilitySection from "./FacilitySection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import StatisticsSection from "./StatisticsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <FacilitySection />
      <AdvantageSection />
      <PricingSection />
      <ServicesSection />
      <DashboardSection />
      <ReviewsSection
        reviews={sampleReviews}
        variant="home"
        title="Trusted by Thousands of Happy Customers"
        subtitle="Don't just take our word for it - see what our customers are saying about our services"
      />
      <TrustedCustomerSection />
    </>
  );
};

export default HomePage;
