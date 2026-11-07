import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import {
  getAllCategories,
  getProductsByCategory,
} from "@/api/services/api.service";
import type { CategoryType, ProductType, CategoryPageProps } from "@/types";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let categories: CategoryType[] = [];
  try {
    categories = await getAllCategories();
  } catch {
    categories = [];
  }

  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    notFound();
  }

  let products: ProductType[] = [];
  try {
    products = await getProductsByCategory(category._id);
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
              href="/categories"
              className="transition-colors hover:text-white/80"
            >
              Categories
            </Link>
            <span aria-hidden>/</span>
            <span>{category.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl leading-10 font-bold text-white md:text-4xl">
                {category.name}
              </h1>
              <p className="text-base leading-6 font-medium text-white/90">
                Browse our selection of {category.name}
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
              No products found in this category at the moment.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]"
            >
              Browse all products
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
