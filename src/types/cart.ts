export interface CartProduct {
  _id: string;
  name: string;
  short_description: string;
  thumbnail: string;
  price: number;
  quantity: number;
  discount_amount?: number;
}

export interface CartState {
  products: CartProduct[];
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  payment_method: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
  selling_price: number;
  discount_amount: number;
  type: string;
}

export interface OrderData {
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

export interface City {
  _id: string;
  name: string;
}

export interface Shipping {
  charge: number;
  days: number;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}
