"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, type SheetContentProps } from "./sheet";

export const Drawer = Sheet;
export const DrawerTrigger = SheetTrigger;
export const DrawerClose = SheetClose;
export const DrawerPortal = SheetPortal;
export const DrawerOverlay = SheetOverlay;
export const DrawerHeader = SheetHeader;
export const DrawerFooter = SheetFooter;
export const DrawerTitle = SheetTitle;
export const DrawerDescription = SheetDescription;
export const DrawerContent = React.forwardRef<React.ComponentRef<typeof SheetContent>, SheetContentProps>(({ className, side = "bottom", children, ...props }, ref) => <SheetContent ref={ref} side={side} className={cn("mx-auto max-h-[85dvh]", (side === "top" || side === "bottom") && "w-full max-w-3xl border-x-2", className)} {...props}>{children}</SheetContent>);
DrawerContent.displayName = "DrawerContent";
