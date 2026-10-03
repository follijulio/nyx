import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <kbd ref={ref} className={cn("inline-flex min-h-6 min-w-6 items-center justify-center border-2 border-border bg-muted px-1.5 font-mono text-xs font-bold shadow-nyx-sm", className)} {...props} />,
);
Kbd.displayName = "Kbd";

export const KbdGroup = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn("inline-flex items-center gap-1", className)} {...props} />,
);
KbdGroup.displayName = "KbdGroup";
