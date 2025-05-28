import ProductCard from "@/components/cards/ProductCard";
import NotFound from "@/components/partials/NotFound";
import { Carousel } from "@/components/ui/Carousel";
import useLanguage from "@/hooks/states/useLanguage";
import { SetFilterSearch } from "@/redux/slices/product-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredProducts } from "@/services/product.service";
import type { Product } from "@/types";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

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
    <section className="bg-card py-4">
      <div className="container">
        <div>
          <div className="mb-4">
            <SearchBar />
          </div>
          {products?.data?.length === 0 ? (
            <NotFound />
          ) : (
            <Carousel opts={{ align: "start", containScroll: "trimSnaps" }}>
              <Carousel.Content>
                {(products?.data ?? []).map((product: Product) => (
                  <Carousel.Item key={product._id}>
                    <ProductCard product={product} />
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Pagination />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
