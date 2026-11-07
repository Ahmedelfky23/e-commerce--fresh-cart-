import Link from "next/link";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductTabs from "@/components/products/ProductTabs";
import RelatedProducts from "@/components/products/RelatedProducts";
import {
  getProductById,
  getProductsByCategory,
} from "@/api/services/api.service";
import type { ProductDetailPageProps } from "@/types";

async function getRelatedProducts(product: Awaited<ReturnType<typeof getProductById>>) {
  if (!product.category?._id) return [];
  return (await getProductsByCategory(product.category._id))
    .filter((item) => item._id !== product._id)
    .slice(0, 5);
}

function getSubcategory(product: Awaited<ReturnType<typeof getProductById>>) {
  return product.subcategory?.[0];
}

function getCategorySlug(product: Awaited<ReturnType<typeof getProductById>>) {
  return product.category?.slug;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  const relatedProducts = await getRelatedProducts(product);
  const subcategory = getSubcategory(product);
  const categorySlug = getCategorySlug(product);

  return (
    <div className="min-h-screen bg-white pt-4 pb-10">
      <div className="mx-auto w-full max-w-384 px-4">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-y-1 text-sm font-medium text-[#6a7282]"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-brand"
          >
            <i className="fa-solid fa-house text-[12px]" aria-hidden />
            <span>Home</span>
          </Link>
          {product.category && (
            <>
              <i
                className="fa-solid fa-chevron-right px-2 text-[10px] text-[#99a1af]"
                aria-hidden
              />
              <Link
                href={
                  categorySlug ? `/category/${categorySlug}` : "/categories"
                }
                className="transition-colors hover:text-brand"
              >
                {product.category.name}
              </Link>
            </>
          )}
          {subcategory && (
            <>
              <i
                className="fa-solid fa-chevron-right px-2 text-[10px] text-[#99a1af]"
                aria-hidden
              />
              <Link
                href={
                  categorySlug
                    ? `/products?category=${encodeURIComponent(categorySlug)}`
                    : "/products"
                }
                className="transition-colors hover:text-brand"
              >
                {subcategory.name}
              </Link>
            </>
          )}
          <i
            className="fa-solid fa-chevron-right px-2 text-[10px] text-[#99a1af]"
            aria-hidden
          />
          <span className="min-w-0 text-[#101828]">{product.title}</span>
        </nav>

        {/* Gallery + Info */}
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-1/4 lg:shrink-0">
            <ProductGallery
              title={product.title}
              imageCover={product.imageCover}
              images={product.images || []}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              quantity={product.quantity}
            />
          </div>

          <div className="w-full lg:min-w-0 lg:flex-1">
            <ProductInfo product={product} />
          </div>
        </div>

        <ProductTabs product={product} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
