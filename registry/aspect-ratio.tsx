import * as React from "react";
import { cn } from "@/src/lib/utils";

export type AspectRatioProps = React.HTMLAttributes<HTMLDivElement> & { ratio?: number };

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, style, ...props }, ref) => (
    <div ref={ref} className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio: ratio > 0 ? ratio : 1, ...style }} {...props} />
  ),
);
AspectRatio.displayName = "AspectRatio";
