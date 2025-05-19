import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

interface User {
  accessToken: string;
  refreshToken: string;
  role: string;
  isAuthenticated: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://cp.vellalasercare.com",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userString: string | null = localStorage.getItem("user");
  let user: User | null = null;

  try {
    user = userString ? (JSON.parse(userString) as User) : null;
  } catch (error) {
    console.error("Error parsing user token", error);
  }

  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  } else {
    config.headers.Authorization = "";
  }

  return config;
});

export default api;
