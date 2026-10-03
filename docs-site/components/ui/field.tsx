import * as React from "react";
import { cn } from "@/lib/utils";

export const FieldSet = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => <fieldset ref={ref} className={cn("flex flex-col gap-5", className)} {...props} />,
);
FieldSet.displayName = "FieldSet";
export const FieldLegend = React.forwardRef<HTMLLegendElement, React.HTMLAttributes<HTMLLegendElement>>(
  ({ className, ...props }, ref) => <legend ref={ref} className={cn("mb-3 text-base font-black", className)} {...props} />,
);
FieldLegend.displayName = "FieldLegend";
export const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col gap-5", className)} {...props} />,
);
FieldGroup.displayName = "FieldGroup";
export type FieldProps = React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "responsive"; invalid?: boolean };
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", invalid, ...props }, ref) => <div ref={ref} role="group" data-invalid={invalid || undefined} data-orientation={orientation} className={cn("group flex gap-2 data-[invalid=true]:text-destructive", orientation === "horizontal" ? "flex-row items-start gap-3" : orientation === "responsive" ? "flex-col sm:flex-row sm:items-start sm:gap-3" : "flex-col", className)} {...props} />,
);
Field.displayName = "Field";
export const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-1 flex-col gap-1.5", className)} {...props} />,
);
FieldContent.displayName = "FieldContent";
export const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => <label ref={ref} className={cn("text-sm font-bold peer-disabled:opacity-50", className)} {...props} />,
);
FieldLabel.displayName = "FieldLabel";
export const FieldTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-sm font-bold", className)} {...props} />,
);
FieldTitle.displayName = "FieldTitle";
export const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4", className)} {...props} />,
);
FieldDescription.displayName = "FieldDescription";
export function FieldSeparator({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 text-xs font-bold text-muted-foreground", className)} {...props}><span aria-hidden="true" className="h-0.5 flex-1 bg-border" />{children}{children && <span aria-hidden="true" className="h-0.5 flex-1 bg-border" />}</div>;
}
export type FieldErrorProps = React.HTMLAttributes<HTMLDivElement> & { errors?: Array<{ message?: string } | undefined> };
export function FieldError({ children, errors, className, ...props }: FieldErrorProps) {
  const messages = [...new Set(errors?.flatMap((error) => error?.message ? [error.message] : []) ?? [])];
  if (!children && messages.length === 0) return null;
  return <div role="alert" className={cn("text-sm font-semibold text-destructive", className)} {...props}>{children ?? (messages.length === 1 ? messages[0] : <ul className="list-disc ps-4">{messages.map((message) => <li key={message}>{message}</li>)}</ul>)}</div>;
}
