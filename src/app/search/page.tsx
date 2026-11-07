import ProductsPage, { metadata } from "@/app/products/page";
import type { ProductsPageProps } from "@/types";

export const revalidate = 3600;
export { metadata };

export default function SearchPage(props: ProductsPageProps) {
  return <ProductsPage {...props} />;
}
