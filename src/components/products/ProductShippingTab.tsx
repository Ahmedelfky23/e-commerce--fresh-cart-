import { Truck, RotateCcw, ShieldCheck, Check } from "lucide-react";

export function ProductShippingTab() {
  return (
    <div className="animate-in flex flex-col gap-6 duration-200 fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Information Card */}
        <div className="flex flex-col gap-4 rounded-lg border border-[#dcfce7] bg-[#f0fdf4] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-xs">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="text-base leading-6 font-bold text-[#101828]">
              Shipping Information
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm leading-5 font-medium text-[#364153]">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Free shipping on orders over 500 EGP</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Standard delivery: 3-5 business days</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Next day delivery available in Cairo &amp; Giza</span>
            </li>
          </ul>
        </div>

        {/* Returns Information Card */}
        <div className="flex flex-col gap-4 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#101828] text-white shadow-xs">
              <RotateCcw className="h-5 w-5" />
            </div>
            <h3 className="text-base leading-6 font-bold text-[#101828]">
              Returns &amp; Exchanges
            </h3>
          </div>
          <ul className="space-y-2.5 text-sm leading-5 font-medium text-[#364153]">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>30 days hassle-free return policy</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Item must be unused and in original packaging</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <span>Instant refund to your original payment method</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-[#e5e7eb] p-4">
        <ShieldCheck className="h-8 w-8 shrink-0 text-brand" />
        <div>
          <h4 className="text-sm leading-5 font-semibold text-[#101828]">
            Buyer Protection Guarantee
          </h4>
          <p className="text-xs leading-4 font-medium text-[#6a7282]">
            Get full refund if the item is not as described or is not
            delivered within the promised timeframe.
          </p>
        </div>
      </div>
    </div>
  );
}

