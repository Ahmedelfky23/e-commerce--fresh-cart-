import Link from "next/link";
import type { AccountShellProps } from "@/types";

const LINKS = [
  {
    label: "My Orders",
    href: "/orders",
    key: "orders",
    icon: "fa-solid fa-box-archive",
  },
  {
    label: "My Addresses",
    href: "/profile/addresses",
    key: "addresses",
    icon: "fa-solid fa-location-dot",
  },
  {
    label: "Settings",
    href: "/profile",
    key: "settings",
    icon: "fa-solid fa-gear",
  },
];

export default function AccountShell({ active, children }: AccountShellProps) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-[#f9fafb] pb-10">
      {/* Hero */}
      <div className="w-full bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80]">
        <div className="mx-auto flex w-full max-w-[1536px] flex-col gap-6 px-4 py-12">
          <nav className="flex items-center gap-2 text-sm leading-5 font-medium text-white">
            <Link href="/" className="transition-colors hover:text-white/80">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>My Account</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/95 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm">
              <i className="fa-solid fa-user text-[26px] text-[#16a34a]" aria-hidden />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl leading-9 font-bold text-white">
                My Account
              </h1>
              <p className="text-base leading-6 font-medium text-white">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto flex w-full max-w-[1536px] flex-col gap-8 px-4 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-72">
          <nav className="overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="border-b border-[#f3f4f6] p-4">
              <h2 className="text-base leading-6 font-bold text-[#101828]">
                My Account
              </h2>
            </div>

            <ul className="flex flex-col p-2">
              {LINKS.map((link) => {
                const isActive = active === link.key;

                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-[#f0fdf4]"
                          : "hover:bg-[#f9fafb]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-[#22c55e] text-white"
                            : "bg-[#f3f4f6] text-[#4a5565]"
                        }`}
                      >
                        <i className={`${link.icon} text-[14px]`} aria-hidden />
                      </span>
                      <span
                        className={`flex-1 text-base leading-6 font-medium ${
                          isActive ? "text-[#15803d]" : "text-[#4a5565]"
                        }`}
                      >
                        {link.label}
                      </span>
                      <i
                        className={`fa-solid fa-chevron-right text-[10px] ${
                          isActive ? "text-[#22c55e]" : "text-[#99a1af]"
                        }`}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
