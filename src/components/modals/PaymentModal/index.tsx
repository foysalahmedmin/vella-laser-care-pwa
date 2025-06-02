import { Checkbox } from "@/components/ui/Checkbox";
import { Modal } from "@/components/ui/Modal";
import useCart from "@/hooks/states/useCart";
import useUser from "@/hooks/states/useUser";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface PaymentModalProps {
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  const { cart, updateField } = useCart();
  const { user } = useUser();

  const isParlorUser = user.role === "parlor";

  return (
    <Modal.Content className="max-w-md">
      <Modal.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-2" aria-label="Go back">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold">Payment</h2>
          </div>
          <div className="rounded bg-gray-100 p-2">
            <span className="text-sm">Secure Payment</span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="space-y-4">
        <div className="rounded border border-gray-200 p-4">
          <Checkbox
            checked={cart.payment_method === "online"}
            onChange={() => updateField("payment_method", "online")}
            disabled={isParlorUser}
          >
            <div className="flex items-center space-x-2">
              <span>Online Payment</span>
              <img src="/ssl-icon.png" alt="SSL" className="h-6" />
            </div>
          </Checkbox>
        </div>

        <div className="rounded border border-gray-200 p-4">
          <Checkbox
            checked={cart.payment_method === "offline"}
            onChange={() => updateField("payment_method", "offline")}
            disabled={isParlorUser}
          >
            <div className="flex items-center space-x-2">
              <span>Cash On Delivery</span>
              <img src="/cod-icon.png" alt="COD" className="h-6" />
            </div>
          </Checkbox>
        </div>
      </Modal.Body>
    </Modal.Content>
  );
};

export default PaymentModal;
