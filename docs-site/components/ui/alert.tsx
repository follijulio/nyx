import * as React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "success" | "error";
const styles: Record<
  Tone,
  { box: string; icon: React.ElementType; label: string }
> = {
  info: { box: "bg-[var(--nyx-cyan)]", icon: Info, label: "Informação" },
  success: {
    box: "bg-[var(--nyx-green)]",
    icon: CheckCircle2,
    label: "Sucesso",
  },
  error: { box: "bg-[#ff8585]", icon: AlertCircle, label: "Erro" },
};
export function Alert({
  tone = "info",
  title,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: Tone; title: string }) {
  const style = styles[tone];
  const Icon = style.icon;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 border-[3px] border-black p-4 text-black shadow-[4px_4px_0_#111]",
        style.box,
        className,
      )}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className="mt-0.5 size-6 shrink-0 stroke-[2.5]"
      />
      <div>
        <h3 className="font-black">{title || style.label}</h3>
        {children && <div className="mt-1 text-sm font-medium">{children}</div>}
      </div>
    </div>
  );
}
