import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { catalog } from "./catalog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const names = new Set(catalog.map(([name]) => name));
const dependencyVersions = { "react-day-picker": "^9.14.0", "react-resizable-panels": "^4.14.2", recharts: "^3.10.1", cmdk: "^1.1.1", "input-otp": "^1.5.0" };
const entries = await Promise.all(catalog.map(async ([name, label, description, category]) => {
  const source = await readFile(path.join(root, "registry", `${name}.tsx`), "utf8");
  const imports = [...source.matchAll(/(?:from\s+|import\s*)["']([^"']+)["']/g)].map((match) => match[1]);
  const dependencies = [...new Set(imports.filter((value) => !value.startsWith(".") && !value.startsWith("@/") && !["react", "react-dom"].includes(value)).map((value) => value.startsWith("@") ? value.split("/").slice(0, 2).join("/") : value.split("/")[0]))].sort();
  const registryDependencies = [...new Set(imports.filter((value) => value.startsWith("./")).map((value) => value.slice(2).replace(/\.tsx?$/, "")))].sort();
  for (const dependency of registryDependencies) if (!names.has(dependency)) throw new Error(`${name}: unknown local dependency ${dependency}`);
  return { name, label, description, category, dependencies, dependencyVersions: Object.fromEntries(dependencies.filter((dependency) => dependencyVersions[dependency]).map((dependency) => [dependency, dependencyVersions[dependency]])), registryDependencies };
}));
await writeFile(path.join(root, "registry", "components.json"), `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Registry generated: ${entries.length} components.`);
