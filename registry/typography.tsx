import * as React from "react";
import { cn } from "@/src/lib/utils";

export type TypographyProps = React.HTMLAttributes<HTMLElement> & { variant?: "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted" | "blockquote" | "code"; };
const styles = {
  h1: "text-4xl font-black tracking-tight sm:text-5xl",
  h2: "border-b-2 border-border pb-2 text-3xl font-black tracking-tight",
  h3: "text-2xl font-black tracking-tight",
  h4: "text-xl font-black",
  p: "text-base leading-7 [&:not(:first-child)]:mt-4",
  lead: "text-xl leading-relaxed text-muted-foreground",
  large: "text-lg font-bold",
  small: "text-sm font-semibold leading-none",
  muted: "text-sm text-muted-foreground",
  blockquote: "border-s-4 border-border bg-muted py-2 ps-4 italic",
  code: "border-2 border-border bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold",
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "p", className, ...props }, ref) => {
    const tag = variant === "lead" || variant === "muted" ? "p" : variant === "large" ? "div" : variant;
    return React.createElement(tag, { ref, className: cn(styles[variant], className), ...props });
  },
);
Typography.displayName = "Typography";
