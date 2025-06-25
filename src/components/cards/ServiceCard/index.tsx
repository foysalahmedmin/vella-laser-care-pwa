import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import React from "react";
import { useNavigate } from "react-router";

interface ServiceCardProps {
  variant?: "default" | "feature";
  service: Service;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  variant = "feature",
  service,
  className,
}) => {
  const { _id, name, name_bn, image, tags } = service;
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      {variant === "default" && (
        <div
          onClick={() => navigate(`/services/${_id}`)}
          className={cn(
            "bg-card flex h-48 shrink-0 cursor-pointer flex-row overflow-hidden rounded-md transition-shadow hover:shadow-lg",
            className,
          )}
        >
          <div>
            <img
              src={`${URLS.service_header}/${image}`}
              alt={code === "en" ? name : name_bn}
              className="aspect-square h-48 w-full rounded-r object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <h3 className="text-lg font-bold">
              {code === "en" ? name : name_bn}
            </h3>
            <p className="line-clamp-3">
              {code === "en"
                ? service?.short_description
                : service?.short_description_bn}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {tags?.map((tag) => (
                <span className="bg-primary/10 text-primary inline-block w-fit rounded-md px-2 py-0.5 text-sm transition-colors">
                  {code === "en" ? tag.name : tag.name_bn}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {variant === "feature" && (
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
      )}
    </>
  );
};

export default ServiceCard;
