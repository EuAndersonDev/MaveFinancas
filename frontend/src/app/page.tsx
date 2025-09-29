import Header from "@/components/header/header";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="relative flex h-screen text-white overflow-hidden"
      style={{ backgroundColor: "#0B0B0D" }}
    >
      <Header />
      {/* Conteúdo principal à esquerda */}
      <section className="relative z-10 flex flex-col justify-center items-start w-1/2 px-16">
      <div>
        <h1 className="text-3xl font-bold mb-4">Bem-vindo</h1>
        <p className="text-gray-300 max-w-md">
          A Mave Finanças é uma plataforma de gestão financeira que monitora suas
          movimentações e oferece insights personalizados, facilitando o controle
          do seu orçamento.
        </p>
      </div>
        <div className="mt-6">

        </div>
      </section>

      {/* Espaço vazio para equilibrar o layout (direita) */}
      <div className="w-1/2" />

      {/* Logo decorativa posicionada metade fora da tela */}
      <Image
        src="/logoLogin.svg"
        alt="Logo Mave Finanças"
        width={987}
        height={958}
        priority
        className="pointer-events-none select-none absolute top-1/2 -translate-y-1/2 right-[-0px]"
      />
    </main>
  );
}
