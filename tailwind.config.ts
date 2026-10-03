import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
        destructive: { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        paper: "var(--paper)",
        ink: "var(--ink)",
        terracotta: "var(--terracotta)",
      },
      borderRadius: {
        sm: "var(--radius)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius)",
      },
      boxShadow: {
        nyx: "4px 4px 0 0 var(--ink)",
        "nyx-sm": "2px 2px 0 0 var(--ink)",
        "nyx-lg": "7px 7px 0 0 var(--ink)",
      },
      borderWidth: { 3: "3px" },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
