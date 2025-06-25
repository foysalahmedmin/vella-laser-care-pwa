import ServiceCard from "@/components/cards/ServiceCard";
import useLanguage from "@/hooks/states/useLanguage";
import { SetFilterSearch } from "@/redux/slices/service-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredServices } from "@/services/services.service";
import { ChevronLeft, Search } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// SearchBar Component
const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { search } = useSelector((state: RootState) => state.service_filter);

  return (
    <div className="bg-card container">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={24} className="text-muted-foreground" />
        </button>
        <div className="flex flex-1 items-center rounded-full border border-gray-300 p-2 px-4">
          <input
            type="text"
            value={search}
            onChange={(e) => dispatch(SetFilterSearch(e.target.value))}
            placeholder={
              language.code === "en" ? "Search Service" : "সেবা অনুসন্ধান করুন"
            }
            className="flex-1 outline-none"
          />
          <Search size={20} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

// SearchResult Component
const ServicesList = () => {
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
      <div className="bg-card mt-4 p-4">
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
    <div className="container">
      <div className="space-y-4">
        {services?.length ? (
          services.map((service) => (
            <ServiceCard
              variant="default"
              key={service._id}
              service={service}
            />
          ))
        ) : (
          <div className="text-muted-foreground py-12 text-center">
            {language.code === "en"
              ? "No services found"
              : "কোনো সেবা পাওয়া যায়নি"}
          </div>
        )}
      </div>
    </div>
  );
};

const ServicesListPage = () => {
  return (
    <div className="min-h-screen space-y-4">
      <div className="bg-card sticky top-0 z-10 shadow-sm">
        <SearchBar />
      </div>
      <div>
        <ServicesList />
      </div>
    </div>
  );
};

export default ServicesListPage;
