"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";
import { toggleVariants } from "./toggle";

type ToggleStyle = VariantProps<typeof toggleVariants>;
const ToggleGroupContext = React.createContext<ToggleStyle>({ variant: "default", size: "default" });
export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleStyle;
export const ToggleGroup = React.forwardRef<React.ComponentRef<typeof ToggleGroupPrimitive.Root>, ToggleGroupProps>(({ className, variant, size, children, ...props }, ref) => <ToggleGroupPrimitive.Root ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props}><ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider></ToggleGroupPrimitive.Root>);
ToggleGroup.displayName = "ToggleGroup";
export const ToggleGroupItem = React.forwardRef<React.ComponentRef<typeof ToggleGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ToggleStyle>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  return <ToggleGroupPrimitive.Item ref={ref} className={cn(toggleVariants({ variant: variant ?? context.variant, size: size ?? context.size }), className)} {...props} />;
});
ToggleGroupItem.displayName = "ToggleGroupItem";
