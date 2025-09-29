import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mave Finanças",
  description: "Plataforma Mave Finanças",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${mulish.variable}`}>
      <body className={mulish.className}>{children}</body>
    </html>
  );
}
