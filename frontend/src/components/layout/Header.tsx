// Migrated from components/header/header.tsx
export default function Header() {
  return (
    <div className="w-full max-w-[1442px] mx-auto px-8 py-4 border-b border-white/10 flex justify-between items-center">
      <div className="flex items-center gap-12">
        <div className="w-44 flex items-center gap-2.5">
          <div className="w-5 h-1.5 bg-lime-600" />
          <div className="w-7 h-3 bg-lime-600" />
          <div className="w-6 h-2.5 bg-lime-600" />
          <div className="w-3 h-[2.64px] bg-lime-600" />
            <div className="w-6 h-2.5 bg-lime-600" />
          <div className="w-5 h-1.5 bg-lime-600" />
          <div className="w-3 h-[2.67px] bg-lime-600" />
          <div className="text-white text-3xl font-bold leading-10">Mave</div>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a className="text-lime-600 font-bold" href="#">Dashboard</a>
          <a className="text-zinc-500 font-semibold" href="#">Transações</a>
          <a className="text-zinc-500 font-semibold" href="#">Assinatura</a>
        </nav>
      </div>
      <div className="min-h-10 px-4 py-2 rounded-lg outline outline-1 outline-white/10 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 relative">
            <div className="w-5 h-5 absolute inset-0 bg-white rounded-full" />
            {/* Placeholder avatar */}
            <img className="w-5 h-5 absolute inset-0 rounded-full" src="https://placehold.co/20x20" alt="User" />
          </div>
          <span className="text-white text-sm font-semibold">Alicia Koch</span>
        </div>
      </div>
    </div>
  );
}
