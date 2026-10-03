"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;
export const SheetOverlay = React.forwardRef<React.ComponentRef<typeof SheetPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(({ className, ...props }, ref) => <SheetPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/60", className)} {...props} />);
SheetOverlay.displayName = "SheetOverlay";

const sideStyles = {
  top: "inset-x-0 top-0 max-h-[90dvh] border-b-2",
  bottom: "inset-x-0 bottom-0 max-h-[90dvh] border-t-2",
  left: "inset-y-0 left-0 h-dvh w-[min(24rem,90vw)] border-r-2",
  right: "inset-y-0 right-0 h-dvh w-[min(24rem,90vw)] border-l-2",
};
export type SheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { side?: keyof typeof sideStyles; showCloseButton?: boolean };
export const SheetContent = React.forwardRef<React.ComponentRef<typeof SheetPrimitive.Content>, SheetContentProps>(({ className, children, side = "right", showCloseButton = true, ...props }, ref) => <SheetPortal><SheetOverlay /><SheetPrimitive.Content ref={ref} data-side={side} className={cn("fixed z-50 flex flex-col gap-4 overflow-y-auto border-border bg-card p-6 text-foreground shadow-nyx outline-none", sideStyles[side], className)} {...props}>{children}{showCloseButton && <SheetPrimitive.Close aria-label="Fechar" className="absolute right-4 top-4 grid size-8 place-items-center border-2 border-border bg-card shadow-nyx-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X aria-hidden="true" className="size-4" /></SheetPrimitive.Close>}</SheetPrimitive.Content></SheetPortal>);
SheetContent.displayName = "SheetContent";
export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex flex-col gap-2 border-b-2 border-border pb-4 pr-10", className)} {...props} />; }
export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end", className)} {...props} />; }
export const SheetTitle = React.forwardRef<React.ComponentRef<typeof SheetPrimitive.Title>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(({ className, ...props }, ref) => <SheetPrimitive.Title ref={ref} className={cn("text-xl font-black", className)} {...props} />);
SheetTitle.displayName = "SheetTitle";
export const SheetDescription = React.forwardRef<React.ComponentRef<typeof SheetPrimitive.Description>, React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>>(({ className, ...props }, ref) => <SheetPrimitive.Description ref={ref} className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />);
SheetDescription.displayName = "SheetDescription";
