import useLanguage from "@/hooks/states/useLanguage";
import {
  SetFilterDate,
  SetFilterPaymentMethod,
  SetFilterServiceType,
  SetFilterSlot,
} from "@/redux/slices/service-filter-slice";
import type { RootState } from "@/redux/store";
import { fetchFilteredSlots } from "@/services/services.service";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

// AppointmentCalendar Component
const AppointmentCalendar = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { date } = useSelector((state: RootState) => state.service_filter);

  const today = moment().format("MMM DD, YYYY");
  const days = Array.from({ length: 15 }, (_, i) => {
    const day = moment().add(i, "days");
    return {
      day: day.date(),
      name: day.format("ddd"),
      year: day.format("YYYY"),
      month: day.format("MM"),
      id: i.toString(),
      dateString: `${day.format("YYYY")}-${day.format("MM")}-${day.format("DD")}`,
    };
  });

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <p className="text-gray-600">{today}</p>
      <h3 className="mt-1 text-lg font-bold">
        {language.code === "en" ? "Today" : "আজ"}
      </h3>

      <div className="flex gap-4 overflow-x-auto py-4">
        {days.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              dispatch(
                SetFilterDate(date === item.dateString ? "" : item.dateString),
              )
            }
            className={`flex min-w-[60px] flex-col items-center rounded-2xl px-4 py-2 ${
              date === item.dateString ? "text-primary-500 bg-blue-100" : ""
            }`}
          >
            <span
              className={`text-lg font-bold ${date === item.dateString ? "text-primary-500" : "text-gray-600"}`}
            >
              {item.day}
            </span>
            <span
              className={`text-sm ${date === item.dateString ? "text-primary-500" : "text-gray-400"}`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// AppointmentType Component
const AppointmentType = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { service_type } = useSelector(
    (state: RootState) => state.service_filter,
  );

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="font-bold">
        {language.code === "en" ? "Service Type" : "সেবার ধরন"}
      </h3>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() =>
            dispatch(
              SetFilterServiceType(
                service_type === "consultant" ? "" : "consultant",
              ),
            )
          }
          className={`flex-1 rounded-full py-3 font-semibold ${
            service_type === "consultant"
              ? "bg-primary text-white"
              : "border-primary-500 text-primary-500 border"
          }`}
        >
          {language.code === "en" ? "Consultant" : "পরামর্শদাতা"}
        </button>

        <button
          onClick={() =>
            dispatch(
              SetFilterServiceType(service_type === "service" ? "" : "service"),
            )
          }
          className={`flex-1 rounded-full py-3 font-semibold ${
            service_type === "service"
              ? "bg-primary text-white"
              : "border-primary-500 text-primary-500 border"
          }`}
        >
          {language.code === "en" ? "Service" : "সেবা"}
        </button>
      </div>
    </div>
  );
};

// ChooseHours Component
const ChooseHours = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { slot } = useSelector((state: RootState) => state.service_filter);
  const { data: slots } = useQuery({
    queryKey: ["slots"],
    queryFn: fetchFilteredSlots,
  });

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="font-bold">
        {language.code === "en" ? "Choose the hours" : "সময় নির্বাচন করুন"}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {slots?.map((item) => (
          <button
            key={item._id}
            onClick={() => dispatch(SetFilterSlot(item._id))}
            className={`rounded-lg py-3 font-bold ${
              slot === item._id
                ? "bg-primary text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// YourProblem Component
const YourProblem = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { service_type, date, slot, payment_method } = useSelector(
    (state: RootState) => state.service_filter,
  );

  const handleNext = () => {
    if (!service_type || !date || !slot || !payment_method || !id) {
      alert(
        language.code === "en"
          ? "Please select all fields!"
          : "সমস্ত ফিল্ড নির্বাচন করুন!",
      );
    } else {
      navigate(`service-customer-info/${id}`);
    }
  };

  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-bold">
        {language.code === "en" ? "Payment Method" : "পেমেন্ট পদ্ধতি"}
      </h3>

      <div className="flex justify-center gap-4">
        <button
          onClick={() =>
            dispatch(
              SetFilterPaymentMethod(
                payment_method === "online" ? "" : "online",
              ),
            )
          }
          className={`flex-1 rounded-full py-3 font-bold ${
            payment_method === "online"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700"
          }`}
        >
          {language.code === "en" ? "Online" : "অনলাইন"}
        </button>

        <button
          onClick={() =>
            dispatch(
              SetFilterPaymentMethod(
                payment_method === "offline" ? "" : "offline",
              ),
            )
          }
          className={`flex-1 rounded-full py-3 font-bold ${
            payment_method === "offline"
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700"
          }`}
        >
          {language.code === "en" ? "Offline" : "অফলাইন"}
        </button>
      </div>

      <button
        onClick={handleNext}
        className="bg-primary mt-6 flex w-full items-center justify-center rounded-2xl py-3 font-bold text-white"
      >
        {language.code === "en" ? "NEXT" : "পরবর্তী"}
        <ChevronRight className="ml-2" />
      </button>
    </div>
  );
};

const ServicesBookingPage = () => {
  const { language } = useLanguage();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">
          {language.code === "en" ? "Book a Service" : "সেবা বুক করুন"}
        </h1>
      </div>

      <div className="mx-auto max-w-4xl p-4">
        <AppointmentType />
        <AppointmentCalendar />
        <ChooseHours />
        <YourProblem id={id as string} />
      </div>
    </div>
  );
};

export default ServicesBookingPage;
