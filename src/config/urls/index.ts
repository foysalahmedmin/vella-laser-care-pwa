import { ENV } from "../env";

const media_url = ENV.media_url || "https://cp.vellalasercare.com";

export const URLS = {
  user_photos: `${media_url}/uploads/user_photos`,
  service_header: `${media_url}/uploads/service/header`,
  service_compare: `${media_url}/uploads/service/compare`,
  product_thumbnail: `${media_url}/uploads/product/thumbnail`,
  product_gallery: `${media_url}/uploads/product/gallery`,
  country_origin: `${media_url}/uploads/country`,
  shop_category_icon: `${media_url}/uploads/category/shop/icon`,
  parlor_banner: `${media_url}/uploads/banner`,
  blog: `${media_url}/uploads/blog`,
};
