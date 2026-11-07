import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import type { PageLoaderProps } from "@/types";

export type { PageLoaderProps };

export function PageLoader({
  color = "green",
  size = "lg",
  title,
  subtitle,
  fullScreen = true,
  className,
  ...props
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-[#fcfcfd] transition-opacity duration-300",
        fullScreen ? "min-h-[75vh] w-full py-16" : "w-full py-12",
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Animated Custom Spinner */}
        <div className="p-3 bg-white rounded-3xl shadow-xs border border-gray-100 flex items-center justify-center">
          <Spinner color={color} size={size} />
        </div>

        {/* Text Details */}
        {(title || subtitle) && (
          <div className="flex flex-col items-center text-center mt-2 animate-pulse">
            {title && (
              <h3 className="font-exo font-bold text-base sm:text-lg text-[#101828]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-exo text-xs sm:text-sm text-[#6A7282] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageLoader;
