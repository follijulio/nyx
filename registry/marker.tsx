import * as React from "react";
import { cn } from "@/src/lib/utils";

export type MarkerProps = React.HTMLAttributes<HTMLElement> & { variant?: "primary" | "secondary" | "accent" };
export const Marker = React.forwardRef<HTMLElement, MarkerProps>(
  ({ className, variant = "primary", ...props }, ref) => <mark ref={ref} className={cn("box-decoration-clone px-1 font-semibold text-foreground", { "bg-primary": variant === "primary", "bg-secondary": variant === "secondary", "bg-accent": variant === "accent" }, className)} {...props} />,
);
Marker.displayName = "Marker";
