import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { SetFilterSearch } from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredProducts } from "@/services/product.service";
import { ArrowLeft, Filter, Search, ShoppingCart, Star } from "lucide-react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Interfaces
interface Product {
  _id: string;
  media: string;
  country_origin: string;
  name: string;
  name_bn: string;
  short_description: string;
  short_description_bn: string;
  rating: number;
  discount: number;
  discount_type: string;
  discount_amount: number;
  selling_price: number;
  total_review: number;
}

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
    <div className="bg-white p-4 shadow-sm">
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

// Product Card Component
const ProductCard: React.FC<Product> = ({
  _id,
  media,
  country_origin,
  name,
  name_bn,
  short_description,
  short_description_bn,
  rating,
  discount,
  discount_type,
  discount_amount,
  selling_price,
  total_review,
}) => {
  const { code } = useLanguage();
  const navigate = useNavigate();
  const finalPrice = selling_price - (discount_amount || 0);

  return (
    <article
      onClick={() => navigate(`/products/${_id}`)}
      className="cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-lg"
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={`${URLS.product_thumbnail}/${media}`}
            alt={code === "en" ? name : name_bn}
            className="h-32 w-32 rounded-lg object-cover"
          />
          <div className="bg-primary absolute right-2 bottom-2 rounded-full p-1">
            <ShoppingCart size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {code === "en" ? name : name_bn}
          </h3>
          <p className="mb-2 text-sm text-gray-600">
            {code === "en" ? short_description : short_description_bn}
          </p>

          <div className="mb-2 flex items-center gap-1">
            <Star size={16} fill="currentColor" className="text-primary" />
            <span className="text-sm">
              {rating} ({total_review})
            </span>
            <img
              src={`${URLS.country_origin}/${country_origin}`}
              alt="Country flag"
              className="ml-1 h-4 w-4"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ৳{finalPrice.toLocaleString()}
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ৳{selling_price.toLocaleString()}
                </span>
                <span className="rounded bg-green-500 px-2 py-1 text-sm text-white">
                  {discount_type === "percentage"
                    ? `-${discount}%`
                    : `-৳${discount.toLocaleString()}`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
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
    <div className="min-h-screen bg-white">
      <SearchSection lang={code} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products?.data?.length ? (
            products.data.map((product) => (
              <ProductCard key={product._id} {...product} />
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
