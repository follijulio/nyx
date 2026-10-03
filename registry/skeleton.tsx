import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} aria-hidden="true" className={cn("animate-pulse border-2 border-border bg-muted motion-reduce:animate-none", className)} {...props} />,
);
Skeleton.displayName = "Skeleton";
