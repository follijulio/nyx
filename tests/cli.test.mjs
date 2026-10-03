import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "bin/nyx.mjs");
const registry = JSON.parse(await readFile(path.join(root, "registry/components.json"), "utf8"));

async function fixture(t) {
  const cwd = await mkdtemp(path.join(tmpdir(), "nyx-cli-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const versions = Object.assign({}, ...registry.map((entry) => entry.dependencyVersions));
  const dependencies = Object.fromEntries(["clsx", "tailwind-merge", ...registry.flatMap((entry) => entry.dependencies)].map((dependency) => [dependency, versions[dependency] ?? "*"]));
  await writeFile(path.join(cwd, "package.json"), JSON.stringify({ name: "nyx-smoke", private: true, dependencies }));
  const tools = path.join(cwd, "tools");
  await mkdir(tools);
  // Never perform real package installation in integration fixtures.
  await writeFile(path.join(tools, process.platform === "win32" ? "npm.cmd" : "npm"), process.platform === "win32" ? "@echo off\r\nexit /b 23\r\n" : "#!/bin/sh\nexit 23\n", { mode: 0o755 });
  const env = { ...process.env };
  const pathKey = Object.keys(env).find((key) => key.toLowerCase() === "path");
  const oldPath = env[pathKey];
  delete env[pathKey];
  env.PATH = `${tools}${path.delimiter}${oldPath}`;
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd, env, encoding: "utf8", timeout: 15000 });
  const init = run("init", "--yes");
  assert.equal(init.status, 0, init.stderr);
  return { cwd, run };
}

test("all 64 reference components plus Search install as editable source", async (t) => {
  const { cwd, run } = await fixture(t);
  const result = run("add", "--all", "--yes");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(registry.length, 65);
  for (const entry of registry) {
    const source = await readFile(path.join(cwd, "src/components/ui", `${entry.name}.tsx`), "utf8");
    assert(!source.includes("@/src/lib/utils"), `${entry.name} has an unresolved template alias`);
    for (const dependency of entry.registryDependencies) await readFile(path.join(cwd, "src/components/ui", `${dependency}.tsx`));
  }
  assert.match(run("list").stdout, /questionnaire/);
});

test("date-picker brings its local dependencies and honors a custom utils alias", async (t) => {
  const { cwd, run } = await fixture(t);
  const configPath = path.join(cwd, "nyx.json");
  const config = JSON.parse(await readFile(configPath, "utf8"));
  config.aliases.utils = "@/helpers/classes";
  await writeFile(configPath, JSON.stringify(config));
  const result = run("add", "date-picker", "--yes");
  assert.equal(result.status, 0, result.stderr);
  for (const name of ["date-picker", "calendar", "popover", "button"]) {
    const source = await readFile(path.join(cwd, "src/components/ui", `${name}.tsx`), "utf8");
    assert(source.includes("@/helpers/classes"), `${name} should use the configured alias`);
  }
});

test("existing source is preserved unless overwrite is requested", async (t) => {
  const { cwd, run } = await fixture(t);
  const file = path.join(cwd, "src/components/ui/button.tsx");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, "// application customization\n");
  assert.equal(run("add", "button", "--yes").status, 0);
  assert.equal(await readFile(file, "utf8"), "// application customization\n");
  assert.equal(run("add", "button", "--yes", "--overwrite").status, 0);
  assert.match(await readFile(file, "utf8"), /export const Button/);
});

test("unknown components fail before installing or writing source", async (t) => {
  const { run } = await fixture(t);
  const result = run("add", "button", "not-a-component", "--yes");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Componente desconhecido/);
  assert.equal(result.stdout, "");
});

test("incompatible installed packages are upgraded before templates are written", async (t) => {
  const { cwd, run } = await fixture(t);
  const installed = path.join(cwd, "node_modules/react-day-picker");
  await mkdir(installed, { recursive: true });
  await writeFile(path.join(installed, "package.json"), JSON.stringify({ version: "8.10.0" }));
  const result = run("add", "calendar", "--yes");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /npm install react-day-picker@\^9/);
  await assert.rejects(readFile(path.join(cwd, "src/components/ui/calendar.tsx")), { code: "ENOENT" });
});

test("init retries missing utility dependencies without replacing configuration", async (t) => {
  const { cwd, run } = await fixture(t);
  const configPath = path.join(cwd, "nyx.json");
  const before = await readFile(configPath, "utf8");
  await writeFile(path.join(cwd, "package.json"), JSON.stringify({ name: "nyx-smoke", private: true }));
  const result = run("init", "--yes");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /npm install clsx tailwind-merge/);
  assert.equal(await readFile(configPath, "utf8"), before);
});
