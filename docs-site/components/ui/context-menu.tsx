"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
const contentStyles = "z-50 min-w-40 max-w-[calc(100vw-2rem)] overflow-y-auto border-2 border-border bg-card p-1 text-foreground shadow-nyx outline-none";
const itemStyles = "relative flex min-h-9 select-none items-center gap-2 px-2 py-1.5 text-sm outline-none focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

export const ContextMenuContent = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>>(({ className, ...props }, ref) => <ContextMenuPrimitive.Portal><ContextMenuPrimitive.Content ref={ref} className={cn(contentStyles, "max-h-[var(--radix-context-menu-content-available-height)]", className)} {...props} /></ContextMenuPrimitive.Portal>);
ContextMenuContent.displayName = "ContextMenuContent";
export const ContextMenuSubTrigger = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }>(({ className, inset, children, ...props }, ref) => <ContextMenuPrimitive.SubTrigger ref={ref} className={cn(itemStyles, "data-[state=open]:bg-primary", inset && "pl-8", className)} {...props}>{children}<ChevronRight aria-hidden="true" className="ml-auto size-4" /></ContextMenuPrimitive.SubTrigger>);
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";
export const ContextMenuSubContent = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>>(({ className, ...props }, ref) => <ContextMenuPrimitive.Portal><ContextMenuPrimitive.SubContent ref={ref} className={cn(contentStyles, className)} {...props} /></ContextMenuPrimitive.Portal>);
ContextMenuSubContent.displayName = "ContextMenuSubContent";
export const ContextMenuItem = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }>(({ className, inset, variant = "default", ...props }, ref) => <ContextMenuPrimitive.Item ref={ref} className={cn(itemStyles, inset && "pl-8", variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground", className)} {...props} />);
ContextMenuItem.displayName = "ContextMenuItem";
export const ContextMenuCheckboxItem = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>>(({ className, children, ...props }, ref) => <ContextMenuPrimitive.CheckboxItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Check aria-hidden="true" className="size-4" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.CheckboxItem>);
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";
export const ContextMenuRadioItem = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>>(({ className, children, ...props }, ref) => <ContextMenuPrimitive.RadioItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><ContextMenuPrimitive.ItemIndicator><Circle aria-hidden="true" className="size-2 fill-current" /></ContextMenuPrimitive.ItemIndicator></span>{children}</ContextMenuPrimitive.RadioItem>);
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";
export const ContextMenuLabel = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }>(({ className, inset, ...props }, ref) => <ContextMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-black uppercase tracking-wide", inset && "pl-8", className)} {...props} />);
ContextMenuLabel.displayName = "ContextMenuLabel";
export const ContextMenuSeparator = React.forwardRef<React.ComponentRef<typeof ContextMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>>(({ className, ...props }, ref) => <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-0.5 bg-border", className)} {...props} />);
ContextMenuSeparator.displayName = "ContextMenuSeparator";
export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("ml-auto text-xs tracking-wider opacity-60", className)} {...props} />; }

