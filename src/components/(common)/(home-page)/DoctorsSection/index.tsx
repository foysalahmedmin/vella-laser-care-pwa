import DoctorCard from "@/components/cards/DoctorCard";
import useLanguage from "@/hooks/states/useLanguage";
import type { RootState } from "@/redux/store";
import { fetchFilteredDoctors } from "@/services/doctor.service";
import DoctorSectionSkeleton from "@/skeletons/DoctorSectionSkeleton";
import type { Doctor } from "@/types";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function DoctorsSection() {
  const { code } = useLanguage();
  const navigate = useNavigate();
  const { search, department } = useSelector(
    (state: RootState) => state.filter,
  );

  const { isLoading, data: doctors } = useQuery({
    queryKey: ["doctors", search, department],
    queryFn: () => fetchFilteredDoctors({ department, search }),
  });

  if (isLoading) return <DoctorSectionSkeleton />;

  return (
    <section className="bg-card py-4">
      <div className="container">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {code === "en" ? "Top Doctors" : "উল্লেখযোগ্য ডাক্তার"}
            </h2>
            <button
              onClick={() => navigate("/doctors")}
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              <p className="text-md">
                {code === "en" ? "See All" : "বিস্তারিত"}
              </p>
            </button>
          </div>
          <div className="flex w-full gap-4 overflow-x-auto">
            {(doctors ?? []).map((doctor: Doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
