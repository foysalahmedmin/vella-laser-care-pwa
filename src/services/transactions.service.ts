import api from "@/lib/api";

// Type Definitions
interface PaginationParams {
  page: number;
  limit: number;
}

interface WithdrawRequest {
  amount: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  branch?: string;
  routing_number?: string;
  message?: string;
}

interface DashboardData {
  [key: string]: unknown;
}

interface EarningItem {
  _id: string;
  date: string;
  name: string;
  status: string;
  total?: number;
  total_commission_amount?: number;
  order_id?: string;
  doctor?: { name: string };
  service?: { name: string };
}

interface EarningSummary {
  balance: number;
  total_withdraw: number;
  total_commission: number;
}

// Withdraw Endpoints
export async function fetchMyWithdraws(
  params: PaginationParams,
): Promise<DashboardData> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/withdraw/get_my_withdraws?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function addWithdrawRequest(
  request: WithdrawRequest,
): Promise<DashboardData> {
  const response = await api.post(
    "/api/withdraw/add_withdraw_request",
    request,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
}

// Dashboard Endpoints
export async function fetchParlorEarnings(
  type: string,
): Promise<EarningItem[]> {
  const response = await api.get(
    `/api/dashboard/get_parlor_earnings?type=${type}`,
  );
  return response.data;
}

export async function fetchParlorOrderGraph(
  type: string,
): Promise<DashboardData> {
  const response = await api.get(
    `/api/dashboard/get_parlor_order_chart?type=${type}`,
  );
  return response.data;
}

export async function fetchParlorAppointmentGraph(
  type: string,
): Promise<DashboardData> {
  const response = await api.get(
    `/api/dashboard/get_parlor_appointment_chart?type=${type}`,
  );
  return response.data;
}

export async function fetchServiceEarnings(): Promise<EarningItem[]> {
  const response = await api.get("/api/dashboard/get_service_earnings");
  return response.data;
}

export async function fetchParlorCounts(): Promise<{ count: number }> {
  const response = await api.get("/api/dashboard/get_parlor_counts");
  return response.data;
}

// Earnings Endpoints
export async function fetchEarnings(
  params: PaginationParams,
): Promise<{ data: EarningItem[]; total: number }> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/dashboard/get_booking_earnings?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchAppointmentEarnings(
  params: PaginationParams,
): Promise<{ data: EarningItem[]; total: number }> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/dashboard/get_appointment_earnings?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchOrderEarnings(
  params: PaginationParams,
): Promise<{ data: EarningItem[]; total: number }> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/dashboard/get_order_earnings?page=${page}&limit=${limit}`,
  );
  return response.data[0];
}

export async function fetchEarningSummary(): Promise<EarningSummary> {
  const response = await api.get("/api/dashboard/get_earnings_summary");
  return response.data;
}
