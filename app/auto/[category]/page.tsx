// app/auto/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  CATEGORIES,
  VEHICLES,
  BRANDS,
  getCategoryByKey,
  getVehiclesByCategory,
} from "@/app/auto/data/vehicles";

// ─── GENERATE STATIC PARAMS ────────────────────────────
export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.key,
  }));
}

// ─── METADATA ──────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryByKey(category);

  if (!cat) {
    return {
      title: "Category Not Found | 7pexel Auto",
      description: "The category you're looking for doesn't exist.",
    };
  }

  const vehicles = getVehiclesByCategory(category);

  return {
    title: `${cat.name} Vehicles — Full Specs & Prices | 7pexel Auto`,
    description: `Explore all ${cat.name} vehicles from every brand. ${vehicles.length} models with full specs, pricing, and comparisons. ${cat.description}`,
    keywords: `${cat.name}, ${cat.name} cars, ${cat.name} vehicles, auto, vehicles, ${cat.name} models`,
    openGraph: {
      title: `${cat.name} Vehicles — Complete Guide`,
      description: `${vehicles.length} ${cat.name} models tracked. ${cat.description}`,
      type: "website",
    },
  };
}

// ─── MAIN COMPONENT ────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryByKey(category);

  if (!cat) {
    notFound();
  }

  const vehicles = getVehiclesByCategory(category);
  const brandsInCategory = [...new Set(vehicles.map((v) => v.brandId))];

  const getBrand = (id: string) => BRANDS.find((b) => b.id === id);

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/auto" className="hover:text-[var(--color-green)] transition-colors">
            Auto
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">{cat.name}</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section
          className="relative rounded-[20px] overflow-hidden mt-5 text-white"
          style={{ background: `linear-gradient(150deg, ${cat.color}, ${cat.color}dd)` }}
        >
          <div className="relative z-10 p-8 md:p-11">
            <div className="max-w-[600px]">
              <div className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-5 bg-white/15 border border-white/25 backdrop-blur-sm">
                <span className="text-3xl">{cat.icon}</span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.1rem,4.4vw,3.3rem)] tracking-[-0.03em]">
                <em className="italic not-italic text-[#D4F26B]">{cat.name}</em>
              </h1>
              <p className="mt-3.5 text-white/80 text-[1rem] leading-[1.6]">
                {cat.description}
              </p>
              <div className="flex gap-6 mt-5">
                <div>
                  <span className="font-fraunces font-semibold text-2xl text-white">
                    {vehicles.length}
                  </span>
                  <span className="block font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">
                    Models
                  </span>
                </div>
                <div className="w-px bg-white/30" />
                <div>
                  <span className="font-fraunces font-semibold text-2xl text-white">
                    {brandsInCategory.length}
                  </span>
                  <span className="block font-jetbrains-mono text-[0.62rem] tracking-[0.1em] uppercase text-white/72">
                    Brands
                  </span>
                </div>
              </div>
            </div>
          </div>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
          >
            <circle cx="660" cy="80" r="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <circle cx="660" cy="80" r="240" stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── VEHICLES GRID ────────────────────────────── */}
        <section className="py-8">
          <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em] mb-5">
            All <em className="italic not-italic text-[var(--color-green)]">{cat.name}</em> Vehicles
          </h2>

          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vehicles.map((v) => {
                const brand = getBrand(v.brandId);
                return (
                  <Link
                    key={v.slug}
                    href={`/auto/vehicle/${v.slug}`}
                    className="border border-[var(--color-line)] rounded-[10px] overflow-hidden bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)] group block"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
                      <Image
                        src={v.img}
                        alt={`${brand?.name || v.brandId} ${v.model}`}
                        width={640}
                        height={480}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.4)]" />
                      {v.range && (
                        <span className="absolute bottom-2.5 left-2.5 z-10 font-jetbrains-mono text-[0.63rem] text-white font-semibold bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                          {v.range}mi
                        </span>
                      )}
                    </div>
                    <div className="p-3.5 pb-4">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[0.6rem] font-semibold text-[var(--color-ink-soft)] uppercase">
                          {brand?.name || v.brandId}
                        </span>
                      </div>
                      <h4 className="font-fraunces font-medium text-[0.95rem] leading-[1.3]">
                        {v.model}
                      </h4>
                      <div className="flex gap-1.5 flex-wrap mt-1">
                        {v.cats.slice(0, 2).map((c) => {
                          const catInfo = CATEGORIES.find((cat) => cat.key === c);
                          return (
                            <span
                              key={c}
                              className="text-[0.55rem] px-2 py-0.5 rounded-full bg-green-950/10 text-[var(--color-green-deep)] font-bold uppercase tracking-[0.02em] font-jetbrains-mono"
                            >
                              {catInfo?.icon || ""} {c}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex justify-end items-center pt-2 mt-2 border-t border-dashed border-[var(--color-line)] text-[0.8rem]">
                        <span className="flex items-center gap-1.5 text-[var(--color-green)] font-semibold text-[0.7rem] group-hover:gap-2 transition-all">
                          View Details
                          <svg
                            className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          >
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
          ) : (
            <div className="text-center py-12 px-4 bg-[var(--color-paper)] rounded-[16px] border border-[var(--color-line)]">
              <p className="text-[var(--color-ink-soft)]">No {cat.name} vehicles available yet.</p>
            </div>
          )}
        </section>

        {/* ─── BACK TO AUTO ────────────────────────────── */}
        <div className="pt-4 pb-2">
          <Link
            href="/auto"
            className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline"
          >
            ← Back to Auto
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}