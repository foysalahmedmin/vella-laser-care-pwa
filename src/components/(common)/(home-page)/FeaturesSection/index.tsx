// Assuming you have images imported correctly
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

interface Feature {
  _id?: number | string;
  title: string;
  title_bn: string;
  image: string;
  href: string;
}
interface FeatureCardProps {
  feature: Feature;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, className }) => {
  const { title, title_bn, image, href } = feature;
  const navigate = useNavigate();
  const { code } = useLanguage();

  return (
    <div
      className={cn("flex items-center p-2", className)}
      onClick={() => navigate(href)}
      style={{ cursor: "pointer" }}
    >
      <div className="bg-card w-full space-y-2 rounded-md p-2 text-center">
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
  const services: Feature[] = [
    {
      _id: 1,
      title: "Doctors",
      title_bn: "ডাক্তার",
      href: "/doctors",
      image: "/images/icons/circle-doctor.png",
    },
    {
      _id: 2,
      title: "Services",
      title_bn: "সেবাসমূহ",
      href: "/services",
      image: "/images/icons/circle-service.png",
    },
    {
      _id: 3,
      title: "Products",
      title_bn: "পণ্যসমূহ",
      href: "/products",
      image: "/images/icons/circle-product.png",
    },
  ];

  return (
    <section className="bg-card py-4">
      <div className="container">
        <div className="grid w-full grid-cols-3 gap-2">
          {services.map((feature) => (
            <FeatureCard key={feature._id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
