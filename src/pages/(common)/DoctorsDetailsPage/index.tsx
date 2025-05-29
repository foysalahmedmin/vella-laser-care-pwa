import Badge from "@/components/ui/Badge";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchOneDoctor } from "@/services/doctor.service";
import type { DoctorDetails } from "@/types";
import {
  ArrowUpRight,
  BriefcaseMedical,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useQuery } from "react-query";

// Bio Component
const Bio = ({ doctor }: { doctor: DoctorDetails }) => {
  const { language } = useLanguage();

  return (
    <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold">
        {language.code === "en" ? "Doctor's Bio" : "ডাক্তারের বায়ো"}
      </h2>
      <p className="mb-4 text-gray-600">
        {language.code === "en"
          ? doctor?.user?.description
          : doctor?.user?.description_bn}
      </p>

      <div className="my-4 border-b border-gray-100" />

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="mr-2" />
            <span>{language.code === "en" ? "Phone" : "ফোন"}</span>
          </div>
          <p className="text-md mt-2">{doctor?.user?.phone}</p>
        </div>

        <div>
          <div className="flex items-center text-gray-600">
            <BriefcaseMedical size={16} className="mr-2" />
            <span>{language.code === "en" ? "Experience" : "অভিজ্ঞতা"}</span>
          </div>
          <p className="text-md mt-2">
            {language.code === "en"
              ? doctor?.experience
              : doctor?.experience_bn}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-gray-600">
          <Mail size={16} className="mr-2" />
          <span>Email</span>
        </div>
        <p className="text-md mt-2">{doctor?.user?.email}</p>
      </div>

      <div className="my-4 border-b border-gray-100" />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-primary-500 mt-3 flex w-full items-center justify-center rounded-2xl p-3"
      >
        <span className="mr-2 font-bold text-white">
          {language.code === "en"
            ? "BOOK APPOINTMENT"
            : "অ্যাপয়েন্টমেন্ট বুক করুন"}
        </span>
        <ArrowUpRight size={20} color="white" />
      </button>
    </div>
  );
};

const Specialization = ({
  specialization,
}: {
  specialization: { name: string; name_bn: string }[];
}) => {
  const { language } = useLanguage();

  return (
    <div className="my-4 flex flex-wrap gap-2">
      {specialization?.map((item, index) => (
        <Badge key={index}>
          {language.code === "en" ? item?.name : item?.name_bn}
        </Badge>
      ))}
    </div>
  );
};

// ProfileCard Component
const ProfileCard = ({ doctor }: { doctor: DoctorDetails }) => {
  const { language } = useLanguage();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="flex">
        {doctor?.user?.photo ? (
          <img
            src={doctor.user.photo}
            alt={doctor.user.name}
            className="h-24 w-24 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed bg-gray-200">
            <User size={32} className="text-gray-400" />
          </div>
        )}

        <div className="ml-4 flex w-7/12 flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold">{doctor?.user?.name}</h2>
            <p className="text-gray-600">
              {language.code === "en"
                ? doctor?.experience
                : doctor?.experience_bn}
            </p>
          </div>

          <div className="mt-2 flex items-center">
            <div className="rounded-full bg-blue-100 p-2">
              <User size={20} className="text-blue-500" />
            </div>
            <div className="ml-2">
              <p className="text-sm text-gray-600">
                {language.code === "en" ? "Patients" : "রোগী"}
              </p>
              <p className="font-bold">100+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main DoctorsProfile Component
const DoctorsDetailsPage = ({ id }: { id: string }) => {
  const { language } = useLanguage();
  const {
    data: doctor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["one_doctor", id],
    queryFn: () => fetchOneDoctor(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (isError || !doctor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          {language.code === "en"
            ? "Failed to load doctor profile"
            : "ডাক্তারের প্রোফাইল লোড করতে ব্যর্থ হয়েছে"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold">
          {language.code === "en" ? "Doctor's Profile" : "ডাক্তারের প্রোফাইল"}
        </h1>
      </div>

      <div className="p-4">
        <ProfileCard doctor={doctor} />
        <Specialization specialization={doctor?.user?.tags} />
        <Bio doctor={doctor} />
      </div>
    </div>
  );
};

export default DoctorsDetailsPage;
