import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { fetchAffiliatedParlors } from "@/services/auth.service";
import { MapPin } from "lucide-react";
import { useQuery } from "react-query";

interface Parlor {
  _id: string;
  name: string;
  banner: string;
  address: string;
}

const PartnerCard = ({ parlor }: { parlor: Parlor }) => {
  return (
    <div className="mx-2 w-80 overflow-hidden rounded-md bg-white shadow-lg">
      <img
        src={`${URLS.parlor_banner}/${parlor.banner}`}
        alt={parlor.name}
        className="h-48 w-full rounded-t-md object-cover"
      />
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-bold">{parlor.name}</h3>
        <div className="flex items-center">
          <div className="flex w-full items-center">
            <div className="mr-2 p-1">
              <MapPin className="text-primary h-5 w-5" />
            </div>
            <p className="line-clamp-1 text-sm text-gray-600">
              {parlor.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AffiliatedPartners = () => {
  const { user } = useUser();
  const { code } = useLanguage();

  const { data: parlors } = useQuery<Parlor[]>({
    queryKey: ["parlors", user?.accessToken],
    queryFn: fetchAffiliatedParlors,
    enabled: !!user?.accessToken,
  });

  return (
    <section className="bg-white px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {code === "en" ? "Affiliated Partners" : "সহযোগী পার্টনার"}
        </h2>
      </div>

      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {parlors?.map((parlor) => (
            <CarouselItem
              key={parlor._id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <PartnerCard parlor={parlor} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
