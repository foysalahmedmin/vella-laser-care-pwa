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
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const SubmitForm = ({
  serviceId,
  userId,
}: {
  serviceId: string;
  userId?: string;
}) => {
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
        serviceId,
        service_type,
        payment_method,
      ];

      if (requiredFields.some((field) => !field)) {
        return toast.error(
          language.code === "en"
            ? "All fields are required"
            : "সব ঘর পূরণ করা আবশ্যক",
        );
      }

      const status = await mutateAsync({
        ...(user.role === "customer" && { customer: userId }),
        ...(user.role === "parlor" && { parlor: userId }),
        name,
        service: serviceId,
        service_type,
        email,
        phone,
        date,
        slot,
        message,
        payment_method,
      });

      dispatch(ResetServiceFilter());

      if (payment_method === "online") {
        navigate(`/payment/${status}`);
      } else {
        navigate("/services");
        toast.success(
          language.code === "en"
            ? "Service Booked Successfully"
            : "সার্ভিস সফলভাবে বুক করা হয়েছে",
        );
      }
    } catch (error) {
      toast.error(
        language.code === "en"
          ? "Failed to book service"
          : "সার্ভিস বুক করতে ব্যর্থ হয়েছে",
      );
    }
  };

  return (
    <div className="bg-card mt-2 rounded-lg p-4 shadow-md">
      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <User className="mr-2 h-4 w-4" />
          <span>{language.code === "en" ? "Name" : "নাম"}</span>
        </label>
        <input
          type="text"
          placeholder={
            language.code === "en" ? "Enter your name" : "আপনার নাম লিখুন"
          }
          value={name}
          onChange={(e) => dispatch(SetFilterName(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <Mail className="mr-2 h-4 w-4" />
          <span>{language.code === "en" ? "Email" : "ইমেইল"}</span>
        </label>
        <input
          type="email"
          placeholder={
            language.code === "en" ? "Enter your email" : "আপনার ইমেইল লিখুন"
          }
          value={email}
          onChange={(e) => dispatch(SetFilterEmail(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <Phone className="mr-2 h-4 w-4" />
          <span>{language.code === "en" ? "Phone" : "ফোন"}</span>
        </label>
        <input
          type="tel"
          placeholder={
            language.code === "en"
              ? "Enter your phone number"
              : "আপনার ফোন নাম্বার লিখুন"
          }
          value={phone}
          onChange={(e) => dispatch(SetFilterPhone(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="mb-1 flex items-center text-sm font-medium text-gray-700">
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>{language.code === "en" ? "Message" : "মেসেজ"}</span>
        </label>
        <textarea
          placeholder={
            language.code === "en" ? "Enter your message" : "আপনার মেসেজ লিখুন"
          }
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
        {isPending
          ? language.code === "en"
            ? "Submitting..."
            : "সাবমিট হচ্ছে..."
          : language.code === "en"
            ? "Submit"
            : "সাবমিট"}
      </button>
    </div>
  );
};

const ServicesCustomersPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector(
    (state: RootState) => state.service_filter,
  );
  const { user } = useUser();

  const { data: me } = useQuery({
    queryKey: ["me", user.isAuthenticated],
    queryFn: fetchMe,
    onSuccess: (data) => {
      if (!name) dispatch(SetFilterName(data?.name));
      if (!email) dispatch(SetFilterEmail(data?.email));
      if (!phone) dispatch(SetFilterPhone(data?.phone || ""));
    },
  });

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

        {id && (
          <SubmitForm serviceId={id as string} userId={me?._id as string} />
        )}
      </div>
    </div>
  );
};

export default ServicesCustomersPage;
