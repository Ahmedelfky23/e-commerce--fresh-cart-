import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import { getBrandById, getProductsByBrand } from "@/api/services/api.service";
import type { ProductType, BrandDetailPageProps } from "@/types";

export async function generateMetadata({ params }: BrandDetailPageProps) {
  const { id } = await params;
  try {
    const brand = await getBrandById(id);
    return {
      title: `${brand.name} Products | FreshCart`,
      description: `Explore the official collection of ${brand.name} at FreshCart.`,
    };
  } catch {
    return {
      title: "Brand Products | FreshCart",
    };
  }
}

export default async function BrandDetailPage({
  params,
}: BrandDetailPageProps) {
  const { id } = await params;

  let brand;
  try {
    brand = await getBrandById(id);
  } catch {
    notFound();
  }

  let products: ProductType[] = [];
  try {
    products = await getProductsByBrand(id);
  } catch {
    products = [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      {/* Banner */}
      <div className="w-full bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-14">
          <nav className="flex flex-wrap items-center gap-2 text-sm leading-5 font-medium text-white">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/brands"
              className="transition-colors hover:text-white/80"
            >
              Brands
            </Link>
            <span aria-hidden>/</span>
            <span>{brand.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.image}
                alt={brand.name}
                className="h-full w-full object-contain p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl leading-10 font-bold text-white md:text-4xl">
                {brand.name}
              </h1>
              <p className="text-base leading-6 font-medium text-white/90">
                Official brand products at FreshCart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="mx-auto w-full max-w-384 flex-1 px-4 py-8">
        <p className="mb-6 text-sm leading-5 font-medium text-[#6a7282]">
          Showing {products.length} products
        </p>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-12 text-center">
            <i
              className="fa-solid fa-box-open mb-4 text-4xl text-[#d1d5dc]"
              aria-hidden
            />
            <h2 className="text-lg font-bold text-[#101828]">
              No products found
            </h2>
            <p className="mt-1 text-sm text-[#6a7282]">
              No products found for this brand at the moment.
            </p>
            <Link
              href="/brands"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]"
            >
              Browse all brands
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
