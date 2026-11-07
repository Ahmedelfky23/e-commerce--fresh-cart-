import { PageLoader } from "@/components/ui/page-loader";

export default function BrandsLoading() {
  return (
    <PageLoader
      color="purple"
      size="lg"
      title="Loading Top Brands..."
      subtitle="Fetching your favorite brands"
    />
  );
}
