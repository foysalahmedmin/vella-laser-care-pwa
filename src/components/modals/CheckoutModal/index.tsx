import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/Modal";
import useCart from "@/hooks/states/useCart";
import useUser from "@/hooks/states/useUser";
import { fetchFilteredShipping, fetchMe } from "@/services/auth.service";
import { addCustomerOrder, addGuestOrder } from "@/services/product.service";
import type { OrderData } from "@/types/cart";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";

interface CheckoutModalProps {
  onClose: () => void;
}

type FormField = {
  key: "name" | "email" | "phone" | "address";
  label: string;
  type: string;
  placeholder: string;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { cart, subtotal, updateField, resetCart } = useCart();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { data: shipping } = useQuery(
    ["filtered_shipping", cart.city],
    () => fetchFilteredShipping(cart.city),
    { enabled: !!cart.city },
  );

  useQuery(["me", user.isAuthenticated], fetchMe, {
    enabled: user.isAuthenticated,
    onSuccess: (data) => {
      if (!cart.name) updateField("name", data?.name || "");
      if (!cart.email) updateField("email", data?.email || "");
      if (!cart.phone) updateField("phone", data?.phone || "");
    },
  });

  const { mutateAsync: guestOrder, isLoading: isGuestOrderLoading } =
    useMutation({
      mutationFn: addGuestOrder,
    });

  const { mutateAsync: customerOrder, isLoading: isCustomerOrderLoading } =
    useMutation({
      mutationFn: addCustomerOrder,
    });

  const isLoading = isGuestOrderLoading || isCustomerOrderLoading;
  const shippingCharge = shipping?.charge || 0;
  const total = subtotal + shippingCharge;

  const handleSubmitOrder = useCallback(async () => {
    if (!termsAccepted) {
      alert("Please accept terms and conditions");
      return;
    }

    const orderData: OrderData = {
      name: cart.name,
      city: cart.city,
      postal: cart.postal,
      phone: cart.phone,
      address: cart.address,
      email: cart.email,
      sub_total: subtotal,
      total,
      shipping: shippingCharge,
      sold_from: "customer",
      payment_method: cart.payment_method,
      items: cart.products
        .filter((x) => x.quantity > 0)
        .map((x) => ({
          product: x._id,
          quantity: x.quantity,
          selling_price: x.price,
          discount_amount: x.discount_amount || 0,
          type: "product",
        })),
    };

    try {
      const response = user.isAuthenticated
        ? await customerOrder(orderData)
        : await guestOrder(orderData);

      if (cart.payment_method === "offline") {
        alert("Order placed successfully!");
        resetCart();
        onClose();
      } else {
        navigate("/payment", { state: response });
        resetCart();
      }
    } catch (error: any) {
      alert(`Error: ${error?.message || "Something went wrong!"}`);
    }
  }, [
    termsAccepted,
    cart,
    subtotal,
    total,
    shippingCharge,
    user.isAuthenticated,
    customerOrder,
    guestOrder,
    resetCart,
    onClose,
    navigate,
  ]);

  const formFields: FormField[] = [
    {
      key: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      key: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone",
    },
  ];

  return (
    <Modal.Content className="max-w-md">
      <Modal.Header className="bg-gray-100">
        <h2 className="text-xl font-bold">Delivery</h2>
        <button onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-4">
          {formFields.map(({ key, label, type, placeholder }) => (
            <div
              key={key}
              className="flex items-center justify-between border-b border-gray-200 p-2"
            >
              <label htmlFor={`checkout-${key}`} className="font-medium">
                {label}
              </label>
              <input
                id={`checkout-${key}`}
                type={type}
                value={cart[key] || ""}
                onChange={(e) => updateField(key, e.target.value)}
                placeholder={placeholder}
                className="w-2/3 border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <button
            onClick={() => updateField("payment_method", "shipping")}
            className="flex w-full items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-50"
          >
            <span>Shipping</span>
            <div className="flex items-center">
              <span className="text-gray-600">
                {cart.address || "Add address"}
              </span>
              <ChevronRight size={20} />
            </div>
          </button>

          <button
            onClick={() => updateField("payment_method", "payment")}
            className="flex w-full items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-50"
          >
            <span>Payment</span>
            <div className="flex items-center">
              {cart.payment_method && (
                <>
                  <span className="text-gray-600">({cart.payment_method})</span>
                  <img
                    src={
                      cart.payment_method === "offline"
                        ? "/cod-icon.png"
                        : "/ssl-icon.png"
                    }
                    alt={cart.payment_method}
                    className="ml-2 h-6"
                  />
                </>
              )}
              <ChevronRight size={20} />
            </div>
          </button>

          <div className="flex items-center justify-between p-2 font-bold">
            <span>Total</span>
            <span>৳{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="my-4 flex items-center">
          <Checkbox
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
          >
            I have read and agree with{" "}
            <span className="underline">terms and Conditions*</span>
          </Checkbox>
        </div>

        <button
          onClick={handleSubmitOrder}
          disabled={isLoading || !termsAccepted}
          className="flex w-full items-center justify-center rounded-lg bg-blue-500 py-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isLoading ? "Processing..." : "COMPLETE ORDER"}</span>
          {!isLoading && <ArrowRight size={20} className="ml-2" />}
        </button>
      </Modal.Body>
    </Modal.Content>
  );
};

export default CheckoutModal;
