import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const exportDirectory = path.join(projectRoot, "docs-site", "out");
const pagesDirectory = path.join(projectRoot, "docs");

await rm(pagesDirectory, { recursive: true, force: true });
await mkdir(pagesDirectory, { recursive: true });
await cp(exportDirectory, pagesDirectory, { recursive: true });
console.log(`Static Next.js export copied to ${path.relative(projectRoot, pagesDirectory)}`);
