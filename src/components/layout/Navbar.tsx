"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavbarProps } from "@/types";
import { useSession, signOut } from "next-auth/react";
import { useCart, useWishlist } from "@/components/layout/MyProvider";

export default function Navbar({ }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const user = session?.user;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/signin" });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-16 max-w-384 items-center justify-between gap-3 px-4 md:h-18 md:gap-4 lg:gap-6">
        {/* 1. Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="FreshCart home">
          <Image
            src="/freshcart-logo.svg"
            alt="FreshCart"
            width={160}
            height={32}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>

        {/* 2. Desktop Search Bar */}
        <form
          role="search"
          action="/products"
          method="GET"
          className="relative hidden flex-1 max-w-110 xl:max-w-120 md:block"
        >
          <input
            type="search"
            name="search"
            aria-label="Search for products, brands and more"
            placeholder="Search for products, brands and more..."
            className="h-11 w-full rounded-full border border-gray-200 bg-white py-2.5 pr-12 pl-5 text-sm font-normal text-[#364153] outline-none placeholder:text-[#99a1af] focus:border-brand transition-colors"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute top-1/2 right-1 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-[#15803d]"
          >
            <i className="fa-solid fa-magnifying-glass text-[13px]" aria-hidden />
          </button>
        </form>

        {/* 3. Navigation Links (Home, Shop, Categories, Brands) - Hidden on mobile/tablet */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          <Link
            href="/"
            className="text-[15px] font-medium text-[#4a5565] transition-colors hover:text-brand"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-[15px] font-medium text-[#4a5565] transition-colors hover:text-brand"
          >
            Shop
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group py-2">
            <Link
              href="/categories"
              className="flex items-center gap-1.5 text-[15px] font-medium text-[#4a5565] transition-colors hover:text-brand group-hover:text-brand"
            >
              <span>Categories</span>
              <i
                className="fa-solid fa-chevron-down text-[9px] text-[#6a7282] transition-transform duration-200 group-hover:rotate-180 group-hover:text-brand"
                aria-hidden
              />
            </Link>

            {/* Dropdown Menu */}
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute top-full left-0 pt-1 z-50 min-w-52.5">
              <div className="rounded-2xl bg-white py-3 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col gap-2">
                <Link
                  href="/categories"
                  className="text-[15px] font-medium text-[#364153] transition-colors hover:text-brand"
                >
                  All Categories
                </Link>
                <Link
                  href="/category/electronics"
                  className="text-[15px] font-medium text-[#364153] transition-colors hover:text-brand"
                >
                  Electronics
                </Link>
                <Link
                  href="/category/women's-fashion"
                  className="text-[15px] font-medium text-[#364153] transition-colors hover:text-brand"
                >
                  Women&apos;s Fashion
                </Link>
                <Link
                  href="/category/men's-fashion"
                  className="text-[15px] font-medium text-[#364153] transition-colors hover:text-brand"
                >
                  Men&apos;s Fashion
                </Link>
                <Link
                  href="/category/beauty-and-health"
                  className="text-[15px] font-medium text-[#364153] transition-colors hover:text-brand"
                >
                  Beauty &amp; Health
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/brands"
            className="text-[15px] font-medium text-[#4a5565] transition-colors hover:text-brand"
          >
            Brands
          </Link>
        </nav>

        {/* 4. Right Side: Support, Divider, Wishlist, Cart with Badge, Sign In Pill, and Mobile Hamburger Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 shrink-0">
          {/* Support 24/7 Help (xl screens) */}
          <Link
            href="/contactus"
            className="hidden items-center gap-2.5 xl:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdf4] text-brand">
              <i className="fa-solid fa-headset text-[15px]" aria-hidden />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-[11px] leading-3 font-medium text-[#99a1af]">
                Support
              </span>
              <span className="text-xs leading-4 font-semibold text-[#364153]">
                24/7 Help
              </span>
            </span>
          </Link>

          {/* Vertical Divider */}
          <span className="hidden h-5 w-px bg-gray-200 xl:block" aria-hidden />

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-9 w-9 items-center justify-center text-[#4a5565] transition-colors hover:text-brand"
          >
            <i className="fa-regular fa-heart text-[20px]" aria-hidden />
            {isMounted && wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-2xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center text-[#4a5565] transition-colors hover:text-brand"
          >
            <i className="fa-solid fa-cart-shopping text-[20px]" aria-hidden />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-2xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Pill / Sign In Button */}
          {isMounted && user ? (
            <div className="relative group hidden md:flex items-center">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-full bg-[#f0fdf4] border border-[#bbf7d0] py-1 pl-1 pr-3.5 text-sm font-semibold text-[#14532d] shadow-2xs transition-all hover:bg-[#dcfce7] hover:border-brand"
                title="My Profile"
              >
                {/* User Avatar */}
                <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "User"
                      )}&background=16a34a&color=fff&bold=true`
                    }
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                </span>

                {/* User Name */}
                <span className="max-w-30 truncate">
                  {user.name}
                </span>

                <i
                  className="fa-solid fa-chevron-down text-[10px] text-[#14532d]/70 transition-transform duration-200 group-hover:rotate-180"
                  aria-hidden
                />
              </Link>

              {/* User Dropdown Menu */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute top-full right-0 pt-2 z-50 min-w-52">
                <div className="rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </p>
                    {user.email && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 mt-1 text-sm font-medium text-gray-700 rounded-xl hover:bg-[#f0fdf4] hover:text-brand transition-colors"
                  >
                    <i className="fa-regular fa-user text-xs w-4 text-brand" aria-hidden />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/profile/addresses"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-gray-700 rounded-xl hover:bg-[#f0fdf4] hover:text-brand transition-colors"
                  >
                    <i className="fa-solid fa-location-dot text-xs w-4 text-brand" aria-hidden />
                    <span>My Addresses</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-gray-700 rounded-xl hover:bg-[#f0fdf4] hover:text-brand transition-colors"
                  >
                    <i className="fa-solid fa-box-open text-xs w-4 text-brand" aria-hidden />
                    <span>My Orders</span>
                  </Link>

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket text-xs w-4" aria-hidden />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/signin"
              className="hidden md:flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
            >
              <i className="fa-regular fa-user text-[13px]" aria-hidden />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Green Hamburger Menu Button (visible on mobile/tablet, hidden on desktop lg+) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-[#15803d] lg:hidden cursor-pointer shrink-0"
          >
            <i className="fa-solid fa-bars text-[17px]" aria-hidden />
          </button>
        </div>
      </div>

      {/* 5. Mobile Slide-Over Drawer & Overlay */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        {/* Header: Logo + Close */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center"
            aria-label="FreshCart home"
          >
            <Image
              src="/freshcart-logo.svg"
              alt="FreshCart"
              width={160}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          >
            <i className="fa-solid fa-xmark text-base" aria-hidden />
          </button>
        </div>

        {/* Search */}
        <form
          role="search"
          action="/products"
          method="GET"
          onSubmit={closeMobileMenu}
          className="border-b border-gray-100 p-4"
        >
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-4 text-sm text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-brand focus:bg-white"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-brand text-white transition-colors hover:bg-[#15803d]"
            >
              <i className="fa-solid fa-magnifying-glass text-sm" aria-hidden />
            </button>
          </div>
        </form>

        {/* Main Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {[
              { name: "Home", href: "/" },
              { name: "Shop", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "Brands", href: "/brands" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-[#f0fdf4] hover:text-brand"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mx-4 border-t border-gray-100" />

        {/* Wishlist & Cart */}
        <div className="space-y-1 p-4">
          <Link
            href="/wishlist"
            onClick={closeMobileMenu}
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-[#f0fdf4]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fef2f2]">
                <i className="fa-regular fa-heart text-sm text-red-500" aria-hidden />
              </span>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            {isMounted && wishlistCount > 0 && (
              <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            onClick={closeMobileMenu}
            className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-[#f0fdf4]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                <i className="fa-solid fa-cart-shopping text-sm text-brand" aria-hidden />
              </span>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
            {isMounted && cartCount > 0 && (
              <span className="flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="mx-4 border-t border-gray-100" />

        {/* Sign In & Sign Up / User Profile */}
        {isMounted && user ? (
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/profile"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] p-3 transition-colors hover:bg-[#dcfce7]"
            >
              <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=16a34a&color=fff&bold=true`
                  }
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-bold text-[#14532d] truncate text-base">
                  {user.name}
                </span>
                <span className="text-xs text-brand font-medium">
                  Go to Profile →
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                handleLogout();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/70 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs" aria-hidden />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-6">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/signin"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-xl bg-brand px-4 py-3 font-semibold text-white transition-colors hover:bg-[#15803d]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-xl border-2 border-brand px-4 py-3 font-semibold text-brand transition-colors hover:bg-[#f0fdf4]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Need Help */}
        <Link
          href="/contactus"
          onClick={closeMobileMenu}
          className="mx-4 mt-2 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-[#f0fdf4]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-brand">
            <i className="fa-solid fa-headset text-[15px]" aria-hidden />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">Need Help?</span>
            <span className="text-sm text-brand">Contact Support</span>
          </span>
        </Link>
      </aside>
    </header>
  );
}
