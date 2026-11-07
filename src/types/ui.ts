import type * as React from "react";

export type SpinnerColor =
  | "green"
  | "purple"
  | "emerald"
  | "blue"
  | "rose"
  | "amber"
  | "indigo"
  | "slate";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: SpinnerColor;
  size?: SpinnerSize;
  className?: string;
}

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: SpinnerColor;
  size?: SpinnerSize;
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
  className?: string;
}

export type { BadgeProps } from "@/components/ui/badge";
