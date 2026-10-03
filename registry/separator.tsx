import * as React from "react";
import { cn } from "@/src/lib/utils";

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical"; decorative?: boolean };
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", decorative = true, className, ...props }, ref) => <div ref={ref} role={decorative ? "none" : "separator"} aria-orientation={decorative ? undefined : orientation} className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5", className)} {...props} />,
);
Separator.displayName = "Separator";
