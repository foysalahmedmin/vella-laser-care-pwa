import DoctorCard from "@/components/cards/DoctorCard";
import useLanguage from "@/hooks/states/useLanguage";
import {
  SetFilterDepartment,
  SetFilterDepartmentSearch,
} from "@/redux/slices/doctor-filter-slice";
import type { RootState } from "@/redux/store";
import {
  fetchFilteredDepartments,
  fetchFilteredDoctors,
} from "@/services/doctor.service";
import type { DoctorDepartment } from "@/types";
import { ChevronLeft, Search } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// DoctorsSection Component
const DoctorsSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { search, department } = useSelector(
    (state: RootState) => state.filter,
  );
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctors", search, department],
    queryFn: () => fetchFilteredDoctors({ department, search }),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {language.code === "en" ? "Top Doctors" : "উল্লেখযোগ্য ডাক্তার"}
        </h2>
        <button
          onClick={() => navigate("/doctors/list")}
          className="text-primary-500"
        >
          {language.code === "en" ? "See All" : "সব দেখুন"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {doctors?.length ? (
          doctors
            .slice(0, 4)
            .map((doctor) => <DoctorCard key={doctor._id} doctor={doctor} />)
        ) : (
          <div className="col-span-2 py-8 text-center text-gray-500">
            {language.code === "en"
              ? "No doctors found"
              : "কোনো ডাক্তার পাওয়া যায়নি"}
          </div>
        )}
      </div>
    </div>
  );
};

// DepartmentCard Component
const DepartmentCard = ({ department }: { department: DoctorDepartment }) => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gradientColors = [
    ["#F96A7E", "#F96A7E"],
    ["#93B0EF", "#4082FD"],
    ["#F5D682", "#FEC52E"],
  ];

  const colors =
    gradientColors[Math.floor(Math.random() * gradientColors.length)];

  return (
    <button
      onClick={() => {
        dispatch(SetFilterDepartment(department._id));
        navigate("/doctors");
      }}
      className="flex h-64 flex-col items-center justify-center rounded-2xl p-4"
      style={{
        background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`,
      }}
    >
      <div className="h-20 w-36 rounded-xl border-2 border-dashed bg-gray-200" />

      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-white">
          {language.code === "en" ? department.name : department.name_bn}
        </h3>
        <p className="mt-2 text-white">
          {department.total} {language.code === "en" ? "Doctors" : "ডাক্তার"}
        </p>
      </div>
    </button>
  );
};

// SpecialistDoctors Component
const SpecialistDoctors = () => {
  const { language } = useLanguage();
  const { department_search } = useSelector((state: RootState) => state.filter);
  const { data: departments } = useQuery({
    queryKey: ["departments", department_search],
    queryFn: () => fetchFilteredDepartments(department_search),
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {language.code === "en" ? "Specialist Doctors" : "বিশেষজ্ঞ ডাক্তার"}
        </h2>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {departments?.length ? (
          departments.map((department) => (
            <div key={department._id} className="w-64 flex-shrink-0">
              <DepartmentCard department={department} />
            </div>
          ))
        ) : (
          <div className="w-full py-8 text-center text-gray-500">
            {language.code === "en"
              ? "No departments found"
              : "কোনো বিভাগ পাওয়া যায়নি"}
          </div>
        )}
      </div>
    </div>
  );
};

// SearchDepartmentBar Component
const SearchDepartmentBar = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { department_search } = useSelector((state: RootState) => state.filter);
  const navigate = useNavigate();

  return (
    <div className="flex items-center bg-white p-4 shadow-sm">
      <button onClick={() => navigate(-1)} className="mr-4">
        <ChevronLeft size={24} className="text-gray-400" />
      </button>
      <div className="flex flex-1 items-center rounded-full border border-gray-300 p-2 px-4">
        <input
          type="text"
          value={department_search}
          onChange={(e) => dispatch(SetFilterDepartmentSearch(e.target.value))}
          placeholder={
            language.code === "en"
              ? "Search Department"
              : "বিভাগ অনুসন্ধান করুন"
          }
          className="flex-1 outline-none"
        />
        <Search size={20} className="text-primary-500" />
      </div>
    </div>
  );
};

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <SearchDepartmentBar />
      </div>

      <div className="mx-auto max-w-4xl p-4">
        <SpecialistDoctors />
        <div className="mt-6">
          <DoctorsSection />
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
