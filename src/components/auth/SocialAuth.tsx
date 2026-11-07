import type { SocialAuthProps } from "@/types";

const PROVIDERS = [
  {
    name: "Google",
    icon: "fa-brands fa-google",
    color: "#fb2c36",
  },
  {
    name: "Facebook",
    icon: "fa-brands fa-facebook-f",
    color: "#155dfc",
  },
];

export default function SocialAuth({ variant }: SocialAuthProps) {
  if (variant === "signup") {
    return (
      <div className="flex flex-col justify-center gap-2 sm:flex-row">
        {PROVIDERS.map((provider) => (
          <button
            key={provider.name}
            type="button"
            title={`${provider.name} sign-up is not connected in this demo`}
            className="flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d1d5dc] px-4 text-base leading-6 font-semibold text-[#101828] transition-colors hover:border-[#16a34a] hover:bg-[#f0fdf4]"
          >
            <i
              className={`${provider.icon} text-[16px]`}
              style={{ color: provider.color }}
              aria-hidden
            />
            {provider.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.name}
          type="button"
          title={`${provider.name} sign-in is not connected in this demo`}
          className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-[#e5e7eb] px-4 text-base leading-6 font-medium text-[#364153] transition-colors hover:border-[#16a34a] hover:bg-[#f0fdf4]"
        >
          <i
            className={`${provider.icon} text-[18px]`}
            style={{ color: provider.color }}
            aria-hidden
          />
          Continue with {provider.name}
        </button>
      ))}
    </div>
  );
}
