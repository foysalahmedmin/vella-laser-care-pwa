import { ChevronLeft, Heart, Search } from "lucide-react";
import { useQuery } from "react-query";

import useLanguage from "@/hooks/states/useLanguage";
import {
  ResetDoctorFilter,
  SetFilterDepartment,
  SetFilterSearch,
} from "@/redux/slices/doctor-filter-slice";
import type { RootState } from "@/redux/store";
import {
  fetchFilteredDepartments,
  fetchFilteredDoctors,
} from "@/services/doctor.service";
import type { Doctor, DoctorDepartment } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// SearchBar Component
const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.filter);
  const { language } = useLanguage();

  return (
    <div className="bg-card container">
      <div className="flex items-center p-4">
        <button
          onClick={() => {
            dispatch(ResetDoctorFilter());
            navigate(-1);
          }}
          className="mr-2 p-1"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex flex-1 items-center rounded-full border border-gray-300 p-2">
          <input
            type="text"
            value={search}
            onChange={(e) => dispatch(SetFilterSearch(e.target.value))}
            placeholder={
              language.code === "en"
                ? "Search doctors"
                : "ডাক্তার অনুসন্ধান করুন"
            }
            className="h-10 flex-1 pl-2 outline-none"
          />
          <Search size={20} className="text-primary ml-2" />
        </div>
      </div>
    </div>
  );
};

// DoctorCard Component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-card mb-4 rounded-xl p-4 shadow-md transition-transform hover:scale-[1.02]">
      <div className="flex items-center">
        {doctor.photo ? (
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="h-32 w-32 rounded-md object-cover"
          />
        ) : (
          <div className="h-32 w-32 rounded-xl border-2 border-dashed bg-gray-200" />
        )}

        <div className="ml-4 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">
                {language.code === "en" ? doctor.name : doctor?.name_bn}
              </h3>
              <p className="text-muted-foreground mt-1 line-clamp-2">
                {language.code === "en"
                  ? doctor.description
                  : doctor?.description_bn}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {doctor.tags?.map((tag) => (
                  <span
                    key={tag._id}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                  >
                    {language.code === "en" ? tag.name : tag.name_bn}
                  </span>
                ))}
              </div>
            </div>

            <button className="rounded-full bg-blue-100 p-2">
              <Heart size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// DepartmentSelect Component
const DepartmentSelect = ({ department }: { department: DoctorDepartment }) => {
  const dispatch = useDispatch();
  const { department: selectedDepartment } = useSelector(
    (state: RootState) => state.filter,
  );
  const { language } = useLanguage();

  const isSelected = selectedDepartment === department._id;

  return (
    <button
      onClick={() => {
        dispatch(SetFilterDepartment(isSelected ? "" : department._id));
      }}
      className={`mr-4 mb-4 rounded-full px-4 py-2 transition-colors ${
        isSelected
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
    >
      {language.code === "en" ? department.name : department.name_bn}
    </button>
  );
};

// SearchResult Component
const SearchResult = () => {
  const { language } = useLanguage();
  const { search, department } = useSelector(
    (state: RootState) => state.filter,
  );

  const { data: departments, isLoading: deptLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchFilteredDepartments(),
  });

  const { data: doctors, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctors", search, department],
    queryFn: () => fetchFilteredDoctors({ department, search }),
  });

  if (deptLoading || doctorLoading) {
    return (
      <div className="bg-card mt-4 p-4">
        <div className="flex animate-pulse flex-wrap gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-gray-200"></div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex rounded-xl border p-4">
              <div className="h-32 w-32 rounded-md bg-gray-200"></div>
              <div className="ml-4 flex-1">
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card mt-4 p-4">
      <div className="flex flex-wrap">
        {departments?.map((department) => (
          <DepartmentSelect key={department._id} department={department} />
        ))}
      </div>

      <div className="mt-6">
        {doctors?.length ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <div className="text-muted-foreground py-12 text-center">
            {language.code === "en"
              ? "No doctors found"
              : "কোনো ডাক্তার পাওয়া যায়নি"}
          </div>
        )}
      </div>
    </div>
  );
};

const DoctorsListPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar />
      <SearchResult />
    </div>
  );
};

export default DoctorsListPage;
