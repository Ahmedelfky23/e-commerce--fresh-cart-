"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  verifyResetCode,
  forgotPassword,
} from "@/actions/auth.actions";

export default function VerifyCodeForm({ email }: { email?: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setPending(true);
    try {
      const res = await verifyResetCode(code.trim());

      if (res?.status === "success") {
        toast.success("Code verified successfully!");
        router.push(`/reset-password?email=${encodeURIComponent(email || "")}`);
      } else {
        toast.error(res?.message || "Invalid or expired verification code");
      }
    } catch {
      toast.error("An error occurred during verification");
    } finally {
      setPending(false);
    }
  }

  async function handleResend() {
    if (!email) {
      router.push("/forgot-password");
      return;
    }

    setResending(true);
    try {
      const res = await forgotPassword(email);
      if (res?.status === "success") {
        toast.success(res.message || "A new code has been sent to your email");
      } else {
        toast.error(res?.message || "Failed to resend code");
      }
    } catch {
      toast.error("Could not resend code. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="resetCode"
          className="text-sm leading-5 font-semibold text-[#364153]"
        >
          6-Digit Verification Code
        </label>
        <div className="relative">
          <i
            className="fa-solid fa-key absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-[#99a1af]"
            aria-hidden
          />
          <input
            id="resetCode"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            maxLength={6}
            pattern="[0-9]{6}"
            value={code}
            onChange={(event) =>
              setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="••••••"
            className="h-[61px] w-full rounded-xl border-2 border-[#e5e7eb] pr-4 pl-12 text-2xl leading-9 font-medium tracking-[0.4em] text-[#364153] outline-none transition-colors placeholder:tracking-[0.4em] placeholder:text-[#99a1af] focus:border-brand"
          />
        </div>
      </div>

      <p className="flex flex-wrap items-center justify-center gap-1 text-sm leading-5 font-medium text-[#6a7282]">
        Didn&apos;t receive the code?
        <button
          type="button"
          disabled={resending}
          onClick={handleResend}
          className="cursor-pointer font-semibold text-brand transition-colors hover:text-[#15803d] disabled:opacity-50"
        >
          {resending ? "Sending..." : "Resend Code"}
        </button>
      </p>

      <button
        type="submit"
        disabled={pending}
        className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d] disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? (
          <>
            <i
              className="fa-solid fa-circle-notch animate-spin text-[16px]"
              aria-hidden
            />
            <span>Verifying...</span>
          </>
        ) : (
          <span>Verify Code</span>
        )}
      </button>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-sm leading-5 font-medium text-gray-500 transition-colors hover:text-brand"
        >
          <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
          Change email address
        </Link>
      </div>
    </form>
  );
}
