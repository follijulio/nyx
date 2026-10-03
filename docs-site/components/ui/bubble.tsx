import * as React from "react";
import { cn } from "@/lib/utils";

export type BubbleProps = React.HTMLAttributes<HTMLDivElement> & { variant?: "incoming" | "outgoing" };
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, variant = "incoming", ...props }, ref) => <div ref={ref} data-variant={variant} className={cn("relative max-w-[85%] border-2 border-border px-4 py-3 text-sm shadow-nyx-sm", variant === "outgoing" ? "ms-auto bg-primary text-primary-foreground" : "me-auto bg-card text-card-foreground", className)} {...props} />,
);
Bubble.displayName = "Bubble";
export const BubbleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("whitespace-pre-wrap break-words leading-relaxed", className)} {...props} />,
);
BubbleContent.displayName = "BubbleContent";
export const BubbleFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-2 flex items-center justify-end gap-2 text-xs opacity-70", className)} {...props} />,
);
BubbleFooter.displayName = "BubbleFooter";
