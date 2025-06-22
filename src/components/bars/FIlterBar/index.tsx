import useLanguage from "@/hooks/states/useLanguage";
import Category from "./Category";
import PriceRange from "./PriceRange";
import SkinConcern from "./SkinConcern";
import SkinType from "./SkinType";

const FilterBar = () => {
  const { language } = useLanguage();

  return (
    <div className="z-30 flex h-full flex-col p-4">
      <div className="flex-1 grow">
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
      </div>
      <div className="flex justify-end p-4">
        <button className="bg-primary w-full rounded-full px-6 py-2 font-bold text-white">
          {language.code === "en" ? "Apply" : "প্রয়োগ করুন"}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
