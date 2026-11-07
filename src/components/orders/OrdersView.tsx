"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  CreditCard,
  Banknote,
  CheckCircle2,
  Clock,
  Truck,
  ChevronDown,
  ChevronUp,
  Receipt,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  Hash,
} from "lucide-react";
import { getUserOrders } from "@/actions/order.actions";
import type { OrderType } from "@/types";

interface OrdersViewProps {
  initialOrders?: OrderType[];
}

export default function OrdersView({ initialOrders }: OrdersViewProps) {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders || []);
  const [isLoading, setIsLoading] = useState(!initialOrders);
  const [expandedOrderIds, setExpandedOrderIds] = useState<Record<string, boolean>>({});

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getUserOrders();
      if (res.status === "success" && Array.isArray(res.data)) {
        const sorted = [...res.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setOrders(sorted);
        if (sorted.length > 0) {
          setExpandedOrderIds({ [sorted[0]._id]: true });
        }
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialOrders) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOrders();
    } else if (initialOrders.length > 0) {
      setExpandedOrderIds({ [initialOrders[0]._id]: true });
    }
  }, [initialOrders]);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderIds((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-circle-notch animate-spin text-3xl text-[#16a34a]" />
          <p className="text-sm font-medium text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto w-full max-w-[1536px] px-4">
        {/* Breadcrumb - Figma style */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-[#6a7282]"
        >
          <Link href="/" className="transition-colors hover:text-[#16a34a]">
            Home
          </Link>
          <span className="text-[#d1d5dc]">/</span>
          <span className="font-semibold text-[#101828]">My Orders</span>
        </nav>

        {/* Header - Figma style */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {/* Green gradient icon box */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#22c55e] to-[#16a34a] shadow-[0px_4px_6px_-4px_rgba(34,197,94,0.25),0px_10px_15px_-3px_rgba(34,197,94,0.25)]">
              <Package className="h-7 w-7 text-white" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-[#101828] sm:text-3xl">
                My Orders
              </h1>
              <p className="text-sm font-medium text-[#6a7282]">
                {orders.length > 0
                  ? `Track and manage your ${orders.length} order${orders.length > 1 ? "s" : ""}`
                  : "Track and manage your orders"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              title="Refresh Orders"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent px-4 py-2 text-sm font-semibold text-[#16a34a] transition-colors hover:bg-[#f0fdf4]"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Orders Content */}
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-[#f9fafb] p-12 text-center shadow-xs">
            <span className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-[#16a34a]">
              <ShoppingBag className="h-10 w-10" />
            </span>
            <h2 className="text-2xl font-bold text-[#101828]">No Orders Yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#6a7282]">
              You haven&apos;t placed any orders yet. When you buy products, all your orders and live tracking will appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = !!expandedOrderIds[order._id];
              const itemsCount =
                order.cartItems?.reduce((acc, item) => acc + (item.count || 1), 0) ||
                order.cartItems?.length ||
                0;
              const firstItem = order.cartItems?.[0];
              const extraItemsCount = itemsCount > 1 ? itemsCount - 1 : 0;

              const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              const isPaid = order.isPaid;
              const isDelivered = order.isDelivered;
              const isCash = order.paymentMethodType === "cash";

              // Order display ID
              const displayId = order.id
                ? String(order.id)
                : order._id.slice(-5).toUpperCase();

              // حساب التكلفة
              const totalAmount = order.totalOrderPrice || 0;
              const shippingFee = order.shippingPrice || (totalAmount > 500 ? 0 : 50);
              const subtotal = totalAmount - shippingFee;

              return (
                <div
                  key={order._id}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                    isExpanded
                      ? "border-[#bbf7d0] shadow-[0px_4px_6px_-4px_rgba(220,252,231,0.5),0px_10px_15px_-3px_rgba(220,252,231,0.5)]"
                      : "border-[#e5e7eb] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)] hover:border-gray-300"
                  }`}
                >
                  {/* Order Main Row (Figma Desktop Layout) */}
                  <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center">
                    {/* Left: Product Thumbnail with badge */}
                    <div className="relative shrink-0">
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-[#f3f4f6] bg-linear-to-br from-[#f9fafb] to-white p-2.5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={firstItem?.product?.imageCover || "/placeholder.png"}
                          alt={firstItem?.product?.title || "Product Cover"}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* +N Badge if multiple items */}
                      {extraItemsCount > 0 && (
                        <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#101828] text-xs font-bold text-white shadow-md ring-2 ring-white">
                          +{extraItemsCount}
                        </div>
                      )}
                    </div>

                    {/* Middle: Order Information */}
                    <div className="flex flex-1 flex-col justify-between gap-3">
                      {/* Top: Status Badge & Payment Method Icon */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Status Badge */}
                          {isDelivered ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#dcfce7] px-2.5 py-1 text-xs font-semibold text-[#16a34a]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Delivered</span>
                            </span>
                          ) : isPaid ? (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#dbeafe] px-2.5 py-1 text-xs font-semibold text-[#155dfc]">
                              <Truck className="h-3.5 w-3.5" />
                              <span>On the way</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#fef3c6] px-2.5 py-1 text-xs font-semibold text-[#e17100]">
                              <Clock className="h-3.5 w-3.5" />
                              <span>Processing</span>
                            </span>
                          )}

                          {/* Order ID */}
                          <div className="flex items-center gap-1 text-lg font-bold text-[#101828]">
                            <Hash className="h-4 w-4 text-gray-400" />
                            <span>{displayId}</span>
                          </div>
                        </div>

                        {/* Payment Icon Box */}
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6]"
                          title={isCash ? "Cash on Delivery" : "Online Payment"}
                        >
                          {isCash ? (
                            <Banknote className="h-5 w-5 text-gray-600" />
                          ) : (
                            <CreditCard className="h-5 w-5 text-[#16a34a]" />
                          )}
                        </div>
                      </div>

                      {/* Meta Details Row: Date • Items • City */}
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#6a7282]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>{orderDate}</span>
                        </span>

                        <span className="h-1 w-1 rounded-full bg-[#d1d5dc]" />

                        <span className="flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5 text-gray-400" />
                          <span>
                            {itemsCount} {itemsCount === 1 ? "item" : "items"}
                          </span>
                        </span>

                        {order.shippingAddress?.city && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-[#d1d5dc]" />
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              <span>{order.shippingAddress.city}</span>
                            </span>
                          </>
                        )}
                      </div>

                      {/* Bottom Row: Total Price & Details Toggle Button */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold text-[#101828]">
                            {totalAmount.toLocaleString()}
                          </span>
                          <span className="text-sm font-medium text-[#99a1af]">
                            EGP
                          </span>
                        </div>

                        {/* Details / Hide Button (Exact Figma Styling) */}
                        <button
                          type="button"
                          onClick={() => toggleOrderDetails(order._id)}
                          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                            isExpanded
                              ? "bg-[#16a34a] text-white shadow-[0px_4px_6px_-4px_rgba(22,163,74,0.25),0px_10px_15px_-3px_rgba(22,163,74,0.25)] hover:bg-[#15803d]"
                              : "bg-[#f3f4f6] text-[#364153] hover:bg-gray-200"
                          }`}
                        >
                          <span>{isExpanded ? "Hide" : "Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details Accordion (Exact Figma Structure) */}
                  {isExpanded && (
                    <div className="border-t border-[#f3f4f6] bg-[#f9fafb]/50">
                      {/* Order Items List */}
                      <div className="p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
                            <Package className="h-3.5 w-3.5" />
                          </div>
                          <h4 className="text-sm font-semibold text-[#101828]">
                            Order Items
                          </h4>
                        </div>

                        <div className="space-y-3">
                          {order.cartItems?.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center gap-4 rounded-xl border border-[#f3f4f6] bg-white p-4 shadow-2xs"
                            >
                              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f9fafb] p-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.product?.imageCover || "/placeholder.png"}
                                  alt={item.product?.title || "Item Cover"}
                                  className="h-full w-full object-contain"
                                />
                              </div>

                              <div className="flex flex-1 flex-col justify-center">
                                {item.product?._id ? (
                                  <Link
                                    href={`/products/${item.product._id}`}
                                    className="line-clamp-1 text-sm font-medium text-[#101828] transition-colors hover:text-[#16a34a]"
                                  >
                                    {item.product.title}
                                  </Link>
                                ) : (
                                  <p className="line-clamp-1 text-sm font-medium text-[#101828]">
                                    {item.product?.title || "Product"}
                                  </p>
                                )}

                                <p className="mt-1 text-sm text-[#6a7282]">
                                  <span className="font-semibold text-[#364153]">
                                    {item.count}
                                  </span>{" "}
                                  × {item.price} EGP
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-bold text-[#101828]">
                                  {(item.price * item.count).toLocaleString()}
                                </p>
                                <p className="text-xs font-medium text-[#99a1af]">
                                  EGP
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom 2-Card Grid: Delivery Address & Order Summary */}
                      <div className="grid grid-cols-1 gap-4 px-6 pb-6 md:grid-cols-2">
                        {/* 1. Delivery Address Card */}
                        <div className="flex flex-col gap-3 rounded-xl border border-[#f3f4f6] bg-white p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
                              <MapPin className="h-3.5 w-3.5" />
                            </div>
                            <h4 className="text-sm font-semibold text-[#101828]">
                              Delivery Address
                            </h4>
                          </div>

                          <div className="flex flex-col gap-1.5 pt-1">
                            <p className="text-base font-medium text-[#101828]">
                              {order.shippingAddress?.city || "Customer City"}
                            </p>
                            <p className="text-sm text-[#4a5565]">
                              {order.shippingAddress?.details || "No street details provided"}
                            </p>
                            {order.shippingAddress?.phone && (
                              <p className="flex items-center gap-2 pt-1 text-sm text-[#4a5565]">
                                <Phone className="h-3.5 w-3.5 text-gray-400" />
                                <span>{order.shippingAddress.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* 2. Order Summary Card (Amber themed as in Figma) */}
                        <div className="flex flex-col gap-3 rounded-xl border border-[#fee685] bg-[#fef3c6]/40 p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#fe9a00] text-white">
                              <Receipt className="h-3.5 w-3.5" />
                            </div>
                            <h4 className="text-sm font-semibold text-[#101828]">
                              Order Summary
                            </h4>
                          </div>

                          <div className="flex flex-col gap-2 pt-1 text-sm">
                            <div className="flex items-center justify-between text-[#4a5565]">
                              <span>Subtotal</span>
                              <span className="font-medium text-[#101828]">
                                {subtotal > 0
                                  ? subtotal.toLocaleString()
                                  : totalAmount.toLocaleString()}{" "}
                                EGP
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[#4a5565]">
                              <span>Shipping</span>
                              <span className="font-medium text-[#101828]">
                                {shippingFee === 0 ? "Free" : `${shippingFee} EGP`}
                              </span>
                            </div>

                            <hr className="my-1 border-t border-gray-300/50" />

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-sm font-semibold text-[#101828]">
                                Total
                              </span>
                              <span className="text-lg font-bold text-[#101828]">
                                {totalAmount.toLocaleString()} EGP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
