// components/phones/PhonesHero.tsx
"use client";

interface PhonesHeroProps {
  phonesCount?: number;
  brandsCount?: number;
}

export function PhonesHero({ phonesCount = 0, brandsCount = 0 }: PhonesHeroProps) {
  return (
    <section className="relative rounded-[24px] overflow-hidden mt-5 bg-gradient-to-br from-[#FF6B00] via-[#FF8C00] to-[#FFA500] text-white">
      <div className="relative z-10 p-8 md:p-11 flex flex-wrap justify-between gap-7">
        <div className="max-w-[600px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📱</span>
            <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/20 px-3 py-1 rounded-full font-semibold">
              Phones Hub
            </span>
          </div>
          <h1 className="font-fraunces font-medium text-[clamp(2.2rem,4.6vw,3.5rem)] tracking-[-0.03em] leading-[1.1]">
            Smartphone <em className="italic not-italic text-[#FFD700]">Directory</em>
          </h1>
          <p className="mt-3.5 text-white/90 text-[1rem] leading-[1.6] max-w-[560px]">
            Every phone 7pexel tracks, from every brand — side by side. Compare specs, read reviews, and find your perfect device.
          </p>
        </div>
        <div className="flex gap-0 flex-wrap items-start">
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/30 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">{phonesCount}+</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/80">Phones</span>
          </div>
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/30 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">{brandsCount}</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/80">Brands</span>
          </div>
          <div className="flex flex-col gap-1 px-6.5 border-l border-white/30 first:border-l-0 first:pl-0">
            <span className="font-fraunces font-semibold text-2xl text-white">2026</span>
            <span className="font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/80">Latest Models</span>
          </div>
        </div>
      </div>
      {/* Decorative orange gradient circles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 800 400" preserveAspectRatio="none">
        <circle cx="700" cy="60" r="200" stroke="rgba(255,215,0,0.15)" strokeWidth="1" fill="none" />
        <circle cx="700" cy="60" r="260" stroke="rgba(255,215,0,0.10)" strokeWidth="1" fill="none" />
        <circle cx="100" cy="350" r="150" stroke="rgba(255,215,0,0.08)" strokeWidth="1" fill="none" />
      </svg>
    </section>
  );
}