import api from "@/lib/api";
import type { Service, ServiceDetails } from "@/types";

// Type Definitions
interface ServiceCategory {
  id: string;
  name: string;
}

interface BookingSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface ServiceBookingPayload {
  customer?: string;
  parlor?: string;
  name: string;
  service: string;
  service_type: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  message?: string;
  payment_method: string;
}

interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
}

export async function fetchOneService(id: string): Promise<ServiceDetails> {
  const response = await api.get<ApiResponse<ServiceDetails>>(
    `/api/service/get_one_service/${id}`,
  );
  return response.data.data;
}

export async function fetchFeaturedServices(): Promise<ApiResponse<Service[]>> {
  return api.get("/api/service/get_featured_services");
}

export async function fetchFilteredServices(
  search?: string,
  category?: string,
): Promise<Service[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const response = await api.get<ApiResponse<Service[]>>(
    `/api/service/get_app_filtered_services?${params}`,
  );
  return response.data.data || [];
}

export async function fetchFilteredServiceCategories(
  search?: string,
): Promise<ServiceCategory[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const response = await api.get<ApiResponse<ServiceCategory[]>>(
    `/api/service_category/get_filtered_service_categories?${params}`,
  );
  return response.data.data || [];
}

export async function createServiceBooking(
  payload: ServiceBookingPayload,
): Promise<ApiResponse> {
  return api.post<ApiResponse>("/api/booking/add_booking", payload, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function fetchFilteredSlots(): Promise<BookingSlot[]> {
  const response = await api.get<ApiResponse<BookingSlot[]>>(
    "/api/doctor/slot/get_filtered_slots",
  );
  return response.data.data || [];
}
