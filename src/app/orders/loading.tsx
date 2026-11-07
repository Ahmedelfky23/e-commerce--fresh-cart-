import { PageLoader } from "@/components/ui/page-loader";

export default function OrdersLoading() {
  return (
    <PageLoader
      color="indigo"
      size="lg"
      title="Loading Orders..."
      subtitle="Fetching your order history and tracking info"
    />
  );
}
