export default function HeroMosaic() {
    return (
      <div className="h-full w-full p-8 bg-brand/10">
        <div className="grid h-full grid-cols-2 grid-rows-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-ringbrand"
            />
          ))}
        </div>
      </div>
    );
  }
  