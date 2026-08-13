// components/phones/PopularComparisons.tsx
import Link from "next/link";

interface Comparison {
  a: string;
  b: string;
  labelA: string;
  labelB: string;
}

const comparisons: Comparison[] = [
  { a: "iPhone 16", b: "Galaxy S25", labelA: "Apple", labelB: "Samsung" },
  { a: "OnePlus 13", b: "Xiaomi 15", labelA: "OnePlus", labelB: "Xiaomi" },
];

export function PopularComparisons() {
  return (
    <section className="py-11">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.6rem] tracking-[-0.01em]">
          Popular <em className="italic not-italic text-[var(--color-green)]">comparisons</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          View all comparisons
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
        {comparisons.map((c) => (
          <Link
            key={`${c.a}-${c.b}`}
            href="#"
            className="relative flex items-stretch rounded-[18px] overflow-hidden border border-[var(--color-line)] min-h-[130px] bg-[var(--color-paper)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,24,15,0.1)]"
          >
            <div className="flex-1 flex flex-col justify-center p-5.5 pl-6 relative bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] text-white clip-path-[polygon(0_0,100%_0,88%_100%,0%_100%)] pr-12">
              <div className="text-[0.64rem] uppercase tracking-[0.08em] opacity-75 font-semibold mb-1.25">{c.labelA}</div>
              <div className="font-fraunces font-medium text-[1.02rem] leading-[1.2]">{c.a}</div>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[0.78rem] font-bold text-white/90">
                Compare now →
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-center p-5.5 pl-13.5 bg-[var(--color-paper)] text-[var(--color-ink)] -ml-9.5">
              <div className="text-[0.64rem] uppercase tracking-[0.08em] opacity-75 font-semibold mb-1.25">{c.labelB}</div>
              <div className="font-fraunces font-medium text-[1.02rem] leading-[1.2]">{c.b}</div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-[38px] h-[38px] rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-jetbrains-mono text-[0.68rem] font-bold shadow-[0_6px_16px_rgba(15,24,15,0.25)]">
              VS
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}