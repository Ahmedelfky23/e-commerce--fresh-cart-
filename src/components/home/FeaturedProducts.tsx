import ProductCard from "@/components/products/ProductCard";
import type { FeaturedProductsProps } from "@/types";

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="mx-auto mt-28 w-full max-w-384 px-4 md:px-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-8 w-1.5 shrink-0 rounded-full bg-linear-to-b from-[#00bc7d] to-[#007a55]" />
        <h2 className="text-[30px] leading-9 font-bold text-[#1e2939]">
          Featured Products
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
