// components/laptops/FinderBanner.tsx
import Link from "next/link";

export function FinderBanner() {
  return (
    <section className="mt-8">
      <Link
        href="/laptops/finder"
        className="group block relative rounded-[18px] overflow-hidden bg-gradient-to-br from-[#063F47] via-[#0A6B7A] to-[#0891A3] p-8 text-white transition-all duration-500 hover:scale-[1.008] hover:shadow-[0_20px_48px_rgba(6,63,71,0.35)]"
      >
        <div className="absolute w-[240px] h-[240px] rounded-full bg-white/[0.06] -top-[70px] -right-[50px] transition-transform duration-700 group-hover:scale-110" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-5">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.65rem] font-jetbrains-mono uppercase tracking-[0.14em] bg-white/12 px-3 py-1.5 rounded-full font-semibold border border-white/15">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Find your match
            </span>
            <h3 className="font-fraunces font-medium text-[1.5rem] mt-3">Laptop Finder</h3>
            <p className="text-[0.9rem] text-white/75 max-w-[420px] mt-1">
              Compare laptops side by side. Filter by brand, processor, price, and more.
            </p>
          </div>
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#063F47] font-semibold text-[0.85rem] transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg">
            Find your laptop
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </Link>
    </section>
  );
}