"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("border-2 border-border bg-card [&+&]:border-t-0", className)} {...props} />);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger ref={ref} className={cn("group flex flex-1 items-center justify-between gap-4 px-4 py-4 text-left font-bold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props}>
      {children}<ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform motion-reduce:transition-none group-data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<React.ComponentRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(({ className, children, ...props }, ref) => <AccordionPrimitive.Content ref={ref} className="overflow-hidden text-sm" {...props}><div className={cn("px-4 pb-4 leading-relaxed", className)}>{children}</div></AccordionPrimitive.Content>);
AccordionContent.displayName = "AccordionContent";
