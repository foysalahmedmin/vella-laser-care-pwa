import NotFound from "@/components/partials/NotFound";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchMyFavorites } from "@/services/favorites.service";
import ProductListSkeleton from "@/skeletons/ProductListSkeleton";
import type { FavoriteProduct } from "@/types";
import { bn } from "@/utils/toBangla";
import { ShoppingCart, Star } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

const ProductCard = ({ product }: { product: FavoriteProduct }) => {
  const navigate = useNavigate();
  const { code } = useLanguage();
  const finalPrice = product.selling_price - (product.discount_amount || 0);

  return (
    <div
      onClick={() => navigate(`/products/${product.product_id}`)}
      className="cursor-pointer border-b p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={`${URLS.product_thumbnail}/${product.media}`}
            alt={code === "en" ? product.name : product.name_bn}
            className="h-32 w-32 rounded-lg object-cover"
          />
          <div className="bg-primary absolute right-2 bottom-2 rounded-full p-1">
            <ShoppingCart size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {code === "en" ? product.name : product.name_bn}
          </h3>
          <p className="text-muted-foreground text-sm">
            {code === "en"
              ? product.short_description
              : product.short_description_bn}
          </p>

          <div className="mt-2 flex items-center gap-1">
            <Star size={16} fill="currentColor" className="text-primary" />
            <span className="text-sm">
              {code === "en" ? product.rating : bn.engToNumber(product.rating)}{" "}
              (
              {code === "en"
                ? product.total_review
                : bn.engToNumber(product.total_review)}
              )
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold">
              ৳{code === "en" ? finalPrice : bn.engToNumber(finalPrice)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-muted-foreground text-sm line-through">
                  ৳
                  {code === "en"
                    ? product.selling_price
                    : bn.engToNumber(product.selling_price)}
                </span>
                <span className="rounded bg-green-500 px-2 py-1 text-sm text-white">
                  {product.discount_type === "percentage"
                    ? `-${
                        code === "en"
                          ? product.discount
                          : bn.engToNumber(product.discount)
                      }%`
                    : `-৳${
                        code === "en"
                          ? product.discount
                          : bn.engToNumber(product.discount)
                      }`}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { code } = useLanguage();

  return (
    <header className="border-b border-gray-200 p-4">
      <div className="container">
        <h1 className="text-xl font-bold">
          {code === "en" ? "Favorite" : "পছন্দের পণ্য"}
        </h1>
      </div>
    </header>
  );
};

const FavoritePage = () => {
  const { data, isLoading } = useQuery<FavoriteProduct[]>({
    queryKey: ["my_favorites"],
    queryFn: fetchMyFavorites,
  });

  if (isLoading) {
    return (
      <div className="bg-card min-h-screen">
        <Header />
        <ProductListSkeleton />
      </div>
    );
  }

  return (
    <main>
      <Header />
      <section className="bg-card min-h-screen">
        <div className="container">
          <div className="divide-y">
            {data?.length ? (
              data.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FavoritePage;
