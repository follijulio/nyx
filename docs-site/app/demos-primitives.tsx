"use client";

import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Attachment, AttachmentItem } from "@/components/ui/attachment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bubble, BubbleContent, BubbleFooter } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { DirectionProvider } from "@/components/ui/direction";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Marker } from "@/components/ui/marker";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import { Alert } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Search } from "@/components/ui/search";

export const primitiveExamples: Record<string, string> = {
  button: `import { Button } from "@/components/ui/button";

<Button variant="primary">Começar</Button>
<Button variant="secondary">Saiba mais</Button>
<Button disabled>Indisponível</Button>`,
  card: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

<Card>
  <CardHeader>
    <CardTitle>Projeto Nyx</CardTitle>
  </CardHeader>
  <CardContent>Seu próximo projeto começa aqui.</CardContent>
  <CardFooter>
    <Button>Começar</Button>
  </CardFooter>
</Card>`,
  input: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="voce@exemplo.com" />
</div>`,
  search: `"use client";
import { useState } from "react";
import { Search } from "@/components/ui/search";

export function ComponentSearch() {
  const [query, setQuery] = useState("");
  return <Search value={query} onValueChange={setQuery}
    aria-label="Buscar componentes" placeholder="Buscar componentes…" />;
}`,
  alert: `import { Alert } from "@/components/ui/alert";

<Alert tone="success" title="Tudo pronto!">
  Seus componentes foram adicionados ao projeto.
</Alert>`,
  dialog: `import { Dialog, DialogTrigger, DialogContent, DialogTitle,
  DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir diálogo</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Criar projeto</DialogTitle>
    <DialogDescription>
      Dê vida à sua próxima ideia.
    </DialogDescription>
    <DialogClose asChild>
      <Button>Concluir</Button>
    </DialogClose>
  </DialogContent>
</Dialog>`,
  "hover-card": `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger href="https://github.com">@follijulio</HoverCardTrigger>
  <HoverCardContent>
    <p className="font-bold">Nyx UI</p>
    <p>Componentes React com personalidade.</p>
  </HoverCardContent>
</HoverCard>`,
  "aspect-ratio": `import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9} className="bg-primary">
  <div className="flex h-full items-center justify-center">16:9</div>
</AspectRatio>`,
  attachment: `"use client";
import { useState } from "react";
import { Attachment, AttachmentItem } from "@/components/ui/attachment";

export function Files() {
  const [files, setFiles] = useState<File[]>([]);
  return <>
    <Attachment multiple label="Anexar arquivos" onFilesChange={setFiles} />
    {files.map((file, index) => <AttachmentItem key={index} file={file}
      onRemove={() => setFiles(files.filter((_, i) => i !== index))} />)}
  </>;
}`,
  avatar: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Retrato de Ana" />
  <AvatarFallback>AN</AvatarFallback>
</Avatar>`,
  badge: `import { Badge } from "@/components/ui/badge";

<Badge>Publicado</Badge>
<Badge variant="secondary">Rascunho</Badge>
<Badge variant="outline">Arquivo</Badge>`,
  breadcrumb: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

<Breadcrumb aria-label="Caminho da página">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Componentes</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  bubble: `import { Bubble, BubbleContent, BubbleFooter } from "@/components/ui/bubble";

<Bubble variant="outgoing">
  <BubbleContent>Vamos construir algo?</BubbleContent>
  <BubbleFooter><time dateTime="14:30">14:30</time> · Enviado</BubbleFooter>
</Bubble>`,
  "button-group": `import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

<ButtonGroup aria-label="Ações do documento">
  <Button>Salvar</Button>
  <Button variant="secondary">Exportar</Button>
</ButtonGroup>`,
  direction: `import { DirectionProvider } from "@/components/ui/direction";

<DirectionProvider dir="rtl">
  <div dir="rtl" className="border-2 border-border p-4">
    <p>مرحبا بالعالم</p>
  </div>
</DirectionProvider>`,
  empty: `import { Empty, EmptyHeader, EmptyTitle, EmptyDescription,
  EmptyContent } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

<Empty>
  <EmptyHeader>
    <EmptyTitle>Nenhum projeto</EmptyTitle>
    <EmptyDescription>Seu próximo projeto começa aqui.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Criar projeto</Button>
  </EmptyContent>
</Empty>`,
  field: `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

<Field>
  <FieldLabel htmlFor="email">E-mail</FieldLabel>
  <Input id="email" type="email" aria-describedby="email-help" />
  <FieldDescription id="email-help">Use seu e-mail de trabalho.</FieldDescription>
</Field>`,
  "input-group": `import { InputGroup, InputGroupAddon, InputGroupInput,
  InputGroupText } from "@/components/ui/input-group";

<InputGroup>
  <InputGroupAddon>
    <InputGroupText>@</InputGroupText>
  </InputGroupAddon>
  <InputGroupInput
    aria-label="Nome de usuário"
    placeholder="seu.nome"
  />
</InputGroup>`,
  item: `import { Item, ItemContent, ItemTitle, ItemDescription,
  ItemActions } from "@/components/ui/item";
import { Button } from "@/components/ui/button";

<Item role="article">
  <ItemContent>
    <ItemTitle>Projeto Nyx</ItemTitle>
    <ItemDescription>Atualizado há 2 minutos.</ItemDescription>
  </ItemContent>
  <ItemActions><Button size="sm">Abrir</Button></ItemActions>
</Item>`,
  kbd: `import { Kbd, KbdGroup } from "@/components/ui/kbd";

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>K</Kbd>
</KbdGroup>`,
  label: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="grid gap-2">
  <Label htmlFor="name">Nome</Label>
  <Input id="name" placeholder="Seu nome" />
</div>`,
  marker: `import { Marker } from "@/components/ui/marker";

<p>Uma ideia com <Marker>destaque</Marker> e personalidade.</p>`,
  message: `import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";

<Message from="assistant" aria-label="Mensagem de Nyx">
  <MessageAvatar aria-hidden="true">NY</MessageAvatar>
  <MessageContent>Olá! Vamos começar?</MessageContent>
</Message>`,
  "native-select": `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

<NativeSelect aria-label="Escolha uma linguagem" defaultValue="typescript">
  <NativeSelectOption value="typescript">TypeScript</NativeSelectOption>
  <NativeSelectOption value="javascript">JavaScript</NativeSelectOption>
</NativeSelect>`,
  separator: `import { Separator } from "@/components/ui/separator";

<div className="grid gap-3">
  <p>Componentes</p>
  <Separator decorative={false} />
  <p>Documentação</p>
</div>`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton";

<div role="status" aria-label="Carregando perfil" className="flex gap-3">
  <Skeleton className="size-12" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-4 w-24" />
  </div>
</div>`,
  spinner: `import { Spinner } from "@/components/ui/spinner";

<Spinner label="Carregando componentes" />`,
  table: `import { Table, TableHeader, TableBody, TableRow, TableHead,
  TableCell, TableCaption } from "@/components/ui/table";

<Table>
  <TableCaption>Projetos recentes</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Projeto</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Nyx</TableCell>
      <TableCell>Publicado</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  textarea: `import { Textarea } from "@/components/ui/textarea";

<Textarea aria-label="Sua mensagem" placeholder="Escreva sua mensagem…" rows={4} />`,
  typography: `import { Typography } from "@/components/ui/typography";

<Typography variant="h2">Ideias com peso.</Typography>
<Typography variant="lead">Cada palavra também tem personalidade.</Typography>
<Typography>Texto claro, hierarquia forte e leitura confortável.</Typography>`,
};

function AttachmentDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-full space-y-3">
      <Attachment multiple label="Anexar arquivos" onFilesChange={setFiles} />
      <p className="text-xs text-muted-foreground">
        Selecione arquivos do seu computador para ver os anexos.
      </p>
      {files.map((file, index) => (
        <AttachmentItem
          key={`${file.name}-${index}`}
          file={file}
          removeLabel="Remover anexo"
          onRemove={() =>
            setFiles((current) => current.filter((_, i) => i !== index))
          }
        />
      ))}
    </div>
  );
}

function ButtonGroupDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-3">
      <ButtonGroup aria-label="Paginação">
        <Button
          size="sm"
          aria-label="Página anterior"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ←
        </Button>
        <ButtonGroupText>Página {page}</ButtonGroupText>
        <Button
          size="sm"
          aria-label="Próxima página"
          disabled={page === 5}
          onClick={() => setPage(page + 1)}
        >
          →
        </Button>
      </ButtonGroup>
      <p role="status" className="text-xs text-muted-foreground">
        Página {page} de 5
      </p>
    </div>
  );
}

function DirectionDemo() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  return (
    <div className="w-full space-y-3">
      <Button size="sm" onClick={() => setDir(dir === "ltr" ? "rtl" : "ltr")}>
        {dir === "ltr" ? "Usar RTL" : "Usar LTR"}
      </Button>
      <DirectionProvider dir={dir}>
        <div dir={dir} className="border-2 border-border bg-accent p-4">
          <p className="font-bold">
            {dir === "rtl" ? "مرحبا بالعالم" : "Olá, mundo!"}
          </p>
          <p className="mt-1 text-xs">{dir.toUpperCase()}</p>
        </div>
      </DirectionProvider>
    </div>
  );
}

