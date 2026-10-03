"use client";

import * as React from "react";
import { OTPInput, OTPInputContext, REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/src/lib/utils";

export type InputOTPProps = Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "render" | "children"> & { children?: React.ReactNode };

export const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(({ className, containerClassName, children, maxLength, pattern = REGEXP_ONLY_DIGITS, "aria-label": ariaLabel = "Código de verificação", ...props }, ref) => (
  <OTPInput ref={ref} maxLength={maxLength} pattern={pattern} aria-label={ariaLabel} containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName, className)} {...props}>
    {children ?? <InputOTPGroup>{Array.from({ length: maxLength }, (_, index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>}
  </OTPInput>
));
InputOTP.displayName = "InputOTP";

export const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-1.5", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export const InputOTPSlot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { index: number }>(({ index, className, ...props }, ref) => {
  const context = React.useContext(OTPInputContext);
  const slot = context?.slots[index];
  if (!slot) throw new Error("InputOTPSlot deve estar dentro de InputOTP com um índice válido.");
  return (
    <div ref={ref} aria-hidden="true" data-active={slot.isActive} className={cn("relative flex size-11 items-center justify-center border-2 border-border bg-card font-mono text-lg font-bold text-foreground shadow-nyx-sm data-[active=true]:bg-primary data-[active=true]:ring-2 data-[active=true]:ring-ring data-[active=true]:ring-offset-2 data-[active=true]:ring-offset-background", className)} {...props}>
      {slot.char ?? slot.placeholderChar}
      {slot.hasFakeCaret && <span className="pointer-events-none absolute h-5 w-px bg-foreground motion-safe:animate-pulse" />}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

export function InputOTPSeparator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden="true" className={cn("px-1 font-black", className)} {...props}>−</span>;
}
