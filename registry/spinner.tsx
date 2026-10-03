import * as React from "react";
import { cn } from "@/src/lib/utils";

export type SpinnerProps = React.HTMLAttributes<HTMLSpanElement> & { label?: string };
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, label = "Carregando", ...props }, ref) => <span ref={ref} role="status" className={cn("inline-flex items-center justify-center", className)} {...props}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 animate-spin motion-reduce:animate-none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" /><path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="square" /></svg><span className="sr-only">{label}</span></span>,
);
Spinner.displayName = "Spinner";
