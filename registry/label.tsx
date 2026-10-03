import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cn("text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className)} {...props} />,
);
Label.displayName = "Label";
