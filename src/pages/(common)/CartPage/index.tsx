import CartCalculationSection from "@/components/(common)/(cart-page)/CartCalculationSection";
import CartListSection from "@/components/(common)/(cart-page)/CartListSection";
import AddressModal from "@/components/modals/AddressModal";
import CheckoutModal from "@/components/modals/CheckoutModal";
import PaymentModal from "@/components/modals/PaymentModal";
import ShippingModal from "@/components/modals/ShippingModal";
import { Modal } from "@/components/ui/Modal";
import useCart from "@/hooks/states/useCart";
import type { JSX } from "react";
import React, { useState } from "react";

type ModalType = "checkout" | "payment" | "shipping" | "address" | "";

const CartPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>("");
  const { totalItems } = useCart();

  const openCheckoutModal = () => {
    setModalType("checkout");
    setModalOpen(true);
  };

  const modals: Record<Exclude<ModalType, "">, JSX.Element> = {
    checkout: <CheckoutModal onClose={() => setModalType("")} />,
    payment: <PaymentModal onClose={() => setModalType("checkout")} />,
    shipping: <ShippingModal onClose={() => setModalType("checkout")} />,
    address: <AddressModal onClose={() => setModalType("shipping")} />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">
          Shopping Cart ({totalItems.toLocaleString()})
        </h1>
      </header>

      <div className="flex flex-col gap-6 p-4 lg:flex-row">
        <div className="flex-1 overflow-hidden rounded-lg bg-white shadow-sm">
          <CartListSection />
        </div>

        <div className="lg:w-96">
          <div className="rounded-lg bg-white shadow-sm">
            <CartCalculationSection onOpenModal={openCheckoutModal} />
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        {(modalType && modals[modalType]) || null}
      </Modal>
    </div>
  );
};

export default CartPage;
