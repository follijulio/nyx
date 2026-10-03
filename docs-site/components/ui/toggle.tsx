"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const toggleVariants = cva("inline-flex items-center justify-center gap-2 border-2 font-bold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-border data-[state=on]:bg-primary [&_svg]:size-4", {
  variants: { variant: { default: "border-transparent bg-transparent", outline: "border-border bg-card shadow-nyx-sm" }, size: { default: "h-10 min-w-10 px-3", sm: "h-9 min-w-9 px-2.5 text-xs", lg: "h-12 min-w-12 px-4" } }, defaultVariants: { variant: "default", size: "default" },
});
export type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>;
export const Toggle = React.forwardRef<React.ComponentRef<typeof TogglePrimitive.Root>, ToggleProps>(({ className, variant, size, ...props }, ref) => <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size }), className)} {...props} />);
Toggle.displayName = "Toggle";
