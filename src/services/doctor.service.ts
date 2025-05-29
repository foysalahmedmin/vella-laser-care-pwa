import api from "@/lib/api";
import type { Doctor, DoctorDepartment, DoctorDetails } from "@/types";

interface FilterParams {
  search?: string;
  department?: string;
}

// Doctor Endpoints
export async function fetchFilteredDoctors(
  params: FilterParams,
): Promise<Doctor[]> {
  const { department, search } = params;
  const queryParams = new URLSearchParams();

  if (department) queryParams.append("department", department);
  if (search) queryParams.append("search", search);
  const response = await api.get(
    `/api/auth/get_filtered_doctors?${queryParams}`,
  );
  return response.data;
}

export async function fetchOneDoctor(id: string): Promise<DoctorDetails> {
  const response = await api.get(
    `/api/doctor/profile/get_one_doctor_profile/${id}`,
  );
  return response.data;
}

// Department Endpoints
export async function fetchFilteredDepartments(
  search?: string,
): Promise<DoctorDepartment[]> {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  const response = await api.get(
    `/api/doctor/department/get_filtered_departments?${queryParams}`,
  );
  return response.data;
}
