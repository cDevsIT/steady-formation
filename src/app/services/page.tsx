
import Services from "@/componant/services/Services";
import PageHeader from "@/componant/ui/PageHeader";

const page = () => {
  return (
    <div>
      <PageHeader
        title="Our Business Formation Services"
        subTitle="Comprehensive solutions to launch, manage, and grow your business with confidence. From entity formation to ongoing compliance, we've got you covered."
        page="Services"
      />

      <Services />

    </div>
  );
};

export default page;