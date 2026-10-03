"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(({ className, children, ...props }, ref) => <SelectPrimitive.Trigger ref={ref} className={cn("flex min-h-10 w-full items-center justify-between gap-2 border-2 border-border bg-card px-3 py-2 text-sm font-bold shadow-nyx-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:truncate", className)} {...props}>{children}<SelectPrimitive.Icon asChild><ChevronDown aria-hidden="true" className="size-4 shrink-0" /></SelectPrimitive.Icon></SelectPrimitive.Trigger>);
SelectTrigger.displayName = "SelectTrigger";
export const SelectScrollUpButton = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>>(({ className, ...props }, ref) => <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}><ChevronUp aria-hidden="true" className="size-4" /></SelectPrimitive.ScrollUpButton>);
SelectScrollUpButton.displayName = "SelectScrollUpButton";
export const SelectScrollDownButton = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>>(({ className, ...props }, ref) => <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}><ChevronDown aria-hidden="true" className="size-4" /></SelectPrimitive.ScrollDownButton>);
SelectScrollDownButton.displayName = "SelectScrollDownButton";
export const SelectContent = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(({ className, children, position = "popper", sideOffset = 6, ...props }, ref) => <SelectPrimitive.Portal><SelectPrimitive.Content ref={ref} position={position} sideOffset={sideOffset} className={cn("relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-32 overflow-hidden border-2 border-border bg-card text-foreground shadow-nyx", position === "popper" && "min-w-[var(--radix-select-trigger-width)]", className)} {...props}><SelectScrollUpButton /><SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport><SelectScrollDownButton /></SelectPrimitive.Content></SelectPrimitive.Portal>);
SelectContent.displayName = "SelectContent";
export const SelectLabel = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Label>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>(({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-black uppercase tracking-wide", className)} {...props} />);
SelectLabel.displayName = "SelectLabel";
export const SelectItem = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(({ className, children, ...props }, ref) => <SelectPrimitive.Item ref={ref} className={cn("relative flex min-h-9 w-full cursor-default select-none items-center py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}><span className="absolute right-2 flex size-4 items-center justify-center"><SelectPrimitive.ItemIndicator><Check aria-hidden="true" className="size-4" /></SelectPrimitive.ItemIndicator></span><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText></SelectPrimitive.Item>);
SelectItem.displayName = "SelectItem";
export const SelectSeparator = React.forwardRef<React.ComponentRef<typeof SelectPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>>(({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-0.5 bg-border", className)} {...props} />);
SelectSeparator.displayName = "SelectSeparator";
