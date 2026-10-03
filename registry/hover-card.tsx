"use client";
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/src/lib/utils";

export const HoverCard = HoverCardPrimitive.Root;
export const HoverCardTrigger = HoverCardPrimitive.Trigger;
export function HoverCardContent({ className, align = "center", sideOffset = 8, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return <HoverCardPrimitive.Portal><HoverCardPrimitive.Content align={align} sideOffset={sideOffset} className={cn("z-50 w-72 border-[3px] border-black bg-[var(--nyx-yellow)] p-4 text-sm text-black shadow-[5px_5px_0_#111] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className)} {...props} /></HoverCardPrimitive.Portal>;
}
