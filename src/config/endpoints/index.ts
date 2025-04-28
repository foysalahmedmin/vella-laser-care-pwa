import { ENV } from "../env";

export const BASE_URL = ENV.base_url;

export const ENDPOINTS = {
  getUser: "/api/user",
  getProducts: "/api/products",
  getCategories: "/api/categories",
  createOrder: "/api/orders",
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  updateUser: "/api/user/update",
};

export const getFullEndpoint = (key: keyof typeof ENDPOINTS): string => {
  return `${BASE_URL}${ENDPOINTS[key]}`;
};
