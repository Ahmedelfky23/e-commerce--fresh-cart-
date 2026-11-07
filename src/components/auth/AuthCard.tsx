import type { ReactNode } from "react";
import Link from "next/link";
import AuthStepper from "./AuthStepper";
import type { AuthCardProps } from "@/types";

export default function AuthCard({
  title,
  subtitle,
  children,
  stepper,
  padding = "wide",
}: AuthCardProps) {
  return (
    <div
      className={`w-full rounded-2xl bg-white shadow-[0_8px_10px_rgba(0,0,0,0.1),0_20px_25px_rgba(0,0,0,0.1)] ${
        padding === "wide" ? "p-8 sm:p-12" : "px-6 py-8 sm:py-10"
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            className="text-3xl leading-9 font-bold text-[#16a34a] transition-opacity hover:opacity-80"
          >
            FreshCart
          </Link>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl leading-8 font-bold text-[#1e2939]">
              {title}
            </h1>
            <p className="text-base leading-6 font-medium text-[#4a5565]">
              {subtitle}
            </p>
          </div>
        </div>

        {stepper ? <AuthStepper current={stepper} /> : null}

        {children}
      </div>
    </div>
  );
}
