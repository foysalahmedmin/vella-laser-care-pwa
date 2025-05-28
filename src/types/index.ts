export interface Parlor {
  _id: string;
  banner: string;
  name: string;
  name_bn?: string;
  address: string;
  address_bn?: string;
}
export interface Doctor {
  _id: string;
  name: string;
  name_bn?: string;
  photo: string;
  tags: { name: string; name_bn: string }[];
}
export interface DoctorDetails {
  _id: string;
  name: string;
  name_bn?: string;
  photo: string;
  tags: { name: string; name_bn: string }[];
}
export interface Service {
  _id: string;
  name: string;
  name_bn?: string;
  image: string;
}
export interface ServiceDetails {
  _id: string;
  name: string;
  name_bn?: string;
  image: string;
  consultant_charge: number;
  service_charge: number;
  header: {
    image_1: string;
    image_2: string;
    image_3: string;
    title: string;
    title_bn: string;
    description: string;
    description_bn: string;
    tags: { name: string; name_bn: string }[];
  };
  benefit: {
    benefits: { name: string; name_bn: string }[];
  };
  before_after_1: string;
  before_after_2: string;
  before_after_3: string;
}
export interface Product {
  _id: string;
  country_origin: string;
  name: string;
  name_bn?: string;
  short_description: string;
  short_description_bn?: string;
  rating: number;
  discount: number;
  discount_type: string;
  discount_amount: number;
  selling_price: number;
  total_review: number;
  media: string;
}

export interface ProductDetails {
  _id: string;
  country_origin: string;
  name: string;
  name_bn?: string;
  short_description: string;
  short_description_bn?: string;
  rating: number;
  discount: number;
  discount_type: string;
  discount_amount: number;
  selling_price: number;
  total_review: number;
  // ---
  media: {
    thumbnail: string;
    gallery: string[];
  };
  sku: string;
  highlight: string;
  highlight_bn: string;
  key_benefits: { name: string; name_bn: string }[];
  key_ingredients: string;
  key_ingredients_bn: string;
}

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
