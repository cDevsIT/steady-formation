import { sampleReviews } from "../data/review";
import ReviewsSection from "../shared/ReviewSection";
import ServicesSection from "../shared/ServiceSection";
import TrustedCustomerSection from "../shared/TrustedCustomerSection";
import AdvantageSection from "./AdvantageSection";
import DashboardSection from "./DashboardSection";
import FacilitySection from "./FacilitySection";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import LatestBlogSection from "./LatestBlogSection";
import PricingSection from "./PricingSection";
import StatisticsSection from "./StatisticsSection";
import WhatYouGetSection from "./WhatYouGetSection";

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
      <WhatYouGetSection />
      <ReviewsSection
        reviews={sampleReviews}
        variant="home"
        title="Trusted by Thousands of Happy Customers"
        subtitle="Don't just take our word for it - see what our customers are saying about our services"
      />
      <FAQSection />
      <LatestBlogSection />
      <TrustedCustomerSection />
    </>
  );
};

export default HomePage;
