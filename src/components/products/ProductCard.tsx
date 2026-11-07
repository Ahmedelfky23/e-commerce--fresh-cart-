"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProductCardProps } from "@/types";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/components/layout/MyProvider";
import AddBtn from "./AddBtn";

export default function ProductCard({
  product,
  imageClassName,
  className,
}: ProductCardProps) {
  const [isPending, setIsPending] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const discountPercent = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : 0;

  const productHref = `/products/productdetails/${product._id}`;
  const rating = Math.round(product.ratingsAverage ?? 0);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPending) return;
    setIsPending(true);
    await toggleWishlist(product._id);
    setIsPending(false);
  };

  return (
    <div
      className={cn(
        "reveal-on-scroll group flex h-full flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {/* Image container */}
      <div
        className={cn(
          "relative aspect-3/4 w-full overflow-hidden bg-white",
          imageClassName,
        )}
      >
        {product.priceAfterDiscount && (
          <span className="absolute top-3 left-3 z-10 rounded-md bg-[#fb2c36] px-2 py-1 text-xs leading-4 font-medium text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Floating actions */}
        <div
          className={cn(
            "absolute top-2 right-2 z-10 flex flex-col gap-2 transition-opacity duration-200",
            inWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        >
          <button
            type="button"
            disabled={isPending}
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-colors",
              inWishlist
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-white text-[#4a5565] hover:bg-red-50 hover:text-red-500",
            )}
          >
            {isPending ? (
              <i className="fa-solid fa-circle-notch animate-spin text-[12px]" aria-hidden />
            ) : inWishlist ? (
              <i className="fa-solid fa-heart text-[14px] text-red-500" aria-hidden />
            ) : (
              <i className="fa-regular fa-heart text-[14px]" aria-hidden />
            )}
          </button>
          <Link
            href="/products"
            aria-label="Compare products"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#4a5565] shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-colors hover:bg-brand hover:text-white"
          >
            <i
              className="fa-solid fa-arrow-right-arrow-left text-[12px]"
              aria-hidden
            />
          </Link>
          <Link
            href={productHref}
            aria-label="Quick view"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#4a5565] shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-colors hover:bg-brand hover:text-white"
          >
            <i className="fa-regular fa-eye text-[14px]" aria-hidden />
          </Link>
        </div>

        <Link href={productHref} className="block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageCover}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs leading-4 font-medium text-[#6a7282]">
          {product.category?.name}
        </p>
        <Link href={productHref}>
          <h3 className="line-clamp-2 text-sm leading-5 font-semibold text-[#101828] transition-colors hover:text-brand">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center text-[#fcc800]">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fa-star text-[11px] ${
                  star <= rating ? "fa-solid" : "fa-regular text-[#d1d5dc]"
                }`}
                aria-hidden
              />
            ))}
          </div>
          <span className="text-xs leading-4 text-[#6a7282]">
            {product.ratingsAverage}
          </span>
        </div>

        {/* Price & Add to cart */}
        <div className="mt-auto pt-3">
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-base leading-6 font-bold text-[#101828]">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>
            {product.priceAfterDiscount && (
              <span className="text-xs leading-4 font-normal text-[#9ca3af] line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <AddBtn
            productId={product._id}
            classes="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand py-2 text-xs leading-4 font-medium text-white transition-colors hover:bg-[#15803d]"
            word={
              <>
                <i className="fa-solid fa-cart-shopping text-[12px]" aria-hidden />
                Add to Cart
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
