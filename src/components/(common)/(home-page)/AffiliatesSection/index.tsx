import ParlorCard from "@/components/cards/ParlorCard";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchAffiliatedParlors } from "@/services/auth.service";
import type { Parlor } from "@/types";
import React from "react";
import { useQuery } from "react-query";

export const AffiliateSection: React.FC = () => {
  const { code } = useLanguage();

  const { data: parlors } = useQuery<Parlor[]>({
    queryKey: ["parlors"],
    queryFn: () => fetchAffiliatedParlors(),
  });

  return (
    <section className="bg-card py-4">
      <div className="container">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {code === "en" ? "Affiliated Partners" : "সহযোগী পার্টনার"}
            </h2>
          </div>
          <div className="flex w-full gap-4 overflow-x-auto">
            {parlors?.map((parlor) => (
              <ParlorCard key={parlor._id} parlor={parlor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
