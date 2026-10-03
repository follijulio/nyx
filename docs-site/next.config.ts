import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  // GitHub Pages serves this project from /nyx. Set DOCS_BASE_PATH="" for a custom domain.
  basePath: process.env.DOCS_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/nyx" : ""),
};

export default nextConfig;
