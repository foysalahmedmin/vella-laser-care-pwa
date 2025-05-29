import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import {
  ResetServiceFilter,
  SetFilterEmail,
  SetFilterMessage,
  SetFilterName,
  SetFilterPhone,
} from "@/redux/slices/service-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchMe } from "@/services/auth.service";
import { createServiceBooking } from "@/services/services.service";
import { useMutation } from "@tanstack/react-query";
import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// TypeScript interfaces
interface Service {
  _id: string;
  // Add other service properties as needed
}

interface SubmitFormProps {
  service: Service;
  me?: string;
}

// SubmitForm Component
const SubmitForm = ({ service, me }: SubmitFormProps) => {
  const { language } = useLanguage();
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = useSelector((state: RootState) => state.service_filter);
  const {
    name,
    email,
    phone,
    date,
    slot,
    message,
    service_type,
    payment_method,
  } = formData;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createServiceBooking,
  });

  const handleSubmit = async () => {
    try {
      const requiredFields = [
        name,
        email,
        phone,
        date,
        slot,
        service,
        service_type,
        payment_method,
      ];

      if (requiredFields.some((field) => !field)) {
        return toast.error("All fields are required");
      }

      const status = await mutateAsync({
        ...(user.role === "customer" && { customer: me }),
        ...(user.role === "parlor" && { parlor: me }),
        name,
        service: service._id,
        service_type,
        email,
        phone,
        date,
        slot,
        message,
        payment_method,
      });

      if (payment_method === "online") {
        dispatch(ResetServiceFilter());
        navigate(`/payment/${status.id}`);
      } else {
        dispatch(ResetServiceFilter());
        navigate("/services");
        toast.success("Service Booked Successfully");
      }
    } catch (error) {
      toast.error("Failed to book service");
    }
  };

  return (
    <div className="mt-2 rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <User className="mr-2 h-4 w-4" />
          <span>Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => dispatch(SetFilterName(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <Mail className="mr-2 h-4 w-4" />
          <span>Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => dispatch(SetFilterEmail(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <Phone className="mr-2 h-4 w-4" />
          <span>Phone</span>
        </label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => dispatch(SetFilterPhone(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Message</span>
        </label>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => dispatch(SetFilterMessage(e.target.value))}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className={`bg-primary text-primary-foreground hover:bg-primary w-full rounded-md px-4 py-2 transition ${
          isPending ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

// ServiceCustomerInformation Page
const ServiceCustomerInformation = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector(
    (state: RootState) => state.service_filter,
  );
  const { user } = useUser();
  const { data: me } = useQuery({
    queryKey: ["me", user.isAuthenticated],
    queryFn: async () => {
      const data = await fetchMe();
      if (!name) {
        dispatch(SetFilterName(data?.name));
      }
      if (!email) {
        dispatch(SetFilterEmail(data?.email));
      }
      if (!phone) {
        dispatch(SetFilterPhone(data?.phone));
      }
      return data;
    },
  });

  // Get service from route query
  const service = router.query.service as unknown as Service;

  useEffect(() => {
    if (user.isAuthenticated) {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
      };

      if (!name) dispatch(SetFilterName(userData.name));
      if (!email) dispatch(SetFilterEmail(userData.email));
      if (!phone) dispatch(SetFilterPhone(userData.phone));
    }
  }, [user, dispatch, name, email, phone]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {language.code === "en" ? "Customer Information" : "কাস্টমার তথ্য"}
          </h1>
        </div>

        {service && <SubmitForm service={service} me={me?._id} />}
      </div>
    </div>
  );
};

export default ServiceCustomerInformation;
