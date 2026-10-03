"use client";

import { useState } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const radixExamples: Record<string, string> = {
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="nyx">
    <AccordionTrigger>O que é o Nyx?</AccordionTrigger>
    <AccordionContent>Componentes que ficam no seu projeto.</AccordionContent>
  </AccordionItem>
</Accordion>`,
  "alert-dialog": `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

<AlertDialog>
  <AlertDialogTrigger>Excluir arquivo</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Excluir este arquivo?</AlertDialogTitle>
    <AlertDialogDescription>Esta ação remove o arquivo selecionado.</AlertDialogDescription>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={() => console.log("Confirmado")}>Confirmar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  checkbox: `import { Checkbox } from "@/components/ui/checkbox";

<label className="flex items-center gap-3">
  <Checkbox defaultChecked /> Aceito os termos
</label>`,
  collapsible: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Ver detalhes</CollapsibleTrigger>
  <CollapsibleContent>Conteúdo extra do projeto.</CollapsibleContent>
</Collapsible>`,
  "context-menu": `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>Clique com o botão direito ou pressione e segure.</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onSelect={() => console.log("Copiar")}>Copiar</ContextMenuItem>
    <ContextMenuItem>Renomear</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  drawer: `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";

<Drawer>
  <DrawerTrigger>Abrir gaveta</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Resumo do projeto</DrawerTitle>
      <DrawerDescription>Confira os detalhes antes de continuar.</DrawerDescription>
    </DrawerHeader>
    <DrawerClose>Concluir</DrawerClose>
  </DrawerContent>
</Drawer>`,
  "dropdown-menu": `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Ações</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={() => console.log("Editar")}>Editar</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  menubar: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem onSelect={() => console.log("Novo")}>Novo projeto</MenubarItem>
      <MenubarItem>Exportar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
  "navigation-menu": `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#instalacao">Instalação</NavigationMenuLink>
        <NavigationMenuLink href="#componentes">Componentes</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
  popover: `import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger>Configurações</PopoverTrigger>
  <PopoverContent>Defina as preferências do projeto.</PopoverContent>
</Popover>`,
  progress: `import { Progress } from "@/components/ui/progress";

<Progress value={65} aria-label="Progresso do upload" />`,
  "radio-group": `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="mensal" aria-label="Plano de cobrança">
  <label className="flex items-center gap-3"><RadioGroupItem value="mensal" /> Mensal</label>
  <label className="flex items-center gap-3"><RadioGroupItem value="anual" /> Anual</label>
</RadioGroup>`,
  resizable: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

<ResizablePanelGroup orientation="horizontal" style={{ height: 192 }}>
  <ResizablePanel defaultSize="50%" minSize="20%">Esquerda</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="50%" minSize="20%">Direita</ResizablePanel>
</ResizablePanelGroup>`,
  "scroll-area": `import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-48 w-64 border-2 border-border">
  {Array.from({ length: 20 }, (_, i) => <p key={i} className="p-3">Item {i + 1}</p>)}
</ScrollArea>`,
  select: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select defaultValue="design">
  <SelectTrigger aria-label="Equipe"><SelectValue placeholder="Escolha a equipe" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="design">Design</SelectItem>
    <SelectItem value="dev">Desenvolvimento</SelectItem>
  </SelectContent>
</Select>`,
  sheet: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger>Abrir painel</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Editar projeto</SheetTitle>
      <SheetDescription>Atualize os dados do projeto.</SheetDescription>
    </SheetHeader>
    <SheetClose>Salvar</SheetClose>
  </SheetContent>
</Sheet>`,
  slider: `import { Slider } from "@/components/ui/slider";

<Slider defaultValue={[40]} max={100} step={5} thumbLabels={["Volume"]} />`,
  switch: `import { Switch } from "@/components/ui/switch";

<label className="flex items-center gap-3"><Switch defaultChecked /> Receber notificações</label>`,
  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="geral">
  <TabsList><TabsTrigger value="geral">Geral</TabsTrigger><TabsTrigger value="equipe">Equipe</TabsTrigger></TabsList>
  <TabsContent value="geral">Configurações gerais.</TabsContent>
  <TabsContent value="equipe">Pessoas do projeto.</TabsContent>
</Tabs>`,
  toast: `"use client";
import { useState } from "react";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport } from "@/components/ui/toast";

export function Notificacao() {
  const [open, setOpen] = useState(false);
  return <ToastProvider>
    <button onClick={() => setOpen(true)}>Salvar projeto</button>
    <Toast open={open} onOpenChange={setOpen}>
      <div><ToastTitle>Projeto salvo</ToastTitle><ToastDescription>As alterações foram salvas.</ToastDescription></div>
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>;
}`,
  toggle: `import { Toggle } from "@/components/ui/toggle";

<Toggle variant="outline" aria-label="Ativar negrito">B</Toggle>`,
  "toggle-group": `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<ToggleGroup type="multiple" variant="outline" aria-label="Formatação">
  <ToggleGroupItem value="bold" aria-label="Negrito">B</ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Itálico">I</ToggleGroupItem>
</ToggleGroup>`,
  tooltip: `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

<TooltipProvider delayDuration={200}>
  <Tooltip>
    <TooltipTrigger>Ajuda</TooltipTrigger>
    <TooltipContent>Passe o mouse ou foque com o teclado.</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
};

export function RadixDemo({ name }: { name: string }) {
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("mensal");
  const [progress, setProgress] = useState(65);
  const [volume, setVolume] = useState([40]);
  const [formats, setFormats] = useState<string[]>(["bold"]);
  const [notice, setNotice] = useState("");
  const feedback = (
    <p aria-live="polite" className="min-h-5 text-xs text-muted-foreground">
      {notice}
    </p>
  );

  switch (name) {
    case "accordion":
      return (
        <Accordion
          type="single"
          collapsible
          defaultValue="nyx"
          className="w-full max-w-md"
        >
          <AccordionItem value="nyx">
            <AccordionTrigger>O que é o Nyx?</AccordionTrigger>
            <AccordionContent>
              Componentes com personalidade, acessíveis e prontos para editar no
              seu projeto.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="codigo">
            <AccordionTrigger>Posso mudar o código?</AccordionTrigger>
            <AccordionContent>
              Sim. A CLI copia o arquivo TSX para o seu projeto.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "alert-dialog":
      return (
        <div className="grid gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Excluir arquivo</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir este arquivo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Este é um exemplo. Confirme para ver o retorno da ação.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => setNotice("Arquivo excluído no exemplo.")}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {feedback}
        </div>
      );
    case "checkbox":
      return (
        <div className="grid gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-bold">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
            />
            Aceito os termos
          </label>
          <p className="text-xs text-muted-foreground">
            {checked ? "Termos aceitos." : "Marque para aceitar."}
          </p>
        </div>
      );
    case "collapsible":
      return (
        <Collapsible className="w-full max-w-sm space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-bold">Arquivos do projeto</span>
            <CollapsibleTrigger asChild>
              <Button size="sm">Ver mais</Button>
            </CollapsibleTrigger>
          </div>
          <div className="border-2 border-border bg-muted p-3 text-sm">
            package.json
          </div>
          <CollapsibleContent className="space-y-3">
            <div className="border-2 border-border p-3 text-sm">
              src/components/button.tsx
            </div>
            <div className="border-2 border-border p-3 text-sm">
              src/lib/utils.ts
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    case "context-menu":
      return (
        <div className="w-full max-w-sm space-y-4">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-36 items-center justify-center border-2 border-dashed border-border bg-muted p-4 text-center text-sm font-bold">
              Clique com o botão direito
              <br />
              ou pressione e segure.
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onSelect={() => setNotice("Link copiado no exemplo.")}
              >
                Copiar link
              </ContextMenuItem>
              <ContextMenuItem
                onSelect={() => setNotice("Arquivo duplicado no exemplo.")}
              >
                Duplicar
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
              >
                Mostrar detalhes
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
          {feedback}
        </div>
      );
    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Abrir gaveta</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Resumo do projeto</DrawerTitle>
              <DrawerDescription>
                Uma gaveta inferior para informações rápidas.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-3 py-4 text-sm">
              <p>
                <strong>Nome:</strong> Identidade Nyx
              </p>
              <p>
                <strong>Status:</strong> Em andamento
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="primary">Concluir</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    case "dropdown-menu":
      return (
        <div className="grid gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Ações do projeto ↓</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Meu projeto</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => setNotice("Modo de edição ativado.")}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setNotice("Projeto duplicado no exemplo.")}
              >
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
              >
                Favorito
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {feedback}
        </div>
      );
    case "menubar":
      return (
        <div className="grid gap-4">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Arquivo</MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onSelect={() => setNotice("Novo projeto criado no exemplo.")}
                >
                  Novo projeto
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onSelect={() => setNotice("Exportação pronta no exemplo.")}
                >
                  Exportar
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Editar</MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onSelect={() => setNotice("Última ação desfeita.")}
                >
                  Desfazer
                </MenubarItem>
                <MenubarItem
                  onSelect={() => setNotice("Conteúdo copiado no exemplo.")}
                >
                  Copiar
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          {feedback}
        </div>
      );
    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-56 max-w-full space-y-2">
                  <NavigationMenuLink href="#instalacao">
                    Instalação
                    <p className="mt-1 text-xs font-normal text-muted-foreground">
                      Comece pelo primeiro componente.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#componentes">
                    Componentes
                    <p className="mt-1 text-xs font-normal text-muted-foreground">
                      Explore o catálogo completo.
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#temas"
                className="border-2 border-border py-2.5"
              >
                Temas
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button>Configurações</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-3">
              <p className="font-black">Nome do projeto</p>
              <label className="grid gap-2 text-xs font-bold">
                Título
                <Input defaultValue="Meu projeto Nyx" />
              </label>
              <p className="text-xs text-muted-foreground">
                Clique fora ou pressione Esc para fechar.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      );
    case "progress":
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between text-sm font-bold">
            <span>Upload de arquivos</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} aria-label="Progresso do upload" />
          <Button
            size="sm"
            onClick={() =>
              setProgress(progress >= 100 ? 0 : Math.min(100, progress + 15))
            }
          >
            {progress >= 100 ? "Reiniciar" : "Avançar"}
          </Button>
        </div>
      );
    case "radio-group":
      return (
        <div className="grid gap-4">
          <RadioGroup
            value={choice}
            onValueChange={setChoice}
            aria-label="Plano de cobrança"
          >
            <label className="flex cursor-pointer items-center gap-3 text-sm font-bold">
              <RadioGroupItem value="mensal" />
              Mensal — R$ 29
            </label>
            <label className="flex cursor-pointer items-center gap-3 text-sm font-bold">
              <RadioGroupItem value="anual" />
              Anual — R$ 290
            </label>
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Plano selecionado: {choice}.
          </p>
        </div>
      );
    case "resizable":
      return (
        <ResizablePanelGroup
          orientation="horizontal"
          style={{ height: 176 }}
          className="w-full max-w-md"
        >
          <ResizablePanel defaultSize="45%" minSize="20%">
            <div className="grid h-full place-items-center p-2 text-xs font-black sm:text-sm">
              Arquivos
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="55%" minSize="20%">
            <div className="grid h-full place-items-center bg-muted p-2 text-xs font-black sm:text-sm">
              Arraste a divisória
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      );
    case "scroll-area":
      return (
        <ScrollArea className="h-52 w-full max-w-xs border-2 border-border bg-card">
          <div className="p-4">
            <p className="mb-3 font-black">Atividades recentes</p>
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="border-b border-border/30 py-3 text-sm"
              >
                Atualização do projeto #{12 - index}
              </div>
            ))}
          </div>
        </ScrollArea>
      );
    case "select":
      return (
        <div className="w-full max-w-xs space-y-3">
          <label className="text-sm font-bold" htmlFor="demo-team">
            Equipe do projeto
          </label>
          <Select defaultValue="design">
            <SelectTrigger id="demo-team">
              <SelectValue placeholder="Selecione uma equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="dev">Desenvolvimento</SelectItem>
              <SelectItem value="produto">Produto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button>Abrir painel lateral</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar projeto</SheetTitle>
              <SheetDescription>
                Atualize os dados do seu projeto.
              </SheetDescription>
            </SheetHeader>
            <label className="grid gap-2 py-4 text-sm font-bold">
              Nome
              <Input defaultValue="Identidade Nyx" />
            </label>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="primary">Salvar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    case "slider":
      return (
        <div className="w-full max-w-sm space-y-5">
          <div className="flex justify-between text-sm font-bold">
            <span>Volume</span>
            <output>{volume[0]}%</output>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={5}
            thumbLabels={["Volume"]}
          />
        </div>
      );
    case "switch":
      return (
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-bold">
            <Switch checked={checked} onCheckedChange={setChecked} />
            Receber notificações
          </label>
          <p className="text-xs text-muted-foreground">
            Notificações {checked ? "ativadas" : "desativadas"}.
          </p>
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="geral" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="equipe">Equipe</TabsTrigger>
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
          </TabsList>
          <TabsContent
            value="geral"
            className="border-2 border-border p-4 text-sm"
          >
            Seu projeto está pronto para receber componentes.
          </TabsContent>
          <TabsContent
            value="equipe"
            className="border-2 border-border p-4 text-sm"
          >
            Design, desenvolvimento e produto no mesmo lugar.
          </TabsContent>
          <TabsContent
            value="atividade"
            className="border-2 border-border p-4 text-sm"
          >
            Última atualização: agora mesmo.
          </TabsContent>
        </Tabs>
      );
    case "toast":
      return (
        <ToastProvider duration={4000}>
          <div className="space-y-3 text-center">
            <Button onClick={() => setOpen(true)}>Salvar e notificar</Button>
            <p className="text-xs text-muted-foreground">
              A notificação aparece no canto inferior.
              <br />
              Use F8 para focá-la.
            </p>
          </div>
          <Toast open={open} onOpenChange={setOpen}>
            <div className="grid gap-1">
              <ToastTitle>Projeto salvo</ToastTitle>
              <ToastDescription>
                Suas alterações foram salvas com sucesso.
              </ToastDescription>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    case "toggle":
      return (
        <div className="grid justify-items-center gap-4">
          <Toggle
            variant="outline"
            pressed={checked}
            onPressedChange={setChecked}
            aria-label="Ativar negrito"
          >
            <Bold aria-hidden="true" />
          </Toggle>
          <p className={`text-sm ${checked ? "font-black" : "font-normal"}`}>
            Texto de exemplo
          </p>
        </div>
      );
    case "toggle-group":
      return (
        <div className="grid justify-items-center gap-4">
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={formats}
            onValueChange={setFormats}
            aria-label="Formatação do texto"
          >
            <ToggleGroupItem value="bold" aria-label="Negrito">
              <Bold aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Itálico">
              <Italic aria-hidden="true" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Sublinhado">
              <Underline aria-hidden="true" />
            </ToggleGroupItem>
          </ToggleGroup>
          <p
            className={`text-sm ${formats.includes("bold") ? "font-black" : ""} ${formats.includes("italic") ? "italic" : ""} ${formats.includes("underline") ? "underline" : ""}`}
          >
            Texto formatado
          </p>
        </div>
      );
    case "tooltip":
      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Passe o mouse ou foque</Button>
            </TooltipTrigger>
            <TooltipContent>
              Dica acessível pelo mouse e teclado.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    default:
      return null;
  }
}
