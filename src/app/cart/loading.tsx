import { PageLoader } from "@/components/ui/page-loader";

export default function CartLoading() {
  return (
    <PageLoader
      color="blue"
      size="lg"
      title="Loading Shopping Cart..."
      subtitle="Calculating subtotal, discounts, and free shipping"
    />
  );
}
