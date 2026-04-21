import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  as?: any;
  href?: string;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  as: Component = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white border-primary hover:bg-primary-dark",
    secondary: "bg-dark text-white border-dark hover:bg-dark-mid",
    ghost: "bg-transparent text-dark border-dark hover:bg-light-separator",
    accent: "bg-teal text-white border-teal hover:bg-teal-dark",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-[18px] py-[12px] text-label",
    lg: "px-6 py-3 text-lead",
  };

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center rounded-tight border font-bold transition-all focus:outline-none focus:ring-2 focus:ring-teal/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
