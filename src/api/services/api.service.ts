import type { BrandType, CategoryType, ProductType } from "@/types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// ── BRANDS API ──

export async function getAllBrands(limit = 40): Promise<BrandType[]> {
  const res = await fetch(`${BASE_URL}/brands?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load brands (status: ${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

export async function getBrandById(id: string): Promise<BrandType> {
  const res = await fetch(`${BASE_URL}/brands/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load brand (status: ${res.status})`);
  }
  const data = await res.json();
  if (!data.data) {
    throw new Error("Brand not found");
  }
  return data.data;
}

export async function getProductsByBrand(brandId: string): Promise<ProductType[]> {
  const res = await fetch(`${BASE_URL}/products?brand=${brandId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load brand products (status: ${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

// ── CATEGORIES API ──

export async function getAllCategories(limit = 40): Promise<CategoryType[]> {
  const res = await fetch(`${BASE_URL}/categories?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load categories (status: ${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

export async function getCategoryById(id: string): Promise<CategoryType> {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load category (status: ${res.status})`);
  }
  const data = await res.json();
  if (!data.data) {
    throw new Error("Category not found");
  }
  return data.data;
}

export async function getProductsByCategory(categoryId: string): Promise<ProductType[]> {
  const res = await fetch(`${BASE_URL}/products?category[in]=${categoryId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load category products (status: ${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

// ── PRODUCTS API ──

export async function getAllProducts(limit = 40): Promise<ProductType[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load products (status: ${res.status})`);
  }
  const data = await res.json();
  return data.data ?? [];
}

export async function getProductById(id: string): Promise<ProductType> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load product (status: ${res.status})`);
  }
  const data = await res.json();
  if (!data.data) {
    throw new Error("Product not found");
  }
  return data.data;
}

