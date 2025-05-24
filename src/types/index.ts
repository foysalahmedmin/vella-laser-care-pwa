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
  tags: Array<{ name: string; name_bn: string }>;
}
export interface Service {
  _id: string;
  name: string;
  name_bn?: string;
  image: string;
}
export interface Product {
  _id: string;
  media: string;
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
}
