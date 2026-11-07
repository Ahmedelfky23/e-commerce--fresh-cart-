import type { BrandType } from "./brand";
import type { CategoryType } from "./category";
import type { ProductType } from "./product";

export type SearchView = "grid" | "list";

/** Normalized URL state for the search page. */
export interface SearchQueryState {
  keyword: string;
  categories: string[];
  brands: string[];
  minPrice: string;
  maxPrice: string;
  sort: string;
  page: number;
  view: SearchView;
}

export interface SearchPageData {
  products: ProductType[];
  total: number;
  page: number;
  pages: number;
}

export interface SearchResultsProps extends SearchPageData {
  query: SearchQueryState;
  categories: CategoryType[];
  brands: BrandType[];
}

export interface SearchFiltersProps {
  query: SearchQueryState;
  categories: CategoryType[];
  brands: BrandType[];
}

export interface SearchProductCardProps {
  product: ProductType;
  view?: SearchView;
}
