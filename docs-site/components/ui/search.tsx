"use client";
import * as React from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & { value: string; onValueChange: (value: string) => void; shortcut?: string };
export function Search({ className, value, onValueChange, shortcut = "⌘ K", ...props }: SearchProps) {
  return <div className={cn("flex h-12 items-center gap-2 border-[3px] border-black bg-white px-3 shadow-[4px_4px_0_#111] focus-within:border-[#ff70a6]", className)}>
    <SearchIcon aria-hidden="true" className="size-5 shrink-0 stroke-[3]" />
    <input {...props} value={value} onChange={(event) => onValueChange(event.target.value)} className="min-w-0 flex-1 bg-transparent font-bold outline-none placeholder:text-black/50" />
    {value ? <button type="button" aria-label="Limpar busca" onClick={() => onValueChange("")} className="grid size-7 place-items-center border-2 border-black bg-[var(--nyx-pink)] hover:translate-y-px"><X size={16} strokeWidth={3} /></button> : <kbd className="border-2 border-black bg-[var(--nyx-yellow)] px-1.5 py-0.5 text-xs font-black">{shortcut}</kbd>}
  </div>;
}
