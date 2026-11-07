import type { ProductType } from "./product";

export type WishlistProduct = ProductType

export interface WishlistApiResponse {
  status: string;
  message?: string;
  count?: number;
  data?: WishlistProduct[] | string[];
}

export interface WishlistContextType {
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
  wishlistIds: string[];
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<boolean>;
}

