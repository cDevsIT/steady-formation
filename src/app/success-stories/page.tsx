import { sampleReviews } from "@/componant/data/review";
import ReviewsSection from "@/componant/shared/ReviewSection";
import TrustedCustomerSection from "@/componant/shared/TrustedCustomerSection";
import PageHeader from "@/componant/ui/PageHeader";

export const metadata = {
    title: 'Success Stories - Real Results from Happy Clients',
    description: 'Explore inspiring success stories from our satisfied clients. See how our cleaning services have made a real difference in homes and businesses.',
    keywords: 'success stories, client success, customer experiences, cleaning service case studies, happy clients, cleaning results, customer satisfaction',
  };


const page = () => {
    return (
        <div>
            <PageHeader
                title="Real Stories from Real Founders"
                subTitle="See how entrepreneurs around the world used Steady Formation to launch their U.S. businesses."
                page="Success Stories"
            />
            <div className="max-w-[1512px] mx-auto px-3">
                <ReviewsSection
                    reviews={sampleReviews}
                    variant="review-page"
                />
                <TrustedCustomerSection />
            </div>
        </div>
    );
};

export default page;