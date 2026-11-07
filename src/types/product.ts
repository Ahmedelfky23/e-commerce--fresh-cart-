import type { CategoryType } from "./category";
import type { BrandType } from "./brand";

export interface SubcategoryType {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  category: string;
}

export interface ReviewUserType {
  _id: string;
  name: string;
}

export interface ReviewType {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user?: ReviewUserType;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: CategoryType;
  subcategory?: SubcategoryType[];
  brand?: BrandType;
  reviews?: ReviewType[];
  createdAt?: string;
  updatedAt?: string;
}
