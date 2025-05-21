import api from "@/lib/api";

// Type definitions
interface AuthResponse {
  data: unknown;
  [key: string]: unknown;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  postal?: string;
  city?: string;
  role?: string;
  photo?: string;
  [key: string]: unknown;
}

interface Parlor {
  _id: string;
  name: string;
  banner: string;
  address: string;
  [key: string]: unknown;
}

interface SignIn {
  email: string;
  password: string;
}

interface SignUp {
  name: string;
  phone: string;
  address: string;
  email: string;
  role: string;
  postal: string;
  city: string;
  password: string;
}

interface ProfileUpdatePayload {
  id: string;
  name: string;
  phone: string;
  address: string;
  postal: string;
  password?: string;
  city: string;
  photo?: File;
}

interface ShippingInfo {
  [key: string]: unknown;
}

interface CityInfo {
  [key: string]: unknown;
}

// Auth functions
export async function signIn({
  email,
  password,
}: SignIn): Promise<AuthResponse> {
  const payload = { email, password };
  const response = await api.post("/api/auth/cp_login", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response?.data;
}

export async function signUp(payload: SignUp): Promise<AuthResponse> {
  const response = await api.post("/api/auth/customer_register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response?.data;
}

export async function signOut({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<AuthResponse> {
  const payload = { refreshToken };
  const response = await api.post("/api/auth/logout", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response?.data;
}

export async function fetchMe(): Promise<User> {
  const response = await api.get("/api/auth/get_user_by_token");
  return response?.data[0] as User;
}

// User functions
export async function fetchOneUser(id: string): Promise<User> {
  const response = await api.get(`/api/auth/get_one_user/${id}`);
  return response?.data as User;
}

// Shipping functions
export async function fetchFilteredShipping(
  city: string,
): Promise<ShippingInfo[]> {
  const response = await api.get(
    `/api/configs/shipping/get_filtered_shipping?city=${city}`,
  );
  return response?.data as ShippingInfo[];
}

export async function fetchFilteredCities(): Promise<CityInfo[]> {
  const response = await api.get("/api/configs/city/get_filtered_cities");
  return response?.data as CityInfo[];
}

export async function fetchAffiliatedParlors(): Promise<Parlor[]> {
  const response = await api.get("/api/auth/get_affiliated_parlors");
  return response?.data as Parlor[];
}

// Profile functions
export async function updateProfile({
  id,
  name,
  phone,
  address,
  postal,
  password,
  city,
  photo,
}: ProfileUpdatePayload): Promise<User> {
  const payload = new FormData();
  payload.append("name", name);
  payload.append("phone", phone);
  payload.append("address", address);
  payload.append("postal", postal);
  if (password) payload.append("password", password);
  payload.append("city", city);
  if (photo) payload.append("photo", photo);

  const response = await api.put(
    `/api/auth/update_app_profile/${id}`,
    payload,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response?.data as User;
}
