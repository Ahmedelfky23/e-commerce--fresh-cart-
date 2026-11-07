"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { forgotPassword } from "@/actions/auth.actions";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setIsPending(true);
    try {
      const res = await forgotPassword(email.trim());

      if (res?.status === "success") {
        toast.success(res.message || "Reset code sent to your email");
        setSentTo(email.trim());
      } else {
        toast.error(res?.message || "Failed to send reset code");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] text-brand">
          <i
            className="fa-solid fa-envelope-circle-check text-3xl"
            aria-hidden
          />
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl leading-7 font-bold text-[#1e2939]">
            Check your inbox
          </h2>
          <p className="text-sm leading-5 font-medium text-[#4a5565]">
            We sent a 6-digit reset code to{" "}
            <span className="font-semibold text-[#101828]">{sentTo}</span>.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link
            href={`/verify-code?email=${encodeURIComponent(sentTo)}`}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base font-semibold text-white transition-colors hover:bg-[#15803d]"
          >
            <i className="fa-solid fa-keyboard text-[15px]" aria-hidden />
            Enter Verification Code
          </Link>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="cursor-pointer text-sm font-medium text-brand transition-colors hover:text-[#15803d]"
          >
            Use a different email address
          </button>
        </div>

        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand"
        >
          <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm leading-5 font-semibold text-[#364153]"
          >
            Email Address
          </label>
          <div className="relative">
            <i
              className="fa-regular fa-envelope absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-[#99a1af]"
              aria-hidden
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your registered email address"
              className="h-[52px] w-full rounded-xl border-2 border-[#e5e7eb] pr-4 pl-12 text-base leading-6 font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-brand"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d] disabled:opacity-75"
        >
          {isPending ? (
            <>
              <i
                className="fa-solid fa-circle-notch animate-spin text-[15px]"
                aria-hidden
              />
              <span>Sending code...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane text-[15px]" aria-hidden />
              <span>Send Reset Code</span>
            </>
          )}
        </button>

        <div className="text-center">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-sm leading-5 font-medium text-gray-600 transition-colors hover:text-brand"
          >
            <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
            Back to Sign In
          </Link>
        </div>
      </form>

      <div className="border-t border-[#f3f4f6] pt-6 text-center text-sm font-medium text-[#4a5565]">
        Remember your password?{" "}
        <Link
          href="/signin"
          className="font-semibold text-brand transition-colors hover:text-[#15803d]"
        >
          Sign In
        </Link>
      </div>
    </>
  );
}
