"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type MessageScrollerProps = React.HTMLAttributes<HTMLDivElement> & {
  followOutput?: boolean;
  threshold?: number;
  scrollLabel?: string;
};

export const MessageScroller = React.forwardRef<HTMLDivElement, MessageScrollerProps>(({ children, className, followOutput = true, threshold = 48, scrollLabel = "Ir para a última mensagem", onScroll, "aria-label": ariaLabel = "Histórico de mensagens", ...props }, ref) => {
  const viewport = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const following = React.useRef(followOutput);
  const [atBottom, setAtBottom] = React.useState(true);
  React.useImperativeHandle(ref, () => viewport.current!, []);
  const scrollToBottom = React.useCallback(() => {
    if (!viewport.current) return;
    viewport.current.scrollTop = viewport.current.scrollHeight;
    following.current = true;
    setAtBottom(true);
  }, []);
  React.useEffect(() => {
    following.current = followOutput;
    if (followOutput) scrollToBottom();
  }, [followOutput, scrollToBottom]);
  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (followOutput && following.current) scrollToBottom();
      else if (viewport.current) setAtBottom(viewport.current.scrollHeight - viewport.current.scrollTop - viewport.current.clientHeight <= threshold);
    });
    if (content.current) observer.observe(content.current);
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, [followOutput, threshold, scrollToBottom]);
  return (
    <div className="relative min-w-0">
      <div ref={viewport} role="log" aria-live="polite" aria-relevant="additions text" aria-label={ariaLabel} tabIndex={0} className={cn("max-h-96 overflow-y-auto overscroll-contain border-2 border-border bg-card p-4 text-foreground shadow-nyx outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} onScroll={(event) => {
        onScroll?.(event);
        const node = event.currentTarget;
        const isBottom = node.scrollHeight - node.scrollTop - node.clientHeight <= threshold;
        following.current = isBottom;
        setAtBottom(isBottom);
      }} {...props}><div ref={content} className="space-y-4">{children}</div></div>
      {!atBottom && <Button size="sm" className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" onClick={scrollToBottom}>↓ {scrollLabel}</Button>}
    </div>
  );
});
MessageScroller.displayName = "MessageScroller";
