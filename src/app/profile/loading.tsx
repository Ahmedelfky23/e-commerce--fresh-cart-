import { PageLoader } from "@/components/ui/page-loader";

export default function ProfileLoading() {
  return (
    <PageLoader
      color="slate"
      size="lg"
      title="Loading Profile..."
      subtitle="Fetching your personal details and settings"
    />
  );
}
