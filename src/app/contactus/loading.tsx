import { PageLoader } from "@/components/ui/page-loader";

export default function ContactLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading Support Center..."
      subtitle="We are here to assist you 24/7"
    />
  );
}
