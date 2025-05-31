import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import useLanguage from "@/hooks/states/useLanguage";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Calendar, Clock, DollarSign, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useQuery } from "react-query";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Types
interface ChartData {
  _id: string | number;
  total: number;
  month?: number;
  year?: number;
}

interface ServiceData {
  _id: string;
  name: string;
  value: number;
}

interface DashboardCounts {
  booking: { total: number; completed: number };
  order: { total: number; completed: number };
  appointment: { total: number; completed: number };
  balance: number;
}

// Mock API functions
const fetchParlorCounts = async (): Promise<DashboardCounts> => {
  return {
    booking: { total: 125, completed: 98 },
    order: { total: 87, completed: 65 },
    appointment: { total: 42, completed: 35 },
    balance: 12560,
  };
};

const fetchParlorEarnings = async (period: string): Promise<ChartData[]> => {
  if (period === "daily") {
    return [
      { _id: "Mon", total: 1200 },
      { _id: "Tue", total: 1900 },
      { _id: "Wed", total: 1500 },
      { _id: "Thu", total: 1800 },
      { _id: "Fri", total: 2200 },
      { _id: "Sat", total: 2500 },
      { _id: "Sun", total: 2000 },
    ];
  }

  if (period === "monthly") {
    return [
      { _id: "Jan", month: 1, year: 2023, total: 4500 },
      { _id: "Feb", month: 2, year: 2023, total: 5200 },
      { _id: "Mar", month: 3, year: 2023, total: 4800 },
    ];
  }

  return [
    { _id: "2020", total: 52000 },
    { _id: "2021", total: 65000 },
    { _id: "2022", total: 78000 },
    { _id: "2023", total: 82000 },
  ];
};

const fetchServiceEarnings = async (): Promise<ServiceData[]> => {
  return [
    { _id: "1", name: "Skincare", value: 12000 },
    { _id: "2", name: "Haircare", value: 8500 },
    { _id: "3", name: "Massage", value: 6500 },
    { _id: "4", name: "Manicure", value: 4200 },
  ];
};

// Helper function to format numbers in Bengali
const formatNumber = (num: number, lang: string): string => {
  if (lang === "bn") {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => digits[parseInt(digit)]);
  }
  return num.toLocaleString();
};

// Card Components
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="flex flex-col items-center p-4">
    <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-500">
      {icon}
    </div>
    <p className="text-xl font-bold text-blue-500">{value}</p>
    <p className="text-md font-medium text-gray-700">{title}</p>
  </Card>
);

export const OverviewCard = () => {
  const { language } = useLanguage();
  const { data } = useQuery(["dashboard_count"], fetchParlorCounts);

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        title={language.code === "en" ? "Bookings" : "সার্ভিস"}
        value={`${formatNumber(data?.booking.completed || 0, language.code)}/${formatNumber(data?.booking.total || 0, language.code)}`}
        icon={<Calendar size={24} />}
      />

      <StatCard
        title={language.code === "en" ? "Orders" : "পণ্যসমূহ"}
        value={`${formatNumber(data?.order.completed || 0, language.code)}/${formatNumber(data?.order.total || 0, language.code)}`}
        icon={<ShoppingCart size={24} />}
      />

      <StatCard
        title={language.code === "en" ? "Appointments" : "এপয়েন্টমেন্ট"}
        value={`${formatNumber(data?.appointment.completed || 0, language.code)}/${formatNumber(data?.appointment.total || 0, language.code)}`}
        icon={<Clock size={24} />}
      />

      <StatCard
        title={language.code === "en" ? "Balance" : "ব্যালেন্স"}
        value={`৳${formatNumber(data?.balance || 0, language.code)}`}
        icon={<DollarSign size={24} />}
      />
    </div>
  );
};

// Chart Components
interface LineChartProps {
  data: ChartData[];
  title: string;
  color?: string;
}

