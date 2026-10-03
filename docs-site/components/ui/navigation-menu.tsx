"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavigationMenu = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Root>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>>(({ className, children, ...props }, ref) => <NavigationMenuPrimitive.Root ref={ref} className={cn("relative z-10 flex max-w-full flex-1 items-center justify-center", className)} {...props}>{children}<NavigationMenuViewport /></NavigationMenuPrimitive.Root>);
NavigationMenu.displayName = "NavigationMenu";
export const NavigationMenuList = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.List>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.List ref={ref} className={cn("flex flex-wrap list-none items-center gap-1", className)} {...props} />);
NavigationMenuList.displayName = "NavigationMenuList";
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const navigationMenuTriggerStyle = () => "inline-flex min-h-10 items-center justify-center gap-2 border-2 border-border bg-card px-4 py-2 text-sm font-bold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-primary disabled:pointer-events-none disabled:opacity-50";
export const NavigationMenuTrigger = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>>(({ className, children, ...props }, ref) => <NavigationMenuPrimitive.Trigger ref={ref} className={cn("group", navigationMenuTriggerStyle(), className)} {...props}>{children}<ChevronDown aria-hidden="true" className="size-3 transition-transform motion-reduce:transition-none group-data-[state=open]:rotate-180" /></NavigationMenuPrimitive.Trigger>);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";
export const NavigationMenuContent = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Content>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Content ref={ref} className={cn("left-0 top-0 w-[min(20rem,calc(100vw-2rem))] p-4 md:absolute md:w-auto", className)} {...props} />);
NavigationMenuContent.displayName = "NavigationMenuContent";
export const NavigationMenuLink = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Link>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Link ref={ref} className={cn("block px-3 py-2 text-sm font-bold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[active]:bg-primary", className)} {...props} />);
NavigationMenuLink.displayName = "NavigationMenuLink";
export const NavigationMenuViewport = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>>(({ className, ...props }, ref) => <div className="absolute left-0 top-full flex max-w-[calc(100vw-2rem)] justify-center"><NavigationMenuPrimitive.Viewport ref={ref} className={cn("relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full max-w-[calc(100vw-2rem)] overflow-hidden border-2 border-border bg-card text-foreground shadow-nyx md:w-[var(--radix-navigation-menu-viewport-width)]", className)} {...props} /></div>);
NavigationMenuViewport.displayName = "NavigationMenuViewport";
export const NavigationMenuIndicator = React.forwardRef<React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>, React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Indicator ref={ref} className={cn("top-full z-10 flex h-2 items-end justify-center overflow-hidden data-[state=hidden]:invisible", className)} {...props}><div className="relative top-1 size-2 rotate-45 border-l-2 border-t-2 border-border bg-card" /></NavigationMenuPrimitive.Indicator>);
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
