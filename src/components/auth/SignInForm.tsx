"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import SocialAuth from "./SocialAuth";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { signInSchema, type SignInFormValues } from "@/schemas/signin.schema";

export default function SignInForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onTouched",
  });

  async function mySubmit(data: SignInFormValues) {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Signed in successfully! Redirecting...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
      return;
    }

    const errorMessage =
      res?.error === "CredentialsSignin"
        ? "Invalid email or password."
        : res?.error || "Invalid email or password.";

    toast.error(errorMessage);

    setError("root", {
      type: "server",
      message: errorMessage,
    });
  }

  return (
    <>
      <SocialAuth variant="login" />

      <div className="relative flex items-center justify-center">
        <span
          className="absolute inset-x-0 top-1/2 h-px bg-[#e5e7eb]"
          aria-hidden
        />
        <span className="relative bg-white px-4 text-sm leading-5 font-medium text-[#6a7282]">
          OR CONTINUE WITH EMAIL
        </span>
      </div>

      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-6">
        {/* Email Controller */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="emailInput">Email Address*</FieldLabel>
              <Input
                {...field}
                id="emailInput"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="email"
                className="h-11"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password Controller */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="passwordInput">Password*</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm leading-5 font-medium text-brand transition-colors hover:text-[#15803d]"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                {...field}
                id="passwordInput"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-11"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Remember me Controller */}
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-3 text-sm leading-5 font-medium text-[#364153]">
              <input
                type="checkbox"
                checked={field.value || false}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                className="h-4 w-4 cursor-pointer rounded border-[#767676] accent-brand"
              />
              Keep me signed in
            </label>
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-4 text-base leading-6 font-semibold text-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#15803d] disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? (
            <i className="fa-solid fa-circle-notch animate-spin text-[16px]" aria-hidden />
          ) : (
            <i className="fa-solid fa-arrow-right-to-bracket text-[16px]" aria-hidden />
          )}
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
}
