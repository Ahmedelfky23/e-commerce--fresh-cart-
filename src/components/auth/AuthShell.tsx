import type { AuthShellProps } from "@/types";

export default function AuthShell({
  aside,
  hideAsideOnMobile = true,
  children,
}: AuthShellProps) {
  return (
    <div className="bg-white py-10 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1312px] items-center gap-12 px-4 lg:grid-cols-2">
        {aside ? (
          <div className={hideAsideOnMobile ? "hidden lg:block" : "block"}>
            {aside}
          </div>
        ) : null}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
