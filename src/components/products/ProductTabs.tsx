"use client";

import { useState } from "react";
import { FileText, Star, Truck } from "lucide-react";
import { ProductReviewsTab } from "./ProductReviewsTab";
import { ProductDetailsTab } from "./ProductDetailsTab";
import { ProductShippingTab } from "./ProductShippingTab";
import type { ProductTabsProps } from "@/types";

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "shipping">(
    "details",
  );

  const reviewsCount =
    product.ratingsQuantity || product.reviews?.length || 0;

  const tabButtonClass = (isActive: boolean) =>
    `flex shrink-0 cursor-pointer items-center gap-2 px-6 py-4 text-base leading-6 font-medium whitespace-nowrap transition-colors ${
      isActive
        ? "bg-[#f0fdf4] text-[#16a34a]"
        : "text-[#4a5565] hover:bg-[#f9fafb] hover:text-[#101828]"
    }`;

  return (
    <div className="mt-14 overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)]">
      {/* ── Tabs Header ── */}
      <div className="scrollbar-none flex items-center overflow-x-auto border-b border-[#e5e7eb]">
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={tabButtonClass(activeTab === "details")}
        >
          <FileText className="h-4.5 w-4.5" />
          Product Details
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={tabButtonClass(activeTab === "reviews")}
        >
          <Star className="h-4.5 w-4.5" />
          Reviews ({reviewsCount})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={tabButtonClass(activeTab === "shipping")}
        >
          <Truck className="h-4.5 w-4.5" />
          Shipping &amp; Returns
        </button>
      </div>

      {/* ── Tabs Content ── */}
      <div className="p-6">
        {activeTab === "details" && <ProductDetailsTab product={product} />}

        {activeTab === "reviews" && (
          <ProductReviewsTab
            productId={product._id}
            ratingsAverage={product.ratingsAverage}
            initialReviews={product.reviews}
          />
        )}

        {activeTab === "shipping" && <ProductShippingTab />}
      </div>
    </div>
  );
}
