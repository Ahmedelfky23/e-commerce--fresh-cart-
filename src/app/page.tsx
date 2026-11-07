import HeroBanner from "@/components/home/HeroBanner";
import TrustFeatures from "@/components/home/TrustFeatures";
import CategorySection from "@/components/home/CategorySection";
import PromoBanners from "@/components/home/PromoBanners";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewsletterApp from "@/components/home/NewsletterApp";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getAllCategories, getAllProducts } from "@/api/services/api.service";

export const revalidate = 3600;

export default async function Home() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(40),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeroBanner />
      <ScrollReveal direction="up" delay={50} duration={0.85}>
        <TrustFeatures />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={50} duration={0.85}>
        <CategorySection categories={categories} />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={50} duration={0.85}>
        <PromoBanners />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={50} duration={0.85}>
        <FeaturedProducts products={products} />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={50} duration={0.85}>
        <NewsletterApp />
      </ScrollReveal>
    </div>
  );
}
