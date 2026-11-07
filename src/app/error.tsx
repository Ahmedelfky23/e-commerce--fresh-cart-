"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, ShoppingBag } from "lucide-react";
import type { ErrorProps } from "@/types";

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#fcfcfd]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200/80 p-8 text-center shadow-lg relative overflow-hidden">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-500 via-amber-500 to-red-500" />

        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-5 shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Error Heading */}
        <h1 className="text-2xl font-bold text-[#101828] tracking-tight">
          Something went wrong!
        </h1>

        {/* Error Message */}
        <p className="text-sm text-[#6A7282] mt-2.5 leading-relaxed">
          {error.message ||
            "An unexpected error occurred while loading this page. Please try again or return to the homepage."}
        </p>

        {/* Optional Error Digest Badge for debugging */}
        {error.digest && (
          <div className="mt-3 inline-block">
            <span className="text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
              Error ID: {error.digest}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:flex-1 py-2.5 px-5 rounded-xl bg-brand hover:bg-[#15803D] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:flex-1 py-2.5 px-5 rounded-xl border border-gray-200 hover:bg-gray-50 text-[#344054] font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-[#6A7282] flex items-center justify-center gap-4">
          <Link
            href="/products"
            className="hover:text-brand flex items-center gap-1 font-medium transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
