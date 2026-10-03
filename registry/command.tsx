"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/src/lib/utils";

export const Command = React.forwardRef<React.ElementRef<typeof CommandPrimitive>, React.ComponentPropsWithoutRef<typeof CommandPrimitive>>(({ className, ...props }, ref) => (
  <CommandPrimitive ref={ref} className={cn("flex w-full flex-col overflow-hidden border-2 border-border bg-card text-foreground shadow-nyx", className)} {...props} />
));
Command.displayName = "Command";

export const CommandInput = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Input>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b-2 border-border px-3">
    <span aria-hidden="true" className="text-xl">⌕</span>
    <CommandPrimitive.Input ref={ref} className={cn("h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50", className)} {...props} />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef<React.ElementRef<typeof CommandPrimitive.List>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn("max-h-72 overflow-y-auto overflow-x-hidden p-1", className)} {...props} />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Empty>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty ref={ref} className={cn("px-3 py-6 text-center text-sm text-muted-foreground", className)} {...props} />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Group>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} className={cn("p-1 [&[hidden]]:hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-black [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground", className)} {...props} />
));
CommandGroup.displayName = "CommandGroup";

export const CommandItem = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Item>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item ref={ref} className={cn("relative flex cursor-pointer select-none items-center gap-2 border-2 border-transparent px-2 py-2 text-sm outline-none data-[selected=true]:border-border data-[selected=true]:bg-primary data-[selected=true]:font-bold data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40", className)} {...props} />
));
CommandItem.displayName = "CommandItem";

export const CommandSeparator = React.forwardRef<React.ElementRef<typeof CommandPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("my-1 h-0.5 bg-border", className)} {...props} />
));
CommandSeparator.displayName = "CommandSeparator";

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
}
