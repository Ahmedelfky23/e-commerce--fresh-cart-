import { PageLoader } from "@/components/ui/page-loader";

export default function SearchLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Searching Products..."
      subtitle="Filtering categories, brands, and price ranges"
    />
  );
}

