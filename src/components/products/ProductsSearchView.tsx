"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List as ListIcon,
  X,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import type { ProductsSearchViewProps } from "@/types";
import ProductCard from "./ProductCard";
import AddBtn from "./AddBtn";
import { useWishlist } from "@/components/layout/MyProvider";

const ITEMS_PER_PAGE = 12;

const QUICK_PRICE_RANGES = [
  { label: "Under 500", max: 500 },
  { label: "Under 1K", max: 1000 },
  { label: "Under 5K", max: 5000 },
  { label: "Under 10K", max: 10000 },
];

export default function ProductsSearchView({
  initialProducts,
  categories,
  brands,
  initialSearch = "",
  initialCategory = "",
  initialBrand = "",
}: ProductsSearchViewProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : [],
  );
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedQuickPrice, setSelectedQuickPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [togglingWishlistId, setTogglingWishlistId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("freshcart_view_mode");
      if (savedMode === "grid" || savedMode === "list") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setViewMode(savedMode);
      }
    } catch {
    }
  }, []);

  const handleViewChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    try {
      localStorage.setItem("freshcart_view_mode", mode);
    } catch {
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialSearch) setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy]);

  const handleToggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName],
    );
  };

  const handleToggleBrand = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName],
    );
  };

  const handleQuickPriceClick = (max: number) => {
    if (selectedQuickPrice === max) {
      setSelectedQuickPrice(null);
      setMaxPrice("");
    } else {
      setSelectedQuickPrice(max);
      setMaxPrice(max.toString());
      setMinPrice("");
    }
  };

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedQuickPrice(null);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      selectedCategories.length > 0 ||
      selectedBrands.length > 0 ||
      minPrice ||
      maxPrice ||
      selectedQuickPrice !== null,
  );

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const titleMatch = product.title?.toLowerCase().includes(query);
        const categoryMatch = product.category?.name?.toLowerCase().includes(query);
        const brandMatch = product.brand?.name?.toLowerCase().includes(query);
        const descMatch = product.description?.toLowerCase().includes(query);
        if (!titleMatch && !categoryMatch && !brandMatch && !descMatch) {
          return false;
        }
      }

      if (selectedCategories.length > 0) {
        const catName = product.category?.name;
        if (!catName || !selectedCategories.includes(catName)) {
          return false;
        }
      }

      if (selectedBrands.length > 0) {
        const brandName = product.brand?.name;
        if (!brandName || !selectedBrands.includes(brandName)) {
          return false;
        }
      }

      const effectivePrice = product.priceAfterDiscount ?? product.price;
      if (minPrice && effectivePrice < Number(minPrice)) {
        return false;
      }
      if (maxPrice && effectivePrice > Number(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [initialProducts, searchTerm, selectedCategories, selectedBrands, minPrice, maxPrice]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort(
          (a, b) =>
            (a.priceAfterDiscount ?? a.price) - (b.priceAfterDiscount ?? b.price),
        );
      case "price-desc":
        return list.sort(
          (a, b) =>
            (b.priceAfterDiscount ?? b.price) - (a.priceAfterDiscount ?? a.price),
        );
      case "rating-desc":
        return list.sort(
          (a, b) => (b.ratingsAverage ?? 0) - (a.ratingsAverage ?? 0),
        );
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleWishlist = async (id: string) => {
    if (togglingWishlistId) return;
    setTogglingWishlistId(id);
    await toggleWishlist(id);
    setTogglingWishlistId(null);
  };

  const renderFiltersContent = () => (
    <div className="flex flex-col gap-6">
      {/* Categories Filter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base leading-6 font-bold text-[#101828]">Categories</h3>
          {selectedCategories.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedCategories([])}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="scrollbar-thin max-h-52 space-y-2 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <label
                key={cat._id}
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#4a5565] transition-colors hover:text-[#101828]"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleCategory(cat.name)}
                  className="h-4 w-4 cursor-pointer rounded border-[#e5e7eb] accent-[#16a34a]"
                />
                <span className="truncate">{cat.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <hr className="border-[#f3f4f6]" />

      {/* Price Range Filter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base leading-6 font-bold text-[#101828]">Price Range</h3>
          {(minPrice || maxPrice || selectedQuickPrice !== null) && (
            <button
              type="button"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setSelectedQuickPrice(null);
              }}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#6a7282]">Min (EGP)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setSelectedQuickPrice(null);
              }}
              className="h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm font-medium text-[#364153] outline-none transition-colors focus:border-[#16a34a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#6a7282]">Max (EGP)</label>
            <input
              type="number"
              min="0"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setSelectedQuickPrice(null);
              }}
              className="h-10 w-full rounded-lg border border-[#e5e7eb] px-3 text-sm font-medium text-[#364153] outline-none transition-colors focus:border-[#16a34a]"
            />
          </div>
        </div>

        {/* Quick Price Range Chips (as in Figma) */}
        <div className="mt-1 flex flex-wrap gap-2">
          {QUICK_PRICE_RANGES.map((chip) => {
            const isActive = selectedQuickPrice === chip.max;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleQuickPriceClick(chip.max)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#16a34a] font-semibold text-white shadow-xs"
                    : "bg-[#f3f4f6] text-[#4a5565] hover:bg-[#e5e7eb]"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-[#f3f4f6]" />

      {/* Brands Filter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base leading-6 font-bold text-[#101828]">Brands</h3>
          {selectedBrands.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedBrands([])}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="scrollbar-thin max-h-52 space-y-2 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const isChecked = selectedBrands.includes(brand.name);
            return (
              <label
                key={brand._id}
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#4a5565] transition-colors hover:text-[#101828]"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleBrand(brand.name)}
                  className="h-4 w-4 cursor-pointer rounded border-[#e5e7eb] accent-[#16a34a]"
                />
                <span className="truncate">{brand.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset all button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearAllFilters}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
        >
          <RotateCcw className="h-4 w-4" />
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-12">
      {/* ── Top Header Section (Figma: Breadcrumb + Search Input) ── */}
      <section className="border-b border-[#f3f4f6] bg-white">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-4 px-4 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-medium text-[#6a7282]"
          >
            <Link href="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span aria-hidden className="text-[#d1d5dc]">
              /
            </span>
            <span className="font-semibold text-[#101828]">
              {searchTerm.trim() ? "Search Results" : "All Products"}
            </span>
          </nav>

          {/* Prominent Search Input Box (Figma dimensions: 672px max width) */}
          <div className="relative max-w-2xl">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#99a1af]"
              aria-hidden
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products, brands, or categories..."
              className="h-13 w-full rounded-xl border border-[#e5e7eb] bg-white pr-10 pl-12 text-base font-medium text-[#101828] placeholder-[#99a1af] shadow-xs outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-[#16a34a]/10"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-[#99a1af] hover:bg-[#f3f4f6] hover:text-[#101828]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Layout: Sidebar Filters + Products ── */}
      <div className="mx-auto mt-6 flex w-full max-w-384 flex-col gap-8 px-4 lg:flex-row">
        {/* ── Desktop Sidebar Filters (Width: 256px as in Figma) ── */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            {renderFiltersContent()}
          </div>
        </aside>

        {/* ── Mobile Filter Button ── */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-semibold text-[#101828] shadow-xs"
          >
            <SlidersHorizontal className="h-4 w-4 text-brand" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                !
              </span>
            )}
          </button>

          <span className="text-sm font-medium text-[#6a7282]">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* ── Mobile Filter Drawer Modal ── */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-brand" />
                  <h2 className="text-lg font-bold text-[#101828]">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                {renderFiltersContent()}
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full rounded-xl bg-brand py-3 text-center text-sm font-semibold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Products Content ── */}
        <main className="flex-1">
          {/* Top Control Bar (Figma: View Switcher + Sort By) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#f3f4f6] bg-white p-4 shadow-xs">
            {/* View Mode Switcher (Grid vs List) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-[#e5e7eb] bg-gray-50/60 p-1">
                <button
                  type="button"
                  onClick={() => handleViewChange("grid")}
                  title="عرض شبكة (جنب بعض)"
                  aria-label="Grid view"
                  className={`flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-[#16a34a] text-white shadow-xs font-bold"
                      : "text-[#6a7282] hover:text-[#101828] hover:bg-white"
                  }`}
                >
                  <Grid3X3 className="h-4.5 w-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleViewChange("list")}
                  title="عرض قائمة (تحت بعض)"
                  aria-label="List view"
                  className={`flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-[#16a34a] text-white shadow-xs font-bold"
                      : "text-[#6a7282] hover:text-[#101828] hover:bg-white"
                  }`}
                >
                  <ListIcon className="h-4.5 w-4.5" />
                </button>
              </div>

              <span className="text-sm font-medium text-[#6a7282]">
                Showing{" "}
                <strong className="text-[#101828]">
                  {sortedProducts.length > 0
                    ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        sortedProducts.length,
                      )}`
                    : "0"}
                </strong>{" "}
                of <strong className="text-[#101828]">{sortedProducts.length}</strong> products
              </span>
            </div>

            {/* Sort by Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-sm font-medium text-[#6a7282]">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-medium text-[#364153] outline-none transition-colors focus:border-[#16a34a]"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
                <option value="title-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#6a7282]">Active Filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                  Search: &ldquo;{searchTerm}&rdquo;
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="hover:text-emerald-950"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => handleToggleCategory(c)}
                    className="hover:text-emerald-950"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                >
                  Brand: {b}
                  <button
                    type="button"
                    onClick={() => handleToggleBrand(b)}
                    className="hover:text-emerald-950"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                  Price: {minPrice || "0"} - {maxPrice || "∞"} EGP
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                      setSelectedQuickPrice(null);
                    }}
                    className="hover:text-emerald-950"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* ── Products Display (Grid or List) ── */}
          {paginatedProducts.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e5e7eb] bg-white p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400 shadow-inner">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#101828]">
                No matching products found
              </h3>
              <p className="mt-1 max-w-md text-sm text-[#6a7282]">
                We couldn&apos;t find any products matching your current filters. Try
                broadening your search or clearing some filters.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All Filters
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View (كلهم جنب بعض) */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            /* List View (منتج منتج تحت بعض - Full width stacked) */
            <div className="flex w-full flex-col gap-4">
              {paginatedProducts.map((product) => {
                const inWishlist = isInWishlist(product._id);
                const discountPercent = product.priceAfterDiscount
                  ? Math.round(
                      ((product.price - product.priceAfterDiscount) / product.price) *
                        100,
                    )
                  : 0;
                const effectivePrice = product.priceAfterDiscount ?? product.price;

                return (
                  <div
                    key={product._id}
                    className="group flex w-full flex-col items-center gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-xs transition-all hover:border-gray-300 hover:shadow-md sm:flex-row"
                  >
                    {/* Left: Image with Discount Badge */}
                    <Link
                      href={`/products/productdetails/${product._id}`}
                      className="relative flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-44 sm:w-44"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.priceAfterDiscount && (
                        <span className="absolute top-2.5 left-2.5 z-10 rounded-md bg-[#fb2c36] px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                          -{discountPercent}%
                        </span>
                      )}
                    </Link>

                    {/* Middle: Details */}
                    <div className="flex flex-1 flex-col justify-between self-stretch py-1">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#99a1af]">
                          {product.category?.name}
                        </span>
                        <Link
                          href={`/products/productdetails/${product._id}`}
                          className="line-clamp-1 text-base font-bold text-[#101828] transition-colors hover:text-brand sm:text-lg"
                        >
                          {product.title}
                        </Link>
                        <p className="line-clamp-2 text-xs font-medium leading-5 text-[#6a7282] sm:text-sm">
                          {product.description}
                        </p>
                      </div>

                      {/* Rating & Brand */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Math.round(product.ratingsAverage ?? 0)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs font-bold text-[#101828]">
                            {product.ratingsAverage?.toFixed(1) ?? "0.0"}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[#6a7282]">
                          ({product.ratingsQuantity ?? 0} reviews)
                        </span>
                        {product.brand?.name && (
                          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                            {product.brand.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div className="flex shrink-0 min-w-44 self-stretch flex-col items-start justify-between border-t border-gray-100 pt-3 sm:items-end sm:border-t-0 sm:border-l sm:border-gray-100 sm:pt-0 sm:pl-6">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-2xl font-bold text-[#16a34a]">
                          {effectivePrice} EGP
                        </span>
                        {product.priceAfterDiscount && (
                          <span className="text-sm font-medium text-gray-400 line-through">
                            {product.price} EGP
                          </span>
                        )}
                        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock
                        </span>
                      </div>

                      <div className="mt-4 flex w-full items-center gap-2 sm:w-auto">
                        <button
                          type="button"
                          onClick={() => handleToggleWishlist(product._id)}
                          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                          className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors ${
                            inWishlist
                              ? "border-red-200 bg-red-50 text-red-500"
                              : "border-gray-200 bg-white text-gray-400 hover:border-red-200 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`h-4.5 w-4.5 ${inWishlist ? "fill-red-500" : ""}`}
                          />
                        </button>
                        <AddBtn
                          productId={product._id}
                          classes="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d] disabled:cursor-wait disabled:opacity-80"
                          word="Add to Cart"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Pagination (Figma Controls) ── */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#4a5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#16a34a] text-white shadow-sm"
                        : "border border-[#e5e7eb] bg-white text-[#4a5565] hover:bg-gray-50 hover:text-[#101828]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#4a5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

