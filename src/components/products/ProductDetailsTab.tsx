import { Check } from "lucide-react";
import type { ProductDetailsTabProps } from "@/types";

export function ProductDetailsTab({ product }: ProductDetailsTabProps) {
  return (
    <div className="animate-in flex flex-col gap-6 duration-200 fade-in">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg leading-7 font-semibold text-[#101828]">
          About this Product
        </h2>
        <p className="text-base leading-6.5 font-medium text-[#4a5565]">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Product Information */}
        <div className="rounded-lg bg-[#f9fafb] p-4">
          <h3 className="text-base leading-6 font-medium text-[#101828]">
            Product Information
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-5">
            <li className="flex items-center justify-between">
              <span className="text-[#6a7282]">Category:</span>
              <span className="font-semibold text-[#101828]">
                {product.category?.name || "General"}
              </span>
            </li>
            {product.brand && (
              <li className="flex items-center justify-between">
                <span className="text-[#6a7282]">Brand:</span>
                <span className="font-semibold text-[#101828]">
                  {product.brand.name}
                </span>
              </li>
            )}
            <li className="flex items-center justify-between">
              <span className="text-[#6a7282]">Quantity in Stock:</span>
              <span className="font-semibold text-[#101828]">
                {product.quantity} items
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#6a7282]">Sold:</span>
              <span className="font-semibold text-[#101828]">
                {product.sold} items
              </span>
            </li>
          </ul>
        </div>

        {/* Highlights & Guarantees */}
        <div className="rounded-lg bg-[#f9fafb] p-4">
          <h3 className="text-base leading-6 font-medium text-[#101828]">
            Highlights &amp; Guarantees
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-5">
            <li className="flex items-center gap-2 text-[#4a5565]">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>100% Genuine &amp; Authentic Guarantee</span>
            </li>
            <li className="flex items-center gap-2 text-[#4a5565]">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>30-Day Money-Back Guarantee</span>
            </li>
            <li className="flex items-center gap-2 text-[#4a5565]">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Fast &amp; Secure Packaging</span>
            </li>
            <li className="flex items-center gap-2 text-[#4a5565]">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Quality Tested</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

