import * as React from "react";
import { cn } from "@/lib/utils";

export const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>(
  ({ className, ...props }, ref) => <nav ref={ref} aria-label="Caminho da página" className={cn("text-sm", className)} {...props} />,
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => <ol ref={ref} className={cn("flex flex-wrap items-center gap-2 text-muted-foreground", className)} {...props} />,
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />,
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a">>(
  ({ className, ...props }, ref) => <a ref={ref} className={cn("font-semibold underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />,
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => <span ref={ref} aria-current="page" className={cn("font-bold text-foreground", className)} {...props} />,
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export function BreadcrumbSeparator({ children = "/", className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return <li aria-hidden="true" className={cn("select-none font-bold", className)} {...props}>{children}</li>;
}

export function BreadcrumbEllipsis({ className, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("flex size-8 items-center justify-center", className)} {...props}><span aria-hidden="true">…</span><span className="sr-only">Mais páginas</span></span>;
}
