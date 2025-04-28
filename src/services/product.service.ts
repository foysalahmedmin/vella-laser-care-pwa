import api from "@/lib/api";

// Type Definitions
interface PaginationParams {
  page: number;
  limit: number;
}

interface ProductFilterParams extends PaginationParams {
  search?: string;
  category?: string;
  sub_category?: string;
  min_price?: number;
  max_price?: number;
  skin_type?: string;
  skin_concern?: string;
}

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

interface BaseOrderPayload {
  name: string;
  city: string;
  postal: string;
  phone: string;
  address: string;
  email: string;
  sub_total: number;
  total: number;
  shipping: number;
  sold_from: string;
  payment_method: string;
  items: OrderItem[];
}

interface ApiResponse<T = unknown> {
  data: T;
  status?: number;
}

// Category Endpoints
export async function fetchCategoryFilters(): Promise<ApiResponse> {
  return api.get("/api/shop_category/get_category_filters");
}

export async function fetchFilteredSkinTypes(): Promise<ApiResponse> {
  return api.get("/api/product/skin_type/get_filtered_skin_type");
}

export async function fetchFilteredConcerns(): Promise<ApiResponse> {
  return api.get("/api/product/concern/get_filtered_concerns");
}

// Product Endpoints
export async function fetchFilteredProducts(
  params: ProductFilterParams
): Promise<ApiResponse> {
  const {
    page,
    limit,
    search,
    category,
    sub_category,
    min_price,
    max_price,
    skin_type,
    skin_concern,
  } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(category && { category }),
    ...(sub_category && { sub_category }),
    ...(min_price && { min_price: min_price.toString() }),
    ...(max_price && { max_price: max_price.toString() }),
    ...(skin_type && { skin_type }),
    ...(skin_concern && { skin_concern }),
  });

  return api.get(`/api/product/get_filtered_products?${queryParams}`);
}

export async function fetchOneProduct(id: string): Promise<ApiResponse> {
  return api.get(`/api/product/get_one_product_details/${id}`);
}

// Shipping Endpoint
export async function fetchFilteredShipping(
  city: string
): Promise<ApiResponse> {
  return api.get(`/api/configs/shipping/get_filtered_shipping?city=${city}`);
}

// Order Endpoints
export async function addGuestOrder(
  payload: BaseOrderPayload
): Promise<ApiResponse> {
  return api.post("/api/order/add_guest_order", payload, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function addCustomerOrder(
  payload: BaseOrderPayload
): Promise<ApiResponse> {
  return api.post("/api/order/add_customer_order", payload, {
    headers: { "Content-Type": "application/json" },
  });
}
