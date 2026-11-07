"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#FAFCFB]">
      {/* Soft Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#16A34A]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full mx-auto text-center relative z-10 flex flex-col items-center">
        {/* ── Top Floating Card with 404 Badge ── */}
        <div className="relative mb-6">
          {/* Main White Card with Cart Icon */}
          <div
            className="w-44 h-36 sm:w-52 sm:h-44 bg-white rounded-3xl border border-gray-100 flex items-center justify-center relative"
            style={{
              boxShadow:
                "0 20px 40px -15px rgba(22, 163, 74, 0.12), 0 10px 25px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Shopping Cart Icon */}
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-[#16A34A]"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14H16L22.4 42H50L55 22H20"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="50" r="4" fill="currentColor" />
              <circle cx="46" cy="50" r="4" fill="currentColor" />
              {/* Cart interior body color */}
              <path
                d="M20 22H55L50 42H22.4L18 22H20Z"
                fill="currentColor"
                fillOpacity="0.25"
              />
            </svg>

            {/* Floating 404 Green Badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#16A34A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-lg shadow-[#16A34A]/30 ring-4 ring-white animate-in zoom-in-50 duration-300">
              404
            </div>
          </div>
        </div>

        {/* ── Cute Smiling Dots (Figma Spec: • ‿ •) ── */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          <svg
            className="w-7 h-3 text-[#16A34A]"
            viewBox="0 0 28 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 3C7 10 21 10 26 3"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
        </div>

        {/* ── Headings ── */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-3">
          Oops! Nothing Here
        </h1>

        <p className="text-sm sm:text-base text-[#6A7282] max-w-md mx-auto leading-relaxed mb-8">
          Looks like this page went out of stock! Don&apos;t worry,
          <br className="hidden sm:inline" /> there&apos;s plenty more fresh
          content to explore.
        </p>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mb-12">
          {/* Go to Homepage Button */}
          <Link
            href="/"
            className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#16A34A]/25 hover:shadow-xl hover:shadow-[#16A34A]/30 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4 fill-white" />
            Go to Homepage
          </Link>

          {/* Go Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-white hover:bg-gray-50 text-[#101828] font-bold text-sm flex items-center justify-center gap-2 border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
            Go Back
          </button>
        </div>

        {/* ── Bottom Card: Popular Destinations ── */}
        <div
          className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 p-6 text-center"
          style={{
            boxShadow:
              "0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-4">
            Popular Destinations
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/products"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#E8F8EE] text-[#16A34A] hover:bg-[#DCFCE7] transition-colors"
            >
              All Products
            </Link>

            <Link
              href="/categories"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F1F5F9] text-[#475467] hover:bg-gray-200/80 transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/products?sort=rating"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F1F5F9] text-[#475467] hover:bg-gray-200/80 transition-colors"
            >
              Top Rated
            </Link>

            <Link
              href="/contactus"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#F1F5F9] text-[#475467] hover:bg-gray-200/80 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
