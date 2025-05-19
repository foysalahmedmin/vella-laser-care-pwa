import api from "@/lib/api";

// Type Definitions
interface Doctor {
  _id: string;
  name: string;
  name_bn: string;
  photo: string;
  tags: Array<{ name: string; name_bn: string }>;
  [key: string]: unknown;
}

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

  return api.get(`/api/auth/get_filtered_doctors?${queryParams}`);
}

export async function fetchOneDoctor(id: string): Promise<ApiResponse<Doctor>> {
  return api.get(`/api/doctor/profile/get_one_doctor_profile/${id}`);
}

// Department Endpoints
export async function fetchFilteredDepartments(
  search?: string,
): Promise<ApiResponse<Department[]>> {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);

  return api.get(
    `/api/doctor/department/get_filtered_departments?${queryParams}`,
  );
}
