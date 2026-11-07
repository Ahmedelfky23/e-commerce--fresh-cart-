import Link from "next/link";
import type { CategorySectionProps } from "@/types";

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="mx-auto mt-10 w-full max-w-384 px-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 py-8">
          <span className="h-8 w-1.5 shrink-0 rounded-full bg-linear-to-b from-[#00bc7d] to-[#007a55]" />
          <h2 className="text-2xl leading-8 font-bold text-[#1e2939] md:text-[30px] md:leading-9">
            Shop By Category
          </h2>
        </div>

        <Link
          href="/categories"
          className="group flex items-center gap-2 self-end text-base leading-6 font-medium text-brand transition-colors hover:text-[#15803d] md:self-auto"
        >
          View All Categories
          <i
            className="fa-solid fa-arrow-right text-[16px] transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category.slug}`}
            className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-lg"
          >
            <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#dcfce7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </span>
            <h3 className="w-full text-center text-base leading-6 font-medium text-[#364153]">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
