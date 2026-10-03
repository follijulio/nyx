import * as React from "react";
import { cn } from "@/src/lib/utils";

export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="group" className={cn("flex min-h-11 w-full items-center border-2 border-input bg-card text-foreground shadow-nyx-sm focus-within:border-ring focus-within:shadow-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background", className)} {...props} />,
);
InputGroup.displayName = "InputGroup";
export const InputGroupAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" }>(
  ({ align = "inline-start", className, ...props }, ref) => <div ref={ref} data-align={align} className={cn("flex shrink-0 items-center gap-2 px-3 text-sm text-muted-foreground [&_svg]:size-4", align === "inline-start" ? "order-first" : "order-last", className)} {...props} />,
);
InputGroupAddon.displayName = "InputGroupAddon";
export const InputGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => <span ref={ref} className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />,
);
InputGroupText.displayName = "InputGroupText";
export const InputGroupInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => <input ref={ref} type={type} className={cn("h-10 min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-medium outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />,
);
InputGroupInput.displayName = "InputGroupInput";
export const InputGroupTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn("min-h-24 min-w-0 flex-1 resize-y bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />,
);
InputGroupTextarea.displayName = "InputGroupTextarea";
export const InputGroupButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => <button ref={ref} type={type} className={cn("inline-flex min-h-8 items-center justify-center gap-1 border-2 border-border bg-muted px-2 text-xs font-bold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)} {...props} />,
);
InputGroupButton.displayName = "InputGroupButton";