const LineChartComponent = ({
  data,
  title,
  color = "#07BAD1",
}: LineChartProps) => {
  const { language } = useLanguage();
  const chartData = {
    labels: data.map((item) => {
      if ("month" in item && "year" in item) {
        return language.code === "en"
          ? `${item.month}/${item.year}`
          : `${formatNumber(item.month || 0, language.code)}/${formatNumber(item.year || 0, language.code)}`;
      }
      return item._id;
    }),
    datasets: [
      {
        label: language.code === "en" ? "Earnings" : "আয়",
        data: data.map((item) => item.total),
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <Line data={chartData} options={options} />
      </Card.Content>
    </Card>
  );
};

interface BarChartProps {
  data: ServiceData[];
  title: string;
}

const BarChartComponent = ({ data, title }: BarChartProps) => {
  const { language } = useLanguage();
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: language.code === "en" ? "Earnings" : "আয়",
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <Bar data={chartData} options={options} />
      </Card.Content>
    </Card>
  );
};

interface PieChartProps {
  data: ServiceData[];
  title: string;
}

const PieChartComponent = ({ data, title }: PieChartProps) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      </Card.Content>
    </Card>
  );
};

// Dashboard Components
interface EarningsChartProps {
  type: "booking" | "order" | "appointment";
}

const EarningsChart = ({ type }: EarningsChartProps) => {
  const { language } = useLanguage();
  const [period, setPeriod] = useState("daily");
  const { data } = useQuery(["earning_chart", period], () =>
    fetchParlorEarnings(period),
  );

  const titles = {
    en: {
      booking: "Booking Earnings",
      order: "Order Earnings",
      appointment: "Appointment Earnings",
    },
    bn: {
      booking: "সার্ভিস",
      order: "অর্ডার",
      appointment: "এপয়েন্টমেন্ট",
    },
  };

  const colors = {
    booking: "#07BAD1",
    order: "#8E44AD",
    appointment: "#27AE60",
  };

  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between">
        <Card.Title>
          {language.code === "en" ? titles.en[type] : titles.bn[type]}
        </Card.Title>
        <Tabs
          value={period}
          onValueChange={(value) => setPeriod(String(value))}
        >
          <Tabs.List>
            <Tabs.Trigger value="daily">
              {language.code === "en" ? "Daily" : "দৈনিক"}
            </Tabs.Trigger>
            <Tabs.Trigger value="monthly">
              {language.code === "en" ? "Monthly" : "মাসিক"}
            </Tabs.Trigger>
            <Tabs.Trigger value="yearly">
              {language.code === "en" ? "Yearly" : "বার্ষিক"}
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </Card.Header>
      <Card.Content>
        {data && (
          <LineChartComponent
            data={data}
            title={language.code === "en" ? "Earnings" : "আয়"}
            color={colors[type]}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const YearlyIncome = () => {
  const { language } = useLanguage();
  const { data } = useQuery(["services_earnings"], fetchServiceEarnings);

  return (
    <>
      {data && (
        <BarChartComponent
          data={data}
          title={
            language.code === "en"
              ? "Earnings By Services"
              : "সার্ভিস অনুযায়ী আয়"
          }
        />
      )}
    </>
  );
};

const EarningByServices = () => {
  const { language } = useLanguage();
  const { data } = useQuery(["services_earnings"], fetchServiceEarnings);

  return (
    <>
      {data && (
        <PieChartComponent
          data={data}
          title={
            language.code === "en"
              ? "Earnings By Services"
              : "সার্ভিস অনুযায়ী আয়"
          }
        />
      )}
    </>
  );
};

// Main Overview Component
export const Overview = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">
        {language.code === "en" ? "Dashboard Overview" : "ড্যাশবোর্ড ওভারভিউ"}
      </h1>

      <OverviewCard />

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EarningsChart type="booking" />
        <EarningsChart type="order" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <EarningsChart type="appointment" />
        <YearlyIncome />
      </div>

      <div className="mb-6">
        <EarningByServices />
      </div>
    </div>
  );
};
