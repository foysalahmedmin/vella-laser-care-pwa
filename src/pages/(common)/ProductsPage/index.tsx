import ProductCard from "@/components/cards/ProductCard";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { SetFilterSearch } from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredProducts } from "@/services/product.service";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface SearchSectionProps {
  lang: string;
}

// Search Section Component
const SearchSection: React.FC<SearchSectionProps> = ({ lang }) => {
  const dispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.product_filter);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        {lang === "en" ? "Search Product" : "পণ্য অনুসন্ধান করুন"}
      </h2>
      <div className="flex items-center gap-2">
        {user?.role === "parlor" && (
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
        )}
        <div
          className={`flex flex-1 items-center rounded-full border px-4 ${
            user?.role === "parlor" ? "w-10/12" : "w-full"
          }`}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => dispatch(SetFilterSearch(e.target.value))}
            placeholder={
              lang === "en" ? "Search Product" : "পণ্য অনুসন্ধান করুন"
            }
            className="flex-1 bg-transparent py-2 outline-none"
          />
          <Search size={20} className="text-primary" />
        </div>
        <button
          onClick={() => {
            // Implement filter drawer
          }}
          className="p-2"
        >
          <Filter size={24} />
        </button>
      </div>
    </div>
  );
};

// Main App Search Component
const ProductsPage: React.FC = () => {
  const { code } = useLanguage();
  const filter = useSelector((state: RootState) => state.product_filter);

  const { data: products } = useQuery({
    queryKey: [
      "filtered_products",
      filter.search,
      filter.category,
      filter.sub_category,
      filter.min_price,
      filter.max_price,
      filter.skin_type,
      filter.skin_concern,
    ],
    queryFn: () =>
      fetchFilteredProducts({
        page: 1,
        limit: 20,
        search: filter.search,
        category: filter.category,
        sub_category: filter.sub_category,
        min_price: filter.min_price,
        max_price: filter.max_price,
        skin_type: filter.skin_type,
        skin_concern: filter.skin_concern,
      }),
  });

  return (
    <div className="bg-card min-h-screen">
      <SearchSection lang={code} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products?.data?.length ? (
            products.data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-gray-500">
                {code === "en" ? "No products found" : "কোন পণ্য পাওয়া যায়নি"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
