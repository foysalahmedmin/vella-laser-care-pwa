import api from "@/lib/api";

// Type Definitions
export interface FavoriteProduct {
  _id: string;
  product_id: string;
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

interface FavoriteResponse<T = FavoriteProduct> {
  success?: boolean;
  message?: string;
  data: T;
}

interface FavoritePayload {
  product: string;
}

// ✅ Corrected function return types

export async function fetchMyFavorites(): Promise<FavoriteProduct[]> {
  const response = await api.get<FavoriteResponse<FavoriteProduct[]>>(
    "/api/product/favorite/get_my_favorites",
  );
  return Array.isArray(response.data.data) ? response.data.data : [];
}

export async function removeOneFavorite(id: string): Promise<FavoriteProduct> {
  const response = await api.delete<FavoriteResponse<FavoriteProduct>>(
    `/api/product/favorite/remove_one_favorite/${id}`,
  );
  return response.data.data;
}

export async function addToFavorites(
  payload: FavoritePayload,
): Promise<FavoriteResponse> {
  const response = await api.post<FavoriteResponse>(
    "/api/product/favorite/add_my_favorite",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
}
