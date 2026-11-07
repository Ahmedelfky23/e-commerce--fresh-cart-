"use client";

import { useState } from "react";
import type { PasswordFieldProps } from "@/types";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  required = true,
  minLength,
  labelAction,
  hint,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm leading-5 font-semibold text-[#364153]"
        >
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        <i
          className="fa-solid fa-lock absolute top-1/2 left-4 -translate-y-1/2 text-[15px] text-[#99a1af]"
          aria-hidden
        />
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-13 w-full rounded-xl border-2 border-[#e5e7eb] pr-12 pl-12 text-base leading-6 font-medium text-[#364153] outline-none transition-colors placeholder:text-[#99a1af] focus:border-brand"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-4 flex -translate-y-1/2 cursor-pointer items-center justify-center text-[#99a1af] transition-colors hover:text-[#4a5565]"
        >
          <i
            className={`fa-solid ${visible ? "fa-eye-slash" : "fa-eye"} text-[15px]`}
            aria-hidden
          />
        </button>
      </div>

      {hint ? (
        <p className="text-xs leading-4 font-medium text-[#6a7282]">{hint}</p>
      ) : null}
    </div>
  );
}
