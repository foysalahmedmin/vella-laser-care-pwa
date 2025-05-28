import api from "@/lib/api";
import type { FavoriteProduct } from "@/types";

// Type Definitions
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
