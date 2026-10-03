"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const contentStyles = "z-50 min-w-40 max-w-[calc(100vw-2rem)] overflow-y-auto border-2 border-border bg-card p-1 text-foreground shadow-nyx outline-none";
const itemStyles = "relative flex min-h-9 select-none items-center gap-2 px-2 py-1.5 text-sm outline-none focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

export const DropdownMenuContent = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>(({ className, sideOffset = 6, ...props }, ref) => <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn(contentStyles, "max-h-[var(--radix-dropdown-menu-content-available-height)]", className)} {...props} /></DropdownMenuPrimitive.Portal>);
DropdownMenuContent.displayName = "DropdownMenuContent";
export const DropdownMenuSubTrigger = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }>(({ className, inset, children, ...props }, ref) => <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(itemStyles, "data-[state=open]:bg-primary", inset && "pl-8", className)} {...props}>{children}<ChevronRight aria-hidden="true" className="ml-auto size-4" /></DropdownMenuPrimitive.SubTrigger>);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
export const DropdownMenuSubContent = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.SubContent ref={ref} className={cn(contentStyles, className)} {...props} /></DropdownMenuPrimitive.Portal>);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
export const DropdownMenuItem = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Item>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }>(({ className, inset, variant = "default", ...props }, ref) => <DropdownMenuPrimitive.Item ref={ref} className={cn(itemStyles, inset && "pl-8", variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground", className)} {...props} />);
DropdownMenuItem.displayName = "DropdownMenuItem";
export const DropdownMenuCheckboxItem = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>>(({ className, children, ...props }, ref) => <DropdownMenuPrimitive.CheckboxItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Check aria-hidden="true" className="size-4" /></DropdownMenuPrimitive.ItemIndicator></span>{children}</DropdownMenuPrimitive.CheckboxItem>);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
export const DropdownMenuRadioItem = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>>(({ className, children, ...props }, ref) => <DropdownMenuPrimitive.RadioItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><DropdownMenuPrimitive.ItemIndicator><Circle aria-hidden="true" className="size-2 fill-current" /></DropdownMenuPrimitive.ItemIndicator></span>{children}</DropdownMenuPrimitive.RadioItem>);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
export const DropdownMenuLabel = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }>(({ className, inset, ...props }, ref) => <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-black uppercase tracking-wide", inset && "pl-8", className)} {...props} />);
DropdownMenuLabel.displayName = "DropdownMenuLabel";
export const DropdownMenuSeparator = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-0.5 bg-border", className)} {...props} />);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("ml-auto text-xs tracking-wider opacity-60", className)} {...props} />; }

