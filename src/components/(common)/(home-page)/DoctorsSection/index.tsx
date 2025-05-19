import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import type { RootState } from "@/redux/store";
import { fetchFilteredDoctors } from "@/services/doctor.service";
import DoctorSectionSkeleton from "@/skeletons/DoctorSectionSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface Doctor {
  _id: string;
  name: string;
  name_bn: string;
  photo: string;
  tags: Array<{ name: string; name_bn: string }>;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className="mx-2 cursor-pointer rounded-md bg-white shadow-md"
      onClick={() => navigate(`/doctors/${doctor._id}`)}
    >
      <img
        src={`${URLS.user_photos}/${doctor.photo}`}
        alt={code === "en" ? doctor.name : doctor.name_bn}
        className="h-48 w-36 rounded-md object-cover"
      />
      <div className="space-y-1 p-2">
        <p className="w-32 truncate text-center font-bold">
          {code === "en" ? doctor.name : doctor.name_bn}
        </p>
        <p className="w-32 truncate text-center text-sm">
          {doctor.tags[0]
            ? code === "en"
              ? doctor.tags[0].name
              : doctor.tags[0].name_bn
            : ""}
        </p>
      </div>
    </div>
  );
};

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
    <div className="mb-4 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xl font-bold">
          {code === "en" ? "Top Doctors" : "উল্লেখযোগ্য ডাক্তার"}
        </p>
        <button
          onClick={() => navigate("/doctors")}
          className="text-primary-500 hover:text-primary-600 transition-colors"
        >
          <p className="text-md">{code === "en" ? "See All" : "বিস্তারিত"}</p>
        </button>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {(doctors?.data ?? []).map((doctor: Doctor) => (
            <CarouselItem
              key={doctor._id}
              className="basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <DoctorCard doctor={doctor} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
