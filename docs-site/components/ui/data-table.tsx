"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Pagination } from "./pagination";

export type DataTableColumn<T> = {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  accessor?: (row: T) => unknown;
  cell?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
};
export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  filterPlaceholder?: string;
  emptyText?: string;
  caption?: string;
  getRowId?: (row: T, index: number) => React.Key;
  className?: string;
};

function getValue<T>(row: T, column: DataTableColumn<T>): unknown { return column.accessor ? column.accessor(row) : column.accessorKey !== undefined ? row[column.accessorKey] : undefined; }

export function DataTable<T>({ data, columns, pageSize = 5, filterPlaceholder = "Filtrar registros...", emptyText = "Nenhum registro encontrado.", caption = "Tabela de dados", getRowId, className }: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{ id: string; descending: boolean } | null>(null);
  const [page, setPage] = React.useState(1);
  const size = Math.max(1, Math.floor(pageSize));
  const rows = React.useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    const filtered = data.map((row, index) => ({ row, index })).filter(({ row }) => !normalized || columns.some((column) => String(getValue(row, column) ?? "").toLocaleLowerCase("pt-BR").includes(normalized)));
    const column = columns.find((item) => item.id === sort?.id);
    if (sort && column) filtered.sort((a, b) => {
      const left = getValue(a.row, column);
      const right = getValue(b.row, column);
      const comparison = typeof left === "number" && typeof right === "number" ? left - right : String(left ?? "").localeCompare(String(right ?? ""), "pt-BR", { numeric: true });
      return (sort.descending ? -comparison : comparison) || a.index - b.index;
    });
    return filtered;
  }, [data, columns, query, sort]);
  const totalPages = Math.max(1, Math.ceil(rows.length / size));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = rows.slice((currentPage - 1) * size, currentPage * size);
  return (
    <div className={cn("min-w-0 space-y-4", className)}>
      <Input aria-label={filterPlaceholder} placeholder={filterPlaceholder} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="max-w-sm" />
      <div className="overflow-x-auto border-2 border-border bg-card shadow-nyx">
        <table className="w-full border-collapse text-left text-sm text-foreground">
          <caption className="sr-only">{caption}</caption>
          <thead className="border-b-2 border-border bg-muted"><tr>{columns.map((column) => <th key={column.id} scope="col" className="whitespace-nowrap px-4 py-3 font-black" aria-sort={sort?.id === column.id ? sort.descending ? "descending" : "ascending" : column.sortable !== false ? "none" : undefined}>
            {column.sortable !== false ? <button type="button" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => { setSort((previous) => previous?.id === column.id ? previous.descending ? null : { id: column.id, descending: true } : { id: column.id, descending: false }); setPage(1); }}>{column.header}<span aria-hidden="true">{sort?.id === column.id ? sort.descending ? "↓" : "↑" : "↕"}</span></button> : column.header}
          </th>)}</tr></thead>
          <tbody>{visibleRows.length ? visibleRows.map(({ row, index }) => <tr key={getRowId?.(row, index) ?? index} className="border-b border-border last:border-0 hover:bg-muted/60">{columns.map((column) => {
            const value = getValue(row, column);
            return <td key={column.id} className="px-4 py-3">{column.cell ? column.cell(value, row) : String(value ?? "")}</td>;
          })}</tr>) : <tr><td colSpan={Math.max(1, columns.length)} className="h-24 px-4 text-center text-muted-foreground">{emptyText}</td></tr>}</tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4"><p role="status" className="text-xs font-medium text-muted-foreground">{rows.length} registro{rows.length === 1 ? "" : "s"} · Página {currentPage} de {totalPages}</p><Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} /></div>
    </div>
  );
}
