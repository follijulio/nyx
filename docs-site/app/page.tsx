"use client";

import { useState } from "react";
import { ComponentCatalog } from "./component-catalog";
type CopyButtonProps = { value: string; label?: string };

function CopyButton({ value, label = "Copiar" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="physical-button focus-nyx border-2 border-ink bg-accent px-3 py-1.5 text-sm font-black"
      type="button"
      onClick={copy}
      aria-label={`${label}: ${value}`}
    >
      {copied ? "Copiado!" : label}
    </button>
  );
}

function CodeRow({ value }: { value: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 border-2 border-ink bg-card p-3 shadow-nyx-sm">
      <code className="min-w-0 break-all text-sm font-semibold sm:text-base">
        {value}
      </code>
      <CopyButton value={value} />
    </div>
  );
}

function SectionHeading({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-2 border-b-[3px] border-ink pb-3 sm:flex-row sm:items-end">
      <h2 className="text-3xl font-black tracking-[-0.06em] sm:text-4xl">
        {title}
      </h2>
      <p className="text-sm font-medium text-muted-foreground">{detail}</p>
    </div>
  );
}

const buttonClass =
  "physical-button focus-nyx inline-flex min-h-11 items-center justify-center border-2 border-ink px-4 py-2 text-sm font-black shadow-nyx-sm";

export default function HomePage() {
  return (
    <main className=" mx-auto w-[min(1240px,calc(100%-36px))] pb-10 sm:w-[min(1240px,calc(100%-64px))]">
      <header className="flex min-h-20 items-center justify-between text-2xl *:font-black tracking-[-0.08em] sm:min-h-24">
        <a
          className="focus-nyx text-2xl font-black tracking-[-0.08em]"
          href="#inicio"
          aria-label="Nyx UI, início"
        >
          Nyx
        </a>
      </header>

      <section id="inicio" className="pb-12 pt-12 sm:pb-16 sm:pt-20">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.16em] sm:text-sm">
          o Código é seu. Personalize à vontade.
        </p>
        <h1 className="max-w-8xl font-black leading-[0.82] tracking-tighter sm:text-[clamp(4rem,8.3vw,9rem)]">
          <span className="block">Componentes</span>
          <span className="mt-3 block sm:mt-6">
            com{" "}
            <span className="inline-block  bg-primary px-[0.10em] pb-[0.08em] pr-[0.18em] text-primary-foreground shadow-nyx-lg *:font-black ">
              presença
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-9 sm:text-xl sm:leading-8">
          Uma biblioteca Neo-Brutalista para React, distribuída como
          código-fonte. A CLI copia os componentes para o seu projeto: bordas
          sólidas, sombras duras e interações que parecem físicas.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className={`${buttonClass} bg-accent text-ink`} href="#instalacao">
            Começar a instalar ↓
          </a>
          <a className={`${buttonClass} bg-card text-ink`} href="#componentes">
            Ver componentes
          </a>
        </div>
        <div className="mt-8 max-w-2xl">
          <CodeRow value="npx @nyx-ui/cli init" />
        </div>
      </section>

      <section aria-label="Como funciona" className="grid gap-4 md:grid-cols-3">
        {[
          ["01", "Configure", "Rode init na raiz do seu app React ou Next.js."],
          [
            "02",
            "Escolha",
            "Adicione somente os componentes que o projeto precisa.",
          ],
          [
            "03",
            "Personalize",
            "Edite os arquivos TSX diretamente no seu projeto.",
          ],
        ].map(([number, title, description]) => (
          <article
            key={number}
            className="border-2 border-ink bg-card p-5 shadow-nyx-sm"
          >
            <p className="text-xs font-black tracking-widest text-muted-foreground">
              PASSO {number}
            </p>
            <h2 className="mt-1 text-xl font-black">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section id="componentes" className="scroll-mt-8 pt-16 sm:pt-20">
        <SectionHeading
          title="Peças do kit"
          detail="65 componentes. Código aberto, exemplos reais."
        />
        <ComponentCatalog />
      </section>

      <section id="instalacao" className="scroll-mt-8 pt-16 sm:pt-20">
        <div className="border-2 border-ink bg-secondary p-5 shadow-nyx sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.16em]">
            Instale. Depois, é seu.
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] sm:text-5xl">
            Comece pelo seu terminal.
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            Use Node.js 20.9 ou superior na raiz do seu projeto React ou
            Next.js. O comando <code>init</code> cria <code>nyx.json</code>,
            adiciona o tema ao CSS global e prepara o utilitário <code>cn</code>
            .
          </p>
          <div className="mt-6 grid gap-3 sm:max-w-2xl">
            <CodeRow value="npx @nyx-ui/cli init" />
            <CodeRow value="npx @nyx-ui/cli add button card input" />
          </div>
          <div className="mt-6 grid gap-5 border-t-2 border-ink pt-5 md:grid-cols-2">
            <div>
              <h3 className="font-black">Outros gerenciadores</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Bun: <code>bunx @nyx-ui/cli add button</code>
                <br />
                pnpm: <code>pnpm dlx @nyx-ui/cli add button</code>
                <br />
                Yarn: <code>yarn dlx @nyx-ui/cli add button</code>
              </p>
            </div>
            <div>
              <h3 className="font-black">O que a CLI prepara</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                <code>nyx.json</code>, tokens do tema, utilitário{" "}
                <code>cn</code> e arquivos TSX em <code>src/components/ui</code>
                . Componentes são seus para editar.
              </p>
            </div>
          </div>
          <div className="mt-5 border-2 border-ink bg-card p-4">
            <h3 className="font-black">
              Dependências opcionais por componente
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Cada componente mostra seus pacotes e arquivos relacionados no
              catálogo. Componentes interativos usam primitivas acessíveis do
              Radix UI; gráficos usam Recharts e o calendário usa React Day
              Picker.
            </p>
            <div className="mt-3 grid gap-3">
              <CodeRow value="npx @nyx-ui/cli list" />
              <CodeRow value="npx @nyx-ui/cli add --all" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              A CLI detecta npm, pnpm, Yarn ou Bun pelo lockfile e pede
              confirmação para instalar dependências ausentes. Use{" "}
              <code>--yes</code> para aceitar a instalação e{" "}
              <code>--overwrite</code> para substituir arquivos existentes.
            </p>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            Tailwind 4 usa os mapeamentos CSS em <code>@theme inline</code>. No
            Tailwind 3, mescle as extensões de{" "}
            <code>registry/tailwind.config.ts</code>; uma configuração existente
            não é sobrescrita.
          </p>
        </div>
      </section>

      <footer className="mt-12 border-t-[3px] border-ink py-6 text-sm font-medium text-muted-foreground">
        Nyx UI · Código aberto para construir sem arredondar as arestas.
      </footer>
    </main>
  );
}
