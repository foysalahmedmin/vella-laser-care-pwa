import api from "@/lib/api";

interface SlotsResponse {
  slots: Slot[];
}
interface Slot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface AppointmentPayload {
  customer?: string;
  parlor?: string;
  name: string;
  appointment_type: string;
  department: string;
  doctor: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  message?: string;
}

interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
}

export async function fetchDoctorSlots(
  doctorId: string,
  day: string
): Promise<Slot[]> {
  const params = new URLSearchParams({ doctor: doctorId, day });
  const response = await api.get<ApiResponse<SlotsResponse[]>>(
    `/api/auth/get_doctor_slots?${params}`
  );
  return response.data.data[0]?.slots || [];
}

export async function createAppointment(
  payload: AppointmentPayload
): Promise<ApiResponse> {
  const completePayload = {
    ...payload,
    payment_method: payload.appointment_type,
  };

  return api.post<ApiResponse>(
    "/api/appointment/add_appointment",
    completePayload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
