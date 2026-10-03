import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" };

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => <div ref={ref} role="group" data-orientation={orientation} className={cn("inline-flex [&>*]:shadow-none [&>*]:focus-visible:z-10", orientation === "horizontal" ? "-space-x-0.5" : "flex-col -space-y-0.5", className)} {...props} />,
);
ButtonGroup.displayName = "ButtonGroup";

export const ButtonGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn("inline-flex items-center border-2 border-border bg-muted px-3 text-sm font-semibold", className)} {...props} />,
);
ButtonGroupText.displayName = "ButtonGroupText";

export function ButtonGroupSeparator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("z-10 self-stretch border-s-2 border-border", className)} {...props} />;
}
