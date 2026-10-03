"use client";

import * as React from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function ResizablePanelGroup({ className, ...props }: React.ComponentProps<typeof Group>) {
  return <Group className={cn("flex h-full w-full border-2 border-border bg-card", className)} {...props} />;
}
export const ResizablePanel = Panel;
export function ResizableHandle({ className, withHandle = false, children, ...props }: React.ComponentProps<typeof Separator> & { withHandle?: boolean }) {
  return <Separator className={cn("relative flex w-1 shrink-0 items-center justify-center bg-border outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[orientation=horizontal]:h-1 aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:[&>div]:rotate-90", className)} {...props}>{children ?? (withHandle && <div className="z-10 flex h-6 w-4 items-center justify-center border-2 border-border bg-card"><GripVertical aria-hidden="true" className="size-3" /></div>)}</Separator>;
}
