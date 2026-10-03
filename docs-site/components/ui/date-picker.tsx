"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (value: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
  "aria-label"?: string;
};

export function DatePicker(props: DatePickerProps) {
  const { value: controlledValue, defaultValue, onValueChange, placeholder = "Escolha uma data", disabled, name, className, calendarProps, "aria-label": ariaLabel } = props;
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = "value" in props ? controlledValue : internalValue;
  const serialized = value ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}` : "";
  return (
    <>
      {name && <input type="hidden" name={name} value={serialized} disabled={disabled} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button disabled={disabled} aria-label={ariaLabel ?? placeholder} className={cn("min-w-56 justify-between", !value && "text-muted-foreground", className)}>
            {value ? value.toLocaleDateString("pt-BR") : placeholder}<span aria-hidden="true">▦</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto border-0 p-0 shadow-none">
          <Calendar autoFocus defaultMonth={value} {...calendarProps} mode="single" selected={value} onSelect={(date) => {
            setInternalValue(date);
            onValueChange?.(date);
            setOpen(false);
          }} />
        </PopoverContent>
      </Popover>
    </>
  );
}
