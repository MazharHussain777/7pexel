// components/laptops/BuyingGuides.tsx
import Link from "next/link";

const guides = [
  {
    title: "How to Choose a Laptop in 2026",
    excerpt: "A comprehensive guide to finding the perfect laptop for your needs.",
    icon: "📖",
    href: "/guides/laptops",
  },
  {
    title: "Best Laptops for Students",
    excerpt: "Top picks for students on a budget or with specific needs.",
    icon: "🎓",
    href: "/guides/laptops/students",
  },
  {
    title: "Laptop Buying Guide for Professionals",
    excerpt: "What to look for in a business laptop.",
    icon: "💼",
    href: "/guides/laptops/business",
  },
];

export function BuyingGuides() {
  return (
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-4 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.3rem] tracking-[-0.01em]">
          Buying <span className="text-[var(--color-green)]">Guides</span>
        </h2>
        <Link href="/guides/laptops" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          All guides →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            className="p-5 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-paper)] transition-all hover:border-[var(--color-green)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] group"
          >
            <span className="text-2xl block mb-2">{guide.icon}</span>
            <h4 className="font-fraunces font-medium text-[1rem] group-hover:text-[var(--color-green)] transition-colors">
              {guide.title}
            </h4>
            <p className="text-[0.75rem] text-[var(--color-ink-soft)] mt-1">{guide.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}