"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(({ className, label = "Notificações ({hotkey})", ...props }, ref) => <ToastPrimitive.Viewport ref={ref} label={label} className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full list-none flex-col gap-3 p-4 outline-none sm:max-w-96", className)} {...props} />);
ToastViewport.displayName = "ToastViewport";
export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & { variant?: "default" | "destructive" };
export const Toast = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(({ className, variant = "default", ...props }, ref) => <ToastPrimitive.Root ref={ref} className={cn("group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden border-2 border-border bg-card p-4 pr-9 text-foreground shadow-nyx data-[state=closed]:hidden data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]", variant === "destructive" && "bg-destructive text-destructive-foreground", className)} {...props} />);
Toast.displayName = "Toast";
export const ToastAction = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Action>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>>(({ className, ...props }, ref) => <ToastPrimitive.Action ref={ref} className={cn("inline-flex min-h-8 shrink-0 items-center justify-center border-2 border-border bg-card px-3 text-xs font-bold text-foreground shadow-nyx-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props} />);
ToastAction.displayName = "ToastAction";
export const ToastClose = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Close>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>>(({ className, children, "aria-label": ariaLabel = "Fechar notificação", ...props }, ref) => <ToastPrimitive.Close ref={ref} aria-label={ariaLabel} className={cn("absolute right-2 top-2 grid size-6 place-items-center border-2 border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props}>{children ?? <X aria-hidden="true" className="size-4" />}</ToastPrimitive.Close>);
ToastClose.displayName = "ToastClose";
export const ToastTitle = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Title>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>>(({ className, ...props }, ref) => <ToastPrimitive.Title ref={ref} className={cn("text-sm font-black", className)} {...props} />);
ToastTitle.displayName = "ToastTitle";
export const ToastDescription = React.forwardRef<React.ComponentRef<typeof ToastPrimitive.Description>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>>(({ className, ...props }, ref) => <ToastPrimitive.Description ref={ref} className={cn("text-sm leading-relaxed opacity-90", className)} {...props} />);
ToastDescription.displayName = "ToastDescription";
export type ToastActionElement = React.ReactElement<typeof ToastAction>;
