import useLanguage from "@/hooks/states/useLanguage";
import {
  SetFilterCategory,
  SetFilterSubCategory,
} from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchCategoryFilters } from "@/services/product.service";
import { ChevronDown, ChevronUp, Circle, Radio } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface SubCategoryItem {
  _id: string;
  name: string;
  name_bn: string;
}

interface CategoryItem {
  _id: string;
  name: string;
  name_bn: string;
  sub_categories: SubCategoryItem[];
}

const Category = () => {
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const { category, sub_category } = useSelector(
    (state: RootState) => state.product_filter,
  );
  const { language } = useLanguage();

  const { data } = useQuery<CategoryItem[]>(
    ["category_filters"],
    fetchCategoryFilters,
  );

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">
          {language.code === "en" ? "Categories" : "বিভাগ"}
        </h2>
        <button onClick={() => setView(!view)}>
          {view ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {view && data && (
        <div className="mt-2 space-y-2">
          {data.map((item) => (
            <div key={item._id} className="pt-2">
              <button
                onClick={() => {
                  if (!category) {
                    dispatch(SetFilterCategory(item._id));
                    dispatch(SetFilterSubCategory(""));
                  } else {
                    dispatch(SetFilterCategory(""));
                    dispatch(SetFilterSubCategory(""));
                  }
                }}
                className="flex w-full items-center"
              >
                {category === item._id ? (
                  <Radio className="text-primary-500 fill-current" />
                ) : (
                  <Circle className="text-gray-300" />
                )}
                <span className="ml-2">
                  {language.code === "en" ? item.name : item.name_bn}
                </span>
              </button>

              {category === item._id && item.sub_categories?.length > 0 && (
                <div className="mt-2 space-y-2 pl-6">
                  {item.sub_categories.map((sub) => (
                    <div
                      key={sub._id}
                      className="flex items-center justify-between pt-2"
                    >
                      <button
                        onClick={() => {
                          if (sub_category === sub._id) {
                            dispatch(SetFilterSubCategory(""));
                          } else {
                            dispatch(SetFilterSubCategory(sub._id));
                          }
                        }}
                        className="flex items-center"
                      >
                        {sub_category === sub._id ? (
                          <Radio className="text-primary fill-current" />
                        ) : (
                          <Circle className="text-gray-300" />
                        )}
                        <span className="ml-2">
                          {language.code === "en" ? sub.name : sub.name_bn}
                        </span>
                      </button>
                      <span className="text-sm text-gray-400">(284)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
