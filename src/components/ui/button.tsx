"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-pill font-medium tracking-tight whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color,background-position] duration-500 ease-smooth active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(110deg,var(--color-brand-700)_0%,var(--color-brand-500)_48%,var(--color-brand-600)_100%)] bg-[length:220%_100%] bg-[position:0%_0%] text-white shadow-brand hover:bg-[position:100%_0%] hover:shadow-brand-lg",
  secondary:
    "border border-line bg-surface text-ink shadow-xs hover:border-line-strong hover:shadow-sm",
  ghost: "text-ink-muted hover:bg-canvas-soft hover:text-ink",
};

const sizeMap: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variantMap[variant], sizeMap[size], className);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}
