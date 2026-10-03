import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nyx UI — componentes com peso",
  description:
    "Uma biblioteca Neo-Brutalista para React. Instale componentes editáveis direto no seu projeto com a CLI Nyx.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
