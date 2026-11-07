"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
} from "lucide-react";
import type { ProductInfoProps } from "@/types";
import AddBtn from "./AddBtn";
import { useWishlist } from "@/components/layout/MyProvider";

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isWishlistPending, setIsWishlistPending] = useState<boolean>(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);

  const unitPrice =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
      ? product.priceAfterDiscount
      : product.price;

  const totalPrice = unitPrice * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < (product.quantity || 99)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
    }
  };

  const handleWishlist = async () => {
    if (isWishlistPending) return;
    setIsWishlistPending(true);
    await toggleWishlist(product._id);
    setIsWishlistPending(false);
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map((starIndex) => {
      const isFilled = rating >= starIndex;
      const isHalf = rating >= starIndex - 0.5 && rating < starIndex;
      return (
        <Star
          key={starIndex}
          className={`h-5 w-5 ${
            isFilled
              ? "fill-[#fcc800] text-[#fcc800]"
              : isHalf
                ? "fill-[#fcc800]/40 text-[#fcc800]"
                : "fill-[#e5e7eb] text-[#e5e7eb]"
          }`}
        />
      );
    });
  };

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
      {/* ── Badges: Category & Brand ── */}
      <div className="flex flex-wrap items-center gap-2">
        {product.category && (
          <span className="rounded-full bg-[#f0fdf4] px-3 py-1.5 text-xs leading-4 font-medium text-[#15803d]">
            {product.category.name}
          </span>
        )}
        {product.brand && (
          <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs leading-4 font-medium text-[#364153]">
            {product.brand.name}
          </span>
        )}
      </div>

      {/* ── Product Title ── */}
      <h1 className="mt-4 text-2xl leading-8 font-bold text-[#101828] md:text-3xl md:leading-9">
        {product.title}
      </h1>

      {/* ── Rating & Reviews Count ── */}
      <div className="mt-3 flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {renderStars(product.ratingsAverage || 0)}
        </div>
        <span className="text-sm leading-5 font-medium text-[#4a5565]">
          {product.ratingsAverage || 0} (
          {product.ratingsQuantity || product.reviews?.length || 0} reviews)
        </span>
      </div>

      {/* ── Price Section ── */}
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="text-3xl leading-9 font-bold text-[#101828]">
          {unitPrice.toLocaleString()} EGP
        </span>
        {product.priceAfterDiscount &&
          product.priceAfterDiscount < product.price && (
            <span className="text-xl leading-7 font-medium text-[#99a1af] line-through">
              {product.price.toLocaleString()} EGP
            </span>
          )}
      </div>

      {/* ── Stock Badge ── */}
      <div className="mt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] px-3 py-1.5 text-sm leading-5 font-medium text-[#008236]">
          <span className="h-2 w-2 rounded-full bg-[#00c950]" />
          In Stock
        </span>
      </div>

      {/* ── Description ── */}
      <p className="mt-6 border-t border-[#f3f4f6] pt-5 text-base leading-[26px] font-medium text-[#4a5565]">
        {product.description}
      </p>

      {/* ── Quantity Selector & Availability ── */}
      <div className="mt-6">
        <label className="text-sm leading-5 font-medium text-[#364153]">
          Quantity
        </label>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex h-13 items-center rounded-lg border-2 border-[#e5e7eb]">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="flex h-12 w-13 cursor-pointer items-center justify-center text-[#4a5565] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-16 text-center text-lg leading-7 font-medium text-[#364153]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= (product.quantity || 99)}
              className="flex h-12 w-13 cursor-pointer items-center justify-center text-[#4a5565] transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm leading-5 font-medium text-[#6a7282]">
            {product.quantity} available
          </span>
        </div>
      </div>

      {/* ── Total Price Row ── */}
      <div className="mt-6 flex items-center justify-between rounded-lg bg-[#f9fafb] p-4">
        <span className="text-base leading-6 font-medium text-[#4a5565]">
          Total Price:
        </span>
        <span className="text-2xl leading-8 font-bold text-[#16a34a]">
          {totalPrice.toFixed(2)} EGP
        </span>
      </div>

      {/* ── Primary Action Buttons: Add to Cart & Buy Now ── */}
      <div className="mt-6 flex flex-col gap-3">
        <AddBtn
          productId={product._id}
          classes="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-6 text-base leading-6 font-semibold text-white transition-colors hover:bg-[#15803d] active:scale-[0.99] cursor-pointer"
          word={
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          }
        />
        <Link
          href="/checkout"
          className="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#101828] px-6 text-base leading-6 font-semibold text-white transition-colors hover:bg-[#1e2939] active:scale-[0.99]"
        >
          <Zap className="h-5 w-5" />
          Buy Now
        </Link>
      </div>

      {/* ── Secondary Actions: Wishlist & Share ── */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          disabled={isWishlistPending}
          onClick={handleWishlist}
          className={`flex h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-4 text-base leading-6 font-medium transition-colors ${
            isWishlisted
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-[#e5e7eb] text-[#364153] hover:bg-[#f9fafb]"
          }`}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-600 text-red-600" : ""
            }`}
          />
          {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex h-13 w-14 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-[#e5e7eb] text-[#364153] transition-colors hover:bg-[#f9fafb]"
          aria-label="Share product"
          title="Share"
        >
          {copied ? (
            <Check className="h-5 w-5 text-[#16a34a]" />
          ) : (
            <Share2 className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ── Trust & Guarantee Card ── */}
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#f3f4f6] pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
            <Truck className="h-5 w-5 text-[#16a34a]" />
          </div>
          <div>
            <h4 className="text-sm leading-5 font-medium text-[#101828]">
              Free Delivery
            </h4>
            <p className="text-xs leading-4 font-medium text-[#6a7282]">
              Orders over 500 EGP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
            <RotateCcw className="h-5 w-5 text-brand" />
          </div>
          <div>
            <h4 className="text-sm leading-5 font-medium text-[#101828]">
              30 Days Return
            </h4>
            <p className="text-xs leading-4 font-medium text-[#6a7282]">
              Money back
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
            <ShieldCheck className="h-5 w-5 text-[#16a34a]" />
          </div>
          <div>
            <h4 className="text-sm leading-5 font-medium text-[#101828]">
              Secure Payment
            </h4>
            <p className="text-xs leading-4 font-medium text-[#6a7282]">
              100% Protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
