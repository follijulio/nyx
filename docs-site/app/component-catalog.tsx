"use client";

import { useState } from "react";
import components from "./component-data.json";
import { PrimitiveDemo, primitiveExamples } from "./demos-primitives";
import { RadixDemo, radixExamples } from "./demos-radix";
import { AdvancedDemo, advancedExamples } from "./demos-advanced";

const examples: Record<string, string> = { ...primitiveExamples, ...radixExamples, ...advancedExamples };
const categories = [...new Set(components.map((entry) => entry.category))];

function Copy({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="focus-nyx shrink-0 border-2 border-ink bg-accent px-3 py-2 text-xs font-black" onClick={async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
    catch { setCopied(false); }
  }}>{copied ? "Copiado!" : "Copiar"}</button>;
}

export function ComponentCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState("accordion");
  const [tab, setTab] = useState<"preview" | "usage" | "source">("preview");
  const entry = components.find((item) => item.name === selected) ?? components[0];
  const filtered = components.filter((item) => (!category || item.category === category) && `${item.label} ${item.name} ${item.description}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")));
  const command = `npx @nyx-ui/cli add ${entry.name}`;
  const code = tab === "source" ? entry.source : examples[entry.name];

  return <div>
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="flex min-w-0 flex-1 items-center gap-3 border-2 border-ink bg-card px-3 shadow-nyx-sm">
        <span aria-hidden="true" className="text-xl">⌕</span>
        <input type="search" aria-label="Buscar componentes" placeholder="Buscar componente…" value={query} onChange={(event) => setQuery(event.target.value)} className="focus-nyx h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </label>
      <select aria-label="Filtrar categoria" value={category} onChange={(event) => setCategory(event.target.value)} className="focus-nyx h-12 border-2 border-ink bg-card px-3 text-sm font-bold">
        <option value="">Todas as categorias</option>
        {categories.map((value) => <option key={value}>{value}</option>)}
      </select>
      <span className="text-xs font-black" aria-live="polite">{filtered.length} / {components.length} componentes</span>
    </div>
    <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
      <nav aria-label="Catálogo de componentes" className="max-h-72 overflow-y-auto border-2 border-ink bg-card lg:max-h-[660px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1">
          {filtered.map((item) => <button type="button" key={item.name} aria-current={selected === item.name ? "true" : undefined} className={`focus-nyx border-b border-ink/20 px-4 py-3 text-left text-sm font-bold ${selected === item.name ? "bg-accent" : "hover:bg-muted"}`} onClick={() => { setSelected(item.name); setTab("preview"); }}>{item.label}</button>)}
        </div>
        {!filtered.length && <p className="p-5 text-sm">Nenhum componente encontrado. Tente outro termo.</p>}
      </nav>
      <article className="min-w-0 border-2 border-ink bg-card shadow-nyx" aria-labelledby="component-title">
        <header className="border-b-2 border-ink bg-muted p-5 sm:p-6">
          <p className="mb-2 text-xs font-black uppercase tracking-widest">{entry.category}</p>
          <h3 id="component-title" className="text-3xl font-black tracking-tight">{entry.label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.description}</p>
          <div className="mt-4 flex min-w-0 items-center justify-between gap-3 border-2 border-ink bg-card p-3">
            <code className="min-w-0 break-all text-xs font-bold sm:text-sm">{command}</code><Copy value={command} />
          </div>
        </header>
        <div role="tablist" aria-label="Visualização do componente" className="flex border-b-2 border-ink" onKeyDown={(event) => {
          const order = ["preview", "usage", "source"] as const;
          const index = order.indexOf(tab);
          const next = event.key === "ArrowRight" ? order[(index + 1) % 3] : event.key === "ArrowLeft" ? order[(index + 2) % 3] : event.key === "Home" ? order[0] : event.key === "End" ? order[2] : undefined;
          if (next) { event.preventDefault(); setTab(next); document.getElementById(`catalog-tab-${next}`)?.focus(); }
        }}>
          {([ ["preview", "Exemplo"], ["usage", "Como usar"], ["source", "Código-fonte"] ] as const).map(([value, label]) => <button type="button" role="tab" id={`catalog-tab-${value}`} tabIndex={tab === value ? 0 : -1} aria-selected={tab === value} aria-controls="catalog-panel" key={value} onClick={() => setTab(value)} className={`focus-nyx flex-1 border-r-2 border-ink px-2 py-3 text-xs font-black last:border-r-0 sm:text-sm ${tab === value ? "bg-accent" : "hover:bg-muted"}`}>{label}</button>)}
        </div>
        <div role="tabpanel" id="catalog-panel" aria-labelledby={`catalog-tab-${tab}`} tabIndex={0} className="focus-nyx">
          {tab === "preview" ? <div key={entry.name} className="flex min-h-80 min-w-0 items-center justify-center overflow-x-auto p-5 sm:p-8" data-component-preview={entry.name}>
            <PrimitiveDemo name={entry.name} /><RadixDemo name={entry.name} /><AdvancedDemo name={entry.name} />
          </div> : <div className="relative bg-ink text-paper"><div className="absolute right-3 top-3 text-ink"><Copy value={code ?? ""} /></div><pre className="max-h-[520px] overflow-auto p-5 pt-16 text-xs leading-6 sm:text-sm"><code>{code}</code></pre></div>}
        </div>
        <footer className="border-t-2 border-ink p-4 text-xs leading-6 text-muted-foreground">
          <p><strong className="text-ink">Pacotes:</strong> {entry.dependencies.length ? entry.dependencies.map((dependency) => <code key={dependency} className="mr-2 break-all">{dependency}</code>) : "nenhum pacote adicional"}.</p>
          {!!entry.registryDependencies.length && <p><strong className="text-ink">Instalados juntos:</strong> {entry.registryDependencies.join(", ")}.</p>}
          <p>A CLI resolve as dependências. O arquivo TSX fica no seu projeto, pronto para editar.</p>
        </footer>
      </article>
    </div>
  </div>;
}
