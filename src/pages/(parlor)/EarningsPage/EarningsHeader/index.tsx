import { Button } from "@/components/ui/Button";
import useLanguage from "@/hooks/states/useLanguage";
import { fetchEarningSummary } from "@/services/transactions.service";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";

// Helper function to format numbers in Bengali
const formatNumber = (num: number, lang: string): string => {
  if (lang === "bn") {
    const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => digits[parseInt(digit)]);
  }
  return num.toLocaleString();
};

export const BalanceCard = () => {
  const { language } = useLanguage();
  return (
    <div className="mt-5 flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
        <div className="flex flex-col space-y-2 py-2">
          <p className="text-md pb-2">
            {language.code === "en" ? "Withdrawn to date:" : "ব্যালেন্স"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  title_bn: string;
  sub: string;
  sub_bn: string;
  amount: number;
}

const StatCard = ({ title, title_bn, sub, sub_bn, amount }: StatCardProps) => {
  const { language } = useLanguage();
  return (
    <div className="bg-card w-full rounded-lg p-4">
      <p className="text-md">{language.code === "en" ? title : title_bn}</p>
      <p className="text-sm text-gray-500">
        {language.code === "en" ? sub : sub_bn}
      </p>
      <p className="pt-4 text-xl font-bold">
        ৳{formatNumber(amount, language.code)}
      </p>
    </div>
  );
};

export const CardSections = () => {
  const { data: earnings, isLoading } = useQuery({
    queryKey: ["earnings_summary"],
    queryFn: () => fetchEarningSummary(),
  });

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full animate-pulse rounded-lg bg-[#FCF8F8] p-4"
          >
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-4 h-3 w-1/2 rounded bg-gray-200"></div>
            <div className="h-6 w-1/2 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      <StatCard
        title="Available"
        title_bn="বর্তমান"
        sub="Balance"
        sub_bn="ব্যালেন্স"
        amount={earnings?.balance || 0}
      />
      <StatCard
        title="Total"
        title_bn="মোট"
        sub="Withdraws"
        sub_bn="উত্তোলন"
        amount={earnings?.total_withdraw || 0}
      />
      <StatCard
        title="Total"
        title_bn="মোট"
        sub="Commission"
        sub_bn="কমিশন"
        amount={earnings?.total_commission || 0}
      />
    </div>
  );
};

// Earning Header Component
export const EarningHeader = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {language.code === "en" ? "Earning" : "উপার্জন"}
        </h1>
        <Button onClick={() => navigate("/parlor/withdraw")}>
          <span>{language.code === "en" ? "WITHDRAW" : "উত্তলোন"}</span>
          <ArrowUpRight size={20} className="text-white" />
        </Button>
      </div>
      <BalanceCard />
      <CardSections />
    </div>
  );
};
