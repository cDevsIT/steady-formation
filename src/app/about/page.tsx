import AboutPage from "@/componant/about/AboutPage";
import PageHeader from "@/componant/ui/PageHeader";

export const metadata = {
  title: 'About Us - Who We Are & What We Do',
  description: 'Learn more about our mission, values, and the team behind our trusted cleaning services. Discover what sets us apart and why customers choose us.',
  keywords: 'about us, our story, cleaning company, meet the team, mission and values, professional cleaners, trusted cleaning service',
};

const page = () => {
  return (
    <div>
      <PageHeader
        title="About Steady Formation"
        subTitle="Learn more about the Steady Formation and the team behind it."
        page="About us"
      />

      <AboutPage/>
      
    </div>
  );
};

export default page;