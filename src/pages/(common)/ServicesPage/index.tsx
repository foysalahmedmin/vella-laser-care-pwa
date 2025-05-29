import useLanguage from "@/hooks/states/useLanguage";
import { SetFilterSearch } from "@/redux/slices/service-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredServices } from "@/services/services.service";
import type { Service } from "@/types";
import { ChevronLeft, Search } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// SearchBar Component
const SearchBar = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.service_filter);
  const { language } = useLanguage();

  return (
    <div className="flex items-center bg-white p-4">
      <button onClick={() => window.history.back()} className="mr-2">
        <ChevronLeft size={24} />
      </button>

      <div className="flex flex-1 items-center rounded-full border border-gray-300 p-2">
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(SetFilterSearch(e.target.value))}
          placeholder={
            language.code === "en" ? "Search Service" : "সেবা অনুসন্ধান করুন"
          }
          className="h-10 flex-1 pl-2 outline-none"
        />
        <Search size={20} className="text-primary-500 ml-2" />
      </div>
    </div>
  );
};

// ServiceCard Component
const ServiceCard = ({ service }: { service: Service }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className="mb-4 cursor-pointer rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-[1.02]"
      onClick={() => navigate(`/services/${service._id}`)}
    >
      <div className="flex">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="h-32 w-32 rounded-md object-cover"
          />
        ) : (
          <div className="h-32 w-32 rounded-xl border-2 border-dashed bg-gray-200" />
        )}

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold">
            {language.code === "en" ? service.name : service?.name_bn}
          </h3>
          <p className="mt-1 text-gray-600">
            {language.code === "en"
              ? service.short_description
              : service?.short_description_bn}
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {service.tags?.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
              >
                {language.code === "en" ? tag.name : tag?.name_bn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SearchResult Component
const SearchResult = () => {
  const { language } = useLanguage();
  const { search, category } = useSelector(
    (state: RootState) => state.service_filter,
  );

  const { data: services, isLoading } = useQuery({
    queryKey: ["filtered_services", search, category],
    queryFn: () => fetchFilteredServices(search, category),
  });

  if (isLoading) {
    return (
      <div className="mt-4 bg-white p-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="mb-4 flex animate-pulse rounded-xl border p-4"
          >
            <div className="h-32 w-32 rounded-md bg-gray-200"></div>
            <div className="ml-4 flex-1">
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
              <div className="mb-3 h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded bg-gray-200"></div>
                <div className="h-6 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white p-4">
      {services?.length ? (
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      ) : (
        <div className="py-12 text-center text-gray-500">
          {language.code === "en"
            ? "No services found"
            : "কোনো সেবা পাওয়া যায়নি"}
        </div>
      )}
    </div>
  );
};

// Main AllServices Component
const AllServices = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar />
      <SearchResult />
    </div>
  );
};

export default AllServices;
