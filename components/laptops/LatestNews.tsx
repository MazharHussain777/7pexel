// components/laptops/LatestNews.tsx
import Link from "next/link";

const news = [
  {
    title: "Intel confirms next-gen chip launch date",
    excerpt: "Intel's upcoming processors promise significant performance improvements.",
    time: "3 hours ago",
    href: "/news/laptops/intel-next-gen-chip-launch-date",
  },
  {
    title: "Apple M5 MacBook Pro benchmarks leak online",
    excerpt: "Early benchmarks show significant performance gains over M4.",
    time: "7 hours ago",
    href: "/news/laptops/apple-m5-macbook-pro-benchmarks",
  },
  {
    title: "Dell XPS 14 gets a redesigned hinge in 2026 refresh",
    excerpt: "The updated design improves durability and aesthetics.",
    time: "1 day ago",
    href: "/news/laptops/dell-xps-14-redesign",
  },
];

export function LatestNews() {
  return (
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Latest <span className="text-[var(--color-green)]">News</span>
        </h2>
        <Link href="/news/laptops" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          All news →
        </Link>
      </div>
      <div className="flex flex-col divide-y divide-[var(--color-line)] border border-[var(--color-line)] rounded-[14px] overflow-hidden">
        {news.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex flex-wrap items-center gap-3 p-4 bg-[var(--color-paper)] transition-all hover:bg-[var(--color-green)]/5 hover:pl-5 group"
          >
            <div className="flex-1 min-w-0">
              <h4 className="text-[0.9rem] font-semibold group-hover:text-[var(--color-green)] transition-colors">
                {item.title}
              </h4>
              <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-0.5">{item.excerpt}</p>
            </div>
            <span className="text-[0.65rem] text-[var(--color-ink-soft)] flex-shrink-0">
              {item.time}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}