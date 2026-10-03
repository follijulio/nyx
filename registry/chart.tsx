"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/src/lib/utils";

export type ChartSeries = { key: string; label?: string; color?: string };
export type ChartProps = React.HTMLAttributes<HTMLDivElement> & {
  data: Record<string, unknown>[];
  xKey: string;
  series: ChartSeries[];
  type?: "line" | "bar" | "area";
  label?: string;
  height?: number;
  showLegend?: boolean;
};

const colors = ["var(--primary)", "var(--secondary)", "var(--foreground)", "var(--accent)"];

export function Chart({ data, xKey, series, type = "bar", label = "Gráfico", height = 280, showLegend = true, className, style, ...props }: ChartProps) {
  const descriptionId = React.useId();
  const ChartPrimitive = type === "line" ? LineChart : type === "area" ? AreaChart : BarChart;
  return (
    <div role="group" aria-label={label} aria-describedby={descriptionId} className={cn("w-full min-w-0 border-2 border-border bg-card p-4 text-foreground shadow-nyx", className)} style={style} {...props}>
      <p id={descriptionId} className="sr-only">{label}. {data.length} registros. Os valores estão disponíveis na tabela a seguir.</p>
      <div style={{ height, width: "100%", minWidth: 0 }} aria-hidden="true">
        {data.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <ChartPrimitive data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.2} />
              <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
              <Tooltip contentStyle={{ border: "2px solid var(--border)", borderRadius: 0, background: "var(--card)", color: "var(--foreground)", boxShadow: "4px 4px 0 var(--border)" }} />
              {showLegend && <Legend />}
              {series.map((item, index) => {
                const color = item.color ?? colors[index % colors.length];
                if (type === "line") return <Line key={item.key} dataKey={item.key} name={item.label ?? item.key} stroke={color} strokeWidth={3} dot={{ r: 3, strokeWidth: 2 }} isAnimationActive={false} />;
                if (type === "area") return <Area key={item.key} dataKey={item.key} name={item.label ?? item.key} stroke={color} strokeWidth={3} fill={color} fillOpacity={0.2} isAnimationActive={false} />;
                return <Bar key={item.key} dataKey={item.key} name={item.label ?? item.key} fill={color} stroke="var(--border)" strokeWidth={2} isAnimationActive={false} />;
              })}
            </ChartPrimitive>
          </ResponsiveContainer>
        ) : <p className="flex h-full items-center justify-center text-sm text-muted-foreground">Nenhum dado disponível.</p>}
      </div>
      <table className="sr-only">
        <caption>{label}</caption>
        <thead><tr><th scope="col">{xKey}</th>{series.map((item) => <th key={item.key} scope="col">{item.label ?? item.key}</th>)}</tr></thead>
        <tbody>{data.map((row, index) => <tr key={index}><th scope="row">{String(row[xKey] ?? "")}</th>{series.map((item) => <td key={item.key}>{String(row[item.key] ?? "")}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
