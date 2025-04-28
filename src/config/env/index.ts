export const ENV = {
  base_url:
    (import.meta.env.VITE_BASE_URL as string) ||
    "https://cp.vellalasercare.com",

  media_url:
    (import.meta.env.VITE_MEDIA_URL as string) ||
    "https://cp.vellalasercare.com",

  stripe_key:
    (import.meta.env.VITE_STRIPE_KEY as string) ||
    "test_###############################################################",

  environment: import.meta.env.MODE as "development" | "production",
};
