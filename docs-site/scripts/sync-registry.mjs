import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryRoot = path.resolve(docsRoot, "../registry");
const output = path.join(docsRoot, "components/ui");
const manifest = JSON.parse(await readFile(path.join(registryRoot, "components.json"), "utf8"));
await mkdir(output, { recursive: true });
await mkdir(path.join(docsRoot, "lib"), { recursive: true });
await writeFile(path.join(docsRoot, "lib/utils.ts"), await readFile(path.join(registryRoot, "utils.ts"), "utf8"));
const entries = await Promise.all(manifest.map(async (entry) => {
  const source = await readFile(path.join(registryRoot, `${entry.name}.tsx`), "utf8");
  await writeFile(path.join(output, `${entry.name}.tsx`), source.replaceAll("@/src/lib/utils", "@/lib/utils"));
  return { ...entry, source: source.replaceAll("@/src/lib/utils", "@/lib/utils") };
}));
await writeFile(path.join(docsRoot, "app/component-data.json"), `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Docs synced with ${entries.length} registry components.`);
