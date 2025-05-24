import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import React from "react";
import { useNavigate } from "react-router";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  const { _id, name, name_bn, image } = service;
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "bg-primary/5 flex h-48 w-80 shrink-0 flex-row overflow-hidden rounded-md transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="text-primary text-lg font-bold">
          {code === "en" ? name : name_bn}
        </h3>
        <button
          onClick={() => navigate(`/services/${_id}`)}
          className="bg-primary w-fit rounded-md px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {code === "en" ? "View details" : "বিস্তারিত দেখুন"}
        </button>
      </div>
      <div className="w-32">
        <img
          src={`${URLS.service_header}/${image}`}
          alt={code === "en" ? name : name_bn}
          className="h-48 w-full rounded-r object-cover"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
