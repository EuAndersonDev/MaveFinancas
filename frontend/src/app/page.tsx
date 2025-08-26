import Logo from "@/components/Logo";
import WelcomeText from "@/components/WelcomeText";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <main className="flex h-screen bg-black text-white">
      {/* Lado esquerdo */}
      <section className="flex flex-col justify-center items-start w-1/2 px-16">
        <Logo />
        <WelcomeText />
        <div className="mt-6">
          <AuthButton />
        </div>
      </section>

      {/* Lado direito (mockup das telas) */}
      <section className="w-1/2 bg-green-600 flex justify-center items-center">
        <img
          src="/mockup.png"
          alt="Preview da aplicação"
          className="rounded-lg shadow-lg w-[90%]"
        />
      </section>
    </main>
  );
}
