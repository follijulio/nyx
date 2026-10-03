#!/usr/bin/env node
import { Command } from "commander";
import prompts from "prompts";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import semver from "semver";

const program = new Command();
const root = process.cwd();
const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(await fs.readFile(path.join(cliRoot, "registry", "components.json"), "utf8"));
const components = registry.map(({ name }) => name);
const entries = new Map(registry.map((entry) => [entry.name, entry]));
const read = (file) => fs.readFile(path.join(cliRoot, "registry", file), "utf8");
const exists = async (file) => fs.access(file).then(() => true, () => false);
async function packageManager() {
  const lock = await Promise.all(["pnpm-lock.yaml", "yarn.lock", "bun.lockb", "bun.lock", "package-lock.json"].map(async (f) => (await exists(path.join(root, f))) ? f : null));
  const file = lock.find(Boolean);
  return file?.startsWith("pnpm") ? "pnpm" : file?.startsWith("yarn") ? "yarn" : file?.startsWith("bun") ? "bun" : "npm";
}
function installPackages(pm, packages) {
  const args = pm === "npm" ? ["install", ...packages] : ["add", ...packages];
  // Windows package managers are .cmd launchers; quotes preserve caret ranges.
  const commandArgs = process.platform === "win32" ? args.map((arg) => `"${arg}"`) : args;
  const result = spawnSync(pm, commandArgs, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error(`Falha ao executar ${pm} ${args.join(" ")}`);
}

async function ensureUtilityDependencies(yes) {
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8").catch(() => "{}"));
  const missing = ["clsx", "tailwind-merge"].filter((dependency) => !pkg.dependencies?.[dependency] && !pkg.devDependencies?.[dependency]);
  if (!missing.length) return;
  const { install } = yes ? { install: true } : await prompts({ type: "confirm", name: "install", message: `Instalar dependências do utilitário cn? ${missing.join(", ")}`, initial: true });
  if (!install) console.log(`Instale para usar cn: ${missing.join(", ")}`);
  else installPackages(await packageManager(), missing);
}

async function config() {
  const file = path.join(root, "nyx.json");
  if (!(await exists(file))) throw new Error("nyx.json não encontrado. Execute `nyx init` primeiro.");
  return JSON.parse(await fs.readFile(file, "utf8"));
}

program.name("nyx").description("Componentes React Neo-Brutalistas, instalados no seu código-fonte.").version("0.1.0");
program.command("list").description("Lista os componentes disponíveis").action(() => {
  for (const entry of registry) console.log(`${entry.name.padEnd(20)} ${entry.description}`);
});
program.command("init").description("Configura Nyx neste projeto").option("--yes", "Usar as opções padrão").action(async ({ yes }) => {
  const defaults = { css: "src/app/globals.css", components: "src/components/ui", utils: "src/lib/utils.ts", tailwind: "tailwind.config.ts" };
  const answers = yes ? defaults : await prompts([
    { type: "text", name: "css", message: "Caminho do CSS global", initial: defaults.css },
    { type: "text", name: "components", message: "Diretório de componentes", initial: defaults.components },
    { type: "text", name: "utils", message: "Caminho do utilitário cn", initial: defaults.utils },
    { type: "text", name: "tailwind", message: "Caminho do tailwind.config.ts", initial: defaults.tailwind },
  ]);
  if (!answers.css) return;
  const configFile = path.join(root, "nyx.json");
  if (await exists(configFile)) {
    const { overwrite } = yes ? { overwrite: false } : await prompts({ type: "confirm", name: "overwrite", message: "nyx.json já existe. Substituir?", initial: false });
    if (!overwrite) {
      await ensureUtilityDependencies(yes);
      return console.log("Configuração existente mantida.");
    }
  }
  const utilsImport = `@/${answers.utils.replace(/\\/g, "/").replace(/^src\//, "").replace(/\.tsx?$/, "")}`;
  const conf = { $schema: "https://nyx-ui.dev/schema.json", style: "neo-brutalist", tailwind: { config: answers.tailwind, css: answers.css }, aliases: { components: answers.components, utils: utilsImport } };
  await fs.mkdir(root, { recursive: true });
  await fs.writeFile(configFile, `${JSON.stringify(conf, null, 2)}\n`);
  const cssPath = path.join(root, answers.css);
  const marker = "/* nyx:theme:start */";
  const cssBlock = await read("theme.css");
  await fs.mkdir(path.dirname(cssPath), { recursive: true });
  const oldCss = await fs.readFile(cssPath, "utf8").catch(() => "");
  if (!oldCss.includes(marker)) await fs.writeFile(cssPath, `${oldCss.trimEnd()}${oldCss ? "\n\n" : ""}${cssBlock}`);
  const tailwindPath = path.join(root, answers.tailwind);
  if (!(await exists(tailwindPath))) await fs.writeFile(tailwindPath, await read("tailwind.config.ts"));
  else console.log(`Tailwind config preservado: ${answers.tailwind}. Consulte registry/tailwind.config.ts para as extensões Nyx.`);
  const utilsPath = path.join(root, answers.utils);
  await fs.mkdir(path.dirname(utilsPath), { recursive: true });
  if (!(await exists(utilsPath))) await fs.writeFile(utilsPath, await read("utils.ts"));
  await ensureUtilityDependencies(yes);
  console.log("Nyx configurada. Tema CSS anexado sem substituir seu CSS; execute `nyx add button` para começar.");
});

program.command("add [component...]").description("Instala componentes e suas dependências locais").option("--all", "Instalar todos os componentes").option("--yes", "Instalar dependências sem perguntar").option("--overwrite", "Substituir arquivos existentes").action(async (names, opts) => {
  const conf = await config();
  const requested = opts.all ? components : names.map((name) => name.toLowerCase());
  if (!requested.length) throw new Error("Informe pelo menos um componente ou use `nyx add --all`.");
  for (const name of requested) if (!entries.has(name)) throw new Error(`Componente desconhecido: ${name}. Execute \`nyx list\` para ver as opções.`);
  const selected = [];
  const visited = new Set();
  const visiting = new Set();
  function resolve(name) {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new Error(`Dependência circular no registry: ${name}`);
    visiting.add(name);
    for (const dependency of entries.get(name).registryDependencies) {
      if (!entries.has(dependency)) throw new Error(`Dependência local desconhecida: ${dependency}`);
      resolve(dependency);
    }
    visiting.delete(name);
    visited.add(name);
    selected.push(name);
  }
  requested.forEach(resolve);
  const deps = [...new Set(["clsx", "tailwind-merge", ...selected.flatMap((name) => entries.get(name).dependencies)])];
  const versions = Object.assign({}, ...selected.map((name) => entries.get(name).dependencyVersions));
  const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8").catch(() => "{}"));
  const required = (await Promise.all(deps.map(async (dependency) => {
    const declared = pkg.dependencies?.[dependency] ?? pkg.devDependencies?.[dependency];
    if (!declared) return dependency;
    const range = versions[dependency];
    if (!range) return null;
    const installed = JSON.parse(await fs.readFile(path.join(root, "node_modules", dependency, "package.json"), "utf8").catch(() => "{}"));
    const compatible = installed.version ? semver.satisfies(installed.version, range) : semver.validRange(declared) && semver.subset(declared, range);
    return compatible ? null : dependency;
  }))).filter(Boolean);
  if (required.length) {
    const packages = required.map((dependency) => versions[dependency] ? `${dependency}@${versions[dependency]}` : dependency);
    const { install } = opts.yes ? { install: true } : await prompts({ type: "confirm", name: "install", message: `Instalar ou atualizar dependências necessárias? ${packages.join(", ")}`, initial: true });
    if (!install) throw new Error(`Dependências necessárias: ${packages.join(", ")}`);
    installPackages(await packageManager(), packages);
  }
  const outDir = path.resolve(root, conf.aliases.components.replace(/^@\//, ""));
  await fs.mkdir(outDir, { recursive: true });
  for (const name of selected) {
    const destination = path.join(outDir, `${name}.tsx`);
    if (await exists(destination) && !opts.overwrite) {
      const { overwrite } = opts.yes ? { overwrite: false } : await prompts({ type: "confirm", name: "overwrite", message: `${name}.tsx já existe. Substituir?`, initial: false });
      if (!overwrite) { console.log(`Ignorado: ${destination}`); continue; }
    }
    const template = (await read(`${name}.tsx`)).replaceAll("@/src/lib/utils", conf.aliases.utils);
    await fs.writeFile(destination, template);
    console.log(`Adicionado ${path.relative(root, destination)}`);
  }
});

program.parseAsync().catch((error) => { console.error(`nyx: ${error.message}`); process.exitCode = 1; });
