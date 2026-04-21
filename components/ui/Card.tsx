import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "soft";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  className,
  variant = "default",
  padding = "md",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-surface border border-border shadow-sm",
    soft: "bg-light border-transparent",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-5 md:p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-card overflow-hidden transition-all",
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    />
  );
}
