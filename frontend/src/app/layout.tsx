import { Mulish } from "next/font/google";
import "./globals.css";
import "../styles/sweetalert-dark.css";
import { AuthProvider } from "./context/context";
import AuthGuard from "@/components/AuthGuard/AuthGuard";

export const metadata = {
  title: "Mave Finanças",
};

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.variable} antialiased`}>
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
