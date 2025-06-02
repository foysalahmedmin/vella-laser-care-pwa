import { Modal } from "@/components/ui/Modal";
import useCart from "@/hooks/states/useCart";
import useUser from "@/hooks/states/useUser";
import { fetchFilteredCities, fetchMe } from "@/services/auth.service";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";

interface AddressModalProps {
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ onClose }) => {
  const { cart, updateField } = useCart();
  const { user } = useUser();

  const { data: cities } = useQuery(["filtered_cities"], fetchFilteredCities);

  useQuery(["me", user.isAuthenticated], fetchMe, {
    enabled: user.isAuthenticated,
    onSuccess: (data) => {
      if (!cart.city) updateField("city", data?.city || "");
      if (!cart.postal) updateField("postal", data?.postal || "");
      if (!cart.address) updateField("address", data?.address || "");
    },
  });

  return (
    <Modal.Content className="max-w-md">
      <Modal.Header>
        <div className="flex items-center">
          <button onClick={onClose} className="mr-2" aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Edit Address</h2>
        </div>
      </Modal.Header>

      <Modal.Body className="space-y-4">
        <div>
          <label htmlFor="city-select" className="mb-1 block font-medium">
            City
          </label>
          <select
            id="city-select"
            value={cart.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select City</option>
            {cities?.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="postal-input" className="mb-1 block font-medium">
            Postal Code
          </label>
          <input
            id="postal-input"
            type="text"
            value={cart.postal}
            onChange={(e) => updateField("postal", e.target.value)}
            placeholder="Enter your Postal Code"
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="address-textarea" className="mb-1 block font-medium">
            Address
          </label>
          <textarea
            id="address-textarea"
            value={cart.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Enter your address"
            rows={4}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-blue-500 py-3 text-white transition-colors hover:bg-blue-600"
        >
          Save
        </button>
      </Modal.Body>
    </Modal.Content>
  );
};

export default AddressModal;
