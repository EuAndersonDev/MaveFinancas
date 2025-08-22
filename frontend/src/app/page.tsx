
export default function LoginPage() {
  return (
    <main className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
      {/* Coluna esquerda */}
      <section className="relative flex flex-col justify-center p-8 md:p-16">
        <Logo />

        <h1 className="mt-10 text-4xl md:text-5xl font-semibold tracking-tight">
          Bem-vindo
        </h1>

        <p className="mt-6 max-w-md text-zinc-400">
          A Mave Finanças é uma plataforma de gestão financeira que monitora suas
          movimentações e oferece insights personalizados, facilitando o controle do seu orçamento.
        </p>

        <div className="mt-8 max-w-md">
          <SignInButton />
        </div>

        <div className="absolute bottom-6 left-6">
          <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900/60">
            Iniciar
          </button>
        </div>
      </section>

      {/* Coluna direita */}
      <aside className="hidden md:block">
        <HeroMosaic />
      </aside>
    </main>
  );
}
