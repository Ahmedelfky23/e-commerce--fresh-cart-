"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useCart } from "@/components/layout/MyProvider";
import type { CartData } from "@/types";
import {
  getLoggedUserCart,
  updateCartItemCount,
  removeCartItem,
  clearUserCart,
  applyCoupon,
} from "@/actions/cart.actions";

const FREE_SHIPPING_THRESHOLD = 500;

export default function CartView() {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const { setCartCount } = useCart();

  function updateCart(res: { status?: string; numOfCartItems?: number; data?: CartData } | null) {
    if (res?.status === "success" && res?.data) {
      setCartData(res.data);
      setCartCount(res.numOfCartItems ?? res.data.products?.length ?? 0);
    } else {
      setCartData(null);
      setCartCount(0);
    }
  }

  async function getUserCart() {
    setIsLoading(true);
    const res = await getLoggedUserCart();
    updateCart(res);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = cartData?.products || [];
  const itemCount = items.reduce((sum, item) => sum + (item.count || 1), 0);
  const subtotal = cartData?.totalCartPrice || 0;
  const discountAmount =
    cartData?.totalAfterDiscount && cartData.totalAfterDiscount < subtotal
      ? subtotal - cartData.totalAfterDiscount
      : 0;
  const priceToPay = cartData?.totalAfterDiscount ?? subtotal;
  const shipping = priceToPay >= FREE_SHIPPING_THRESHOLD || priceToPay === 0 ? 0 : 50;
  const total = priceToPay + shipping;

  async function handleApplyCoupon(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await applyCoupon(couponCode.trim());
      if (res?.status === "success" && res?.data) {
        updateCart(res);
        setAppliedCoupon(couponCode.trim().toUpperCase());
        toast.success(res.message || "Coupon applied successfully!");
      } else {
        toast.error(res?.message || "Invalid or expired coupon");
      }
    } catch {
      toast.error("Failed to apply coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  }

  async function handleUpdateQuantity(productId: string, newCount: number) {
    if (newCount < 1) return;
    setUpdatingId(productId);
    const res = await updateCartItemCount(productId, newCount);
    if (res?.status === "success") {
      updateCart(res);
      toast.success("Cart updated");
    } else {
      toast.error(res?.message || "Failed to update quantity");
    }
    setUpdatingId(null);
  }

  async function handleRemoveItem(productId: string) {
    setUpdatingId(productId);
    const res = await removeCartItem(productId);
    if (res?.status === "success") {
      updateCart(res);
      toast.success("Item removed from cart");
    } else {
      toast.error(res?.message || "Failed to remove item");
    }
    setUpdatingId(null);
  }

  async function handleClearCart() {
    setIsLoading(true);
    const res = await clearUserCart();
    if (res?.status === "success" || res?.message === "success") {
      updateCart(null);
      toast.success("Cart cleared");
    } else {
      toast.error(res?.message || "Failed to clear cart");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-8 pb-20">
      <div className="mx-auto w-full max-w-384 px-4">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm leading-5 font-medium text-[#6a7282]">
            <Link href="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[#101828]">Shopping Cart</span>
          </nav>

          <div className="flex flex-col gap-2">
            <h1 className="flex items-center gap-3 text-3xl leading-9 font-bold text-[#101828]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] text-white shadow-xs">
                <i className="fa-solid fa-cart-shopping text-[22px]" aria-hidden />
              </span>
              Shopping Cart
            </h1>
            <p className="text-base leading-6 font-medium text-[#6a7282]">
              You have {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <i className="fa-solid fa-circle-notch animate-spin text-4xl text-brand" />
            <p className="text-sm font-medium text-[#6a7282]">Loading your cart...</p>
          </div>
        ) : items.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-12 text-center shadow">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0fdf4] text-brand">
              <i className="fa-solid fa-cart-shopping text-3xl" aria-hidden />
            </div>
            <h2 className="text-2xl font-bold text-[#101828]">Your Cart is Empty</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6a7282]">
              Looks like you haven&apos;t added any products to your cart yet. Explore our fresh grocery selection and start shopping!
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <span>Start Shopping</span>
              <i className="fa-solid fa-arrow-right text-[12px]" aria-hidden />
            </Link>
          </div>
        ) : (
          /* Cart content */
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Cart items */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const product = item.product;
                  const productId = product?._id || product?.id;
                  const isUpdating = updatingId === productId;
                  const productHref = productId
                    ? `/products/productdetails/${productId}`
                    : "/products";

                  return (
                    <article
                      key={item._id}
                      className="relative rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow sm:p-5"
                    >
                      <div className="flex gap-4 sm:gap-6">
                        {/* Image + stock */}
                        <div className="relative flex w-24 shrink-0 flex-col items-end sm:w-32">
                          <Link
                            href={productHref}
                            className="flex h-24 w-24 items-center justify-center rounded-xl border border-[#f3f4f6] bg-linear-to-br from-[#f9fafb] via-white to-[#f3f4f6] p-2 sm:h-32 sm:w-32 sm:p-3 overflow-hidden"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product?.imageCover || "/placeholder.png"}
                              alt={product?.title || "Product"}
                              className="h-full w-full object-contain"
                            />
                          </Link>
                          <span className="mt-3 flex items-center gap-1 rounded-full bg-[#00c950] px-2 py-0.5 text-[10px] leading-3.75 font-semibold text-white">
                            <i className="fa-solid fa-circle-check text-[9px]" aria-hidden />
                            In Stock
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <Link href={productHref} className="min-w-0">
                              <h2 className="line-clamp-2 text-lg leading-7.25 font-semibold text-[#101828] transition-colors hover:text-brand">
                                {product?.title}
                              </h2>
                            </Link>

                            <div className="flex flex-wrap items-center gap-2">
                              {product?.category?.name && (
                                <span className="rounded-full bg-linear-to-r from-[#f0fdf4] to-[#f3f4f6] px-2.5 py-1 text-xs leading-4 font-medium text-[#15803d]">
                                  {product.category.name}
                                </span>
                              )}
                              {product?.brand?.name && (
                                <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs leading-4 font-medium text-[#4b5563]">
                                  {product.brand.name}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-lg leading-7 font-bold text-brand">
                              {item.price.toLocaleString("en-US")} EGP
                            </span>
                            <span className="text-xs leading-4 font-medium text-[#99a1af]">
                              per unit
                            </span>
                          </div>

                          {/* Quantity + line total */}
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-1">
                              <button
                                type="button"
                                disabled={isUpdating || item.count <= 1}
                                onClick={() =>
                                  productId && handleUpdateQuantity(productId, item.count - 1)
                                }
                                aria-label={`Decrease quantity of ${product?.title}`}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#6a7282] shadow-sm transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                              >
                                <i className="fa-solid fa-minus text-[11px]" aria-hidden />
                              </button>
                              <span className="w-12 text-center text-base leading-6 font-bold text-[#101828]">
                                {isUpdating ? (
                                  <i className="fa-solid fa-spinner animate-spin text-xs text-brand" />
                                ) : (
                                  item.count
                                )}
                              </span>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() =>
                                  productId && handleUpdateQuantity(productId, item.count + 1)
                                }
                                aria-label={`Increase quantity of ${product?.title}`}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white shadow-sm transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                              >
                                <i className="fa-solid fa-plus text-[11px]" aria-hidden />
                              </button>
                            </div>

                            <div className="ml-auto flex items-center gap-3 sm:gap-4">
                              <div className="text-right">
                                <p className="text-xs leading-4 font-medium text-[#99a1af]">
                                  Total
                                </p>
                                <p className="text-xl leading-7 font-bold text-[#101828]">
                                  {(item.price * item.count).toLocaleString("en-US")}{" "}
                                  <span className="text-sm leading-5 font-medium text-[#99a1af]">
                                    EGP
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                disabled={isUpdating}
                                onClick={() => productId && handleRemoveItem(productId)}
                                aria-label={`Remove ${product?.title} from cart`}
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#ffc9c9] bg-[#fef2f2] text-[#fb2c36] transition-colors hover:bg-[#ffe4e6] disabled:opacity-50"
                              >
                                {isUpdating ? (
                                  <i className="fa-solid fa-spinner animate-spin text-xs" />
                                ) : (
                                  <i className="fa-solid fa-trash-can text-[15px]" aria-hidden />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* List actions */}
              <div className="flex items-center justify-between gap-4 border-t border-[#e5e7eb] pt-6">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-sm leading-5 font-medium text-brand transition-colors hover:text-[#15803d]"
                >
                  <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="flex cursor-pointer items-center gap-2 text-sm leading-5 font-medium text-[#99a1af] transition-colors hover:text-[#fb2c36]"
                >
                  <i className="fa-solid fa-trash-can text-[12px]" aria-hidden />
                  Clear all items
                </button>
              </div>
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow">
                <div className="flex flex-col gap-1 bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg leading-7 font-bold text-white">
                    <i className="fa-solid fa-bag-shopping text-[18px]" aria-hidden />
                    Order Summary
                  </h2>
                  <p className="text-sm leading-5 font-medium text-[#dcfce7]">
                    {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
                  </p>
                </div>

                <div className="flex flex-col gap-5 p-6">
                  {/* Free shipping progress */}
                  <div className="flex items-center gap-3 rounded-xl bg-linear-to-r from-[#f0fdf4] to-[#f3f4f6] p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#00a63e]">
                      <i className="fa-solid fa-truck text-[16px]" aria-hidden />
                    </span>
                    <div>
                      <p className="text-base leading-6 font-semibold text-[#008236]">
                        {shipping === 0
                          ? "Free Shipping!"
                          : `${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString("en-US")} EGP to free shipping`}
                      </p>
                      <p className="text-sm leading-5 font-medium text-[#00a63e]">
                        {shipping === 0
                          ? "You qualify for free delivery"
                          : "Add more items to unlock free delivery"}
                      </p>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4 text-base leading-6 text-[#4a5565]">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#101828]">
                        {subtotal.toLocaleString("en-US")} EGP
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between gap-4 text-sm leading-6 text-[#16a34a]">
                        <span className="font-semibold">Discount</span>
                        <span className="font-bold">
                          -{discountAmount.toLocaleString("en-US")} EGP
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 text-base leading-6 text-[#4a5565]">
                      <span>Shipping</span>
                      <span
                        className={`font-medium ${
                          shipping === 0 ? "text-[#00a63e]" : "text-[#101828]"
                        }`}
                      >
                        {shipping === 0
                          ? "FREE"
                          : `${shipping.toLocaleString("en-US")} EGP`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[#e5e7eb] pt-3">
                      <span className="text-base leading-6 font-semibold text-[#101828]">
                        Total
                      </span>
                      <span className="text-right">
                        <span className="text-2xl leading-8 font-bold text-[#101828]">
                          {total.toLocaleString("en-US")}
                        </span>{" "}
                        <span className="text-sm leading-5 font-medium text-[#6a7282]">
                          EGP
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Coupon / Promo Code Section */}
                  {!appliedCoupon && !cartData?.totalAfterDiscount ? (
                    !showCouponInput ? (
                      <button
                        type="button"
                        onClick={() => setShowCouponInput(true)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d1d5dc] py-3 text-sm leading-5 font-medium text-[#4a5565] transition-colors hover:border-brand hover:text-brand"
                      >
                        <i className="fa-solid fa-tag text-[14px]" aria-hidden />
                        Apply Promo Code
                      </button>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Coupon code"
                            className="h-11 w-full rounded-xl border border-[#e5e7eb] px-3.5 text-xs font-semibold uppercase tracking-wider text-[#101828] outline-none transition-colors focus:border-brand"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="flex h-11 cursor-pointer items-center justify-center rounded-xl bg-brand px-4 text-xs font-semibold text-white transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isApplyingCoupon ? (
                            <i className="fa-solid fa-spinner animate-spin text-xs" />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </form>
                    )
                  ) : (
                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-circle-check text-sm text-[#16a34a]" />
                        <span className="text-xs font-bold text-[#15803d]">
                          Coupon Applied {appliedCoupon ? `(${appliedCoupon})` : ""}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#16a34a]">
                        Discount Active
                      </span>
                    </div>
                  )}

                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-base leading-6 font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition-opacity hover:opacity-90"
                  >
                    <i className="fa-solid fa-lock text-[14px]" aria-hidden />
                    Secure Checkout
                  </Link>

                  <div className="flex items-center justify-center gap-4 py-2">
                    <span className="flex items-center gap-1.5 text-xs leading-4 font-medium text-[#6a7282]">
                      <i className="fa-solid fa-shield-halved text-[#00c950]" aria-hidden />
                      Secure Payment
                    </span>
                    <span className="h-4 w-px bg-[#e5e7eb]" aria-hidden />
                    <span className="flex items-center gap-1.5 text-xs leading-4 font-medium text-[#6a7282]">
                      <i className="fa-solid fa-truck-fast text-[#2b7fff]" aria-hidden />
                      Fast Delivery
                    </span>
                  </div>

                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 py-2 text-sm leading-5 font-medium text-brand transition-colors hover:text-[#15803d]"
                  >
                    <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
