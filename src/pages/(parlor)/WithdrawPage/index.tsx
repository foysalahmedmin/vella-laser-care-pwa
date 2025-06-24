import { Button } from "@/components/ui/Button";
import { FormControl } from "@/components/ui/FormControl";
import useLanguage from "@/hooks/states/useLanguage";
import useUser from "@/hooks/states/useUser";
import { fetchMe } from "@/services/auth.service";
import {
  addWithdrawRequest,
  fetchParlorCounts,
} from "@/services/transactions.service";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user: authUser } = useUser();

  const [formData, setFormData] = useState({
    account_name: "",
    bank_name: "",
    account_number: "",
    branch: "",
    routing_number: "",
    amount: "",
    message: "",
  });

  const { data: balanceData } = useQuery({
    queryKey: ["dashboard_count", authUser.role],
    queryFn: fetchParlorCounts,
  });

  const { data: me } = useQuery({
    queryKey: ["me", authUser.isAuthenticated],
    queryFn: fetchMe,
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: addWithdrawRequest,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (Number(balanceData?.balance) < 1) {
        return toast.error(
          language.code === "en"
            ? "Insufficient Balance"
            : "পর্যাপ্ত ব্যালেন্স নেই",
        );
      }

      if (
        !formData.account_name ||
        !formData.bank_name ||
        !formData.account_number ||
        !formData.branch ||
        !formData.amount
      ) {
        return toast.error(
          language.code === "en"
            ? "Please fill all required fields"
            : "অনুগ্রহ করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন",
        );
      }

      const status = await mutateAsync({
        ...formData,
        amount: Number(formData.amount),
      });

      navigate("/");
      toast.success(
        language.code === "en"
          ? String(
              status?.message || "Withdrawal request submitted successfully",
            )
          : "উত্তোলনের অনুরোধ সফলভাবে জমা দেওয়া হয়েছে",
      );
    } catch (error) {
      toast.error(
        language.code === "en" ? "Withdraw Failed" : "উত্তোলন ব্যর্থ হয়েছে",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="text-gray-700"
          >
            {language.code === "en" ? "Back" : "পিছনে"}
          </Button>
          <h1 className="text-xl font-bold">
            {language.code === "en" ? "Withdraw Request" : "উত্তোলনের অনুরোধ"}
          </h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block w-full space-y-2">
            <span>
              {language.code === "en" ? "Account Name" : "অ্যাকাউন্টের নাম"}
            </span>
            <FormControl
              as="input"
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Account Name"
                  : "অ্যাকাউন্টের নাম লিখুন"
              }
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>{language.code === "en" ? "Bank Name" : "ব্যাংকের নাম"}</span>
            <FormControl
              as="input"
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Bank Name"
                  : "ব্যাংকের নাম লিখুন"
              }
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>
              {language.code === "en" ? "Account Number" : "অ্যাকাউন্ট নম্বর"}
            </span>
            <FormControl
              as="input"
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Account Number"
                  : "অ্যাকাউন্ট নম্বর লিখুন"
              }
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>{language.code === "en" ? "Branch" : "শাখা"}</span>
            <FormControl
              as="input"
              type="text"
              placeholder={
                language.code === "en" ? "Enter Branch" : "শাখার নাম লিখুন"
              }
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>
              {language.code === "en" ? "Routing Number" : "রাউটিং নম্বর"}
            </span>
            <FormControl
              as="input"
              type="text"
              placeholder={
                language.code === "en"
                  ? "Enter Routing Number"
                  : "রাউটিং নম্বর লিখুন"
              }
              name="routing_number"
              value={formData.routing_number}
              onChange={handleChange}
            />
          </label>

          <label className="block w-full space-y-2">
            <span>{language.code === "en" ? "Amount" : "পরিমাণ"}</span>
            <FormControl
              as="input"
              type="number"
              placeholder={
                language.code === "en" ? "Enter Amount" : "পরিমাণ লিখুন"
              }
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block w-full space-y-2">
            <span>{language.code === "en" ? "Message" : "বার্তা"}</span>
            <textarea
              placeholder={
                language.code === "en" ? "Enter Description" : "বিবরণ লিখুন"
              }
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="focus:ring-primary min-h-[100px] w-full rounded-lg border p-3 focus:ring-2 focus:outline-none"
            />
          </label>

          <div className="mt-6">
            <Button type="submit" className="w-full py-3" disabled={isLoading}>
              {isLoading
                ? language.code === "en"
                  ? "Processing..."
                  : "প্রক্রিয়াকরণ চলছে..."
                : language.code === "en"
                  ? "Withdraw"
                  : "উত্তোলন করুন"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
