"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { Button, type ButtonProps } from "./button";

type CarouselContextValue = {
  viewport: React.RefObject<HTMLDivElement | null>;
  orientation: "horizontal" | "vertical";
  index: number;
  count: number;
  setCount: (count: number) => void;
  setIndex: (index: number) => void;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};
const CarouselContext = React.createContext<CarouselContextValue | null>(null);
export function useCarousel() {
  const value = React.useContext(CarouselContext);
  if (!value) throw new Error("Os componentes de carrossel devem estar dentro de Carousel.");
  return value;
}

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
  opts?: { loop?: boolean; initialIndex?: number };
  onIndexChange?: (index: number) => void;
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ orientation = "horizontal", opts, onIndexChange, className, onKeyDown, children, "aria-label": ariaLabel = "Carrossel", ...props }, ref) => {
  const viewport = React.useRef<HTMLDivElement>(null);
  const [index, updateIndex] = React.useState(opts?.initialIndex ?? 0);
  const indexRef = React.useRef(index);
  const [count, setCount] = React.useState(0);
  const setIndex = React.useCallback((next: number) => {
    const validIndex = Math.max(0, Math.min(Math.max(0, count - 1), next));
    if (validIndex !== indexRef.current) {
      indexRef.current = validIndex;
      updateIndex(validIndex);
      onIndexChange?.(validIndex);
    }
  }, [count, onIndexChange]);
  const scrollTo = React.useCallback((requested: number) => {
    if (!viewport.current || !count) return;
    const next = opts?.loop ? ((requested % count) + count) % count : Math.max(0, Math.min(count - 1, requested));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.current.scrollTo({ [orientation === "horizontal" ? "left" : "top"]: next * (orientation === "horizontal" ? viewport.current.clientWidth : viewport.current.clientHeight), behavior: reduceMotion ? "instant" : "smooth" });
    setIndex(next);
  }, [count, opts?.loop, orientation, setIndex]);
  const initialized = React.useRef(false);
  React.useEffect(() => {
    if (count && !initialized.current) {
      initialized.current = true;
      scrollTo(opts?.initialIndex ?? 0);
    }
  }, [count, opts?.initialIndex, scrollTo]);
  React.useEffect(() => {
    if (!initialized.current) return;
    const next = Math.max(0, Math.min(Math.max(0, count - 1), indexRef.current));
    if (next !== indexRef.current) {
      setIndex(next);
      scrollTo(next);
    }
  }, [count, setIndex, scrollTo]);
  const visibleIndex = Math.max(0, Math.min(Math.max(0, count - 1), index));
  return (
    <CarouselContext.Provider value={{ viewport, orientation, index: visibleIndex, count, setCount, setIndex, scrollTo, scrollPrev: () => scrollTo(visibleIndex - 1), scrollNext: () => scrollTo(visibleIndex + 1), canScrollPrev: !!count && (opts?.loop === true || visibleIndex > 0), canScrollNext: !!count && (opts?.loop === true || visibleIndex < count - 1) }}>
      <div ref={ref} role="region" aria-roledescription="carrossel" aria-label={ariaLabel} className={cn("relative min-w-0", className)} onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || (event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]"))) return;
        const previousKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
        const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        if (event.key === previousKey || event.key === nextKey) { event.preventDefault(); scrollTo(visibleIndex + (event.key === previousKey ? -1 : 1)); }
      }} {...props}>
        {children}
        <span className="sr-only" aria-live="polite" aria-atomic="true">{count > 0 ? `Slide ${visibleIndex + 1} de ${count}` : ""}</span>
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, onScroll, ...props }, ref) => {
  const { viewport, orientation, setCount, setIndex } = useCarousel();
  React.useImperativeHandle(ref, () => viewport.current!, [viewport]);
  React.useEffect(() => { setCount(viewport.current?.children.length ?? React.Children.toArray(children).length); }, [children, setCount, viewport]);
  return <div ref={viewport} tabIndex={0} className={cn("flex min-w-0 snap-mandatory outline-none focus-visible:ring-2 focus-visible:ring-ring", orientation === "horizontal" ? "snap-x overflow-x-auto overflow-y-hidden" : "h-64 flex-col snap-y overflow-x-hidden overflow-y-auto", className)} onScroll={(event) => {
    onScroll?.(event);
    const node = event.currentTarget;
    const size = orientation === "horizontal" ? node.clientWidth : node.clientHeight;
    if (size) setIndex(Math.round((orientation === "horizontal" ? node.scrollLeft : node.scrollTop) / size));
  }} {...props}>{children}</div>;
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full snap-start p-1 pb-2 pr-2", className)} {...props} />);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, onClick, children, disabled, ...props }, ref) => {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();
  return <Button ref={ref} size="icon" aria-label="Slide anterior" className={cn("absolute bottom-4 left-4", className)} disabled={disabled || !canScrollPrev} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) scrollPrev(); }} {...props}>{children ?? <span aria-hidden="true">{orientation === "horizontal" ? "←" : "↑"}</span>}</Button>;
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, onClick, children, disabled, ...props }, ref) => {
  const { scrollNext, canScrollNext, orientation } = useCarousel();
  return <Button ref={ref} size="icon" aria-label="Próximo slide" className={cn("absolute bottom-4 right-4", className)} disabled={disabled || !canScrollNext} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) scrollNext(); }} {...props}>{children ?? <span aria-hidden="true">{orientation === "horizontal" ? "→" : "↓"}</span>}</Button>;
});
CarouselNext.displayName = "CarouselNext";
