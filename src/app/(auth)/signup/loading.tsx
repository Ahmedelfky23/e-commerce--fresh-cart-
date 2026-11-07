import { PageLoader } from "@/components/ui/page-loader";

export default function SignUpLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading Sign Up..."
      subtitle="Setting up fresh registration"
    />
  );
}
