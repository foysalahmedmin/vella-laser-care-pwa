import useCart from "@/hooks/states/useCart";
import { ShoppingCart } from "lucide-react";
import React from "react";
import CartItem from "./CartItem";

const CartListSection: React.FC = () => {
  const { cartProducts } = useCart();

  if (cartProducts.length === 0) {
    return (
      <div className="py-10 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-400" />
        <p className="mt-4 text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {cartProducts.map((item, index) => (
        <CartItem key={item._id} item={item} index={index} />
      ))}
    </div>
  );
};

export default CartListSection;
