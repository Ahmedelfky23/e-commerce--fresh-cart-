import { PageLoader } from "@/components/ui/page-loader";

export default function ProductsLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading All Products..."
      subtitle="Gathering fresh items and daily deals"
    />
  );
}
