import type { ProductType } from "@/types/product";
import type { SearchQueryState } from "@/types/search";

export const SEARCH_PATH = "/search";
export const SEARCH_PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
] as const;

export const PRICE_CHIPS = [
  { label: "Under 500", max: "500" },
  { label: "Under 1K", max: "1000" },
  { label: "Under 5K", max: "5000" },
  { label: "Under 10K", max: "10000" },
] as const;

function toSearchParams(merged: SearchQueryState): URLSearchParams {
  const params = new URLSearchParams();

  if (merged.keyword) params.set("search", merged.keyword);
  for (const id of merged.categories) params.append("category", id);
  for (const id of merged.brands) params.append("brand", id);
  if (merged.minPrice) params.set("min", merged.minPrice);
  if (merged.maxPrice) params.set("max", merged.maxPrice);
  if (merged.sort && merged.sort !== "relevance") params.set("sort", merged.sort);
  if (merged.page > 1) params.set("page", String(merged.page));
  if (merged.view === "list") params.set("view", "list");

  return params;
}

/** Build a search URL while preserving every active filter. */
export function buildSearchHref(
  query: SearchQueryState,
  overrides: Partial<SearchQueryState> = {},
): string {
  const params = toSearchParams({ ...query, ...overrides });
  const qs = params.toString();
  return qs ? `${SEARCH_PATH}?${qs}` : SEARCH_PATH;
}

export function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function effectivePrice(product: ProductType): number {
  return product.priceAfterDiscount ?? product.price;
}

function searchableText(product: ProductType): string {
  return [
    product.title,
    product.category?.name,
    product.brand?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function relevanceScore(product: ProductType, keyword: string): number {
  if (!keyword) return 0;

  const title = product.title.toLowerCase();
  const tokens = keyword.split(/\s+/).filter(Boolean);
  let score = 0;

  if (title.startsWith(keyword)) score += 5;
  if (title.includes(keyword)) score += 3;

  for (const token of tokens) {
    if (title.includes(token)) score += 2;
    else if (searchableText(product).includes(token)) score += 1;
  }

  return score;
}

/**
 * The public API does not expose a keyword endpoint, so search, filtering and
 * sorting run against the fetched product catalogue.
 */
export function runProductSearch(
  products: ProductType[],
  query: SearchQueryState,
): { products: ProductType[]; total: number; page: number; pages: number } {
  const keyword = query.keyword.trim().toLowerCase();
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);

  let result = products.filter((product) => {
    if (query.categories.length && !query.categories.includes(product.category?._id)) {
      return false;
    }

    if (query.brands.length && !query.brands.includes(product.brand?._id ?? "")) {
      return false;
    }

    const price = effectivePrice(product);
    if (query.minPrice && Number.isFinite(minPrice) && price < minPrice) return false;
    if (query.maxPrice && Number.isFinite(maxPrice) && price > maxPrice) return false;

    if (keyword) {
      const tokens = keyword.split(/\s+/).filter(Boolean);
      const haystack = searchableText(product);
      return tokens.every((token) => haystack.includes(token));
    }

    return true;
  });

  switch (query.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      result = [...result].sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "newest":
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
      break;
    case "rating":
      result = [...result].sort(
        (a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0),
      );
      break;
    default:
      result = [...result].sort(
        (a, b) =>
          relevanceScore(b, keyword) - relevanceScore(a, keyword) ||
          (b.sold ?? 0) - (a.sold ?? 0),
      );
  }

  const total = result.length;
  const pages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));
  const page = Math.min(Math.max(1, query.page), pages);
  const start = (page - 1) * SEARCH_PAGE_SIZE;

  return {
    products: result.slice(start, start + SEARCH_PAGE_SIZE),
    total,
    page,
    pages,
  };
}

/** Page numbers with ellipses for long ranges. */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const keep = new Set<number>([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const sorted = [...keep]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const output: Array<number | "ellipsis"> = [];
  sorted.forEach((page, index) => {
    const previous = sorted[index - 1];
    if (previous && page - previous > 1) output.push("ellipsis");
    output.push(page);
  });

  return output;
}