function EmptyDemo() {
  const [created, setCreated] = useState(false);
  return created ? (
    <div className="grid gap-3">
      <Badge>Projeto criado</Badge>
      <p className="text-sm">Seu primeiro projeto está pronto para começar.</p>
      <Button size="sm" variant="outline" onClick={() => setCreated(false)}>
        Reiniciar exemplo
      </Button>
    </div>
  ) : (
    <Empty className="w-full p-5">
      <EmptyHeader>
        <EmptyMedia aria-hidden="true">＋</EmptyMedia>
        <EmptyTitle>Nenhum projeto ainda</EmptyTitle>
        <EmptyDescription>Sua próxima ideia começa aqui.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="primary" onClick={() => setCreated(true)}>
          Criar projeto
        </Button>
      </EmptyContent>
    </Empty>
  );
}

function FieldDemo() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <form
      noValidate
      className="w-full space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <FieldGroup>
        <Field invalid={invalid}>
          <FieldLabel htmlFor="demo-field-email">E-mail</FieldLabel>
          <Input
            id="demo-field-email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setSubmitted(false);
            }}
            type="email"
            aria-invalid={invalid}
            aria-describedby={invalid ? "demo-field-error" : "demo-field-help"}
            placeholder="voce@exemplo.com"
          />
          <FieldDescription id="demo-field-help">
            Vamos usar para enviar novidades.
          </FieldDescription>
          {invalid && (
            <FieldError id="demo-field-error">
              Informe um e-mail válido.
            </FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button size="sm" type="submit">
        Validar e-mail
      </Button>
      {submitted && !invalid && (
        <p role="status" className="text-sm font-bold">
          E-mail validado.
        </p>
      )}
    </form>
  );
}

function InputGroupDemo() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <form
      className="w-full space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(value);
      }}
    >
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Nome de usuário"
          placeholder="seu.nome"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" disabled={!value.trim()}>
            Salvar
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {saved && (
        <p role="status" className="text-xs font-bold">
          Usuário @{saved} salvo.
        </p>
      )}
    </form>
  );
}

function ItemDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div className="w-full space-y-3">
      <ItemGroup>
        <Item>
          <ItemMedia aria-hidden="true">✳</ItemMedia>
          <ItemContent>
            <ItemTitle>Projeto Nyx</ItemTitle>
            <ItemDescription>Componentes com personalidade.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" onClick={() => setOpened(!opened)}>
              {opened ? "Fechar" : "Abrir"}
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
      {opened && (
        <div className="border-2 border-border bg-accent p-3 text-sm">
          Nyx UI · React · TypeScript · Tailwind CSS
        </div>
      )}
    </div>
  );
}

function MessageDemo() {
  const [liked, setLiked] = useState(false);
  return (
    <Message aria-label="Mensagem de Nyx" className="w-full">
      <MessageAvatar aria-hidden="true">NY</MessageAvatar>
      <MessageContent>
        Os componentes estão prontos. Vamos construir?
        <MessageActions aria-label="Ações da mensagem">
          <MessageAction aria-pressed={liked} onClick={() => setLiked(!liked)}>
            {liked ? "Gostei ✓" : "Gostei"}
          </MessageAction>
        </MessageActions>
      </MessageContent>
    </Message>
  );
}

function NativeSelectDemo() {
  const [language, setLanguage] = useState("typescript");
  return (
    <div className="w-full space-y-3">
      <Label htmlFor="demo-native-select">Linguagem</Label>
      <NativeSelect
        id="demo-native-select"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        <NativeSelectOption value="typescript">TypeScript</NativeSelectOption>
        <NativeSelectOption value="javascript">JavaScript</NativeSelectOption>
        <NativeSelectOption value="python">Python</NativeSelectOption>
      </NativeSelect>
      <p role="status" className="text-xs text-muted-foreground">
        Selecionado: {language}
      </p>
    </div>
  );
}

