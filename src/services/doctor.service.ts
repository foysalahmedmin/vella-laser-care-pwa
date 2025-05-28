import api from "@/lib/api";
import type { Doctor, DoctorDetails } from "@/types";

// Type Definitions
interface Department {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
}

interface FilterParams {
  search?: string;
  department?: string;
}

// Doctor Endpoints
export async function fetchFilteredDoctors(
  params: FilterParams,
): Promise<ApiResponse<Doctor[]>> {
  const { department, search } = params;
  const queryParams = new URLSearchParams();

  if (department) queryParams.append("department", department);
  if (search) queryParams.append("search", search);
  const response = await api.get<ApiResponse<Doctor[]>>(
    `/api/auth/get_filtered_doctors?${queryParams}`,
  );
  return response.data;
}

export async function fetchOneDoctor(
  id: string,
): Promise<ApiResponse<DoctorDetails>> {
  const response = await api.get<ApiResponse<DoctorDetails>>(
    `/api/doctor/profile/get_one_doctor_profile/${id}`,
  );
  return response.data;
}

// Department Endpoints
export async function fetchFilteredDepartments(
  search?: string,
): Promise<ApiResponse<Department[]>> {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  const response = await api.get<ApiResponse<Department[]>>(
    `/api/doctor/department/get_filtered_departments?${queryParams}`,
  );
  return response.data;
}
