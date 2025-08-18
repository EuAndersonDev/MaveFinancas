import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "Mave Finanças",
  description: "Plataforma de gestão financeira",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark">
      <body className="bg-zinc-950 text-zinc-200 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
