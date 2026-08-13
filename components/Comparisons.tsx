// components/Comparisons.tsx
import Link from "next/link";

interface Comparison {
  a: string;
  b: string;
  labelA: string;
  labelB: string;
}

const comparisons: Comparison[] = [
  { a: "iPhone 16 Pro", b: "Galaxy S25 Ultra", labelA: "Apple · Phone", labelB: "Samsung · Phone" },
  { a: "MacBook Pro M5", b: "Dell XPS 14", labelA: "Apple · Laptop", labelB: "Dell · Laptop" },
  { a: "Watch Series 12", b: "Galaxy Watch 8", labelA: "Apple · Watch", labelB: "Samsung · Watch" },
  { a: "WH-1000XM7", b: "AirPods Max 2", labelA: "Sony · Audio", labelB: "Apple · Audio" },
];

export function Comparisons() {
  return (
    <section className="py-12" id="compare">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
          Popular <em className="italic not-italic text-[var(--color-green)]">comparisons</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          All comparisons
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {comparisons.map((c) => (
          <Link
            key={`${c.a}-${c.b}`}
            href="#"
            className="relative flex items-stretch rounded-[var(--radius)] overflow-hidden border border-[var(--color-line)] min-h-[150px] bg-[var(--color-paper)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,24,15,0.1)]"
          >
            <div className="flex-1 flex flex-col justify-center p-6 pl-6.5 relative bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] text-white clip-path-[polygon(0_0,100%_0,88%_100%,0%_100%)] pr-[50px]">
              <div className="text-[0.66rem] uppercase tracking-[0.08em] opacity-75 font-semibold mb-1.5">{c.labelA}</div>
              <div className="font-fraunces font-medium text-[1.08rem] leading-[1.2]">{c.a}</div>
            </div>
            <div className="flex-1 flex flex-col justify-center p-6 pl-14 bg-[var(--color-paper)] text-[var(--color-ink)] -ml-10">
              <div className="text-[0.66rem] uppercase tracking-[0.08em] opacity-75 font-semibold mb-1.5">{c.labelB}</div>
              <div className="font-fraunces font-medium text-[1.08rem] leading-[1.2]">{c.b}</div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-10 h-10 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-jetbrains-mono text-[0.7rem] font-bold shadow-[0_6px_16px_rgba(15,24,15,0.25)]">
              VS
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}