import api from "@/lib/api";
import { blobToBase64 } from "@/utils/blobToBase64";

// Type Definitions
interface PaginationParams {
  page: number;
  limit: number;
}

interface StatusUpdateParams {
  id: string;
  status: string;
}

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

interface CountData {
  [key: string]: number;
}

// Order Endpoints
export async function fetchCustomerOrders(
  params?: PaginationParams,
): Promise<{ data: Order[]; total: number }> {
  const { page, limit } = params || {};
  const response = await api.get(
    `/api/order/get_customer_orders?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchParlorOrders(
  params?: PaginationParams,
): Promise<Order[]> {
  const { page, limit } = params || {};
  const response = await api.get(
    `/api/order/get_parlor_orders?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchSalesInvoice(id: string): Promise<string> {
  const response = await api.get(`/api/order/get_order_invoice/${id}`, {
    responseType: "blob",
  });
  return blobToBase64(response.data);
}

// Appointment Endpoints
export async function fetchCustomerAppointments(
  params?: PaginationParams,
): Promise<{ data: Appointment[]; total: number }> {
  const { page, limit } = params || {};
  const response = await api.get(
    `/api/appointment/get_customer_appointments?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchParlorAppointments(
  params?: PaginationParams,
): Promise<Appointment[]> {
  const { page, limit } = params || {};
  const response = await api.get(
    `/api/appointment/get_parlor_appointments?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function updateAppointmentStatus(
  params: StatusUpdateParams,
): Promise<void> {
  const { id, status } = params;
  await api.get(
    `/api/appointment/update_status?id=${id}&status=${status || ""}`,
  );
}

// Document Endpoints
export async function fetchPrescriptionPdf(id: string): Promise<string> {
  const response = await api.get(
    `/api/doctor/prescription/get_prescription_pdf/${id}`,
    { responseType: "blob" },
  );
  return blobToBase64(response?.data);
}

export async function fetchDietPdf(id: string): Promise<string> {
  const response = await api.get(`/api/doctor/diet/get_diet_pdf/${id}`, {
    responseType: "blob",
  });
  return blobToBase64(response?.data);
}

// Booking Endpoints
export async function updateBookingStatus(
  params: StatusUpdateParams,
): Promise<void> {
  const { id, status } = params;
  await api.get(`/api/booking/update_status?id=${id}&status=${status || ""}`);
}

export async function fetchCustomerBookings(
  params?: PaginationParams,
): Promise<{ data: Booking[]; total: number }> {
  const { page, limit } = params || {};
  const response = await api.get(
    `/api/booking/get_customer_bookings?page=${page}&limit=${limit}`,
  );
  return response?.data[0];
}

export async function fetchParlorBookings(
  params: PaginationParams,
): Promise<Booking[]> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/booking/get_parlor_bookings?page=${page}&limit=${limit}`,
  );
  return response?.data[0];
}

// Analytics Endpoint
export async function fetchCustomerCounts(): Promise<CountData> {
  const response = await api.get("/api/auth/get_customer_counts");
  return response?.data;
}
