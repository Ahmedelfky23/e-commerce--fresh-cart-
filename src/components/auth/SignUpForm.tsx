"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { signUpSchema, type SignUpFormValues } from "@/schemas/signup.schema";
import { UserSignup } from "@/actions/auth.actions";

function getStrength(password: string = "") {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;

  const levels = [
    { label: "Weak", color: "#fb2c36", width: "25%" },
    { label: "Weak", color: "#fb2c36", width: "25%" },
    { label: "Fair", color: "#fdc700", width: "50%" },
    { label: "Good", color: "#16a34a", width: "75%" },
    { label: "Strong", color: "#15803d", width: "100%" },
  ];

  return levels[Math.min(score, 4)];
}

export default function SignUpForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    mode: "onTouched",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch("password");
  const strength = getStrength(passwordValue);

  async function mySubmit(data: SignUpFormValues) {
    const result = await UserSignup(data);

    if (result?.message === "success" || result?.token) {
      toast.success("Account created successfully! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/signin");
      }, 1200);
      return;
    }

    const errorMessage = result?.message || "Failed to create account.";

    if (
      errorMessage.toLowerCase().includes("already exists") ||
      errorMessage.toLowerCase().includes("account already")
    ) {
      toast.error("Account already exists! Please sign in or use another email.");
    } else {
      toast.error(errorMessage);
    }

    setError("root", {
      type: "server",
      message: errorMessage,
    });
  }

  return (
    <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-6">
      {/* Name Controller */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="nameInput">Name*</FieldLabel>
            <Input
              {...field}
              id="nameInput"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Name..."
              autoComplete="name"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email Controller */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="emailInput">Email*</FieldLabel>
            <Input
              {...field}
              id="emailInput"
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Your Email..."
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
            <FieldLabel htmlFor="passwordInput">Password*</FieldLabel>
            <Input
              {...field}
              id="passwordInput"
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Create a strong password..."
              autoComplete="new-password"
              className="h-11"
            />

            <div className="mt-1 flex items-center gap-2">
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]">
                <span
                  className="block h-full rounded-full transition-all"
                  style={{
                    width: passwordValue ? strength.width : "0%",
                    backgroundColor: strength.color,
                  }}
                />
              </span>
              <span
                className="w-11 pr-1 text-right text-xs leading-5 font-medium"
                style={{
                  color: passwordValue ? strength.color : "#364153",
                }}
              >
                {passwordValue ? strength.label : "Weak"}
              </span>
            </div>

            <p className="text-xs leading-4 font-medium text-[#6a7282]">
              Must be at least 8 characters with numbers and symbols
            </p>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Confirm Password Controller */}
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="confirmInput">Confirm Password*</FieldLabel>
            <Input
              {...field}
              id="confirmInput"
              type="password"
              aria-invalid={fieldState.invalid}
              placeholder="Confirm your password..."
              autoComplete="new-password"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Phone Number Controller */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phoneInput">Phone Number*</FieldLabel>
            <Input
              {...field}
              id="phoneInput"
              type="tel"
              inputMode="tel"
              aria-invalid={fieldState.invalid}
              placeholder="01012345678"
              autoComplete="tel"
              className="h-11"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Terms and conditions Controller */}
      <Controller
        name="terms"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                className="h-4 w-4 shrink-0 cursor-pointer rounded accent-brand"
              />
              <span className="text-base leading-6 font-medium text-[#364153]">
                I agree to the{" "}
                <Link
                  href="/terms"
                  onClick={(event) => event.stopPropagation()}
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  onClick={(event) => event.stopPropagation()}
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </span>
            </label>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-4 text-base leading-6 font-semibold text-white transition-colors hover:bg-[#15803d] disabled:cursor-wait disabled:opacity-80"
      >
        {isSubmitting ? (
          <i
            className="fa-solid fa-circle-notch animate-spin text-[14px]"
            aria-hidden
          />
        ) : (
          <i className="fa-solid fa-user-plus text-[14px]" aria-hidden />
        )}
        {isSubmitting ? "Creating Account..." : "Create My Account"}
      </button>
    </form>
  );
}
