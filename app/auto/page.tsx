// app/auto/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BRANDS,
  VEHICLES,
  CATEGORIES,
  formatPrice,
} from "@/app/auto/data/vehicles";

function getInitials(name: string): string {
  return name.split(/[\s-]/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function getBrandById(id: string) {
  return BRANDS.find((b) => b.id === id);
}

export default function AutoPage() {
  // Get featured vehicles (most popular)
  const featuredVehicles = [...VEHICLES].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Auto &amp; Vehicles</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className="relative rounded-[26px] overflow-hidden mt-5 bg-gradient-to-br from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A] text-white">
          <div className="relative z-10 p-8 md:p-11">
            <div className="max-w-[600px]">
              <div className="w-14 h-14 rounded-[16px] flex items-center justify-center mb-5 bg-white/15 border border-white/25 backdrop-blur-sm">
                <svg className="w-6.5 h-6.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 17h14M5 17a2 2 0 01-2-2v-2.2a2 2 0 01.4-1.2L5.8 8.4A3 3 0 018.2 7h7.6a3 3 0 012.4 1.4l2.4 3.2a2 2 0 01.4 1.2V15a2 2 0 01-2 2M5 17a2 2 0 002 2h1a2 2 0 002-2M17 17a2 2 0 002 2h1a2 2 0 002-2M7 11h10" />
                </svg>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.2rem,4.6vw,3.5rem)] tracking-[-0.03em]">
                Auto &amp; <em className="italic not-italic text-[#D4F26B]">Vehicles</em>
              </h1>
              <p className="mt-3.5 text-white/80 text-[1rem] leading-[1.6]">
                Explore every major car brand and body style in one place — from electric daily-drivers to full-size trucks.
              </p>
              <div className="flex gap-6 mt-5">
                <div>
                  <span className="font-fraunces font-semibold text-2xl text-white">{BRANDS.length}</span>
                  <span className="block font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Brands</span>
                </div>
                <div className="w-px bg-white/30" />
                <div>
                  <span className="font-fraunces font-semibold text-2xl text-white">{CATEGORIES.length}</span>
                  <span className="block font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Categories</span>
                </div>
                <div className="w-px bg-white/30" />
                <div>
                  <span className="font-fraunces font-semibold text-2xl text-white">{VEHICLES.length}</span>
                  <span className="block font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">Models</span>
                </div>
              </div>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="640" cy="90" r="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <circle cx="640" cy="90" r="240" stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── CATEGORIES ────────────────────────────────── */}
        <section className="py-10">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.55rem] tracking-[-0.01em]">
              Shop by <em className="italic not-italic text-[var(--color-green)]">category</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/auto/${cat.key}`}
                className="group relative rounded-[20px] overflow-hidden p-6.5 min-h-[158px] flex flex-col justify-between text-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,24,15,0.18)]"
                style={{ background: `linear-gradient(150deg, ${cat.color}, ${cat.color}dd)` }}
              >
                <div className="absolute w-[160px] h-[160px] rounded-full blur-[38px] opacity-45 bg-white -top-[50px] -right-[30px]" />
                <div className="w-[46px] h-[46px] rounded-[13px] bg-white/18 backdrop-blur-sm border border-white/30 flex items-center justify-center relative z-10 text-2xl">
                  {cat.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="font-fraunces font-medium text-[1.14rem] mb-1">{cat.name}</h4>
                </div>
                <div className="absolute bottom-5.5 right-5.5 z-10 w-7.5 h-7.5 rounded-full bg-white/18 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:bg-white/30">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── FEATURED VEHICLES ──────────────────────────── */}
        <section className="py-1.5">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.55rem] tracking-[-0.01em]">
              Featured <em className="italic not-italic text-[var(--color-green)]">vehicles</em>
            </h2>
            <p className="text-[0.84rem] text-[var(--color-ink-soft)]">Trending models across every category</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5.5">
            {featuredVehicles.map((veh) => {
              const brand = getBrandById(veh.brandId);
              return (
                <Link
                  key={veh.slug}
                  href={`/auto/vehicle/${veh.slug}`}
                  className="border border-[var(--color-line)] rounded-[18px] overflow-hidden bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,24,15,0.14)] hover:border-[rgba(15,107,62,0.25)] group"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                    <Image src={veh.img} alt={`${brand?.name || veh.brandId} ${veh.model}`} width={640} height={480} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.4)]" />
                    <span className="absolute bottom-3 left-3 z-10 font-jetbrains-mono text-[0.6rem] text-white font-semibold bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      {veh.cats.slice(0, 2).map((c) => CATEGORIES.find((cat) => cat.key === c)?.icon || c).join(" ")}
                    </span>
                  </div>
                  <div className="p-4 pb-4.5">
                    <span className="font-jetbrains-mono text-[0.72rem] uppercase tracking-[0.05em] text-[var(--color-ink-soft)]">{brand?.name || veh.brandId}</span>
                    <h4 className="font-fraunces font-medium text-[1.04rem] leading-[1.3]">{veh.model}</h4>
                    <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-dashed border-[var(--color-line)] text-[0.82rem]">
                      <span className="font-bold text-[var(--color-green-deep)]">{formatPrice(veh.price)}</span>
                      <span className="flex items-center gap-1.5 text-[var(--color-green)] font-semibold text-[0.76rem] group-hover:gap-2 transition-all">
                        View Details
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── ALL BRANDS ──────────────────────────────────── */}
        <section className="py-1.5">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.55rem] tracking-[-0.01em]">
              All <em className="italic not-italic text-[var(--color-green)]">brands</em>
            </h2>
            <Link href="/auto/brands" className="text-[0.84rem] text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BRANDS.slice(0, 15).map((brand) => (
              <Link
                key={brand.id}
                href={`/auto/brands/${brand.slug}`}
                className="border-[1.5px] border-[var(--color-line)] rounded-[18px] p-5 bg-[var(--color-paper)] flex flex-col items-center text-center gap-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_34px_rgba(15,24,15,0.12)] hover:border-[rgba(15,107,62,0.3)]"
              >
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white font-fraunces font-bold text-[1.15rem]"
                  style={{ background: brand.grad }}
                >
                  {getInitials(brand.name)}
                </div>
                <h5 className="font-fraunces font-semibold text-[0.95rem]">{brand.name}</h5>
                <span className="font-jetbrains-mono text-[0.7rem] text-[var(--color-ink-soft)]">{brand.models} models</span>
              </Link>
            ))}
          </div>
          {BRANDS.length > 15 && (
            <div className="text-center mt-6">
              <Link href="/auto/brands" className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline">
                View all {BRANDS.length} brands →
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}