import { Button } from "@/components/ui/Button";
import { URLS } from "@/config";
import useCart from "@/hooks/states/useCart";
import type { CartProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

interface CartItemProps {
  item: CartProduct;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { updateQuantity, removeItem } = useCart();
  const handleDecrease = () => updateQuantity(index, item.quantity - 1);
  const handleIncrease = () => updateQuantity(index, item.quantity + 1);
  const handleRemove = () => removeItem(index);

  const itemTotal = item.price * item.quantity;
  const discountTotal = (item.discount_amount || 0) * item.quantity;

  return (
    <div className="group relative flex border-b border-gray-200 p-4 transition-colors hover:bg-gray-50">
      <div className="relative">
        <img
          src={`${URLS?.product_thumbnail}/${item.thumbnail}`}
          className="h-32 w-28 rounded-lg object-contain"
          alt={item.name}
          loading="lazy"
        />
        {item.discount_amount && item.discount_amount > 0 && (
          <div className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{((item.discount_amount / item.price) * 100).toFixed(0)}%
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {item.short_description}
          </p>

          <div className="mt-2 flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ৳{item.price.toLocaleString()}
            </span>
            {item.discount_amount && item.discount_amount > 0 && (
              <span className="text-muted-foreground text-sm line-through">
                ৳{(item.price + item.discount_amount).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-card flex items-center rounded-lg border border-gray-300">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDecrease}
                disabled={item.quantity <= 1}
                className="h-8 w-8 p-0"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </Button>

              <span className="flex h-8 w-12 items-center justify-center text-sm font-medium">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleIncrease}
                className="text-primary h-8 w-8 p-0 hover:bg-blue-50"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-8 w-8 p-0 text-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ৳{itemTotal.toLocaleString()}
            </p>
            {discountTotal > 0 && (
              <p className="text-sm text-green-600">
                Saved: ৳{discountTotal.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
