"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import PasswordField from "@/components/auth/PasswordField";
import { resetPassword } from "@/actions/auth.actions";

export default function ResetPasswordForm({ email }: { email?: string }) {
  const [userEmail, setUserEmail] = useState(email || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userEmail.trim()) {
      setError("Email address is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      const res = await resetPassword({
        email: userEmail.trim(),
        newPassword: password,
      });

      if (res?.status === "success") {
        toast.success(res.message || "Password reset successfully!");
        setDone(true);
        setPassword("");
        setConfirm("");
      } else {
        const msg = res?.message || "Failed to reset password";
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "An unexpected error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsPending(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] text-brand">
          <i className="fa-solid fa-circle-check text-3xl" aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl leading-7 font-bold text-[#1e2939]">
            Password Updated
          </h2>
          <p className="text-sm leading-5 font-medium text-[#4a5565]">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
        </div>

        <Link
          href="/signin"
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#15803d]"
        >
          <i
            className="fa-solid fa-arrow-right-to-bracket text-[15px]"
            aria-hidden
          />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {!email && (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reset-email"
            className="text-sm font-semibold text-[#364153]"
          >
            Email Address
          </label>
          <input
            id="reset-email"
            type="email"
            required
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
              setError(null);
            }}
            placeholder="Confirm your email address"
            className="h-[50px] w-full rounded-xl border-2 border-[#e5e7eb] px-4 text-base font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-brand"
          />
        </div>
      )}

      <PasswordField
        id="new-password"
        label="New Password"
        value={password}
        onChange={(value) => {
          setPassword(value);
          setError(null);
        }}
        placeholder="Enter at least 6 characters"
        autoComplete="new-password"
        minLength={6}
      />

      <PasswordField
        id="confirm-password"
        label="Confirm Password"
        value={confirm}
        onChange={(value) => {
          setConfirm(value);
          setError(null);
        }}
        placeholder="Re-enter your new password"
        autoComplete="new-password"
        minLength={6}
      />

      {error && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100"
        >
          <i
            className="fa-solid fa-circle-exclamation text-[14px]"
            aria-hidden
          />
          <span>{error}</span>
        </p>
      )}

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
            <span>Resetting password...</span>
          </>
        ) : (
          <span>Reset Password</span>
        )}
      </button>

      <div className="text-center pt-2">
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand"
        >
          <i className="fa-solid fa-arrow-left text-[12px]" aria-hidden />
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}
