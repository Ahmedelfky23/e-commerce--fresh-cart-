import * as React from "react";
import { cn } from "@/lib/utils";
import type { SpinnerColor, SpinnerSize, SpinnerProps } from "@/types";

export type { SpinnerColor, SpinnerSize, SpinnerProps };

const colorStyles: Record<SpinnerColor, { border: string; glow: string; text: string }> = {
  green: {
    border: "border-[#16A34A] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(22,163,74,0.35)]",
    text: "text-[#16A34A]",
  },
  purple: {
    border: "border-[#7F22FE] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(127,34,254,0.35)]",
    text: "text-[#7F22FE]",
  },
  emerald: {
    border: "border-[#059669] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(5,150,105,0.35)]",
    text: "text-[#059669]",
  },
  blue: {
    border: "border-[#2563EB] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(37,99,235,0.35)]",
    text: "text-[#2563EB]",
  },
  rose: {
    border: "border-[#E11D48] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.35)]",
    text: "text-[#E11D48]",
  },
  amber: {
    border: "border-[#D97706] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(217,119,6,0.35)]",
    text: "text-[#D97706]",
  },
  indigo: {
    border: "border-[#4F46E5] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(79,70,229,0.35)]",
    text: "text-[#4F46E5]",
  },
  slate: {
    border: "border-[#475569] border-t-transparent",
    glow: "shadow-[0_0_15px_rgba(71,85,105,0.35)]",
    text: "text-[#475569]",
  },
};

const sizeStyles: Record<SpinnerSize, { outer: string; inner: string; border: string }> = {
  sm: { outer: "w-6 h-6", inner: "w-3 h-3", border: "border-2" },
  md: { outer: "w-10 h-10", inner: "w-5 h-5", border: "border-3" },
  lg: { outer: "w-14 h-14", inner: "w-7 h-7", border: "border-4" },
  xl: { outer: "w-18 h-18", inner: "w-9 h-9", border: "border-4" },
};

export function Spinner({
  color = "green",
  size = "md",
  className,
  ...props
}: SpinnerProps) {
  const chosenColor = colorStyles[color] || colorStyles.green;
  const chosenSize = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      {/* Outer Glow & Background Track */}
      <div
        className={cn(
          "rounded-full border-gray-100",
          chosenSize.outer,
          chosenSize.border
        )}
      />

      {/* Main Spinning Head */}
      <div
        className={cn(
          "absolute rounded-full animate-spin transition-all",
          chosenSize.outer,
          chosenSize.border,
          chosenColor.border,
          chosenColor.glow
        )}
      />

      {/* Inner Soft Pulsing Accent */}
      <div
        className={cn(
          "absolute rounded-full opacity-40 animate-ping",
          chosenSize.inner,
          chosenColor.text
        )}
        style={{
          backgroundColor: "currentColor",
          animationDuration: "1.5s",
        }}
      />
    </div>
  );
}

export default Spinner;
