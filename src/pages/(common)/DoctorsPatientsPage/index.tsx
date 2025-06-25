import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import {
  ResetAppointment,
  SetEmail,
  SetMessage,
  SetName,
  SetPhone,
} from "@/redux/slices/appointment-slice";
import type { RootState } from "@/redux/store";
import { fetchMe } from "@/services/auth.service";
import { ChevronLeft, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const AddAppointment = async (data: unknown) => {
  return { success: true, message: "Appointment booked successfully!" };
};

// Submit Form Component
export function SubmitForm({
  doctorId,
  userId,
}: {
  doctorId: string;
  userId?: string;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    appointment_type,
    department,
    date,
    slot,
    name,
    email,
    phone,
    message,
  } = useSelector((state: RootState) => state.appointment);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: AddAppointment,
  });

  const handleSubmit = async () => {
    if (
      !name ||
      !appointment_type ||
      !department ||
      !doctorId ||
      !email ||
      !phone ||
      !date ||
      !slot
    ) {
      return toast.error("Please fill all required fields!");
    }

    try {
      const status = await mutateAsync({
        ...(user.role === "customer" && { customer: userId }),
        ...(user.role === "parlor" && { parlor: userId }),
        name,
        appointment_type,
        department,
        doctor: doctorId,
        email,
        phone,
        date,
        slot,
        message,
      });

      if (appointment_type === "online") {
        dispatch(ResetAppointment());
        navigate("/payment", { state: status, replace: true });
      } else {
        navigate("/doctors");
        dispatch(ResetAppointment());
        toast.success(status?.message || "Appointment booked successfully!");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => dispatch(SetName(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => dispatch(SetEmail(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => dispatch(SetPhone(e.target.value))}
              className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Message
          </label>
          <div className="relative">
            <MessageSquare className="text-muted-foreground absolute top-4 left-3 h-4 w-4" />
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => dispatch(SetMessage(e.target.value))}
              rows={4}
              className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={cn(
          "mt-6 w-full rounded-xl bg-blue-500 py-3 font-bold text-white transition-colors hover:bg-blue-600",
          isLoading && "cursor-not-allowed opacity-70",
        )}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}

// Patient Information Component
export function PatientInformation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { name, email, phone } = useSelector(
    (state: RootState) => state.appointment,
  );
  const { user } = useUser();

  const { data: me, isLoading } = useQuery({
    queryKey: ["me", user.isAuthenticated],
    queryFn: fetchMe,
    onSuccess: (data) => {
      if (!name) dispatch(SetName(data?.name));
      if (!email) dispatch(SetEmail(data?.email));
      if (!phone) dispatch(SetPhone(data?.phone || ""));
    },
  });

  return (
    <div className="bg-card mx-auto min-h-screen max-w-md">
      <header className="bg-card sticky top-0 z-10 border-b p-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-500"
        >
          <ChevronLeft size={20} />
          <h1 className="ml-2 text-xl font-bold">Patient Information</h1>
        </button>
      </header>

      <div className="p-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <SubmitForm doctorId={id as string} userId={me?._id as string} />
        )}
      </div>
    </div>
  );
}
