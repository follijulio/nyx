import * as React from "react";
import { cn } from "@/src/lib/utils";

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { wrapperClassName?: string };
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, wrapperClassName, multiple, size, ...props }, ref) => (
    <div className={cn("relative w-full", wrapperClassName)}>
      <select ref={ref} multiple={multiple} size={size} className={cn("min-h-11 w-full appearance-none border-2 border-input bg-card py-2 ps-3 pe-10 text-sm font-medium text-foreground shadow-nyx-sm focus-visible:border-ring focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50", (multiple || (size && size > 1)) && "pe-3", className)} {...props} />
      {!multiple && !(size && size > 1) && <svg viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2" fill="none"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="2" /></svg>}
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";
export const NativeSelectOption = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  (props, ref) => <option ref={ref} {...props} />,
);
NativeSelectOption.displayName = "NativeSelectOption";
export const NativeSelectOptGroup = React.forwardRef<HTMLOptGroupElement, React.OptgroupHTMLAttributes<HTMLOptGroupElement>>(
  (props, ref) => <optgroup ref={ref} {...props} />,
);
NativeSelectOptGroup.displayName = "NativeSelectOptGroup";
