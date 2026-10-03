"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, locale = ptBR, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn("relative w-fit border-2 border-border bg-card p-4 text-foreground shadow-nyx", className)}
      classNames={{
        months: "relative flex flex-col gap-5 sm:flex-row",
        month: "space-y-3",
        month_caption: "flex h-9 items-center justify-center px-10 font-bold",
        nav: "absolute inset-x-0 top-0 z-10 flex justify-between",
        button_previous: "flex size-9 items-center justify-center border-2 border-border bg-background hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
        button_next: "flex size-9 items-center justify-center border-2 border-border bg-background hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
        chevron: "size-4 fill-current",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 pb-2 text-xs font-bold text-muted-foreground",
        week: "mt-1 flex",
        day: "relative size-9 p-0 text-center text-sm [&:has(button[aria-pressed=true])]:bg-primary",
        day_button: "flex size-9 items-center justify-center border-2 border-transparent hover:border-border hover:bg-muted focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected: "border-2 border-border bg-primary font-bold [&_button]:border-transparent",
        today: "font-black underline underline-offset-4",
        outside: "text-muted-foreground opacity-50",
        disabled: "pointer-events-none opacity-30",
        hidden: "invisible",
        range_start: "bg-primary",
        range_end: "bg-primary",
        range_middle: "bg-primary/25",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative border-2 border-border bg-background px-2 py-1 text-sm",
        dropdown: "absolute inset-0 cursor-pointer opacity-0",
        caption_label: "inline-flex items-center gap-1",
        footer: "mt-3 text-xs text-muted-foreground",
        ...classNames,
      }}
      {...props}
    />
  );
}
