import api from "@/lib/api";

// Type Definitions
interface FavoriteProduct {
  id: string;
  [key: string]: unknown;
}

interface FavoriteResponse {
  success?: boolean;
  message?: string;
  data: FavoriteProduct | FavoriteProduct[];
}

interface FavoritePayload {
  product: string;
}

export async function fetchMyFavorites(): Promise<FavoriteProduct[]> {
  const response = await api.get<FavoriteResponse>(
    "/api/product/favorite/get_my_favorites"
  );
  return Array.isArray(response.data.data) ? response.data.data : [];
}

export async function removeOneFavorite(id: string): Promise<FavoriteResponse> {
  const response = await api.delete<FavoriteResponse>(
    `/api/product/favorite/remove_one_favorite/${id}`
  );
  return response.data;
}

export async function addToFavorites(
  payload: FavoritePayload
): Promise<FavoriteResponse> {
  const response = await api.post<FavoriteResponse>(
    "/api/product/favorite/add_my_favorite",
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}
