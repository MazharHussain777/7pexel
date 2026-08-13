// components/laptops/finder/FinderFooter.tsx
import Link from "next/link";

export function FinderFooter() {
  return (
    <div className="mt-8 pt-5 border-t border-[rgba(15,24,15,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.7rem] text-[var(--color-ink-soft)]">
          Data sourced from manufacturers and verified reviews.
        </p>
        <div className="flex items-center gap-3 text-[0.7rem] text-[var(--color-ink-soft)]">
          <Link href="/laptops" className="hover:text-[var(--color-green)] transition-colors">
            Laptops Home
          </Link>
          <span className="w-px h-3 bg-[var(--color-line)]" />
          <Link href="/reviews" className="hover:text-[var(--color-green)] transition-colors">
            Reviews
          </Link>
          <span className="w-px h-3 bg-[var(--color-line)]" />
          <Link href="/guides" className="hover:text-[var(--color-green)] transition-colors">
            Guides
          </Link>
        </div>
      </div>
    </div>
  );
}