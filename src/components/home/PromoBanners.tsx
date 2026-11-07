import Link from "next/link";

const promos = [
  {
    emoji: "🔥",
    badge: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "Use code: ORGANIC40",
    cta: { label: "Shop Now", href: "/products" },
    gradient: "from-[#00bc7d] to-[#007a55]",
    ctaColor: "text-[#009966]",
  },
  {
    emoji: "✨",
    badge: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "Use code: FRESH25",
    cta: { label: "Explore Now", href: "/products" },
    gradient: "from-[#ff8904] to-[#ff2056]",
    ctaColor: "text-[#ff6900]",
  },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto mt-20 w-full max-w-384 px-4 md:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {promos.map((promo) => (
          <div
            key={promo.title}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${promo.gradient} p-8`}
          >
            {/* Decorative circles */}
            <span className="absolute top-0 -right-20 h-40 w-40 rounded-full bg-white/10" />
            <span className="absolute -bottom-4 -left-16 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative flex flex-col gap-4 text-white">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                <span className="text-sm leading-5 font-medium">
                  {promo.emoji}
                </span>
                <span className="text-sm leading-5 font-medium">
                  {promo.badge}
                </span>
              </span>

              <h3 className="text-2xl leading-8 font-bold md:text-[30px] md:leading-9">
                {promo.title}
              </h3>

              <p className="text-base leading-6 font-medium">
                {promo.description}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-2xl leading-8 font-bold md:text-[30px] md:leading-9">
                  {promo.discount}
                </span>
                <span className="text-sm leading-5 font-medium">
                  {promo.code}
                </span>
              </div>

              <Link
                href={promo.cta.href}
                className={`inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-base leading-6 font-semibold ${promo.ctaColor} transition-transform hover:scale-[1.02]`}
              >
                {promo.cta.label}
                <i className="fa-solid fa-arrow-right text-[16px]" aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
