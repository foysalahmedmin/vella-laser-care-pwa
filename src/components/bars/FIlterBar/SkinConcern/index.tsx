import useLanguage from "@/hooks/states/useLanguage";
import { SetFilterSkinConcern } from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredConcerns } from "@/services/product.service";
import { ChevronDown, ChevronUp, Circle, Radio } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface SkinConcernItem {
  _id: string;
  name: string;
  name_bn: string;
}

const SkinConcern = () => {
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const { skin_concern } = useSelector(
    (state: RootState) => state.product_filter,
  );
  const { language } = useLanguage();

  const { data } = useQuery<SkinConcernItem[]>(
    ["filtered_skin_concerns"],
    fetchFilteredConcerns,
  );

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">
          {language.code === "en" ? "Skin Concern" : "ত্বকের উদ্বেগ"}
        </h2>
        <button onClick={() => setView(!view)}>
          {view ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {view && data && (
        <div className="mt-2 space-y-2">
          {data.map((item) => (
            <button
              key={item._id}
              onClick={() =>
                dispatch(
                  SetFilterSkinConcern(
                    skin_concern === item._id ? "" : item._id,
                  ),
                )
              }
              className="flex w-full items-center pt-2"
            >
              {skin_concern === item._id ? (
                <Radio className="text-primary fill-current" />
              ) : (
                <Circle className="text-gray-300" />
              )}
              <span className="ml-2">
                {language.code === "en" ? item.name : item.name_bn}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkinConcern;
