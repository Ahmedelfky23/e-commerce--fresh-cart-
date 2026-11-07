import { PageLoader } from "@/components/ui/page-loader";

export default function Loading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading FreshCart..."
      subtitle="Bringing fresh products to you"
    />
  );
}
