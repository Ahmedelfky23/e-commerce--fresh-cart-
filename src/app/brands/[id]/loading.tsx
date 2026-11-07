import { PageLoader } from "@/components/ui/page-loader";

export default function BrandLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading Brand Products..."
      subtitle="Fetching official brand catalog"
    />
  );
}
