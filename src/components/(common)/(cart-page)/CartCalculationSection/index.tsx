import useCart from "@/hooks/states/useCart";
import { fetchFilteredShipping } from "@/services/auth.service";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";

interface CartCalculationProps {
  onOpenModal: () => void;
}

const CartCalculationSection: React.FC<CartCalculationProps> = ({
  onOpenModal,
}) => {
  const { cart, subtotal, cartProducts } = useCart();

  const { data: shipping } = useQuery(
    ["filtered_shipping", cart.city],
    () => fetchFilteredShipping(cart.city),
    { enabled: !!cart.city },
  );

  const shippingCharge = shipping?.charge || 0;
  const total = subtotal + shippingCharge;
  const hasItems = cartProducts.length > 0;

  return (
    <div className="border-t bg-white p-4">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>৳{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery fee:</span>
          <span>৳{shippingCharge.toLocaleString()}</span>
        </div>

        <div className="my-2 border-b border-gray-200"></div>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>৳{total.toLocaleString()}</span>
        </div>

        <button
          onClick={onOpenModal}
          disabled={!hasItems}
          className="flex w-full items-center justify-center rounded-lg bg-blue-500 py-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>PROCEED TO CHECKOUT</span>
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CartCalculationSection;
