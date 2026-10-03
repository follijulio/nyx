"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/src/lib/utils";

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { thumbLabels?: string[] };
export const Slider = React.forwardRef<React.ComponentRef<typeof SliderPrimitive.Root>, SliderProps>(({ className, value, defaultValue, min = 0, thumbLabels, ...props }, ref) => {
  const values = value ?? defaultValue ?? [min];
  return <SliderPrimitive.Root ref={ref} value={value} defaultValue={defaultValue} min={min} className={cn("relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50", className)} {...props}><SliderPrimitive.Track className="relative grow overflow-hidden border-2 border-border bg-muted data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"><SliderPrimitive.Range className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" /></SliderPrimitive.Track>{values.map((_, index) => <SliderPrimitive.Thumb key={index} aria-label={thumbLabels?.[index] ?? `Valor ${index + 1}`} className="block size-5 border-2 border-border bg-card shadow-nyx-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none" />)}</SliderPrimitive.Root>;
});
Slider.displayName = "Slider";
