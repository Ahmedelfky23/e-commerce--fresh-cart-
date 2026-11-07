import { PageLoader } from "@/components/ui/page-loader";

export default function WishlistLoading() {
  return (
    <PageLoader
      color="rose"
      size="lg"
      title="Loading My Wishlist..."
      subtitle="Fetching your saved favorites"
    />
  );
}
