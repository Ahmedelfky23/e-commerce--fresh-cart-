import { PageLoader } from "@/components/ui/page-loader";

export default function ProductDetailLoading() {
  return (
    <PageLoader
      color="blue"
      size="lg"
      title="Loading Product Details..."
      subtitle="Preparing photos, descriptions, and stock status"
    />
  );
}
