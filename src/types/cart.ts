import type React from "react";

export interface CartProduct {
  _id: string;
  id?: string;
  title: string;
  imageCover: string;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  brand?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  ratingsAverage?: number;
  quantity?: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartApiResponse {
  status: string;
  message?: string;
  numOfCartItems?: number;
  cartId?: string;
  data?: CartData;
}

export interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export interface AddBtnProps {
  classes?: string;
  word?: React.ReactNode | string;
  productId?: string;
}

