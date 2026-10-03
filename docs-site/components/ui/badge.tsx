import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" | "outline" | "destructive" };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center gap-1 border-2 border-border px-2 py-0.5 text-xs font-bold", { "bg-primary text-primary-foreground": variant === "default", "bg-secondary text-secondary-foreground": variant === "secondary", "bg-transparent text-foreground": variant === "outline", "bg-destructive text-destructive-foreground": variant === "destructive" }, className)} {...props} />
  ),
);
Badge.displayName = "Badge";
