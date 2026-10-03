"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";

export type PaginationProps = React.HTMLAttributes<HTMLElement> & {
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
};

export function Pagination({ page = 1, totalPages, onPageChange, siblingCount = 1, className, children, "aria-label": ariaLabel = "Paginação", ...props }: PaginationProps) {
  const total = Math.max(1, Math.floor(totalPages ?? 1));
  const current = Math.max(1, Math.min(total, page));
  const pages: (number | string)[] = [];
  if (totalPages !== undefined) {
    let previous = 0;
    for (const item of Array.from(new Set([1, total, ...Array.from({ length: siblingCount * 2 + 1 }, (_, index) => current - siblingCount + index)])).filter((item) => item > 0 && item <= total).sort((a, b) => a - b)) {
      if (item > previous + 1) pages.push(`gap-${item}`);
      pages.push(item);
      previous = item;
    }
  }
  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center justify-center", className)} {...props}>
      {children ?? <PaginationContent>
        <PaginationItem><Button size="sm" disabled={current === 1} aria-label="Página anterior" onClick={() => onPageChange?.(current - 1)}>←<span className="hidden sm:inline">Anterior</span></Button></PaginationItem>
        {pages.map((item) => <PaginationItem key={item}>{typeof item === "number" ? <Button size="sm" aria-label={`Página ${item}`} aria-current={item === current ? "page" : undefined} variant={item === current ? "primary" : "default"} onClick={() => onPageChange?.(item)}>{item}</Button> : <PaginationEllipsis />}</PaginationItem>)}
        <PaginationItem><Button size="sm" disabled={current === total} aria-label="Próxima página" onClick={() => onPageChange?.(current + 1)}><span className="hidden sm:inline">Próxima</span>→</Button></PaginationItem>
      </PaginationContent>}
    </nav>
  );
}

export const PaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => <ul ref={ref} className={cn("flex flex-wrap items-center gap-2", className)} {...props} />);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => <li ref={ref} className={className} {...props} />);
PaginationItem.displayName = "PaginationItem";

export const PaginationLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }>(({ className, isActive, ...props }, ref) => <a ref={ref} aria-current={isActive ? "page" : undefined} className={cn(buttonVariants({ variant: isActive ? "primary" : "default", size: "sm" }), className)} {...props} />);
PaginationLink.displayName = "PaginationLink";

export function PaginationPrevious({ children = "← Anterior", ...props }: React.ComponentProps<typeof PaginationLink>) { return <PaginationLink aria-label="Página anterior" {...props}>{children}</PaginationLink>; }
export function PaginationNext({ children = "Próxima →", ...props }: React.ComponentProps<typeof PaginationLink>) { return <PaginationLink aria-label="Próxima página" {...props}>{children}</PaginationLink>; }
export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("flex size-9 items-center justify-center", className)} {...props}><span aria-hidden="true">…</span><span className="sr-only">Mais páginas</span></span>; }
