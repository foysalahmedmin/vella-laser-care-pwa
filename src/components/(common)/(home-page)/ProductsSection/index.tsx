import NotFound from "@/components/partials/NotFound";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { SetFilterSearch } from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredProducts } from "@/services/product.service";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface Product {
  _id: string;
  name: string;
  name_bn: string;
  media: string;
  short_description: string;
  short_description_bn: string;
  rating: number;
  selling_price: number;
  discount: number;
  discount_type: string;
  discount_amount: number;
  country_origin: string;
  total_review: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { code } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-50"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="flex flex-1">
        <img
          src={`${URLS.product_thumbnail}/${product.media}`}
          alt={code === "en" ? product.name : product.name_bn}
          className="h-36 w-32 rounded-lg object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold">
            {code === "en" ? product.name : product.name_bn}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {code === "en"
              ? product.short_description
              : product.short_description_bn}
          </p>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm">
              {product.rating} ({product.total_review})
            </span>
            <img
              src={`${URLS.country_origin}/${product.country_origin}`}
              alt="Country flag"
              className="ml-2 h-6 w-6"
            />
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-lg font-bold">
              ৳
              {code === "en"
                ? product.selling_price - (product.discount_amount || 0)
                : product.selling_price - (product.discount_amount || 0)}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ৳{product.selling_price}
            </span>
            <span className="ml-2 rounded bg-green-100 px-2 py-1 text-sm text-green-800">
              {product.discount_type === "percentage"
                ? `${product.discount}%`
                : `৳${product.discount}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchBar = () => {
  const { code } = useLanguage();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.product_filter.search);

  return (
    <div className="flex w-full items-center rounded-full border border-gray-300 px-4 py-2">
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(SetFilterSearch(e.target.value))}
        placeholder={code === "en" ? "Search Product" : "পণ্যসমূহ খুজুন"}
        className="flex-1 bg-transparent outline-none"
      />
      <svg
        className="h-5 w-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

const ProductsSection: React.FC = () => {
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
    <div className="mb-6 bg-white p-4">
      <div className="mb-6">
        <SearchBar />
      </div>

      {products?.data?.length === 0 ? (
        <NotFound />
      ) : (
        <Carousel opts={{ align: "start", containScroll: "trimSnaps" }}>
          <CarouselContent>
            {(products?.data ?? []).map((product: Product) => (
              <CarouselItem
                key={product._id}
                className="basis-full md:basis-1/2"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default ProductsSection;
