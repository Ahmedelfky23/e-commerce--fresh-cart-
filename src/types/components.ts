import type React from "react";
import type { ProductType } from "./product";
import type { CategoryType } from "./category";
import type { BrandType } from "./brand";
import type { CartData } from "./cart";
import type { Address } from "./address";

export interface ProductCardProps {
  product: ProductType;
  imageClassName?: string;
  className?: string;
}

export interface ProductGalleryProps {
  title: string;
  imageCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
}

export interface ProductInfoProps {
  product: ProductType;
}

export interface ProductTabsProps {
  product: ProductType;
}

export interface ProductDetailsTabProps {
  product: ProductType;
}

export interface RelatedProductsProps {
  products: ProductType[];
}

export interface NavbarProps {
  categories?: CategoryType[];
}

export interface CategorySectionProps {
  categories: CategoryType[];
}

export interface FeaturedProductsProps {
  products: ProductType[];
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  gradient: string;
}

export interface AccountShellProps {
  active: "settings" | "addresses";
  children: React.ReactNode;
}

export interface CheckoutViewProps {
  initialCart?: CartData | null;
  initialAddresses?: Address[];
  products?: ProductType[];
}

export interface ProductsSearchViewProps {
  initialProducts: ProductType[];
  categories: CategoryType[];
  brands: BrandType[];
  initialSearch?: string;
  initialCategory?: string;
  initialBrand?: string;
}

