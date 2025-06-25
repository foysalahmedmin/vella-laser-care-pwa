import ServiceCard from "@/components/cards/ServiceCard";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import {
  SetFilterCategory,
  SetFilterCategorySearch,
} from "@/redux/slices/service-filter-slice";
import type { RootState } from "@/redux/store";
import {
  fetchFeaturedServices,
  fetchFilteredServiceCategories,
} from "@/services/services.service";
import type { ServiceCategory } from "@/types";
import { ChevronLeft, Search } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// SearchBar Component
const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { category_search } = useSelector(
    (state: RootState) => state.service_filter,
  );

  return (
    <div className="bg-card container">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={24} className="text-muted-foreground" />
        </button>
        <div className="flex flex-1 items-center rounded-full border border-gray-300 p-2 px-4">
          <input
            type="text"
            value={category_search}
            onChange={(e) => dispatch(SetFilterCategorySearch(e.target.value))}
            placeholder={
              language.code === "en"
                ? "Search Category"
                : "ক্যাটাগরি অনুসন্ধান করুন"
            }
            className="flex-1 outline-none"
          />
          <Search size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

// ServiceCategoryCard Component
const ServiceCategoryCard = ({
  category,
  colors = ["#F96A7E", "#F96A7E"],
}: {
  category: ServiceCategory;
  colors: string[];
}) => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, name, name_bn, total, icon } = category || {};

  return (
    <button
      onClick={() => {
        dispatch(SetFilterCategory(_id));
        navigate("/services/list");
      }}
      className="flex h-64 flex-col items-center justify-center rounded-2xl p-4"
      style={{
        background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`,
      }}
    >
      {icon ? (
        <img
          src={URLS.shop_category_icon + "/" + icon}
          alt={language.code === "en" ? name : name_bn}
          className="h-20 w-36 object-contain"
        />
      ) : (
        <div className="h-20 w-36 rounded-xl border-2 border-dashed bg-gray-200" />
      )}

      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-white">
          {language.code === "en" ? name : name_bn}
        </h3>
        <p className="mt-2 text-white">
          ({total} {language.code === "en" ? "Services" : "সেবা"})
        </p>
      </div>
    </button>
  );
};

// SpecialistCategories Component
const SpecialistCategories = () => {
  const { language } = useLanguage();
  const { category_search } = useSelector(
    (state: RootState) => state.service_filter,
  );
  const { data: categories } = useQuery({
    queryKey: ["filtered_categories", category_search],
    queryFn: () => fetchFilteredServiceCategories(category_search),
  });

  const gradientColors = [
    ["#F96A7E", "#F96A7E"],
    ["#93B0EF", "#4082FD"],
    ["#F5D682", "#FEC52E"],
  ];

  return (
    <div className="container">
      <div className="bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {language.code === "en" ? "Categories" : "ক্যাটেগরি"}
          </h2>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories?.length ? (
            categories.map((category, index) => (
              <ServiceCategoryCard
                key={category._id}
                category={category}
                colors={gradientColors[index % gradientColors.length]}
              />
            ))
          ) : (
            <div className="text-muted-foreground w-full py-8 text-center">
              {language.code === "en"
                ? "No categories found"
                : "কোনো ক্যাটাগরি পাওয়া যায়নি"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// TopServices Component
const TopServices = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: services } = useQuery({
    queryKey: ["filtered_services"],
    queryFn: fetchFeaturedServices,
  });

  return (
    <div className="container">
      <div className="bg-card mt-6 rounded-lg p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {language.code === "en" ? "Top Services" : "উল্লেখযোগ্য সেবাসমূহ"}
          </h2>
          <button
            onClick={() => navigate("/services/list")}
            className="text-primary cursor-pointer"
          >
            {language.code === "en" ? "See All" : "সব দেখুন"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services?.length ? (
            services.map((service) => (
              <ServiceCard
                className="w-full"
                key={service._id}
                service={service}
              />
            ))
          ) : (
            <div className="text-muted-foreground py-4 text-center">
              {language.code === "en"
                ? "No services found"
                : "কোনো সেবা পাওয়া যায়নি"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-card sticky top-0 z-10 shadow-sm">
        <SearchBar />
      </div>
      <div className="my-4 space-y-4">
        <SpecialistCategories />
        <TopServices />
      </div>
    </div>
  );
};

export default ServicesPage;
