import { URLS } from "@/config";
import type { Parlor } from "@/types";
import { MapPin } from "lucide-react";
import React from "react";

interface ParlorCardProps {
  parlor: Parlor;
  className?: string;
}
const ParlorCard: React.FC<ParlorCardProps> = ({ parlor }) => {
  const { name, address, banner } = parlor;
  return (
    <div className="bg-card w-80 shrink-0 overflow-hidden rounded-md transition-shadow hover:shadow-lg">
      <img
        src={`${URLS.parlor_banner}/${banner}`}
        alt={name}
        className="h-48 w-full rounded-t-md object-cover"
      />
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex items-center">
          <div className="flex w-full items-center">
            <div className="mr-2 p-1">
              <MapPin className="text-primary h-5 w-5" />
            </div>
            <p className="line-clamp-1 text-sm text-gray-600">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParlorCard;
