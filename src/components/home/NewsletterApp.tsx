const perks = [
  { label: "Fresh Picks Weekly", icon: "fa-star" },
  { label: "Free Delivery Codes", icon: "fa-truck-fast" },
  { label: "Members-Only Deals", icon: "fa-tag" },
];

export default function NewsletterApp() {
  return (
    <section className="mt-10 w-full bg-linear-to-b from-white to-[#f9fafb] px-4 py-16 md:px-8">
      <div className="mx-auto w-full max-w-384">
        <div className="relative overflow-hidden rounded-[40px] border border-[#d0fae5] bg-linear-to-br from-[#f3f4f6] via-white to-[#fef2f2] shadow-[0_25px_50px_-12px_rgba(0,188,125,0.1)]">
          {/* Decorative blurred shapes */}
          <span
            className="absolute -top-16 -left-16 h-80 w-80 rounded-full bg-[#a4f4cf]/40 blur-3xl"
            aria-hidden
          />
          <span
            className="absolute right-0 -bottom-20 h-64 w-64 rounded-full bg-[#96f7e4]/30 blur-3xl"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 p-8 md:p-14 lg:flex-row lg:justify-center">
            {/* Left: newsletter */}
            <div className="flex w-full flex-col gap-6 lg:w-123.75 xl:w-200.5">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#00bc7d] to-[#00bba7] text-white shadow-[0_4px_6px_rgba(0,188,125,0.3),0_10px_15px_rgba(0,188,125,0.3)]">
                  <i className="fa-solid fa-envelope text-[20px]" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm leading-5 font-semibold text-[#009966]">
                    Newsletter
                  </h3>
                  <p className="text-xs leading-4 font-medium text-[#6a7282]">
                    50,000+ subscribers
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-[30px] leading-[41.25px] font-bold text-[#101828] md:text-4xl md:leading-[49.5px]">
                  Get the Freshest Updates Delivered Free
                </h2>
                <p className="text-lg leading-7 font-medium text-[#6a7282]">
                  Weekly recipes, seasonal offers &amp; exclusive member perks.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-0.75 md:flex-row md:flex-wrap">
                {perks.map((perk) => (
                  <span
                    key={perk.label}
                    className="flex h-12.5 w-fit items-center gap-2.5 rounded-full border border-[#d0fae5] bg-white/80 px-4 py-2.5 text-sm leading-5 font-medium text-[#364153] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d0fae5] text-[#009966]">
                      <i
                        className={`fa-solid ${perk.icon} text-[11px]`}
                        aria-hidden
                      />
                    </span>
                    {perk.label}
                  </span>
                ))}
              </div>

              <form className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="h-15 w-full rounded-2xl border-2 border-[#e5e7eb] bg-white px-5 py-4.25 text-base leading-5.25 font-medium text-[#364153] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.1)] outline-none placeholder:text-[#99a1af] focus:border-[#00bc7d]"
                  />
                  <button
                    type="submit"
                    className="flex h-14 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-[#009966] to-[#00bc7d] px-8 py-4 text-base leading-6 font-semibold text-white shadow-[0_4px_6px_rgba(0,188,125,0.3),0_10px_15px_rgba(0,188,125,0.3)] transition-opacity hover:opacity-95 md:h-15 md:py-4.5"
                  >
                    Subscribe
                    <i
                      className="fa-solid fa-arrow-right text-[14px]"
                      aria-hidden
                    />
                  </button>
                </div>
                <p className="text-xs leading-4 font-medium text-[#99a1af]">
                  ✨ Unsubscribe anytime. No spam, ever.
                </p>
              </form>
            </div>

            {/* Right: mobile app */}
            <div className="flex w-full flex-col justify-center lg:w-79.75 lg:pl-8 xl:w-131">
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#101828] to-[#1e2939] p-8">
                <span
                  className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#00bc7d] blur-2xl"
                  aria-hidden
                />
                <span
                  className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#00bba7] blur-2xl"
                  aria-hidden
                />

                <div className="relative flex flex-col gap-5">
                  <span className="w-fit rounded-full border border-[#00bc7d]/30 bg-[#00bc7d]/20 px-3 py-1.5 text-xs leading-4 font-semibold text-[#00d492]">
                    📱 MOBILE APP
                  </span>

                  <h3 className="text-2xl leading-7.5 font-bold text-white">
                    Shop Faster on Our App
                  </h3>

                  <p className="text-sm leading-[22.75px] font-medium text-[#99a1af]">
                    Get app-exclusive deals &amp; 15% off your first order.
                  </p>

                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      href="https://www.apple.com/app-store/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14.75 items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      <i
                        className="fa-brands fa-apple text-[22px] text-white"
                        aria-hidden
                      />
                      <span className="flex flex-col text-left">
                        <span className="text-[10px] leading-3.75 font-medium text-[#99a1af]">
                          Download on
                        </span>
                        <span className="text-sm leading-5 font-semibold text-white">
                          App Store
                        </span>
                      </span>
                    </a>
                    <a
                      href="https://play.google.com/store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14.75 items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      <i
                        className="fa-brands fa-google-play text-[19px] text-white"
                        aria-hidden
                      />
                      <span className="flex flex-col text-left">
                        <span className="text-[10px] leading-3.75 font-medium text-[#99a1af]">
                          Get it on
                        </span>
                        <span className="text-sm leading-5 font-semibold text-white">
                          Google Play
                        </span>
                      </span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span
                      className="text-sm leading-5 font-medium text-[#fdc700]"
                      aria-hidden
                    >
                      ★★★★★
                    </span>
                    <span className="text-sm leading-5 font-medium text-[#99a1af]">
                      4.9 • 100K+ downloads
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