function SkeletonDemo() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-full space-y-4">
      {loaded ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">Ana Silva</p>
            <p className="text-sm text-muted-foreground">Designer de produto</p>
          </div>
        </div>
      ) : (
        <div
          role="status"
          aria-label="Carregando perfil"
          className="flex gap-3"
        >
          <Skeleton className="size-12" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      )}
      <Button size="sm" onClick={() => setLoaded(!loaded)}>
        {loaded ? "Mostrar skeleton" : "Carregar perfil"}
      </Button>
    </div>
  );
}

function SpinnerDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <Button size="sm" onClick={() => setLoading(!loading)}>
        {loading ? (
          <>
            <Spinner label="Carregando" /> Pausar
          </>
        ) : (
          "Carregar novamente"
        )}
      </Button>
      {!loading && (
        <span role="status" className="text-sm font-bold">
          Pronto!
        </span>
      )}
    </div>
  );
}

function TextareaDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full space-y-2">
      <Label htmlFor="demo-textarea">Sua mensagem</Label>
      <Textarea
        id="demo-textarea"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        maxLength={160}
        placeholder="Escreva uma mensagem…"
      />
      <p className="text-right text-xs text-muted-foreground">
        {value.length}/160
      </p>
    </div>
  );
}

function ButtonDemo() {
  const [clicks, setClicks] = useState(0);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => setClicks(clicks + 1)}>
          Clique aqui
        </Button>
        <Button variant="secondary" onClick={() => setClicks(0)}>
          Zerar
        </Button>
        <Button disabled>Desabilitado</Button>
      </div>
      <p role="status" className="text-xs font-bold">
        {clicks} {clicks === 1 ? "clique" : "cliques"}
      </p>
    </div>
  );
}

