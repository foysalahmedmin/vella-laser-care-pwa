import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { ShoppingCart, Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: Product;
  className?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const {
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
  } = product;
  const { code } = useLanguage();
  const navigate = useNavigate();
  const finalPrice = selling_price - (discount_amount || 0);
  return (
    <article
      onClick={() => navigate(`/products/${_id}`)}
      className={cn(
        "bg-card shrink-0 cursor-pointer overflow-hidden rounded-lg border p-4 transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0 self-stretch">
          <img
            src={`${URLS.product_thumbnail}/${media}`}
            alt={code === "en" ? name : name_bn}
            className="h-full w-32 rounded-lg object-contain object-center"
          />
          <div className="bg-primary text-primary-foreground absolute right-2 bottom-2 flex size-6 items-center justify-center rounded-full">
            <ShoppingCart className="size-4" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg">{code === "en" ? name : name_bn}</h3>
          <p className="mb-2 text-sm text-gray-600">
            {code === "en" ? short_description : short_description_bn}
          </p>

          <div className="mb-2 flex items-center gap-1">
            <Star size={16} fill="currentColor" className="text-primary" />
            <span className="text-sm leading-0">
              {rating} ({total_review})
            </span>
            <img
              src={`${URLS.country_origin}/${country_origin}`}
              alt="Country flag"
              className="h-4 shrink-0"
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

export default ProductCard;
