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

interface EarningsData {
  total: number;
  data: Array<{
    date: string;
    amount: number;
  }>;
}

// Withdraw Endpoints
export async function fetchMyWithdraws(
  params: PaginationParams
): Promise<DashboardData> {
  const { page, limit } = params;
  const response = await api.get(
    `/api/withdraw/get_my_withdraws?page=${page}&limit=${limit}`
  );
  return response.data[0];
}

export async function addWithdrawRequest(
  request: WithdrawRequest
): Promise<DashboardData> {
  return api.post("/api/withdraw/add_withdraw_request", request, {
    headers: { "Content-Type": "application/json" },
  });
}

// Dashboard Endpoints
export async function fetchParlorEarnings(type: string): Promise<EarningsData> {
  const response = await api.get(
    `/api/dashboard/get_parlor_earnings?type=${type}`
  );
  return response.data;
}

export async function fetchParlorOrderGraph(
  type: string
): Promise<DashboardData> {
  return api.get(`/api/dashboard/get_parlor_order_chart?type=${type}`);
}

export async function fetchParlorAppointmentGraph(
  type: string
): Promise<DashboardData> {
  return api.get(`/api/dashboard/get_parlor_appointment_chart?type=${type}`);
}

export async function fetchServiceEarnings(): Promise<EarningsData> {
  return api.get("/api/dashboard/get_service_earnings");
}

export async function fetchParlorCounts(): Promise<{ count: number }> {
  return api.get("/api/dashboard/get_parlor_counts");
}

// Earnings Endpoints
export async function fetchEarnings(
  params: PaginationParams
): Promise<EarningsData> {
  const { page, limit } = params;
  return api.get(
    `/api/dashboard/get_booking_earnings?page=${page}&limit=${limit}`
  );
}

export async function fetchAppointmentEarnings(
  params: PaginationParams
): Promise<EarningsData> {
  const { page, limit } = params;
  return api.get(
    `/api/dashboard/get_appointment_earnings?page=${page}&limit=${limit}`
  );
}

export async function fetchOrderEarnings(
  params: PaginationParams
): Promise<EarningsData> {
  const { page, limit } = params;
  return api.get(
    `/api/dashboard/get_order_earnings?page=${page}&limit=${limit}`
  );
}

export async function fetchEarningSummary(): Promise<{
  total: number;
  byType: Record<string, number>;
}> {
  return api.get("/api/dashboard/get_earnings_summary");
}
