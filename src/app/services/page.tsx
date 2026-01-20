
import Services from "@/componant/services/Services";
import PageHeader from "@/componant/ui/PageHeader";
import { API_CONFIG } from "@/config/api";
import { ServiceCardData } from "@/componant/services/ServiceCard";

interface ServiceApiFeature {
  text: string;
  included: boolean;
}

interface ServiceApiResponse {
  id: number;
  name: string;
  description: string | null;
  initial_price: string | number;
  features: ServiceApiFeature[];
}

const page = async () => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/services`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const payload = await response.json();
  const servicesData = Array.isArray(payload?.data) ? payload.data : [];

  const services: ServiceCardData[] = servicesData.map(
    (service: ServiceApiResponse) => ({
      id: service.id,
      title: service.name,
      description: service.description || service.name,
      features: service.features || [],
      price: `Starting at $${service.initial_price}`,
      buttonText: "Order Now",
      icon: "📄",
    })
  );

  return (
    <div>
      <PageHeader
        title="Our Business Formation Services"
        subTitle="Comprehensive solutions to launch, manage, and grow your business with confidence. From entity formation to ongoing compliance, we've got you covered."
        page="Services"
      />

      <Services services={services} />

    </div>
  );
};

export default page;