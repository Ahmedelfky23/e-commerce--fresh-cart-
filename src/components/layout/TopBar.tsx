"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TopBar() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div className="hidden w-full border-b border-[#f3f4f6] bg-white md:block">
      <div className="mx-auto flex h-10 max-w-384 items-center justify-between px-4">
        {/* Left announcements */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-sm leading-5 font-medium text-[#6a7282]">
            <i className="fa-solid fa-truck text-[12px] text-brand" aria-hidden />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-2 text-sm leading-5 font-medium text-[#6a7282]">
            <i className="fa-solid fa-gift text-[12px] text-brand" aria-hidden />
            New Arrivals Daily
          </span>
        </div>

        {/* Right info & auth */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-1.5 text-sm leading-5 font-medium text-[#6a7282] transition-colors hover:text-brand"
            >
              <i className="fa-solid fa-phone text-[12px]" aria-hidden />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-1.5 text-sm leading-5 font-medium text-[#6a7282] transition-colors hover:text-brand"
            >
              <i className="fa-solid fa-envelope text-[12px]" aria-hidden />
              support@freshcart.com
            </a>
          </div>

          <span className="h-4 w-px bg-[#e5e7eb]" aria-hidden />

          <div className="flex items-center gap-3">
            {isMounted && user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm leading-5 font-semibold text-[#364153] transition-colors hover:text-brand"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=16a34a&color=fff&bold=true`
                  }
                  alt={user.name || "User"}
                  className="h-5 w-5 rounded-full object-cover ring-1 ring-brand/30"
                />
                <span className="max-w-30 truncate">{user.name}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 text-sm leading-5 font-medium text-[#4a5565] transition-colors hover:text-brand"
                >
                  <i className="fa-regular fa-user text-[13px]" aria-hidden />
                  Sign In
                </Link>
                <span className="h-3.5 w-px bg-[#e5e7eb]" aria-hidden />
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 text-sm leading-5 font-semibold text-[#4a5565] transition-colors hover:text-brand"
                >
                  <i className="fa-solid fa-user-plus text-[12px]" aria-hidden />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
