"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { Dialog, DialogContent, DialogTitle } from "./dialog";

type SidebarContextValue = { open: boolean; setOpen: (open: boolean) => void; isMobile: boolean; mobileOpen: boolean; setMobileOpen: (open: boolean) => void; mobileOpener: React.RefObject<HTMLElement | null>; toggleSidebar: (trigger?: HTMLElement) => void; state: "expanded" | "collapsed"; id: string };
const SidebarContext = React.createContext<SidebarContextValue | null>(null);
export function useSidebar() { const context = React.useContext(SidebarContext); if (!context) throw new Error("Os componentes Sidebar devem estar dentro de SidebarProvider."); return context; }

export type SidebarProviderProps = React.HTMLAttributes<HTMLDivElement> & { defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void };
export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(({ defaultOpen = true, open: controlledOpen, onOpenChange, className, children, ...props }, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [mobileOpen, updateMobileOpen] = React.useState(false);
  const mobileOpener = React.useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const id = React.useId();
  const open = controlledOpen ?? internalOpen;
  const setOpen = React.useCallback((next: boolean) => { setInternalOpen(next); onOpenChange?.(next); }, [onOpenChange]);
  const setMobileOpen = React.useCallback((next: boolean, trigger?: HTMLElement) => {
    if (next && !mobileOpen) mobileOpener.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    updateMobileOpen(next);
  }, [mobileOpen]);
  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => { setIsMobile(media.matches); if (!media.matches) updateMobileOpen(false); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const toggleSidebar = React.useCallback((trigger?: HTMLElement) => { if (isMobile) setMobileOpen(!mobileOpen, trigger); else setOpen(!open); }, [isMobile, mobileOpen, open, setOpen, setMobileOpen]);
  return <SidebarContext.Provider value={{ open, setOpen, mobileOpen, setMobileOpen, mobileOpener, isMobile, toggleSidebar, state: open ? "expanded" : "collapsed", id }}><div ref={ref} className={cn("flex w-full min-w-0 items-stretch", className)} {...props}>{children}</div></SidebarContext.Provider>;
});
SidebarProvider.displayName = "SidebarProvider";

export type SidebarProps = React.HTMLAttributes<HTMLElement> & { side?: "left" | "right"; label?: string; onCloseAutoFocus?: React.ComponentProps<typeof DialogContent>["onCloseAutoFocus"] };
export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(({ side = "left", label = "Navegação", className, children, onCloseAutoFocus, ...props }, ref) => {
  const { open, isMobile, mobileOpen, setMobileOpen, mobileOpener, id } = useSidebar();
  if (isMobile) return <Dialog open={mobileOpen} onOpenChange={setMobileOpen}><DialogContent id={id} aria-describedby={undefined} onCloseAutoFocus={(event) => {
    onCloseAutoFocus?.(event);
    if (!event.defaultPrevented && mobileOpener.current?.isConnected) {
      event.preventDefault();
      mobileOpener.current.focus();
    }
  }} className={cn("inset-y-0 top-0 h-dvh w-72 max-w-[85vw] translate-x-0 translate-y-0 border-2 border-border bg-card p-0 text-foreground shadow-nyx", side === "left" ? "left-0 right-auto" : "left-auto right-0", className)}><DialogTitle className="sr-only">{label}</DialogTitle><nav aria-label={label} className="flex h-full flex-col pt-12" {...props}>{children}</nav></DialogContent></Dialog>;
  return <aside ref={ref} id={id} aria-label={label} hidden={!open} className={cn("w-64 shrink-0 flex-col border-2 border-border bg-card text-foreground", open ? "flex" : "hidden", side === "right" && "order-last", className)} {...props}>{children}</aside>;
});
Sidebar.displayName = "Sidebar";

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, onClick, ...props }, ref) => {
  const { toggleSidebar, open, isMobile, mobileOpen, id } = useSidebar();
  return <Button ref={ref} size="icon" aria-label="Alternar navegação" aria-controls={id} aria-expanded={isMobile ? mobileOpen : open} className={className} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) toggleSidebar(event.currentTarget); }} {...props}>{children ?? <span aria-hidden="true">☰</span>}</Button>;
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarInset = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => <main ref={ref} className={cn("min-w-0 flex-1 bg-background", className)} {...props} />);
SidebarInset.displayName = "SidebarInset";

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("border-b-2 border-border p-4 font-black", className)} {...props} />);
SidebarHeader.displayName = "SidebarHeader";
export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("min-h-0 flex-1 overflow-y-auto p-3", className)} {...props} />);
SidebarContent.displayName = "SidebarContent";
export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("mt-auto border-t-2 border-border p-4", className)} {...props} />);
SidebarFooter.displayName = "SidebarFooter";
export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-2 py-2", className)} {...props} />);
SidebarGroup.displayName = "SidebarGroup";
export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("px-3 text-xs font-black uppercase tracking-wider text-muted-foreground", className)} {...props} />);
SidebarGroupLabel.displayName = "SidebarGroupLabel";
export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => <ul ref={ref} className={cn("space-y-1", className)} {...props} />);
SidebarMenu.displayName = "SidebarMenu";
export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => <li ref={ref} className={className} {...props} />);
SidebarMenuItem.displayName = "SidebarMenuItem";
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }>(({ className, isActive, type = "button", ...props }, ref) => <button ref={ref} type={type} aria-current={isActive ? "page" : undefined} className={cn("flex min-h-10 w-full items-center gap-2 border-2 border-transparent px-3 py-2 text-left text-sm font-medium hover:border-border hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", isActive && "border-border bg-primary font-bold shadow-nyx-sm", className)} {...props} />);
SidebarMenuButton.displayName = "SidebarMenuButton";
