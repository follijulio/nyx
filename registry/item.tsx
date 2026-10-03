import * as React from "react";
import { cn } from "@/src/lib/utils";

export const ItemGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="list" className={cn("flex flex-col gap-3", className)} {...props} />,
);
ItemGroup.displayName = "ItemGroup";
export type ItemProps = React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "muted"; size?: "default" | "sm" };
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => <div ref={ref} role="listitem" className={cn("flex flex-wrap items-center gap-4", size === "sm" ? "p-3" : "p-4", { "border-2 border-border bg-card shadow-nyx-sm": variant === "default", "border-2 border-border": variant === "outline", "border-2 border-transparent bg-muted": variant === "muted" }, className)} {...props} />,
);
Item.displayName = "Item";
export const ItemMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex shrink-0 items-center justify-center [&_svg]:size-5", className)} {...props} />,
);
ItemMedia.displayName = "ItemMedia";
export const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex min-w-0 flex-1 flex-col gap-1", className)} {...props} />,
);
ItemContent.displayName = "ItemContent";
export const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-bold", className)} {...props} />,
);
ItemTitle.displayName = "ItemTitle";
export const ItemDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />,
);
ItemDescription.displayName = "ItemDescription";
export const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />,
);
ItemActions.displayName = "ItemActions";
export const ItemHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex w-full items-center justify-between gap-2", className)} {...props} />,
);
ItemHeader.displayName = "ItemHeader";
export const ItemFooter = ItemHeader;
export function ItemSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("h-0.5 w-full bg-border", className)} {...props} />;
}
