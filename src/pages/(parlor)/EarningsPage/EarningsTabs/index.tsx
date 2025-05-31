import { Tabs } from "@/components/ui/Tabs";
import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import {
  fetchAppointmentEarnings,
  fetchEarnings,
  fetchOrderEarnings,
} from "@/services/transactions.service";
import { Activity, Calendar, DollarSign, ShoppingCart } from "lucide-react";
import moment from "moment";
import { useQuery } from "react-query";

// History Card Component
interface HistoryCardProps {
  date: string;
  name: string;
  service: string;
  amount: number;
  status: string;
  lang: string;
}

const HistoryCard = ({
  date,
  name,
  service,
  amount,
  status,
  lang,
}: HistoryCardProps) => {
  const statusColors = {
    Completed: "bg-green-100 text-green-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="mb-4 w-full rounded-lg bg-[#FCF8F8] p-4">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-blue-100 p-3 text-blue-500">
            <DollarSign size={24} />
          </div>

          <div>
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-gray-700">{service}</p>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  statusColors[status as keyof typeof statusColors] ||
                    "bg-gray-100 text-gray-800",
                )}
              >
                {status}
              </span>
            </div>
            <p className="mt-1 text-gray-500">
              {moment(date).format(
                lang === "en"
                  ? "MMMM DD, YYYY hh:mm A"
                  : "DD MMMM, YYYY hh:mm A",
              )}
            </p>
          </div>
        </div>

        <p className="mt-3 text-lg font-bold text-green-500 md:mt-0">
          +৳{amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Skeleton Loader Component
const ListCard = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full animate-pulse rounded-lg bg-[#FCF8F8] p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Not Found Component
const NotFound = () => {
  const { language } = useLanguage();
  const lang = language.code;

  return (
    <div className="py-10 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 p-4">
        <Activity size={32} className="mx-auto text-gray-400" />
      </div>
      <p className="mt-4 text-gray-500">
        {lang === "en" ? "No history found" : "কোন ইতিহাস পাওয়া যায়নি"}
      </p>
    </div>
  );
};

// Order History Component
export const OrderHistory = () => {
  const { language } = useLanguage();
  const lang = language.code;
  const { isLoading, data } = useQuery(["order_earnings_table", lang], () =>
    fetchOrderEarnings({ page: 1, limit: 20 }),
  );

  if (isLoading) return <ListCard />;

  return (
    <div className="space-y-4">
      {data?.data?.length ? (
        data.data.map((item) => (
          <HistoryCard
            key={item._id}
            date={item.date}
            name={item.name}
            service={`${lang === "en" ? "Order" : "অর্ডার"} #${item.order_id}`}
            amount={item.total_commission_amount || 0}
            status={item.status}
            lang={lang}
          />
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
};

// Appointment History Component
export const AppointmentHistory = () => {
  const { language } = useLanguage();
  const lang = language.code;
  const { isLoading, data } = useQuery(["appointment_earnings_table"], () =>
    fetchAppointmentEarnings({ page: 1, limit: 20 }),
  );

  if (isLoading) return <ListCard />;

  return (
    <div className="space-y-4">
      {data?.data?.length ? (
        data.data.map((item) => (
          <HistoryCard
            key={item._id}
            date={item.date}
            name={item.name}
            service={`${lang === "en" ? "Appointment with" : "অ্যাপয়েন্টমেন্ট"} ${item.doctor?.name}`}
            amount={item.total || 0}
            status={item.status}
            lang={lang}
          />
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
};

// Service History Component
export const ServiceHistory = () => {
  const { language } = useLanguage();
  const lang = language.code;
  const { isLoading, data: earnings } = useQuery({
    queryKey: ["earnings"],
    queryFn: () => fetchEarnings({ page: 1, limit: 20 }),
  });

  if (isLoading) return <ListCard />;

  return (
    <div className="space-y-4">
      {earnings?.data?.length ? (
        earnings.data.map((item) => (
          <HistoryCard
            key={item._id}
            date={item.date}
            name={item.name}
            service={`${lang === "en" ? "Service" : "সার্ভিস"}: ${item.service?.name}`}
            amount={item.total || 0}
            status={item.status}
            lang={lang}
          />
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
};

// Main Tab Component
export const EarningsTab = () => {
  const { language } = useLanguage();
  const lang = language.code;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <Tabs defaultValue="orders">
        <Tabs.List className="w-full">
          <Tabs.Trigger value="orders">
            <ShoppingCart size={16} className="mr-2" />
            {lang === "en" ? "Orders" : "অর্ডার"}
          </Tabs.Trigger>
          <Tabs.Trigger value="appointments">
            <Calendar size={16} className="mr-2" />
            {lang === "en" ? "Appointments" : "এপয়েন্টমেন্ট"}
          </Tabs.Trigger>
          <Tabs.Trigger value="services">
            <Activity size={16} className="mr-2" />
            {lang === "en" ? "Services" : "সার্ভিস"}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content>
          <Tabs.Item value="orders">
            <OrderHistory />
          </Tabs.Item>

          <Tabs.Item value="appointments">
            <AppointmentHistory />
          </Tabs.Item>

          <Tabs.Item value="services">
            <ServiceHistory />
          </Tabs.Item>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};
