import * as React from "react";
import { cn } from "@/src/lib/utils";

export type MessageProps = React.HTMLAttributes<HTMLElement> & { from?: "user" | "assistant"; };
export const Message = React.forwardRef<HTMLElement, MessageProps>(
  ({ className, from = "assistant", ...props }, ref) => <article ref={ref} data-from={from} className={cn("group flex items-start gap-3", from === "user" && "flex-row-reverse", className)} {...props} />,
);
Message.displayName = "Message";
export const MessageAvatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex size-9 shrink-0 items-center justify-center overflow-hidden border-2 border-border bg-accent text-xs font-black [&_img]:size-full [&_img]:object-cover", className)} {...props} />,
);
MessageAvatar.displayName = "MessageAvatar";
export const MessageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("min-w-0 max-w-[85%] border-2 border-border bg-card px-4 py-3 text-sm leading-relaxed shadow-nyx-sm group-data-[from=user]:bg-primary group-data-[from=user]:text-primary-foreground", className)} {...props} />,
);
MessageContent.displayName = "MessageContent";
export const MessageActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} role="group" className={cn("mt-2 flex items-center gap-1", className)} {...props} />,
);
MessageActions.displayName = "MessageActions";
export const MessageAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => <button ref={ref} type={type} className={cn("inline-flex min-h-7 items-center justify-center border-2 border-border bg-muted px-2 text-xs font-bold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3", className)} {...props} />,
);
MessageAction.displayName = "MessageAction";
