export interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface BrandDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export interface VerifyCodePageProps {
  searchParams: Promise<{ email?: string | string[] }>;
}

export interface ResetPasswordPageProps {
  searchParams: Promise<{ email?: string | string[] }>;
}

export interface ProductsPageProps {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    brand?: string;
  }>;
}

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
