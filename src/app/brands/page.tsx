import Link from "next/link";
import { getAllBrands } from "@/api/services/api.service";


export const revalidate = 3600;

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f9fafb] pb-10">
      {/* Hero */}
      <div className="w-full bg-linear-to-br from-[#7f22fe] via-[#8e51ff] to-[#c27aff]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm leading-5 font-medium text-white">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>Brands</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <i
                className="fa-solid fa-tags text-[24px] text-[#7f22fe]"
                aria-hidden
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl leading-10 font-bold text-white md:text-4xl">
                Top Brands
              </h1>
              <p className="text-base leading-6 font-medium text-white">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 w-full max-w-384 px-4">
        {brands.length === 0 ? (
          <p className="rounded-2xl border border-[#f3f4f6] bg-white p-10 text-center text-base font-medium text-[#6a7282]">
            No brands are available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group flex flex-col items-center rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e9d5ff] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]"
              >
                <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-[#f9fafb] p-4">
                  {brand.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <i
                      className="fa-solid fa-tag text-3xl text-[#7f22fe]"
                      aria-hidden
                    />
                  )}
                </div>

                <h3 className="mt-3 w-full truncate text-center text-sm leading-5 font-semibold text-[#101828]">
                  {brand.name}
                </h3>

                <div className="mt-1 flex h-4 items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1 text-xs leading-4 font-medium text-[#7f22fe]">
                    View Products
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
