"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const Menubar = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>>(({ className, ...props }, ref) => <MenubarPrimitive.Root ref={ref} className={cn("flex flex-wrap gap-1 border-2 border-border bg-card p-1 shadow-nyx-sm", className)} {...props} />);
Menubar.displayName = "Menubar";
export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarTrigger = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>>(({ className, ...props }, ref) => <MenubarPrimitive.Trigger ref={ref} className={cn("flex min-h-9 select-none items-center px-3 py-1.5 text-sm font-bold outline-none focus:bg-muted data-[state=open]:bg-primary", className)} {...props} />);
MenubarTrigger.displayName = "MenubarTrigger";
export const MenubarGroup = MenubarPrimitive.Group;
export const MenubarPortal = MenubarPrimitive.Portal;
export const MenubarSub = MenubarPrimitive.Sub;
export const MenubarRadioGroup = MenubarPrimitive.RadioGroup;
const contentStyles = "z-50 min-w-40 max-w-[calc(100vw-2rem)] overflow-y-auto border-2 border-border bg-card p-1 text-foreground shadow-nyx outline-none";
const itemStyles = "relative flex min-h-9 select-none items-center gap-2 px-2 py-1.5 text-sm outline-none focus:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

export const MenubarContent = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Content>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>>(({ className, align = "start", sideOffset = 6, ...props }, ref) => <MenubarPrimitive.Portal><MenubarPrimitive.Content ref={ref} align={align} sideOffset={sideOffset} className={cn(contentStyles, "max-h-[var(--radix-menubar-content-available-height)]", className)} {...props} /></MenubarPrimitive.Portal>);
MenubarContent.displayName = "MenubarContent";
export const MenubarSubTrigger = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }>(({ className, inset, children, ...props }, ref) => <MenubarPrimitive.SubTrigger ref={ref} className={cn(itemStyles, "data-[state=open]:bg-primary", inset && "pl-8", className)} {...props}>{children}<ChevronRight aria-hidden="true" className="ml-auto size-4" /></MenubarPrimitive.SubTrigger>);
MenubarSubTrigger.displayName = "MenubarSubTrigger";
export const MenubarSubContent = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>>(({ className, ...props }, ref) => <MenubarPrimitive.Portal><MenubarPrimitive.SubContent ref={ref} className={cn(contentStyles, className)} {...props} /></MenubarPrimitive.Portal>);
MenubarSubContent.displayName = "MenubarSubContent";
export const MenubarItem = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Item>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean; variant?: "default" | "destructive" }>(({ className, inset, variant = "default", ...props }, ref) => <MenubarPrimitive.Item ref={ref} className={cn(itemStyles, inset && "pl-8", variant === "destructive" && "text-destructive focus:bg-destructive focus:text-destructive-foreground", className)} {...props} />);
MenubarItem.displayName = "MenubarItem";
export const MenubarCheckboxItem = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>>(({ className, children, ...props }, ref) => <MenubarPrimitive.CheckboxItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><MenubarPrimitive.ItemIndicator><Check aria-hidden="true" className="size-4" /></MenubarPrimitive.ItemIndicator></span>{children}</MenubarPrimitive.CheckboxItem>);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";
export const MenubarRadioItem = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>>(({ className, children, ...props }, ref) => <MenubarPrimitive.RadioItem ref={ref} className={cn(itemStyles, "pl-8", className)} {...props}><span className="absolute left-2 flex size-4 items-center justify-center"><MenubarPrimitive.ItemIndicator><Circle aria-hidden="true" className="size-2 fill-current" /></MenubarPrimitive.ItemIndicator></span>{children}</MenubarPrimitive.RadioItem>);
MenubarRadioItem.displayName = "MenubarRadioItem";
export const MenubarLabel = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Label>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }>(({ className, inset, ...props }, ref) => <MenubarPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs font-black uppercase tracking-wide", inset && "pl-8", className)} {...props} />);
MenubarLabel.displayName = "MenubarLabel";
export const MenubarSeparator = React.forwardRef<React.ComponentRef<typeof MenubarPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>>(({ className, ...props }, ref) => <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-0.5 bg-border", className)} {...props} />);
MenubarSeparator.displayName = "MenubarSeparator";
export function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("ml-auto text-xs tracking-wider opacity-60", className)} {...props} />; }

