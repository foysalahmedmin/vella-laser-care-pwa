import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchFeaturedServices } from "@/services/services.service";
import ServiceSectionSkeleton from "@/skeletons/ServiceSectionSkeleton";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

interface Service {
  _id: string;
  name: string;
  name_bn: string;
  image: string;
}

const ServiceCard = ({ service }: { service: Service }) => {
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="mx-2 flex h-48 flex-row rounded-md bg-blue-100 shadow-md">
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="text-lg font-bold text-blue-600">
          {code === "en" ? service.name : service.name_bn}
        </h3>
        <button
          onClick={() => navigate(`/services/${service._id}`)}
          className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {code === "en" ? "View details" : "বিস্তারিত দেখুন"}
        </button>
      </div>
      <div className="w-32">
        <img
          src={`${URLS.service_header}/${service.image}`}
          alt={code === "en" ? service.name : service.name_bn}
          className="h-48 w-full rounded-r object-cover"
        />
      </div>
    </div>
  );
};

export default function TopServices() {
  const { code } = useLanguage();
  const navigate = useNavigate();
  const { isLoading, data: services } = useQuery({
    queryKey: ["filtered_services"],
    queryFn: () => fetchFeaturedServices(),
  });

  if (isLoading) return <ServiceSectionSkeleton />;

  return (
    <div className="mb-6 bg-white p-4">
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="text-2xl font-bold">
          {code === "en" ? "Top Services" : "উল্লেখযোগ্য সেবাসমূহ"}
        </h2>
        <button
          onClick={() => navigate("/services")}
          className="text-blue-600 transition-colors hover:text-blue-700"
        >
          {code === "en" ? "See All" : "বিস্তারিত"}
        </button>
      </div>

      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="py-4">
          {(services?.data ?? []).map((service: Service) => (
            <CarouselItem
              key={service._id}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <ServiceCard service={service} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
