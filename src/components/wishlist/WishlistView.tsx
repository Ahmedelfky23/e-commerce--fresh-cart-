"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { getLoggedUserWishlist, removeFromWishlist } from "@/actions/wishlist.actions";
import { useWishlist } from "@/components/layout/MyProvider";
import AddBtn from "@/components/products/AddBtn";
import type { WishlistProduct } from "@/types";

export default function WishlistView() {
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { setWishlistCount, setWishlistIds } = useWishlist();

  async function loadWishlist() {
    setIsLoading(true);
    try {
      const res = await getLoggedUserWishlist();
      if (res?.status === "success" && Array.isArray(res.data)) {
        setProducts(res.data as WishlistProduct[]);
        const ids = (res.data as WishlistProduct[]).map((p) => p._id);
        setWishlistIds(ids);
        setWishlistCount(res.count ?? ids.length);
      } else {
        setProducts([]);
        setWishlistIds([]);
        setWishlistCount(0);
      }
    } catch {
      setProducts([]);
      setWishlistIds([]);
      setWishlistCount(0);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWishlist();
  }, []);

  async function handleRemove(productId: string) {
    setRemovingId(productId);
    try {
      const res = await removeFromWishlist(productId);
      if (res?.status === "success") {
        setProducts((prev) => prev.filter((item) => item._id !== productId));
        const nextIds = Array.isArray(res.data)
          ? (res.data as string[])
          : products.filter((p) => p._id !== productId).map((p) => p._id);
        setWishlistIds(nextIds);
        setWishlistCount(nextIds.length);
        toast.success(res.message || "Product removed from wishlist");
      } else {
        toast.error(res?.message || "Failed to remove product");
      }
    } catch {
      toast.error("Failed to remove product from wishlist");
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="bg-[#f9fafb]">
      {/* Page header */}
      <section className="border-b border-[#f3f4f6] bg-white">
        <div className="mx-auto w-full max-w-384 px-4 py-8">
          <nav className="flex items-center gap-2 text-sm leading-5 font-medium text-[#6a7282]">
            <Link href="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[#101828]">Wishlist</span>
          </nav>

          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fef2f2] text-[#fb2c36]">
              <i className="fa-solid fa-heart text-[20px]" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl leading-8 font-bold text-[#101828]">My Wishlist</h1>
              {isLoading ? (
                <span className="mt-1 block h-4 w-24 animate-pulse rounded-sm bg-gray-100" />
              ) : (
                <p className="text-sm leading-5 font-medium text-[#6a7282]">
                  {products.length} {products.length === 1 ? "item" : "items"} saved
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-384 px-4 py-8">
        {isLoading ? (
          <div className="overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-4 border-b border-[#f3f4f6] p-4 last:border-b-0 lg:px-6 lg:py-5"
              >
                <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-100" />
                <div className="flex-1">
                  <div className="mb-2 h-4 w-1/2 rounded-sm bg-gray-100" />
                  <div className="h-3.5 w-1/4 rounded-sm bg-gray-100" />
                </div>
                <div className="hidden h-10 w-[130px] rounded-lg bg-gray-100 lg:block" />
                <div className="h-10 w-10 rounded-lg bg-gray-100" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-12 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#fef2f2] text-[#ef4444]">
              <i className="fa-regular fa-heart text-3xl" aria-hidden />
            </div>
            <h2 className="text-2xl font-bold text-[#101828]">Your Wishlist is Empty</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6a7282]">
              Explore our products and tap the heart icon on any item you love to save it for later.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <span>Explore Products</span>
              <i className="fa-solid fa-arrow-right text-[12px]" aria-hidden />
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white">
              {/* Table header */}
              <div className="hidden grid-cols-12 gap-4 border-b border-[#f3f4f6] bg-[#f9fafb] px-6 py-4 lg:grid">
                <div className="col-span-6 text-sm leading-5 font-medium text-[#6a7282]">
                  Product
                </div>
                <div className="col-span-2 text-center text-sm leading-5 font-medium text-[#6a7282]">
                  Price
                </div>
                <div className="col-span-2 text-center text-sm leading-5 font-medium text-[#6a7282]">
                  Status
                </div>
                <div className="col-span-2 text-center text-sm leading-5 font-medium text-[#6a7282]">
                  Actions
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#f3f4f6]">
                {products.map((product) => {
                  const isRemoving = removingId === product._id;
                  const productHref = `/products/productdetails/${product._id}`;
                  const currentPrice = product.priceAfterDiscount ?? product.price;
                  const isInStock = (product.quantity ?? 0) > 0;

                  return (
                    <div
                      key={product._id}
                      className="grid grid-cols-1 items-center gap-4 p-4 transition-colors hover:bg-[#f9fafb]/60 lg:grid-cols-12 lg:gap-4 lg:px-6 lg:py-5"
                    >
                      {/* Product */}
                      <div className="flex min-w-0 items-center gap-4 lg:col-span-6">
                        <Link
                          href={productHref}
                          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#f3f4f6] bg-[#f9fafb]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.imageCover}
                            alt={product.title}
                            className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                          />
                        </Link>

                        <div className="min-w-0">
                          <Link href={productHref}>
                            <h2 className="line-clamp-2 text-base leading-6 font-medium text-[#101828] transition-colors hover:text-brand">
                              {product.title}
                            </h2>
                          </Link>
                          {product.category?.name && (
                            <p className="mt-1 text-sm leading-5 font-medium text-[#99a1af]">
                              {product.category.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 lg:col-span-2 lg:justify-center">
                        <span className="text-sm leading-5 font-medium text-[#6a7282] lg:hidden">
                          Price:
                        </span>
                        <div className="text-right lg:text-center">
                          <div className="text-base leading-6 font-semibold text-[#101828]">
                            {currentPrice.toLocaleString("en-US")} EGP
                          </div>
                          {product.priceAfterDiscount && (
                            <div className="text-sm leading-5 font-medium text-[#99a1af] line-through">
                              {product.price.toLocaleString("en-US")} EGP
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2 lg:col-span-2 lg:justify-center">
                        <span className="text-sm leading-5 font-medium text-[#6a7282] lg:hidden">
                          Status:
                        </span>
                        {isInStock ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] px-3 py-1 text-xs leading-4 font-medium text-[#008236]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00c950]" aria-hidden />
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-3 py-1 text-xs leading-4 font-medium text-[#fb2c36]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#fb2c36]" aria-hidden />
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 lg:col-span-2 lg:justify-center">
                        <div className="flex w-full items-center gap-2 lg:w-auto">
                          <AddBtn
                            productId={product._id}
                            classes="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-4 text-sm leading-5 font-medium text-white transition-colors hover:bg-[#15803d] lg:w-[129px] lg:flex-none"
                            word={
                              <>
                                <i className="fa-solid fa-cart-shopping text-[13px]" aria-hidden />
                                Add to Cart
                              </>
                            }
                          />
                          <button
                            type="button"
                            disabled={isRemoving}
                            onClick={() => handleRemove(product._id)}
                            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#99a1af] transition-colors hover:border-[#ffc9c9] hover:bg-[#fef2f2] hover:text-[#fb2c36] disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            {isRemoving ? (
                              <i
                                className="fa-solid fa-circle-notch animate-spin text-xs"
                                aria-hidden
                              />
                            ) : (
                              <i className="fa-regular fa-trash-can text-[14px]" aria-hidden />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue shopping */}
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm leading-5 font-medium text-[#6a7282] transition-colors hover:text-brand"
              >
                <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
