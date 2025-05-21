import api from "@/lib/api";

// Type Definitions
interface Product {
  _id: string;
  media: string;
  country_origin: string;
  name: string;
  name_bn: string;
  short_description: string;
  short_description_bn: string;
  rating: number;
  discount: number;
  discount_type: string;
  discount_amount: number;
  selling_price: number;
  total_review: number;
}

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

// Category Endpoints
export async function fetchCategoryFilters(): Promise<any> {
  const response = await api.get("/api/shop_category/get_category_filters");
  return response?.data;
}

export async function fetchFilteredSkinTypes(): Promise<any> {
  const response = await api.get(
    "/api/product/skin_type/get_filtered_skin_type",
  );
  return response?.data;
}

export async function fetchFilteredConcerns(): Promise<any> {
  const response = await api.get("/api/product/concern/get_filtered_concerns");
  return response?.data;
}

// Product Endpoints
export async function fetchFilteredProducts(
  params: ProductFilterParams,
): Promise<{ data: Product[]; total: number }> {
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

  const response = await api.get("/api/product/get_filtered_products", {
    params: {
      page,
      limit,
      search,
      category,
      sub_category,
      min_price,
      max_price,
      skin_type,
      skin_concern,
    },
  });
  return response?.data?.[0];
}

export async function fetchOneProduct(id: string): Promise<any> {
  const response = await api.get(`/api/product/get_one_product_details/${id}`);
  return response?.data;
}

// Shipping Endpoint
export async function fetchFilteredShipping(city: string): Promise<any> {
  const response = await api.get(
    "/api/configs/shipping/get_filtered_shipping",
    {
      params: { city },
    },
  );
  return response?.data;
}

// Order Endpoints
export async function addGuestOrder(payload: BaseOrderPayload): Promise<any> {
  const response = await api.post("/api/order/add_guest_order", payload);
  return response?.data;
}

export async function addCustomerOrder(
  payload: BaseOrderPayload,
): Promise<any> {
  const response = await api.post("/api/order/add_customer_order", payload);
  return response?.data;
}
