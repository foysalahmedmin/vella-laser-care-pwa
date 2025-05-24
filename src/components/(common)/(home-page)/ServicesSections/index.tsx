import ServiceCard from "@/components/cards/ServiceCard";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchFeaturedServices } from "@/services/services.service";
import ServiceSectionSkeleton from "@/skeletons/ServiceSectionSkeleton";
import type { Service } from "@/types";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

export default function TopServices() {
  const { code } = useLanguage();
  const navigate = useNavigate();
  const { isLoading, data: services } = useQuery({
    queryKey: ["filtered_services"],
    queryFn: () => fetchFeaturedServices(),
  });

  if (isLoading) return <ServiceSectionSkeleton />;

  return (
    <section className="bg-card py-4">
      <div className="container">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {code === "en" ? "Top Services" : "উল্লেখযোগ্য সেবাসমূহ"}
            </h2>
            <button
              onClick={() => navigate("/services")}
              className="text-primary transition-colors"
            >
              {code === "en" ? "See All" : "বিস্তারিত"}
            </button>
          </div>
          <div className="flex w-full gap-4 overflow-x-auto">
            {(services?.data ?? []).map((service: Service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
