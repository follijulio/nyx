"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type AttachmentProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "children"> & { label?: string; onFilesChange?: (files: File[]) => void };
export const Attachment = React.forwardRef<HTMLInputElement, AttachmentProps>(
  ({ className, label = "Anexar arquivos", onChange, onFilesChange, disabled, ...props }, ref) => (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 border-2 border-border bg-card px-3 py-2 text-sm font-bold shadow-nyx-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background", disabled && "cursor-not-allowed opacity-50", className)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none"><path d="m8 13 7-7a3 3 0 0 1 4 4l-9 9a5 5 0 0 1-7-7l9-9" stroke="currentColor" strokeWidth="2" /></svg>
      {label}
      <input ref={ref} className="sr-only" type="file" disabled={disabled} onChange={(event) => { onChange?.(event); onFilesChange?.(Array.from(event.currentTarget.files ?? [])); }} {...props} />
    </label>
  ),
);
Attachment.displayName = "Attachment";

export type AttachmentItemProps = React.HTMLAttributes<HTMLDivElement> & { file: Pick<File, "name" | "size">; onRemove?: () => void; removeLabel?: string };
export const AttachmentItem = React.forwardRef<HTMLDivElement, AttachmentItemProps>(
  ({ file, onRemove, removeLabel = "Remover anexo", className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 border-2 border-border bg-muted px-3 py-2", className)} {...props}>
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{file.name}</p><p className="text-xs text-muted-foreground">{file.size < 1024 ? `${file.size} B` : file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}</p></div>
      {onRemove && <button type="button" onClick={onRemove} aria-label={`${removeLabel}: ${file.name}`} className="inline-flex size-7 items-center justify-center border-2 border-border bg-card font-bold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">×</button>}
    </div>
  ),
);
AttachmentItem.displayName = "AttachmentItem";
