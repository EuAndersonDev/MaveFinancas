import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const mulish = localFont({
  src: [
    {
      path: "../fonts/Mulish/Mulish-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
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
      <body>{children}</body>
    </html>
  );
}
