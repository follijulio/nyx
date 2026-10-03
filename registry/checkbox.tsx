"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn("peer size-5 shrink-0 border-2 border-border bg-card shadow-nyx-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary", className)} {...props}>
    <CheckboxPrimitive.Indicator className="group grid place-items-center text-foreground"><Check aria-hidden="true" className="size-4 group-data-[state=indeterminate]:hidden" /><Minus aria-hidden="true" className="hidden size-4 group-data-[state=indeterminate]:block" /></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