function CardDemo() {
  const [saved, setSaved] = useState(false);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Uma ideia com peso.</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Bordas fortes, sombras duras e componentes que você pode personalizar.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="primary" onClick={() => setSaved(!saved)}>
          {saved ? "Salvo ✓" : "Salvar projeto"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function SearchDemo() {
  const [query, setQuery] = useState("");
  const matches = ["Button", "Card", "Dialog", "Input", "Search"].filter(
    (name) => name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="w-full space-y-3">
      <Search
        value={query}
        onValueChange={setQuery}
        shortcut="Ctrl K"
        aria-label="Buscar componentes"
        placeholder="Buscar componentes…"
      />
      <div role="status" className="flex flex-wrap gap-2">
        {matches.length ? (
          matches.map((name) => (
            <Badge key={name} variant="outline">
              {name}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhum componente encontrado.
          </p>
        )}
      </div>
    </div>
  );
}

function DialogDemo() {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <div className="space-y-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Criar projeto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seu próximo projeto</DialogTitle>
            <DialogDescription>Escolha um nome para começar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="dialog-demo-name">Nome do projeto</Label>
            <Input
              id="dialog-demo-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Minha grande ideia"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="primary"
                disabled={!name.trim()}
                onClick={() => setSaved(name)}
              >
                Criar projeto
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {saved && (
        <p role="status" className="text-sm font-bold">
          Projeto “{saved}” criado.
        </p>
      )}
    </div>
  );
}

export function PrimitiveDemo({ name }: { name: string }) {
  switch (name) {
    case "button":
      return <ButtonDemo />;
    case "card":
      return <CardDemo />;
    case "input":
      return (
        <div className="grid w-full gap-2">
          <Label htmlFor="demo-input-email">E-mail</Label>
          <Input
            id="demo-input-email"
            type="email"
            placeholder="voce@exemplo.com"
          />
          <Input
            disabled
            aria-label="Exemplo desabilitado"
            placeholder="Campo desabilitado"
          />
        </div>
      );
    case "search":
      return <SearchDemo />;
    case "alert":
      return (
        <div className="w-full space-y-4">
          <Alert tone="success" title="Tudo pronto!">
            Componentes adicionados ao seu projeto.
          </Alert>
          <Alert tone="info" title="Código seu">
            Personalize cada detalhe.
          </Alert>
        </div>
      );
    case "dialog":
      return <DialogDemo />;
    case "hover-card":
      return (
        <HoverCard openDelay={150}>
          <HoverCardTrigger
            href="#inicio"
            className="border-b-2 border-border text-base font-black outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            @follijulio ↗
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>NY</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-black">Nyx UI</p>
                <p className="text-xs">React · TypeScript · Tailwind CSS</p>
              </div>
            </div>
            <p className="mt-3 text-sm">
              Componentes com peso. Código aberto e personalidade.
            </p>
          </HoverCardContent>
        </HoverCard>
      );
    case "aspect-ratio":
      return (
        <AspectRatio
          ratio={16 / 9}
          className="w-full border-2 border-border bg-primary shadow-nyx-sm"
        >
          <div className="flex h-full flex-col items-center justify-center">
            <span className="text-4xl font-black">16:9</span>
            <span className="text-xs font-bold">Proporção preservada</span>
          </div>
        </AspectRatio>
      );
    case "attachment":
      return <AttachmentDemo />;
    case "avatar":
      return (
        <div className="flex gap-4">
          <Avatar className="size-14">
            <AvatarImage
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f9c80e'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%23101010'/%3E%3Cpath d='M8 64v-8a24 24 0 0 1 48 0v8' fill='%23101010'/%3E%3C/svg%3E"
              alt="Avatar ilustrado"
            />
            <AvatarFallback>NY</AvatarFallback>
          </Avatar>
          <Avatar className="size-14">
            <AvatarFallback aria-label="Ana Silva">AS</AvatarFallback>
          </Avatar>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-3">
          <Badge>Publicado</Badge>
          <Badge variant="secondary">Rascunho</Badge>
          <Badge variant="outline">Arquivo</Badge>
          <Badge variant="destructive">Erro</Badge>
        </div>
      );
    case "breadcrumb":
      return (
        <Breadcrumb aria-label="Caminho da página">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#inicio">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#componentes">Componentes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case "bubble":
      return (
        <div className="w-full space-y-4">
          <Bubble>
            <BubbleContent>Já conheceu a Nyx?</BubbleContent>
            <BubbleFooter>
              <time dateTime="14:30">14:30</time>
            </BubbleFooter>
          </Bubble>
          <Bubble variant="outgoing">
            <BubbleContent>Sim, bordas fortes e ideias também!</BubbleContent>
            <BubbleFooter>
              <time dateTime="14:31">14:31</time> · Enviado
            </BubbleFooter>
          </Bubble>
        </div>
      );
    case "button-group":
      return <ButtonGroupDemo />;
    case "direction":
      return <DirectionDemo />;
    case "empty":
      return <EmptyDemo />;
    case "field":
      return <FieldDemo />;
    case "input-group":
      return <InputGroupDemo />;
    case "item":
      return <ItemDemo />;
    case "kbd":
      return (
        <div className="space-y-3">
          <p className="text-sm">Atalho para buscar</p>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      );
    case "label":
      return (
        <div className="grid w-full gap-2">
          <Label htmlFor="demo-label-name">Seu nome</Label>
          <Input id="demo-label-name" placeholder="Ana Silva" />
        </div>
      );
    case "marker":
      return (
        <p className="max-w-xs text-lg leading-9">
          Uma biblioteca com <Marker>personalidade</Marker>,{" "}
          <Marker variant="secondary">cor</Marker> e{" "}
          <Marker variant="accent">ideias próprias</Marker>.
        </p>
      );
    case "message":
      return <MessageDemo />;
    case "native-select":
      return <NativeSelectDemo />;
    case "separator":
      return (
        <div className="w-full space-y-3">
          <p className="text-sm font-bold">Componentes</p>
          <Separator decorative={false} />
          <div className="flex h-8 items-center gap-4 text-sm">
            <span>Código</span>
            <Separator orientation="vertical" decorative={false} />
            <span>Documentação</span>
          </div>
        </div>
      );
    case "skeleton":
      return <SkeletonDemo />;
    case "spinner":
      return <SpinnerDemo />;
    case "table":
      return (
        <Table>
          <TableCaption>Projetos recentes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Projeto</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Nyx</TableCell>
              <TableCell>
                <Badge>Publicado</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Juno</TableCell>
              <TableCell>
                <Badge variant="secondary">Em revisão</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "textarea":
      return <TextareaDemo />;
    case "typography":
      return (
        <div className="w-full space-y-3">
          <Typography variant="h3">Ideias com peso.</Typography>
          <Typography variant="lead">
            Cada palavra tem personalidade.
          </Typography>
          <Typography>
            Hierarquia clara, texto confortável e uma identidade que aparece em
            cada detalhe.
          </Typography>
          <Typography variant="blockquote">
            Faça algo que tenha a sua cara.
          </Typography>
          <Typography variant="code">npx nyx-brutal-ui init</Typography>
        </div>
      );
    default:
      return null;
  }
}
