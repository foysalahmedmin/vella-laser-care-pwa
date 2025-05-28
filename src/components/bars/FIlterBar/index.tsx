import useLanguage from "@/hooks/states/useLanguage";
import Category from "./Category";
import PriceRange from "./PriceRange";
import SkinConcern from "./SkinConcern";
import SkinType from "./SkinType";

const FilterBar = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold">
            {language.code === "en" ? "Filter" : "ফিল্টার"}
          </h1>
        </div>

        <div className="divide-y divide-gray-200">
          <PriceRange />
          <Category />
          <SkinType />
          <SkinConcern />
        </div>

        <div className="flex justify-end p-4">
          <button className="bg-primary rounded-full px-6 py-2 font-bold text-white">
            {language.code === "en" ? "Apply" : "প্রয়োগ করুন"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
