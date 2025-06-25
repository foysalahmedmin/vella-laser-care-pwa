import { Modal } from "@/components/ui/Modal";
import useCart from "@/hooks/states/useCart";
import { fetchFilteredShipping } from "@/services/auth.service";
import { ChevronLeft, Edit } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";

interface ShippingModalProps {
  onClose: () => void;
}

const ShippingModal: React.FC<ShippingModalProps> = ({ onClose }) => {
  const { cart, updateField } = useCart();

  const { data: shipping } = useQuery(
    ["filtered_shipping", cart.city],
    () => fetchFilteredShipping(cart.city),
    { enabled: !!cart.city },
  );

  return (
    <Modal.Content className="max-w-md">
      <Modal.Header>
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2" aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Shipping</h2>
        </div>
      </Modal.Header>

      <Modal.Body className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="font-bold">Delivery</h3>
            <p>{cart.address || "Please add delivery address"}</p>
          </div>
          <button
            onClick={() => updateField("payment_method", "address")}
            className="hover:text-primary text-blue-500"
            aria-label="Edit address"
          >
            <Edit size={20} />
          </button>
        </div>

        <div>
          <h3 className="mb-4 font-bold">Select delivery</h3>
          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
            <span className="font-bold">
              ৳{shipping?.charge?.toLocaleString() || 0}
            </span>
            <div>
              <p className="font-semibold">Regular</p>
              <p>({shipping?.days || 0} days delivery)</p>
            </div>
            <input
              type="checkbox"
              checked={true}
              onChange={() => {}}
              readOnly
              aria-label="Delivery option selected"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="mb-2">You're almost there!</p>
          <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
            <div className="h-2 w-2/3 bg-blue-500"></div>
          </div>
        </div>
      </Modal.Body>
    </Modal.Content>
  );
};

export default ShippingModal;
