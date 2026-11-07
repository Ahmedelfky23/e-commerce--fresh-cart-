"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      toastOptions={{
        classNames: {
          toast:
            "group toast flex items-center gap-3 w-full p-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] border font-medium text-sm transition-all duration-200",
          description: "text-xs font-normal opacity-90",
          actionButton:
            "rounded-lg px-3 py-1.5 text-xs font-semibold bg-[#16a34a] text-white hover:bg-[#15803d]",
          cancelButton:
            "rounded-lg px-3 py-1.5 text-xs font-medium bg-[#f3f4f6] text-[#364153] hover:bg-[#e5e7eb]",
          success:
            "!bg-[#f0fdf4] !border-[#bbf7d0] !text-[#15803d] [&_[data-icon]]:text-[#16a34a]",
          error:
            "!bg-[#fef2f2] !border-[#fecaca] !text-[#b91c1c] [&_[data-icon]]:text-[#ef4444]",
          warning:
            "!bg-[#fefce8] !border-[#fef08a] !text-[#854d0e] [&_[data-icon]]:text-[#eab308]",
          info:
            "!bg-[#f0f9ff] !border-[#bae6fd] !text-[#0369a1] [&_[data-icon]]:text-[#0ea5e9]",
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 shrink-0 text-[#16a34a]" />,
        error: <AlertCircle className="h-5 w-5 shrink-0 text-[#ef4444]" />,
        warning: <AlertTriangle className="h-5 w-5 shrink-0 text-[#eab308]" />,
        info: <Info className="h-5 w-5 shrink-0 text-[#0ea5e9]" />,
        loading: <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#16a34a]" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
