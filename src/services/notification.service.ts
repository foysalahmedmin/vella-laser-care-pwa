import api from "@/lib/api";

// Type Definitions
interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationsCount {
  total: number;
  unread: number;
}

interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
}

// Notification Endpoints
export async function fetchMyNotifications(): Promise<Notification[]> {
  const response = await api.get<ApiResponse<Notification[]>>(
    "/api/notification/get_my_notifications"
  );
  return response.data.data || [];
}

export async function markNotificationsAsRead(): Promise<void> {
  await api.get("/api/notification/read_my_notifications");
}

export async function fetchNotificationsCount(): Promise<NotificationsCount> {
  const response = await api.get<ApiResponse<NotificationsCount>>(
    "/api/notification/get_notifications_counts"
  );
  return response.data.data || { total: 0, unread: 0 };
}
