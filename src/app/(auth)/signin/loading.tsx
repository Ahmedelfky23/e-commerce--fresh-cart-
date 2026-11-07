import { PageLoader } from "@/components/ui/page-loader";

export default function SignInLoading() {
  return (
    <PageLoader
      color="green"
      size="lg"
      title="Loading Sign In..."
      subtitle="Preparing secure authentication"
    />
  );
}
