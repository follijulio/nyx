import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex min-h-60 flex-col items-center justify-center gap-5 border-2 border-dashed border-border bg-card p-8 text-center", className)} {...props} />,
);
Empty.displayName = "Empty";
export const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex max-w-sm flex-col items-center gap-2", className)} {...props} />,
);
EmptyHeader.displayName = "EmptyHeader";
export const EmptyMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mb-2 flex size-12 items-center justify-center border-2 border-border bg-accent shadow-nyx-sm [&_svg]:size-6", className)} {...props} />,
);
EmptyMedia.displayName = "EmptyMedia";
export const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("text-lg font-black", className)} {...props} />,
);
EmptyTitle.displayName = "EmptyTitle";
export const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />,
);
EmptyDescription.displayName = "EmptyDescription";
export const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex max-w-sm flex-col items-center gap-3", className)} {...props} />,
);
EmptyContent.displayName = "EmptyContent";
