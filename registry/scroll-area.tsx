"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/src/lib/utils";

export const ScrollArea = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.Root>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>>(({ className, children, ...props }, ref) => <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}><ScrollAreaPrimitive.Viewport className="size-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">{children}</ScrollAreaPrimitive.Viewport><ScrollBar /><ScrollBar orientation="horizontal" /><ScrollAreaPrimitive.Corner className="bg-border" /></ScrollAreaPrimitive.Root>);
ScrollArea.displayName = "ScrollArea";
export const ScrollBar = React.forwardRef<React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>(({ className, orientation = "vertical", ...props }, ref) => <ScrollAreaPrimitive.ScrollAreaScrollbar ref={ref} orientation={orientation} className={cn("flex touch-none select-none bg-muted p-0.5", orientation === "vertical" ? "h-full w-3 border-l-2 border-border" : "h-3 flex-col border-t-2 border-border", className)} {...props}><ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 bg-foreground" /></ScrollAreaPrimitive.ScrollAreaScrollbar>);
ScrollBar.displayName = "ScrollBar";
