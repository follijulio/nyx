"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./command";

export type ComboboxOption = { value: string; label: string; disabled?: boolean };
export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  "aria-label"?: string;
};

export function Combobox({ options, value: controlledValue, defaultValue = "", onValueChange, placeholder = "Selecione uma opção", searchPlaceholder = "Buscar...", emptyText = "Nenhum resultado.", disabled, name, className, "aria-label": ariaLabel }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const selected = options.find((option) => option.value === value);
  const [listId, setListId] = React.useState<string>();
  const listRef = React.useCallback((node: HTMLDivElement | null) => {
    // cmdk owns the list id and overrides a caller-provided id.
    setListId(node?.id);
  }, []);
  return (
    <>
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button role="combobox" aria-expanded={open} aria-controls={open ? listId : undefined} aria-haspopup="listbox" aria-label={ariaLabel ?? placeholder} disabled={disabled} className={cn("min-w-56 justify-between", className)}>
            <span className="truncate">{selected?.label ?? placeholder}</span><span aria-hidden="true">⌄</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0" align="start">
          <Command label={searchPlaceholder} className="border-0 shadow-none">
            <CommandInput placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
            <CommandList ref={listRef}>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} keywords={[option.label]} disabled={option.disabled} onSelect={() => {
                  setInternalValue(option.value);
                  onValueChange?.(option.value);
                  setOpen(false);
                }}>
                  <span aria-hidden="true" className={cn("w-4", value !== option.value && "invisible")}>✓</span>{option.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
