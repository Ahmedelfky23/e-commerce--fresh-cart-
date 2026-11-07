"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  Building2,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Plus,
} from "lucide-react";
import { useCart } from "@/components/layout/MyProvider";
import { getLoggedUserCart, applyCoupon } from "@/actions/cart.actions";
import { getLoggedUserAddresses } from "@/actions/address.actions";
import { createCashOrder, createOnlineOrder } from "@/actions/order.actions";
import { shippingAddressSchema } from "@/schemas/checkout.schema";
import type {
  Address,
  CartData,
  CheckoutViewProps,
  ShippingAddress,
} from "@/types";

export default function CheckoutView({
  initialCart,
  initialAddresses,
}: CheckoutViewProps) {
  const router = useRouter();
  const { setCartCount } = useCart();

  const detailsRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const [cart, setCart] = useState<CartData | null>(initialCart || null);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses || []);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("custom");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [isLoadingData, setIsLoadingData] = useState(!initialCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function initData() {
      try {
        const [cartRes, addrRes] = await Promise.all([
          getLoggedUserCart(),
          getLoggedUserAddresses(),
        ]);

        if (cartRes?.status === "success" && cartRes?.data) {
          setCart(cartRes.data);
          setCartCount(cartRes.numOfCartItems ?? cartRes.data.products?.length ?? 0);
        }

        if (addrRes?.status === "success" && Array.isArray(addrRes.data)) {
          setAddresses(addrRes.data);
          if (addrRes.data.length > 0) {
            const first = addrRes.data[0];
            setSelectedAddressId(first._id);
            if (detailsRef.current) detailsRef.current.value = first.details || "";
            if (phoneRef.current) phoneRef.current.value = first.phone || "";
            if (cityRef.current) cityRef.current.value = first.city || "";
          }
        }
      } catch {
        toast.error("Failed to load checkout details");
      } finally {
        setIsLoadingData(false);
      }
    }

    initData();
  }, [setCartCount]);

  const handleSelectSavedAddress = (addr: Address) => {
    setSelectedAddressId(addr._id);
    setFormErrors({});
    if (detailsRef.current) detailsRef.current.value = addr.details || "";
    if (phoneRef.current) phoneRef.current.value = addr.phone || "";
    if (cityRef.current) cityRef.current.value = addr.city || "";
  };

  const handleSelectCustomAddress = () => {
    setSelectedAddressId("custom");
    setFormErrors({});
    if (detailsRef.current) detailsRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";
    if (cityRef.current) cityRef.current.value = "";
    if (postalCodeRef.current) postalCodeRef.current.value = "";
  };

  function aftercheckout() {
    setCartCount(0);
    setCart(null);
    toast.success("Order placed successfully!");
    router.push("/orders");
  }

  async function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await applyCoupon(couponCode.trim());
      if (res?.status === "success" && res?.data) {
        setCart(res.data);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cart?._id || !cart.products || cart.products.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    const details = detailsRef.current?.value.trim() || "";
    const phone = phoneRef.current?.value.trim() || "";
    const city = cityRef.current?.value.trim() || "";
    const postalCode = postalCodeRef.current?.value.trim() || "";

    // ── Zod Validation ──
    const validation = shippingAddressSchema.safeParse({
      details,
      phone,
      city,
      postalCode: postalCode || undefined,
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        const fieldName = String(err.path[0]);
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setFormErrors(errors);
      toast.error(
        validation.error.issues[0]?.message ||
          "Please check your shipping address details.",
      );
      return;
    }

    setFormErrors({});

    const shippingAddress: ShippingAddress = {
      details,
      phone,
      city,
      postalCode: postalCode || undefined,
    };

    setIsSubmitting(true);

    try {
      if (paymentMethod === "cash") {
        const res = await createCashOrder(cart._id, shippingAddress);

        if (res.status === "success") {
          aftercheckout();
        } else {
          toast.error(res.message || "Failed to place cash order.");
        }
      } else {
        const currentOrigin =
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost:3000";

        const res = await createOnlineOrder(
          cart._id,
          shippingAddress,
          currentOrigin,
        );

        if (res.status === "success" && res.session?.url) {
          setCartCount(0);
          toast.info("Redirecting to secure online payment...");
          window.location.href = res.session.url;
        } else {
          toast.error(res.message || "Failed to initiate online payment session.");
        }
      }
    } catch {
      toast.error("An unexpected error occurred during checkout.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const subtotal = cart?.totalCartPrice || 0;
  const discountAmount =
    cart?.totalAfterDiscount && cart.totalAfterDiscount < subtotal
      ? subtotal - cart.totalAfterDiscount
      : 0;
  const priceToPay = cart?.totalAfterDiscount ?? subtotal;
  const shipping = priceToPay > 500 || priceToPay === 0 ? 0 : 50;
  const total = priceToPay + shipping;
  const totalItemsCount =
    cart?.products?.reduce((acc, item) => acc + item.count, 0) || 0;

  if (isLoadingData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-circle-notch animate-spin text-3xl text-brand" />
          <p className="text-sm font-medium text-gray-500">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9fafb] py-12">
        <div className="mx-auto w-full max-w-xl px-4 text-center">
          <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xs">
            <span className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-brand">
              <ShoppingBag className="h-10 w-10" />
            </span>
            <h1 className="text-2xl font-bold text-[#101828]">Your Cart is Empty</h1>
            <p className="mt-2 text-sm text-[#6a7282]">
              You don&apos;t have any products in your cart to checkout.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-8">
      <div className="mx-auto w-full max-w-384 px-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-[#6a7282]"
        >
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/cart" className="transition-colors hover:text-brand">
            Cart
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-[#101828]">Checkout</span>
        </nav>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
            {/* ── Left Column: Shipping & Payment ── */}
            <div className="flex flex-col gap-6">
              {addresses.length > 0 && (
                <section className="rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-xs">
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-brand">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#101828]">
                      Choose from Saved Addresses
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr._id;
                      return (
                        <div
                          key={addr._id}
                          onClick={() => handleSelectSavedAddress(addr)}
                          className={`flex cursor-pointer flex-col gap-1.5 rounded-xl border p-4 transition-all ${
                            isSelected
                              ? "border-[#16a34a] bg-[#f0fdf4]/50 shadow-xs ring-1 ring-[#16a34a]"
                              : "border-[#e5e7eb] bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand">
                              {addr.name || "Address"}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-brand" />
                            )}
                          </div>
                          <p className="line-clamp-1 text-sm font-bold text-[#101828]">
                            {addr.city}
                          </p>
                          <p className="line-clamp-2 text-xs text-[#6a7282]">
                            {addr.details}
                          </p>
                          <p className="mt-1 text-xs font-medium text-gray-500">
                            📞 {addr.phone}
                          </p>
                        </div>
                      );
                    })}

                    {/* Option to use custom/new address */}
                    <div
                      onClick={handleSelectCustomAddress}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-4 transition-all ${
                        selectedAddressId === "custom"
                          ? "border-[#16a34a] bg-[#f0fdf4]/50 text-brand ring-1 ring-[#16a34a]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Enter Different Address
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* 2. Shipping Address Form (using useRef) */}
              <section className="rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-xs">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-brand">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg font-bold text-[#101828]">
                    Shipping Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold text-[#364153]"
                    >
                      City / Governorate *
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="city"
                        ref={cityRef}
                        type="text"
                        required
                        onChange={() => {
                          if (formErrors.city) {
                            setFormErrors((prev) => ({ ...prev, city: "" }));
                          }
                        }}
                        placeholder="e.g. Cairo, Giza, Alexandria"
                        className={`h-11 w-full rounded-xl border bg-white pr-4 pl-9 text-sm font-medium text-[#101828] outline-none transition-colors ${
                          formErrors.city
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#e5e7eb] focus:border-[#16a34a]"
                        }`}
                      />
                    </div>
                    {formErrors.city && (
                      <p className="text-xs font-medium text-red-500">
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-semibold text-[#364153]"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="phone"
                        ref={phoneRef}
                        type="tel"
                        required
                        onChange={() => {
                          if (formErrors.phone) {
                            setFormErrors((prev) => ({ ...prev, phone: "" }));
                          }
                        }}
                        placeholder="01012345678"
                        className={`h-11 w-full rounded-xl border bg-white pr-4 pl-9 text-sm font-medium text-[#101828] outline-none transition-colors ${
                          formErrors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#e5e7eb] focus:border-[#16a34a]"
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs font-medium text-red-500">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Street Details */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="details"
                      className="text-xs font-semibold text-[#364153]"
                    >
                      Street Address & Building Details *
                    </label>
                    <input
                      id="details"
                      ref={detailsRef}
                      type="text"
                      required
                      onChange={() => {
                        if (formErrors.details) {
                          setFormErrors((prev) => ({ ...prev, details: "" }));
                        }
                      }}
                      placeholder="Street name, building number, apartment, landmark"
                      className={`h-11 w-full rounded-xl border bg-white px-4 text-sm font-medium text-[#101828] outline-none transition-colors ${
                        formErrors.details
                          ? "border-red-500 focus:border-red-500"
                          : "border-[#e5e7eb] focus:border-[#16a34a]"
                      }`}
                    />
                    {formErrors.details && (
                      <p className="text-xs font-medium text-red-500">
                        {formErrors.details}
                      </p>
                    )}
                  </div>

                  {/* Postal Code (Optional) */}
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label
                      htmlFor="postalCode"
                      className="text-xs font-semibold text-[#364153]"
                    >
                      Postal Code (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        id="postalCode"
                        ref={postalCodeRef}
                        type="text"
                        onChange={() => {
                          if (formErrors.postalCode) {
                            setFormErrors((prev) => ({ ...prev, postalCode: "" }));
                          }
                        }}
                        placeholder="e.g. 11511"
                        className={`h-11 w-full rounded-xl border bg-white pr-4 pl-9 text-sm font-medium text-[#101828] outline-none transition-colors ${
                          formErrors.postalCode
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#e5e7eb] focus:border-[#16a34a]"
                        }`}
                      />
                    </div>
                    {formErrors.postalCode && (
                      <p className="text-xs font-medium text-red-500">
                        {formErrors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* 3. Payment Method */}
              <section className="rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-xs">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-brand">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg font-bold text-[#101828]">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === "cash"
                        ? "border-[#16a34a] bg-[#f0fdf4]/50 shadow-xs ring-1 ring-[#16a34a]"
                        : "border-[#e5e7eb] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-brand">
                        <Banknote className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#101828]">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-[#6a7282]">
                          Pay with cash when delivered
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "cash" && (
                      <CheckCircle2 className="h-5 w-5 text-brand" />
                    )}
                  </div>

                  {/* Online Payment */}
                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === "online"
                        ? "border-[#16a34a] bg-[#f0fdf4]/50 shadow-xs ring-1 ring-[#16a34a]"
                        : "border-[#e5e7eb] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-brand">
                        <CreditCard className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#101828]">
                          Online Card
                        </p>
                        <p className="text-xs text-[#6a7282]">
                          Visa / Mastercard / Stripe
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "online" && (
                      <CheckCircle2 className="h-5 w-5 text-brand" />
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="flex flex-col gap-6">
              <div className="sticky top-24 rounded-2xl border border-[#f3f4f6] bg-white p-6 shadow-xs">
                <h3 className="mb-4 text-base font-bold text-[#101828]">
                  Order Summary ({totalItemsCount} items)
                </h3>

                {/* Items preview list */}
                <div className="scrollbar-thin mb-4 max-h-60 space-y-3 overflow-y-auto pr-1">
                  {cart.products.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50 p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product?.imageCover}
                          alt={item.product?.title || "Product"}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="line-clamp-1 text-xs font-semibold text-[#101828]">
                          {item.product?.title}
                        </p>
                        <p className="text-xs text-[#6a7282]">
                          Qty: {item.count} × {item.price} EGP
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#101828]">
                        {(item.price * item.count).toLocaleString()} EGP
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-4 border-[#f3f4f6]" />

                {/* Price Details */}
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-[#6a7282]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#101828]">
                      {subtotal.toLocaleString()} EGP
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#16a34a]">
                      <span className="font-semibold">Discount</span>
                      <span className="font-bold">
                        -{discountAmount.toLocaleString()} EGP
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#6a7282]">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#101828]">
                      {shipping === 0 ? (
                        <span className="text-brand">Free</span>
                      ) : (
                        `${shipping} EGP`
                      )}
                    </span>
                  </div>

                  <hr className="my-2 border-[#f3f4f6]" />

                  <div className="flex items-center justify-between text-base font-bold text-[#101828]">
                    <span>Total Amount</span>
                    <span className="text-xl text-brand">
                      {total.toLocaleString()} EGP
                    </span>
                  </div>
                </div>

                {/* Coupon form in checkout */}
                {!appliedCoupon && !cart.totalAfterDiscount ? (
                  <div className="mt-4 border-t border-[#f3f4f6] pt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="h-10 w-full rounded-xl border border-[#e5e7eb] px-3 text-xs font-semibold uppercase tracking-wider text-[#101828] outline-none transition-colors focus:border-[#16a34a]"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="flex h-10 cursor-pointer items-center justify-center rounded-xl bg-gray-900 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isApplyingCoupon ? (
                          <i className="fa-solid fa-spinner animate-spin text-xs" />
                        ) : (
                          "Apply"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-[#15803d]">
                    <span>✓ Coupon Applied</span>
                    <span>Discount Active</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d] disabled:cursor-wait disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin text-sm" />
                      <span>Processing Order...</span>
                    </>
                  ) : paymentMethod === "cash" ? (
                    <>
                      <span>Place Cash Order</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Proceed to Online Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>100% Secure Checkout Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
