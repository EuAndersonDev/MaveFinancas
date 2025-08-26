import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mave Finanças",
  description: "Plataforma de gestão financeira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
