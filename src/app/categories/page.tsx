import Link from "next/link";
import { getAllCategories } from "@/api/services/api.service";



export const revalidate = 3600;

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f9fafb] pb-10 md:pb-51.25">
      {/* Hero */}
      <div className="w-full bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm leading-5 font-medium text-white">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>Categories</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <i
                className="fa-solid fa-layer-group text-[26px] text-brand"
                aria-hidden
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl leading-10 font-bold text-white md:text-4xl">
                All Categories
              </h1>
              <p className="text-base leading-6 font-medium text-white">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 w-full max-w-384 px-4">
        {categories.length === 0 ? (
          <p className="rounded-2xl border border-[#f3f4f6] bg-white p-10 text-center text-base font-medium text-[#6a7282]">
            No categories are available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#bbf7d0] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] lg:p-6"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#f9fafb]">
                  {category.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <i
                        className="fa-solid fa-layer-group text-3xl text-brand"
                        aria-hidden
                      />
                    </div>
                  )}
                </div>

                <h3 className="mt-3 w-full text-center text-base leading-6 font-bold text-[#101828] transition-colors group-hover:text-brand">
                  {category.name}
                </h3>

                <div className="mt-2 flex h-4 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1 text-xs leading-4 font-medium text-brand">
                    View Subcategories
                    <i
                      className="fa-solid fa-arrow-right text-[10px]"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
