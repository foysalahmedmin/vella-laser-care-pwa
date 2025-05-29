import api from "@/lib/api";
import type { Service, ServiceCategory, ServiceDetails } from "@/types";

// Type Definitions
interface BookingSlot {
  _id: string;
  name: string;
  name_bn?: string;
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

export async function fetchOneService(id: string): Promise<ServiceDetails> {
  const response = await api.get(`/api/service/get_one_service/${id}`);
  return response.data.data;
}

export async function fetchFeaturedServices(): Promise<Service[]> {
  const response = await api.get("/api/service/get_featured_services");
  return response.data;
}

export async function fetchFilteredServices(
  search?: string,
  category?: string,
): Promise<Service[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const response = await api.get(
    `/api/service/get_app_filtered_services?${params}`,
  );
  return response.data || [];
}

export async function fetchFilteredServiceCategories(
  search?: string,
): Promise<ServiceCategory[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const response = await api.get(
    `/api/service_category/get_filtered_service_categories?${params}`,
  );
  return response.data || [];
}

export async function createServiceBooking(
  payload: ServiceBookingPayload,
): Promise<unknown> {
  const response = await api.post("/api/booking/add_service_booking", payload);
  return response.data;
}

export async function fetchFilteredSlots(): Promise<BookingSlot[]> {
  const response = await api.get("/api/doctor/slot/get_filtered_slots");
  return response.data || [];
}
