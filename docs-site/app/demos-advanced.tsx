"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Chart } from "@/components/ui/chart";
import { Combobox } from "@/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { DatePicker } from "@/components/ui/date-picker";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MessageScroller } from "@/components/ui/message-scroller";
import { Pagination } from "@/components/ui/pagination";
import {
  Questionnaire,
  type QuestionnaireAnswers,
  type QuestionnaireQuestion,
} from "@/components/ui/questionnaire";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const advancedExamples: Record<string, string> = {
  calendar: `"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export function Example() {
  const [date, setDate] = useState<Date>();

  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}`,
  carousel: `import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export function Example() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {[1, 2, 3].map((n) => (
          <CarouselItem key={n}>
            <div className="flex h-48 items-center justify-center border-2 border-border bg-primary text-4xl font-black">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}`,
  chart: `import { Chart } from "@/components/ui/chart";

export function Example() {
  return (
    <Chart
      label="Visitas por mês"
      xKey="month"
      series={[{ key: "visits", label: "Visitas" }]}
      data={[
        { month: "Jan", visits: 120 },
        { month: "Fev", visits: 240 },
        { month: "Mar", visits: 180 },
      ]}
    />
  );
}`,
  combobox: `"use client";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

export function Example() {
  const [value, setValue] = useState("");

  return (
    <Combobox
      value={value}
      onValueChange={setValue}
      options={[
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
      ]}
    />
  );
}`,
  command: `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

export function Example() {
  return (
    <Command label="Menu de comandos">
      <CommandInput placeholder="Buscar comando..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>
        <CommandGroup heading="Navegação">
          <CommandItem value="projects" onSelect={() => console.log("Abrir projetos")}>
            Projetos
          </CommandItem>
          <CommandItem value="settings">Configurações</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`,
  "data-table": `import { DataTable } from "@/components/ui/data-table";

export function Example() {
  return (
    <DataTable
      data={[
        { id: 1, name: "Ana", score: 92 },
        { id: 2, name: "Bia", score: 85 },
      ]}
      columns={[
        { id: "name", header: "Nome", accessorKey: "name" },
        { id: "score", header: "Pontos", accessorKey: "score" },
      ]}
      getRowId={(row) => row.id}
    />
  );
}`,
  "date-picker": `"use client";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export function Example() {
  const [date, setDate] = useState<Date>();

  return <DatePicker value={date} onValueChange={setDate} name="appointment" />;
}`,
  "input-otp": `"use client";
import { useState } from "react";
import { InputOTP } from "@/components/ui/input-otp";

export function Example() {
  const [code, setCode] = useState("");

  return (
    <InputOTP
      maxLength={6}
      value={code}
      onChange={setCode}
      aria-label="Código de verificação"
    />
  );
}`,
  "message-scroller": `import { MessageScroller } from "@/components/ui/message-scroller";

export function Example() {
  return (
    <MessageScroller className="h-64">
      <p>Olá! Tudo pronto?</p>
      <p>Sim, vamos começar.</p>
    </MessageScroller>
  );
}`,
  pagination: `"use client";
import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

export function Example() {
  const [page, setPage] = useState(1);

  return <Pagination page={page} totalPages={8} onPageChange={setPage} />;
}`,
  questionnaire: `import { Questionnaire } from "@/components/ui/questionnaire";

export function Example() {
  return (
    <Questionnaire
      questions={[
        {
          id: "goal",
          title: "O que você quer criar?",
          type: "single",
          required: true,
          options: [
            { value: "app", label: "Aplicativo" },
            { value: "site", label: "Site" },
          ],
        },
        { id: "details", title: "Conte um pouco mais", type: "text" },
      ]}
      onComplete={(answers) => console.log(answers)}
    />
  );
}`,
  sidebar: `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function Example() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Meu projeto</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Visão geral</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p>Conteúdo da página</p>
      </SidebarInset>
    </SidebarProvider>
  );
}`,
};

