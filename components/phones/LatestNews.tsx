// components/phones/LatestNews.tsx
import Link from "next/link";

const news = [
  { title: "iPhone 16 with AI-powered camera features", time: "2 hours ago" },
  { title: "Galaxy S25 Ultra specs leak ahead of launch", time: "5 hours ago" },
  { title: "Pixel 10 Tensor G6 chip benchmarks revealed", time: "1 day ago" },
];

export function LatestNews() {
  return (
    <section className="py-11">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.6rem] tracking-[-0.01em]">
          Latest <em className="italic not-italic text-[var(--color-green)]">news</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          View all news
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col gap-0.5">
        {news.map((item) => (
          <Link
            key={item.title}
            href="#"
            className="flex items-center justify-between gap-3.5 px-1 py-4 border-b border-dashed border-[var(--color-line)] transition-all duration-200 hover:pl-2 last:border-b-0"
          >
            <div className="flex items-center gap-3.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green-bright)] flex-shrink-0" />
              <h4 className="text-[0.92rem] font-semibold">{item.title}</h4>
            </div>
            <span className="text-[0.76rem] text-[var(--color-ink-soft)] font-jetbrains-mono whitespace-nowrap">{item.time}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}