"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export const Progress = React.forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>>(({ className, value, max = 100, ...props }, ref) => {
  const percentage = typeof value === "number" && max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : null;
  return <ProgressPrimitive.Root ref={ref} className={cn("relative h-5 w-full overflow-hidden border-2 border-border bg-muted", className)} value={value} max={max} {...props}><ProgressPrimitive.Indicator className={cn("h-full bg-primary transition-[width] motion-reduce:transition-none", percentage === null && "w-1/3 animate-pulse motion-reduce:animate-none")} style={percentage === null ? undefined : { width: `${percentage}%` }} /></ProgressPrimitive.Root>;
});
Progress.displayName = "Progress";
