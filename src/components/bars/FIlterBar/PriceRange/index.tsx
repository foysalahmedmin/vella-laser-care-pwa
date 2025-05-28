import useLanguage from "@/hooks/states/useLanguage";
import {
  SetFilterMaxPrice,
  SetFilterMinPrice,
} from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const PriceRange = () => {
  const dispatch = useDispatch();
  const { min_price, max_price } = useSelector(
    (state: RootState) => state.product_filter,
  );
  const { language } = useLanguage();

  return (
    <div className="border-b border-gray-200 p-4">
      <h2 className="text-lg font-bold">
        {language.code === "en" ? "FILTER BY PRICE" : "মূল্য দ্বারা ফিল্টার"}
      </h2>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="mb-1 block text-sm">
            {language.code === "en" ? "Min Price" : "ন্যূনতম মূল্য"}
          </label>
          <input
            type="text"
            placeholder={language.code === "en" ? "Min Price" : "ন্যূনতম মূল্য"}
            value={min_price}
            onChange={(e) =>
              dispatch(SetFilterMinPrice(Number(e.target.value)))
            }
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>

        <div className="mt-6 h-px w-6 bg-gray-300" />

        <div className="flex-1">
          <label className="mb-1 block text-sm">
            {language.code === "en" ? "Max Price" : "সর্বোচ্চ মূল্য"}
          </label>
          <input
            type="text"
            placeholder={
              language.code === "en" ? "Max Price" : "সর্বোচ্চ মূল্য"
            }
            value={max_price}
            onChange={(e) =>
              dispatch(SetFilterMaxPrice(Number(e.target.value)))
            }
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
