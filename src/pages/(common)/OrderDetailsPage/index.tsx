import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { fetchSalesInvoice } from "@/services/order.service";
import { ArrowLeft, Download, Truck } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface OrderItem {
  _id?: string;
  order_id?: string;
  createdAt?: string;
  total?: number;
  status?: string;
}

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const data = location.state;

  const showError = (message: string) => {
    setToastMessage(message);
    setToastType("error");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDownload = async () => {
    if (!data?._id) {
      showError("No Invoice found");
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetchSalesInvoice(data._id);

      // Create blob and download
      const pdfData = `data:application/pdf;base64,${response}`;
      const link = document.createElement("a");
      link.href = pdfData;
      link.download = `invoice-${data.order_id || "unknown"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const ProfileCard: React.FC<{ item: OrderItem }> = ({ item }) => (
    <div className="flex flex-row items-center justify-between rounded-lg bg-gray-50 p-4 shadow-sm">
      <div className="flex w-2/3 flex-row items-center">
        <div className="bg-card flex items-center justify-center rounded-full p-3 shadow-sm">
          <Truck className="text-primary" size={20} />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-gray-900">#{item?.order_id}</h3>
          <p className="text-muted-foreground text-sm">
            {formatDate(item?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end">
        <span className="text-base font-bold text-green-600">
          +{item?.total}BDT
        </span>
      </div>
    </div>
  );

  const Details: React.FC<{ data: OrderItem }> = ({ data }) => (
    <div className="bg-card items-center justify-center p-2">
      <div className="bg-card m-2 w-full space-y-6 rounded-md border border-gray-200 p-4 py-6">
        <div className="flex flex-row items-start">
          <div className="w-2/3 space-y-2">
            <h4 className="text-base font-bold text-gray-900">Status</h4>
            <p className="text-muted-foreground pt-1">
              {data?.status?.toUpperCase()}
            </p>
          </div>
          <div className="w-1/3 space-y-2">
            <h4 className="text-base font-bold text-gray-900">Total</h4>
            <p className="text-muted-foreground pt-1">{data?.total}BDT</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DownloadFeature: React.FC<{ item: OrderItem }> = ({ item }) => (
    <Modal>
      <div className="items-center space-y-2 p-2">
        <h3 className="pb-4 text-center text-base font-bold">
          Download Invoice
        </h3>
        <Button
          onClick={handleDownload}
          disabled={isDownloading || !item?._id}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          <Download size={16} />
          {isDownloading ? "DOWNLOADING..." : "DOWNLOAD"}
        </Button>
      </div>
    </Modal>
  );

  const Toast: React.FC = () => (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 transform rounded-lg p-4 shadow-lg transition-all duration-300",
        showToast ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        toastType === "error"
          ? "bg-red-600 text-white"
          : "bg-green-600 text-white",
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {toastType === "error" ? "Error" : "Success"}
        </span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            No Order Data Found
          </h2>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-card border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">My Order</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="bg-card flex-1 p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="m-1">
            <ProfileCard item={data} />
          </div>
          <Details data={data} />

          <DownloadFeature item={data} />
        </div>
      </main>

      <Toast />
    </div>
  );
};

export default OrderDetailsPage;
