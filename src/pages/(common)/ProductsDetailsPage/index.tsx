import { Tabs } from "@/components/ui/Tabs";
import useLanguage from "@/hooks/states/useLanguage";
import { SetCartProduct } from "@/redux/slices/cart-slice";
import type { RootState } from "@/redux/store";
import { addToFavorites } from "@/services/favorites.service";
import { fetchOneProduct } from "@/services/product.service";
import type { ProductDetails } from "@/types";
import {
  Circle,
  Facebook,
  Heart,
  HelpCircle,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";

// AddCart Component
const AddCart = ({ product }: { product: ProductDetails }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const { language } = useLanguage();

  const handleAddToCart = () => {
    if (
      products.some(
        (x: any) => x?._id === product?._id && x?.quantity === quantity,
      )
    ) {
      toast.error(
        language.code === "en"
          ? "Already added to cart! Please check your cart"
          : "কার্টে ইতিমধ্যে যোগ করা হয়েছে! অনুগ্রহ করে আপনার কার্ট চেক করুন",
      );
      return;
    }

    dispatch(
      SetCartProduct({
        _id: product?._id,
        name: product?.name,
        price: product?.selling_price - (product?.discount_amount || 0),
        name_bn: product?.name_bn,
        thumbnail: product?.media?.thumbnail,
        short_description: product?.short_description,
        short_description_bn: product?.short_description_bn,
        rating: product?.rating,
        discount_amount: product?.discount_amount,
        quantity: quantity,
      }),
    );

    toast.success(
      language.code === "en"
        ? "Product added to cart!"
        : "পণ্য কার্টে যোগ করা হয়েছে!",
    );
  };

  return (
    <div className="border-t bg-white p-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center rounded border border-gray-300">
          <button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="flex items-center justify-center border-r border-gray-300 p-2"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 text-lg font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="flex items-center justify-center border-l border-gray-300 p-2"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-primary-500 ml-4 flex w-3/5 items-center justify-center rounded-xl p-3"
        >
          <span className="mr-2 font-bold text-white">
            {language.code === "en" ? "Add to cart" : "কার্টে যুক্ত করুন"}
          </span>
          <ShoppingCart size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

// Details Component
const Details = ({ product }: { product: ProductDetails }) => {
  const { mutateAsync } = useMutation(addToFavorites);
  const { language } = useLanguage();

  const handleFavorite = async () => {
    try {
      await mutateAsync({ product: product?._id });
      toast.success(
        language.code === "en"
          ? "Added to favorites!"
          : "পছন্দের তালিকায় যোগ করা হয়েছে!",
      );
    } catch (error) {
      toast.error(
        language.code === "en"
          ? "Failed to add to favorites"
          : "পছন্দের তালিকায় যোগ করতে ব্যর্থ হয়েছে",
      );
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between">
        {product?.discount && (
          <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
            {product?.discount_type === "percentage"
              ? `-${product?.discount}%`
              : `-${product?.discount}৳`}
          </span>
        )}
        <button onClick={handleFavorite} className="text-gray-500">
          <Heart fill={language.code === "en" ? "none" : "currentColor"} />
        </button>
      </div>

      <div className="space-y-2 pt-4">
        <h1 className="text-xl font-bold">
          {language.code === "en" ? product?.name : product?.name_bn}
        </h1>
        <p className="text-gray-600">
          {language.code === "en"
            ? product?.short_description
            : product?.short_description_bn}
        </p>
      </div>

      <div className="py-4">
        <p className="text-md font-bold">SKU: {product?.sku}</p>
      </div>

      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < (product?.rating || 0) ? "#FFD700" : "none"}
            color="#FFD700"
          />
        ))}
        <span>{product?.rating}</span>
        <span>({product?.total_review})</span>
        {product?.country_origin && (
          <img
            src={`${product?.country_origin}`}
            alt="Country of origin"
            className="h-6 w-6"
          />
        )}
      </div>

      <div className="flex items-center space-x-4 pt-4 pb-2">
        <span className="text-xl font-bold">
          ৳{product?.selling_price - (product?.discount_amount || 0)}
        </span>
        {product?.discount_amount && (
          <span className="text-lg text-gray-500 line-through">
            ৳{product?.selling_price}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <span className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm">
          {language.code === "en"
            ? "Guaranteed lowest price"
            : "সর্বনিম্ন মূল্য নিশ্চিত"}
          <HelpCircle size={16} color="#3B82F6" className="ml-1" />
        </span>
      </div>
    </div>
  );
};

// Features Component
const Features = ({ product }: { product: ProductDetails }) => {
  const { language } = useLanguage();

  const HighlightContent = () => (
    <div className="p-4">
      <p>
        {language.code === "en" ? product?.highlight : product?.highlight_bn}
      </p>
    </div>
  );

  const KeyBenefitsContent = () => (
    <div className="p-4">
      <ul className="space-y-2">
        {product?.key_benefits?.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <Circle size={8} className="mt-2 mr-2 flex-shrink-0" />
            <span>
              {language.code === "en" ? benefit?.name : benefit?.name_bn}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const KeyIngredientsContent = () => (
    <div className="p-4">
      <p>
        {language.code === "en"
          ? product?.key_ingredients
          : product?.key_ingredients_bn}
      </p>
    </div>
  );

  return (
    <div className="mt-6 rounded-lg bg-white shadow-sm">
      <Tabs defaultValue="highlight">
        <Tabs.List className="border-b">
          <Tabs.Trigger value="highlight">
            {language.code === "en" ? "Highlight" : "হাইলাইট"}
          </Tabs.Trigger>
          <Tabs.Trigger value="benefits">
            {language.code === "en" ? "Key Benefits" : "মূল সুবিধা"}
          </Tabs.Trigger>
          <Tabs.Trigger value="ingredients">
            {language.code === "en" ? "Key Ingredients" : "মূল উপাদান"}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content>
          <Tabs.Item value="highlight" activeClassName="block">
            <HighlightContent />
          </Tabs.Item>
          <Tabs.Item value="benefits" activeClassName="block">
            <KeyBenefitsContent />
          </Tabs.Item>
          <Tabs.Item value="ingredients" activeClassName="block">
            <KeyIngredientsContent />
          </Tabs.Item>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};

// Shipping Component
const Shipping = () => {
  const { language } = useLanguage();

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-bold">
          {language.code === "en"
            ? "Shipping to all over Bangladesh"
            : "সারা বাংলাদেশে ডেলিভারি"}
        </h3>
        <p className="text-gray-600">
          {language.code === "en"
            ? "Delivery charge depends on your city. (4-8 business days)"
            : "ডেলিভারি চার্জ আপনার শহরের উপর নির্ভর করে। (4-8 কার্যদিবস)"}
        </p>
      </div>

      <button className="text-primary-500 my-4 underline">
        {language.code === "en"
          ? "Return, Refund & Exchange policy"
          : "রিটার্ন, রিফান্ড এবং এক্সচেঞ্জ নীতি"}
      </button>

      <div className="flex items-center pt-6">
        <span className="text-gray-600">
          {language.code === "en" ? "SHARE" : "শেয়ার"}
        </span>
        <div className="ml-4 flex items-center space-x-4">
          <button className="text-blue-600">
            <Facebook size={20} />
          </button>
          <button className="text-gray-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ViewProduct Component
const ViewProduct = ({ media }: { media: ProductDetails["media"] }) => {
  const [mainImage, setMainImage] = useState(media?.thumbnail || "");

  return (
    <div className="bg-white p-6">
      <div className="flex w-full justify-center">
        <img
          src={mainImage}
          alt="Product"
          className="h-64 w-full max-w-md object-contain"
        />
      </div>

      {media?.gallery && media.gallery.length > 0 && (
        <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
          {media.gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 ${
                mainImage === img ? "border-primary-500" : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`Product view ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Main ProductDetails Component
const ProductsDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["one_product", id],
    queryFn: () => fetchOneProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl bg-white">
        <ViewProduct media={product?.media} />
        <Details product={product} />
        <AddCart product={product} />
        <Shipping />
        <Features product={product} />
      </div>
    </div>
  );
};

export default ProductsDetails;
