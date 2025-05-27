import { Tabs } from "@/components/ui/Tabs";
import { URLS } from "@/config";
import useLanguage from "@/hooks/states/useLanguage";
import {
  fetchCustomerAppointments,
  fetchCustomerBookings,
  fetchCustomerOrders,
} from "@/services/order.service";
import { ArrowUpRight, Filter, PhoneCall, Search, Truck } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";

interface Order {
  _id: string;
  order_id: string;
  total: number;
  createdAt: string;
  status?: string;
  [key: string]: unknown;
}

interface Appointment {
  _id: string;
  doctor: {
    _id: string;
    name: string;
    photo: string;
  };
  message: string;
  appointment_type: string;
  status: string;
  slot: {
    _id: string;
    name: string;
  };
  date: string;
  [key: string]: unknown;
}

interface Booking {
  _id: string;
  service: {
    _id: string;
    name: string;
    header: {
      image_1: string;
    };
  };
  service_type: string;
  payment_method: string;
  status: string;
  slot: {
    _id: string;
    name: string;
  };
  createdAt: string;
  [key: string]: unknown;
}

// Empty State Component
const EmptyAppointmentList = () => {
  const { language } = useLanguage();
  return (
    <div className="bg-card flex h-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src="/path-to-no-appointments-image.png"
          alt="No appointments"
          className="mb-2 h-32 w-32"
        />
        <h2 className="text-lg font-bold">
          {language.code === "en"
            ? "You don't have any Appointments!"
            : "আপনার কোনো অ্যাপয়েন্টমেন্ট নেই!"}
        </h2>
      </div>
      <button
        onClick={() => {}}
        className="bg-primary-500 mt-6 mb-2 flex w-full items-center justify-center gap-2 rounded-2xl p-3 font-bold text-white"
      >
        {language.code === "en"
          ? "BOOK APPOINTMENT"
          : "অ্যাপয়েন্টমেন্ট বুক করুন"}
        <ArrowUpRight color="white" />
      </button>
    </div>
  );
};

// Card Components
const AppointmentCard = ({ item }: { item: Appointment }) => {
  const { language } = useLanguage();
  return (
    <div className="mb-3">
      <p className="py-2 text-sm text-slate-500">
        {moment(item.date).format(
          language.code === "en" ? "MMMM DD, YYYY" : "DD MMMM, YYYY",
        )}
      </p>
      <div className="bg-card mt-1 flex items-center justify-between gap-4 rounded-xl p-4 shadow">
        <img
          src={`${URLS.user_photos}/${item.doctor?.photo}`}
          className="h-32 w-32 rounded-md"
          alt="Doctor"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">{item.doctor?.name}</h3>
              <p className="text-sm">{item.message}</p>
              <div className="flex items-center gap-1">
                <span>{item.appointment_type}</span>
                <span className="text-green-500">{item.status}</span>
              </div>
              <p>{item.slot?.name}</p>
            </div>
            {item.appointment_type === "online" && (
              <button className="bg-primary-100 rounded-full p-2">
                <PhoneCall className="text-primary" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ServiceCard Component
const BookingCard = ({ item }: { item: Booking }) => {
  const { language } = useLanguage();

  return (
    <div className="mb-3">
      <p className="py-2 text-sm text-slate-500">
        {moment(item.createdAt).format(
          language.code === "en" ? "MMMM DD, YYYY" : "DD MMMM, YYYY",
        )}
      </p>
      <div className="bg-card mt-1 flex items-center justify-between gap-4 rounded-xl p-4 shadow">
        <img
          src={`${URLS.service_header}/${item.service?.header?.image_1}`}
          className="h-32 w-32 rounded-md"
          alt="Service"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">{item.service?.name}</h3>
              <p className="text-red-500">{item.service_type}</p>
              <div className="flex items-center gap-1">
                <span>{item.payment_method}</span>
                <span className="text-green-500">{item.status}</span>
              </div>
              <p>{item.slot?.name}</p>
            </div>
            {item.payment_method === "online" && (
              <button className="bg-primary-100 rounded-full p-2">
                <PhoneCall className="text-primary" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// OrderCard Component
const OrderCard = ({ item }: { item: Order }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-card mt-1 flex items-center justify-between rounded-lg p-4 shadow">
      <div className="flex flex-1 items-center gap-4">
        <div className="bg-primary-100 rounded-full p-2">
          <Truck className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold">#{item.order_id}</h3>
          <p className="text-sm text-gray-500">
            {moment(item.createdAt).format(
              language.code === "en"
                ? "MMMM, DD YYYY hh:mm A"
                : "DD MMMM, YYYY hh:mm A",
            )}
          </p>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-md text-green-500">+{item.total}BDT</p>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const { language } = useLanguage();
  return (
    <div className="flex items-center justify-between border-b p-2">
      <h1 className="text-xl font-bold">
        {language.code === "en" ? "History" : "ইতিবৃত্ত"}
      </h1>
    </div>
  );
};

// SearchBar Component
const SearchBar = () => {
  const { language } = useLanguage();
  return (
    <div className="bg-card border-b p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 flex-1 items-center rounded-md border border-gray-200">
          <input
            placeholder={
              language.code === "en" ? "Search Orders" : "অর্ডার খুঁজুন"
            }
            className="h-full flex-1 p-4 outline-none"
          />
          <Search className="text-primary mr-2" />
        </div>
        <button className="border-primary-500 flex h-12 items-center justify-center rounded-md border px-3">
          <Filter className="text-primary" />
        </button>
      </div>
    </div>
  );
};

// Main Component
const DashboardCustomer = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("orders");
  const { data: orders, isLoading: ordersLoading } = useQuery("orders", () =>
    fetchCustomerOrders(),
  );
  const { data: appointments, isLoading: appointmentsLoading } = useQuery(
    "appointments",
    () => fetchCustomerAppointments(),
  );
  const { data: bookings, isLoading: bookingsLoading } = useQuery(
    "bookings",
    () => fetchCustomerBookings(),
  );

  return (
    <div className="bg-card flex-1">
      <Header />
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(String(value))}
      >
        <Tabs.List className="p-2">
          <Tabs.Trigger value="orders">
            {language.code === "en" ? "Orders" : "অর্ডার"}
          </Tabs.Trigger>
          <Tabs.Trigger value="appointments">
            {language.code === "en" ? "Appointments" : "এপয়েন্টমেন্ট"}
          </Tabs.Trigger>
          <Tabs.Trigger value="bookings">
            {language.code === "en" ? "Bookings" : "বুকিং"}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content>
          <Tabs.Item value="orders">
            {ordersLoading ? (
              <div>Loading...</div>
            ) : (
              orders?.data?.map((item: Order) => (
                <OrderCard key={item._id} item={item} />
              ))
            )}
          </Tabs.Item>

          <Tabs.Item value="appointments">
            {appointmentsLoading ? (
              <div>Loading...</div>
            ) : (
              appointments?.data?.map((item: Appointment) => (
                <AppointmentCard key={item._id} item={item} />
              ))
            )}
          </Tabs.Item>

          <Tabs.Item value="bookings">
            {bookingsLoading ? (
              <div>Loading...</div>
            ) : (
              bookings?.data?.map((item: Booking) => (
                <BookingCard key={item._id} item={item} />
              ))
            )}
          </Tabs.Item>
        </Tabs.Content>
      </Tabs>

      {!orders?.data?.length &&
        !appointments?.data?.length &&
        !bookings?.data?.length && <EmptyAppointmentList />}
    </div>
  );
};

export default DashboardCustomer;
