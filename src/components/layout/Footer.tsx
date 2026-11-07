import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Brands", href: "/brands" },
      { name: "Electronics", href: "/category/electronics" },
      { name: "Men's Fashion", href: "/category/men's-fashion" },
      { name: "Women's Fashion", href: "/category/women's-fashion" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Account", href: "/profile" },
      { name: "Order History", href: "/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Shopping Cart", href: "/cart" },
      { name: "Sign In", href: "/signin" },
      { name: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contactus" },
      { name: "Help Center", href: "/contactus" },
      { name: "Shipping Info", href: "/contactus" },
      { name: "Returns & Refunds", href: "/contactus" },
      { name: "Track Order", href: "/orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/PrivacyPolicy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/CookiePolicy" },
    ],
  },
];

const socials = [
  { label: "Facebook", icon: "fa-facebook-f", href: "https://www.facebook.com" },
  { label: "X", icon: "fa-x-twitter", href: "https://x.com" },
  { label: "Instagram", icon: "fa-instagram", href: "https://www.instagram.com" },
  { label: "LinkedIn", icon: "fa-linkedin-in", href: "https://www.linkedin.com" },
];

const payments = [
  { label: "Visa", icon: "fa-cc-visa" },
  { label: "Mastercard", icon: "fa-cc-mastercard" },
  { label: "PayPal", icon: "fa-cc-paypal" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#101828] pt-12">
      <div className="mx-auto w-full max-w-384 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[299px_repeat(4,1fr)] md:gap-12 xl:grid-cols-[469px_repeat(4,1fr)]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              aria-label="FreshCart home"
              className="flex w-fit items-center rounded-lg bg-white px-4 py-2"
            >
              <Image
                src="/freshcart-logo.svg"
                alt="FreshCart"
                width={165}
                height={32}
                className="h-8 w-41.25"
              />
            </Link>

            <p className="max-w-107.5 text-sm leading-[22.75px] font-medium text-[#99a1af]">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-sm leading-5 font-medium text-[#99a1af] transition-colors hover:text-white"
              >
                <i
                  className="fa-solid fa-phone text-[14px] text-[#22c55e]"
                  aria-hidden
                />
                +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-sm leading-5 font-medium text-[#99a1af] transition-colors hover:text-white"
              >
                <i
                  className="fa-solid fa-envelope text-[14px] text-[#22c55e]"
                  aria-hidden
                />
                support@freshcart.com
              </a>
              <div className="flex items-center gap-3 text-sm leading-5 font-medium text-[#99a1af]">
                <i
                  className="fa-solid fa-location-dot text-[14px] text-[#22c55e]"
                  aria-hidden
                />
                123 Commerce Street, New York, NY 10001
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2939] text-[#99a1af] transition-colors hover:bg-brand hover:text-white"
                >
                  <i
                    className={`fa-brands ${social.icon} text-[15px]`}
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h3 className="text-lg leading-7 font-semibold text-white">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li
                    key={link.name}
                    className="py-0.75 text-sm leading-5 font-medium text-[#99a1af] transition-colors hover:text-white"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 w-full border-t border-[#1e2939]">
        <div className="mx-auto flex w-full max-w-384 flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-center text-sm leading-5 font-medium text-[#6a7282]">
            © 2026 FreshCart. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {payments.map((payment) => (
              <span
                key={payment.label}
                className="flex items-center gap-2 text-sm leading-5 font-medium text-[#6a7282]"
              >
                <i
                  className={`fa-brands ${payment.icon} text-[16px]`}
                  aria-hidden
                />
                {payment.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
