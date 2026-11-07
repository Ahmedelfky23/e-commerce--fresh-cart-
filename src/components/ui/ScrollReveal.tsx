"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in seconds (e.g. 0.95)
  direction?: "up" | "down" | "left" | "right" | "fade";
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.95,
  direction = "up",
  threshold = 0.08,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Use IntersectionObserver to detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Determine initial transform based on direction
  const getTransform = () => {
    if (isVisible) return "none";
    switch (direction) {
      case "up":
        return "translateY(32px)";
      case "down":
        return "translateY(-32px)";
      case "left":
        return "translateX(-32px)";
      case "right":
        return "translateX(32px)";
      case "fade":
        return "none";
      default:
        return "translateY(32px)";
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

