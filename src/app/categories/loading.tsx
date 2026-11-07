import { PageLoader } from "@/components/ui/page-loader";

export default function CategoriesLoading() {
  return (
    <PageLoader
      color="emerald"
      size="lg"
      title="Loading All Categories..."
      subtitle="Organizing catalog and departments"
    />
  );
}
