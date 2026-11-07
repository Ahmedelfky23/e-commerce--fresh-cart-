import ProductsSearchView from "@/components/products/ProductsSearchView";
import {
  getAllProducts,
  getAllCategories,
  getAllBrands,
} from "@/api/services/api.service";
import type {
  ProductsPageProps,
  ProductType,
  CategoryType,
  BrandType,
} from "@/types";

export const metadata = {
  title: "Search & Products | FreshCart",
  description: "Search and explore our full collection of fresh products and brands.",
};

export const revalidate = 3600;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const category =
    typeof resolvedSearchParams.category === "string"
      ? resolvedSearchParams.category
      : "";
  const brand =
    typeof resolvedSearchParams.brand === "string"
      ? resolvedSearchParams.brand
      : "";

  let products: ProductType[] = [];
  let categories: CategoryType[] = [];
  let brands: BrandType[] = [];

  try {
    const [productsRes, categoriesRes, brandsRes] = await Promise.all([
      getAllProducts(50),
      getAllCategories(50),
      getAllBrands(50),
    ]);
    products = productsRes;
    categories = categoriesRes;
    brands = brandsRes;
  } catch {
    products = [];
    categories = [];
    brands = [];
  }

  return (
    <ProductsSearchView
      initialProducts={products}
      categories={categories}
      brands={brands}
      initialSearch={search}
      initialCategory={category}
      initialBrand={brand}
    />
  );
}
