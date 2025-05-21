import NotFound from "@/components/partials/NotFound";
import useLanguage from "@/hooks/states/useLanguage";
import {
  fetchMyNotifications,
  markNotificationsAsRead,
} from "@/services/notification.service";
import NotificationSkeleton from "@/skeletons/NotificationSkeleton";
import { Bell } from "lucide-react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

const NotificationCard = ({ notification }: { notification: Notification }) => {
  const { code } = useLanguage();

  return (
    <div className="flex items-start border-b border-gray-200 p-4 transition-colors hover:bg-gray-50">
      <div className="bg-primary-100 mr-3 rounded-full p-2">
        <Bell size={16} className="text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-600">{notification.message}</p>
        <p className="mt-1 text-sm text-gray-500">
          {moment(notification.createdAt).format(
            code === "en" ? "MMMM DD, YYYY h:mm A" : "DD MMMM, YYYY h:mm A",
          )}
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  const { code } = useLanguage();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: markNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleClearAll = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-4">
      <h1 className="text-xl font-bold">
        {code === "en" ? "Notifications" : "নোটিফিকেশন"}
      </h1>
      <button
        onClick={handleClearAll}
        disabled={isLoading}
        className="text-primary-500 font-medium disabled:opacity-50"
      >
        {isLoading ? (
          <span className="animate-pulse">...</span>
        ) : code === "en" ? (
          "Clear All"
        ) : (
          "মুছুন"
        )}
      </button>
    </header>
  );
};

export const NotificationPage = () => {
  const { code } = useLanguage();
  const { data, isLoading, refetch } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: fetchMyNotifications,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <NotificationSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="divide-y divide-gray-200">
        {data?.length ? (
          data.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <NotFound />
        )}
      </div>
      <div className="p-4">
        <button
          onClick={() => refetch()}
          className="w-full p-2 text-sm text-gray-500 hover:text-gray-700"
        >
          {code === "en" ? "Refresh" : "রিফ্রেশ করুন"}
        </button>
      </div>
    </div>
  );
};
