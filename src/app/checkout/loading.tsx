import { PageLoader } from "@/components/ui/page-loader";

export default function CheckoutLoading() {
  return (
    <PageLoader
      color="amber"
      size="lg"
      title="Loading Secure Checkout..."
      subtitle="Connecting to secure checkout gateway"
    />
  );
}
