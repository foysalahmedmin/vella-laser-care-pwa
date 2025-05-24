import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/types";
import React from "react";
import { useNavigate } from "react-router";

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, className }) => {
  const { _id, name, name_bn, photo, tags } = doctor;
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "bg-card w-38 shrink-0 cursor-pointer overflow-hidden rounded-md transition-shadow hover:shadow-lg",
        className,
      )}
      onClick={() => navigate(`/doctors/${_id}`)}
    >
      <img
        src={`${URLS.user_photos}/${photo}`}
        alt={code === "en" ? name : name_bn}
        className="h-48 w-full rounded-md object-cover object-center"
      />
      <div className="space-y-1 p-2">
        <p className="w-full truncate text-center font-bold">
          {code === "en" ? name : name_bn}
        </p>
        <p className="w-full truncate text-center text-sm">
          {tags[0] ? (code === "en" ? tags[0].name : tags[0].name_bn) : ""}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
