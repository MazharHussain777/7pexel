// components/laptops/PopularComparisons.tsx
import Link from "next/link";

const comparisons = [
  { label: "MacBook Pro vs Dell XPS", icon: "⚔️", href: "/compare?laptops=macbook-pro-m5,dell-xps-14" },
  { label: "Gaming Laptops Compared", icon: "🎮", href: "/compare?category=gaming" },
  { label: "Business Laptops Guide", icon: "💼", href: "/guides/laptops" },
  { label: "Ultrabook Showdown", icon: "🚀", href: "/compare?category=ultrabook" },
];

export function PopularComparisons() {
  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">⚔️</span>
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Popular <span className="text-[var(--color-green)]">Comparisons</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
        {comparisons.map((comp) => (
          <Link
            key={comp.label}
            href={comp.href}
            className="flex items-center gap-3 p-4 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-paper)] transition-all hover:border-[var(--color-green)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,24,15,0.08)] group"
          >
            <span className="text-2xl">{comp.icon}</span>
            <span className="text-[0.85rem] font-semibold group-hover:text-[var(--color-green)] transition-colors">
              {comp.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}