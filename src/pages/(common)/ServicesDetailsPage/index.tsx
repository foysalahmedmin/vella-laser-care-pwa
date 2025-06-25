import { Button } from "@/components/ui/Button";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchOneService } from "@/services/services.service";
import { ArrowUpRight, ChevronRight, Star } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";

// Bio Component
const Bio = ({
  short_description,
  banner,
}: {
  short_description: string;
  banner: string;
}) => {
  const { language } = useLanguage();

  return (
    <div className="bg-card mt-4 rounded-lg p-6 shadow-sm">
      {banner && (
        <img
          src={banner}
          alt="Service banner"
          className="h-64 w-full rounded-lg object-cover"
        />
      )}
      <div className="mt-4">
        <h3 className="text-lg font-bold">
          {language.code === "en" ? "Description" : "বিবরণ"}
        </h3>
        <p className="text-muted-foreground pt-2 leading-relaxed">
          {short_description}
        </p>
      </div>
    </div>
  );
};

// Features Component
const Features = ({
  benefits,
  image_1,
  image_2,
  image_3,
}: {
  benefits: { name: string; name_bn: string }[];
  image_1: string;
  image_2: string;
  image_3: string;
}) => {
  const { language } = useLanguage();

  return (
    <div className="bg-card mt-6 rounded-lg p-6 shadow-sm">
      <div className="rounded-2xl bg-orange-50 p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {benefits?.map((item, index) => (
            <div
              key={index}
              className="flex w-32 flex-shrink-0 flex-col items-center"
            >
              <div className="mb-2 h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
              <p className="text-center text-sm font-bold">
                {language.code === "en" ? item?.name : item?.name_bn}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-lg font-bold">
          {language.code === "en" ? "Before and After" : "আগে এবং পরে"}
        </h3>
        <div className="flex justify-between gap-4 py-3">
          {[image_1, image_2, image_3].map((img, index) =>
            img ? (
              <div key={index} className="w-1/3">
                <img
                  src={img}
                  alt={`Before/After ${index + 1}`}
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>
            ) : (
              <div
                key={index}
                className="h-32 w-1/3 rounded-xl border-2 border-dashed bg-gray-200"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

// ReviewCard Component
const ReviewCard = ({ item }: { item: any }) => {
  return (
    <div className="flex items-start p-4">
      <div className="h-12 w-12 rounded-xl border-2 border-dashed bg-gray-200" />
      <div className="ml-4">
        <h4 className="text-lg font-bold">{item?.name}</h4>
        <p className="text-muted-foreground w-4/5 pt-2">{item?.description}</p>
      </div>
    </div>
  );
};

// ReviewRating Component
const ReviewRating = () => {
  const reviews = [
    {
      id: 1,
      name: "Aparupa Beauty Parlour",
      location: "Kamal Ataturk Avenue. Gulshan 2",
      rating: 4.8,
      description:
        "Very competent specialist. I am very happy that there are such professional doctors.",
    },
    {
      id: 2,
      name: "Aparupa Beauty Parlour",
      location: "Kamal Ataturk Avenue. Gulshan 2",
      rating: 4.8,
      description:
        "Very competent specialist. I am very happy that there are such professional doctors.",
    },
  ];

  return (
    <div className="bg-card mt-6 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center">
          <div className="rounded-2xl bg-blue-100 p-2">
            <Star size={20} className="text-yellow-500" fill="#FFD700" />
          </div>
          <div className="ml-2">
            <p className="text-muted-foreground">Rating</p>
            <p className="font-bold">4.78 out of 5</p>
          </div>
        </div>
        <button className="bg-primary flex items-center rounded-full px-4">
          <span className="py-2 text-white">See All</span>
          <ChevronRight size={20} color="white" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <React.Fragment key={review.id}>
            <ReviewCard item={review} />
            <div className="mb-4 border-b border-gray-200" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ServiceCard Component
const ServiceCard = ({
  type,
  charge,
  features,
  id,
}: {
  type: string;
  charge: number;
  features: any[];
  id: string;
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <div className="flex justify-between">
        <div className="w-8/12 border-r border-gray-300 pr-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              {language.code === "en"
                ? type === "consultant"
                  ? "Consultant Fees"
                  : "Service Charge"
                : type === "consultant"
                  ? "পরামর্শদাতা ফি"
                  : "পরিষেবা চার্জ"}
            </h3>
            <p className="text-muted-foreground">
              {language.code === "en"
                ? "Ideal for individual"
                : "ব্যক্তির জন্য আদর্শ"}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-lg font-bold">
              {charge} {language.code === "en" ? "BDT" : "টাকা"}
            </span>
            <span className="text-muted-foreground ml-1 font-semibold">
              /PER
            </span>
          </div>
        </div>

        <div className="w-4/12 pl-4">
          <h3 className="text-lg font-bold">
            {language.code === "en" ? "Features:" : "বৈশিষ্ট্য:"}
          </h3>
          <ul className="mt-2 space-y-1">
            {features?.map((item, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight size={16} className="mt-1 mr-1 flex-shrink-0" />
                <span className="text-sm">
                  {language.code === "en" ? item?.name : item?.name_bn}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button onClick={() => navigate(`/services/${id}/book`)}>
        <span>{language.code === "en" ? "BOOK SERVICE" : "বুক সার্ভিস"}</span>
        <ArrowUpRight size={20} color="white" className="ml-2" />
      </Button>
    </div>
  );
};

// Services Component
const Services = ({
  consultant_charge,
  service_charge,
  features,
  id,
}: {
  consultant_charge: number;
  service_charge: number;
  features: any[];
  id: string;
}) => {
  return (
    <div className="mt-6 space-y-6">
      <ServiceCard
        type="consultant"
        charge={consultant_charge}
        features={features}
        id={id}
      />
      <ServiceCard
        type="service"
        charge={service_charge}
        features={features}
        id={id}
      />
    </div>
  );
};

// ServiceDetails Component
const ServiceDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["one_service", id],
    queryFn: () => fetchOneService(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          {language.code === "en"
            ? "Failed to load service details"
            : "পরিষেবার বিবরণ লোড করতে ব্যর্থ হয়েছে"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">
          {language.code === "en" ? service?.name : service?.name_bn}
        </h1>

        <Bio
          short_description={
            language.code === "en"
              ? service?.header?.description
              : service?.header?.description_bn
          }
          banner={service?.header?.image_1}
        />

        <Features
          benefits={service?.benefit?.benefits}
          image_1={service?.before_after_1}
          image_2={service?.before_after_2}
          image_3={service?.before_after_3}
        />

        <Services
          consultant_charge={service?.consultant_charge}
          service_charge={service?.service_charge}
          features={service?.header?.tags}
          id={id!}
        />

        {/* Uncomment to show reviews */}
        <ReviewRating />
      </div>
    </div>
  );
};

export default ServiceDetails;
