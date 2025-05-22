// Assuming you have images imported correctly
import useLanguage from "@/hooks/states/useLanguage";
import { useNavigate } from "react-router";

interface ServiceCardProps {
  title: string;
  title_bn: string;
  image: string;
  href: string;
}

const ServiceCard = ({ title, title_bn, image, href }: ServiceCardProps) => {
  const navigate = useNavigate();
  const { code } = useLanguage();

  return (
    <div
      className="flex w-1/3 items-center p-2"
      onClick={() => navigate(href)}
      style={{ cursor: "pointer" }}
    >
      <div className="w-full rounded-md bg-white p-2 text-center">
        <img
          src={image}
          alt={code === "en" ? title : title_bn}
          className="mx-auto h-20 w-20 object-contain"
        />
        <p className="text-center font-bold">
          {code === "en" ? title : title_bn}
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  interface Feature {
    id: number;
    title: string;
    title_bn: string;
    href: string;
    image: string;
  }

  const services: Feature[] = [
    {
      id: 1,
      title: "Doctors",
      title_bn: "ডাক্তার",
      href: "/doctors-home",
      image: "/images/icons/circle-doctor.png",
    },
    {
      id: 2,
      title: "Services",
      title_bn: "সেবাসমূহ",
      href: "/services-home",
      image: "/images/icons/circle-service.png",
    },
    {
      id: 3,
      title: "Products",
      title_bn: "পণ্যসমূহ",
      href: "/products-home",
      image: "/images/icons/circle-product.png",
    },
  ];

  return (
    <div className="my-2 flex w-full items-center justify-center bg-white p-2">
      <div className="grid w-full grid-cols-3 gap-2">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            title_bn={service.title_bn}
            image={service.image}
            href={service.href}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
