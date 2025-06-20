import { sampleReviews } from "../data/review";
import ReviewsSection from "../shared/ReviewSection";
import ServicesSection from "../shared/ServiceSection";
import TrustedCustomerSection from "../shared/TrustedCustomerSection";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <ServicesSection />
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