const frameworks = [
  { value: "react", label: "React" },
  { value: "next", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
];
const chartData = [
  { month: "Jan", visits: 120, signups: 50 },
  { month: "Fev", visits: 185, signups: 80 },
  { month: "Mar", visits: 150, signups: 65 },
  { month: "Abr", visits: 260, signups: 110 },
  { month: "Mai", visits: 230, signups: 105 },
];
const tableData = [
  { id: 1, name: "Ana Souza", role: "Design", projects: 12 },
  { id: 2, name: "Bruno Lima", role: "Engenharia", projects: 8 },
  { id: 3, name: "Camila Dias", role: "Produto", projects: 15 },
  { id: 4, name: "Diego Alves", role: "Engenharia", projects: 6 },
  { id: 5, name: "Elisa Costa", role: "Design", projects: 9 },
  { id: 6, name: "Felipe Rocha", role: "Produto", projects: 11 },
];
const tableColumns: DataTableColumn<(typeof tableData)[number]>[] = [
  { id: "name", header: "Nome", accessorKey: "name" },
  { id: "role", header: "Equipe", accessorKey: "role" },
  { id: "projects", header: "Projetos", accessorKey: "projects" },
];
const questions: QuestionnaireQuestion[] = [
  {
    id: "project",
    title: "O que você está criando?",
    type: "single",
    required: true,
    options: [
      { value: "site", label: "Um site" },
      { value: "app", label: "Um aplicativo" },
      { value: "system", label: "Um sistema de design" },
    ],
  },
  {
    id: "priorities",
    title: "Quais são suas prioridades?",
    description: "Selecione quantas opções quiser.",
    type: "multiple",
    required: true,
    options: [
      { value: "accessibility", label: "Acessibilidade" },
      { value: "identity", label: "Identidade visual" },
      { value: "speed", label: "Velocidade" },
    ],
  },
  {
    id: "notes",
    title: "Algo mais que devemos saber?",
    type: "text",
    placeholder: "Sua ideia, do seu jeito...",
  },
];

export function AdvancedDemo({ name }: { name: string }) {
  const [date, setDate] = React.useState<Date>();
  const [framework, setFramework] = React.useState("");
  const [command, setCommand] = React.useState("");
  const [code, setCode] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [slide, setSlide] = React.useState(0);
  const [chartType, setChartType] = React.useState<"bar" | "line" | "area">(
    "bar",
  );
  const [messages, setMessages] = React.useState([
    "Olá! Bem-vindo ao Nyx.",
    "Os componentes são seus: adapte cada detalhe.",
    "Role para cima para pausar o acompanhamento.",
  ]);
  const [answers, setAnswers] = React.useState<QuestionnaireAnswers>();
  const [view, setView] = React.useState("Visão geral");
  switch (name) {
    case "calendar":
      return (
        <div className="space-y-4">
          <Calendar mode="single" selected={date} onSelect={setDate} />
          <p role="status" className="text-center text-sm font-medium">
            {date ? date.toLocaleDateString("pt-BR") : "Selecione um dia"}
          </p>
        </div>
      );
    case "carousel":
      return (
        <div className="w-full max-w-sm space-y-3">
          <Carousel onIndexChange={setSlide}>
            <CarouselContent>
              {["Crie", "Experimente", "Publique"].map((label, index) => (
                <CarouselItem key={label}>
                  <div
                    className={`flex h-52 flex-col items-center justify-center gap-2 border-2 border-border pb-10 shadow-nyx-sm ${index === 0 ? "bg-primary" : index === 1 ? "bg-secondary" : "bg-accent"}`}
                  >
                    <span className="text-xs font-bold">0{index + 1}</span>
                    <strong className="text-3xl font-black">{label}.</strong>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p className="text-center text-xs font-bold">
            {slide + 1} / 3 · Use as setas do teclado
          </p>
        </div>
      );
    case "chart":
      return (
        <div className="w-full space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["bar", "line", "area"] as const).map((type, index) => (
              <Button
                key={type}
                size="sm"
                variant={type === chartType ? "primary" : "default"}
                aria-pressed={type === chartType}
                onClick={() => setChartType(type)}
              >
                {["Barras", "Linhas", "Área"][index]}
              </Button>
            ))}
          </div>
          <Chart
            type={chartType}
            data={chartData}
            xKey="month"
            series={[
              { key: "visits", label: "Visitas" },
              { key: "signups", label: "Inscrições" },
            ]}
            label="Visitas e inscrições por mês"
            height={260}
          />
        </div>
      );
    case "combobox":
      return (
        <div className="space-y-4">
          <Combobox
            options={frameworks}
            value={framework}
            onValueChange={setFramework}
            placeholder="Escolha um framework"
          />
          <p role="status" className="text-xs text-muted-foreground">
            {framework
              ? `Selecionado: ${frameworks.find((item) => item.value === framework)?.label}`
              : "Busque pelo nome e selecione uma opção."}
          </p>
        </div>
      );
    case "command":
      return (
        <div className="w-full max-w-md space-y-4">
          <Command label="Menu de comandos">
            <CommandInput placeholder="Buscar comando..." />
            <CommandList>
              <CommandEmpty>Nenhum comando encontrado.</CommandEmpty>
              <CommandGroup heading="Navegação">
                {["Projetos", "Componentes", "Configurações"].map(
                  (label, index) => (
                    <CommandItem key={label} onSelect={() => setCommand(label)}>
                      {label}
                      <CommandShortcut>⌘{index + 1}</CommandShortcut>
                    </CommandItem>
                  ),
                )}
              </CommandGroup>
              <CommandGroup heading="Ações">
                <CommandItem onSelect={() => setCommand("Novo projeto")}>
                  Criar projeto<CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <p role="status" className="text-xs text-muted-foreground">
            {command
              ? `Comando: ${command}`
              : "Digite para filtrar. Use ↑ ↓ e Enter para escolher."}
          </p>
        </div>
      );
    case "data-table":
      return (
        <div className="w-full">
          <DataTable
            columns={tableColumns}
            data={tableData}
            getRowId={(row) => row.id}
            pageSize={3}
            caption="Equipe e projetos"
          />
        </div>
      );
    case "date-picker":
      return (
        <div className="space-y-4">
          <DatePicker value={date} onValueChange={setDate} />
          <p role="status" className="text-xs text-muted-foreground">
            {date
              ? `Data escolhida: ${date.toLocaleDateString("pt-BR")}`
              : "Abra o calendário para escolher uma data."}
          </p>
        </div>
      );
    case "input-otp":
      return (
        <div className="space-y-4">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot
                  index={index}
                  key={index}
                  className="size-9 sm:size-11"
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot
                  index={index}
                  key={index}
                  className="size-9 sm:size-11"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p role="status" className="text-sm font-medium">
            {code.length === 6
              ? `Código completo: ${code}`
              : `${code.length} de 6 dígitos · Experimente colar o código.`}
          </p>
        </div>
      );
    case "message-scroller":
      return (
        <div className="w-full max-w-md space-y-4">
          <MessageScroller className="h-56">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[90%] border-2 border-border px-3 py-2 text-sm ${index % 2 ? "ml-auto bg-primary" : "bg-muted"}`}
              >
                <p>{message}</p>
                <span className="mt-1 block text-[10px] font-bold text-muted-foreground">
                  Mensagem {index + 1}
                </span>
              </div>
            ))}
          </MessageScroller>
          <Button
            size="sm"
            onClick={() =>
              setMessages((previous) => [
                ...previous,
                `Nova mensagem ${previous.length + 1}. Continue criando com o Nyx.`,
              ])
            }
          >
            Adicionar mensagem
          </Button>
        </div>
      );
    case "pagination":
      return (
        <div className="w-full space-y-5">
          <Pagination page={page} totalPages={8} onPageChange={setPage} />
          <p role="status" className="text-center text-sm font-bold">
            Página {page} de 8
          </p>
        </div>
      );
    case "questionnaire":
      return (
        <div className="w-full space-y-4">
          <Questionnaire questions={questions} onComplete={setAnswers} />
          {answers && (
            <div
              role="status"
              className="border-2 border-border bg-muted p-4 text-sm"
            >
              <p className="mb-2 font-bold">Respostas recebidas:</p>
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(answers, null, 2)}
              </pre>
            </div>
          )}
        </div>
      );
    case "sidebar":
      return (
        <SidebarProvider className="min-h-72 overflow-hidden border-2 border-border shadow-nyx">
          <Sidebar className="w-44 border-0 border-r-2">
            <SidebarHeader>NYX / STUDIO</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarMenu>
                  {["Visão geral", "Projetos", "Equipe"].map((label) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={view === label}
                        onClick={() => setView(label)}
                      >
                        {label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-xs font-bold">
              Seu espaço criativo.
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="space-y-4 p-4">
            <SidebarTrigger />
            <h3 className="text-lg font-black">{view}</h3>
            <p className="text-sm text-muted-foreground">
              Alterne o menu para organizar seu espaço.
            </p>
          </SidebarInset>
        </SidebarProvider>
      );
    default:
      return null;
  }
}
