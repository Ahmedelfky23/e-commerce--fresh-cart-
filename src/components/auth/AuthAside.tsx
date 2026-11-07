import type { AuthAsideProps } from "@/types";

const CONTENT = {
  forgot: {
    icon: "fa-solid fa-envelope-open-text",
    floating: ["fa-solid fa-paper-plane", "fa-solid fa-shield-halved"],
    features: [
      { icon: "fa-regular fa-envelope", label: "Email Verification" },
      { icon: "fa-solid fa-shield-halved", label: "Secure Reset" },
      { icon: "fa-solid fa-lock", label: "Encrypted" },
    ],
  },
  verify: {
    icon: "fa-solid fa-envelope-circle-check",
    floating: ["fa-solid fa-hashtag", "fa-solid fa-shield-halved"],
    features: [
      { icon: "fa-regular fa-envelope", label: "Email Verification" },
      { icon: "fa-solid fa-shield-halved", label: "Secure Reset" },
      { icon: "fa-solid fa-lock", label: "Encrypted" },
    ],
  },
  reset: {
    icon: "fa-solid fa-lock",
    floating: ["fa-solid fa-key", "fa-solid fa-shield-halved"],
    features: [
      { icon: "fa-regular fa-envelope", label: "Email Verification" },
      { icon: "fa-solid fa-shield-halved", label: "Secure Reset" },
      { icon: "fa-solid fa-lock", label: "Encrypted" },
    ],
  },
} as const;

export function LoginAside() {
  return (
    <div className="flex flex-col gap-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/auth-groceries.png"
        alt="Fresh vegetables and fruits in a shopping cart"
        className="h-[384px] w-full rounded-2xl object-cover shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)]"
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl leading-9 font-bold text-[#1e2939]">
          FreshCart - Your One-Stop Shop for Fresh Products
        </h2>
        <p className="text-lg leading-7 font-medium text-[#4a5565]">
          Join thousands of happy customers who trust FreshCart for their daily
          grocery needs
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm leading-5 font-medium text-[#6a7282]">
          <span className="flex items-center gap-2">
            <i
              className="fa-solid fa-truck-fast text-[14px] text-[#16a34a]"
              aria-hidden
            />
            Free Delivery
          </span>
          <span className="flex items-center gap-2">
            <i
              className="fa-regular fa-credit-card text-[14px] text-[#16a34a]"
              aria-hidden
            />
            Secure Payment
          </span>
          <span className="flex items-center gap-2">
            <i
              className="fa-solid fa-headset text-[14px] text-[#16a34a]"
              aria-hidden
            />
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AuthAside({ variant }: AuthAsideProps) {
  const content = CONTENT[variant];

  return (
    <div className="flex flex-col gap-6 text-center">
      <div className="relative flex h-[384px] w-full items-center justify-center overflow-hidden rounded-2xl bg-linear-to-r from-[#f0fdf4] via-[#f0fdf4] to-[#f3f4f6] shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)]">
        <span
          className="absolute top-8 left-12 h-24 w-24 rounded-full bg-[#dcfce7]/80"
          aria-hidden
        />
        <span
          className="absolute right-14 bottom-6 h-32 w-32 rounded-full bg-[#dcfce7]/70"
          aria-hidden
        />
        <span
          className="absolute top-20 right-24 h-16 w-16 rounded-full bg-[#d0fae5]"
          aria-hidden
        />

        <span
          className="absolute top-10 left-[18%] hidden h-[66px] w-[66px] items-center justify-center rounded-xl bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] sm:flex"
          aria-hidden
        >
          <i className={`${content.floating[0]} text-[22px] text-[#16a34a]`} />
        </span>
        <span
          className="absolute right-[16%] bottom-12 hidden h-[66px] w-[66px] items-center justify-center rounded-xl bg-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] sm:flex"
          aria-hidden
        >
          <i className={`${content.floating[1]} text-[22px] text-[#16a34a]`} />
        </span>

        <div className="relative flex flex-col items-center gap-5">
          <span className="flex h-[118px] w-[118px] items-center justify-center rounded-3xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <i
              className={`${content.icon} text-[46px] text-[#16a34a]`}
              aria-hidden
            />
          </span>
          <span className="flex items-center gap-3" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#bbf7d0]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl leading-9 font-bold text-[#1e2939]">
          Reset Your Password
        </h2>
        <p className="text-lg leading-7 font-medium text-[#4a5565]">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you get
          back into your account in no time.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm leading-5 font-medium text-[#6a7282]">
          {content.features.map((feature) => (
            <span key={feature.label} className="flex items-center gap-2">
              <i
                className={`${feature.icon} text-[14px] text-[#16a34a]`}
                aria-hidden
              />
              {feature.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
