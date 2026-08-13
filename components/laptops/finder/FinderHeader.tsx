// components/laptops/finder/FinderHeader.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface FinderHeaderProps {
  title?: string;
  subtitle?: string;
  totalItems?: number;
  totalBrands?: number;
  showBreadcrumb?: boolean;
}

export function FinderHeader({ 
  title = "Laptop Finder",
  subtitle = "Compare laptops side by side",
  totalItems = 0,
  totalBrands = 0,
  showBreadcrumb = true
}: FinderHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <nav className="flex items-center gap-1.5 text-[0.75rem] text-[var(--color-ink-soft)]">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40" aria-hidden="true">/</span>
          <Link href="/laptops" className="hover:text-[var(--color-green)] transition-colors">
            Laptops
          </Link>
          <span className="opacity-40" aria-hidden="true">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Finder</span>
        </nav>
      )}

      {/* Header Content */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-6 border-b border-[rgba(15,24,15,0.06)]">
        <div className="flex items-start gap-3.5">
          {/* Icon */}
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#0A3F6E] to-[#1F5FA2] flex items-center justify-center flex-shrink-0 shadow-sm">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M1 20h22l-2-4H3l-2 4z" />
            </svg>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="font-fraunces font-medium text-[1.4rem] tracking-[-0.02em] leading-[1.2]">
              {title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? (
                  <span key={i} className="text-[var(--color-green)]">{word}</span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h1>
            <p className="text-[0.8rem] text-[var(--color-ink-soft)] mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2.5 text-[0.7rem] font-medium text-[var(--color-ink-soft)] flex-wrap">
          {totalItems > 0 && (
            <span className="flex items-center gap-1.5 bg-[var(--color-paper)] px-3.5 py-1.5 rounded-full border border-[var(--color-line)]">
              <span className="font-jetbrains-mono font-bold text-[var(--color-green)] text-[0.85rem]">
                {totalItems}
              </span>
              <span>laptops</span>
            </span>
          )}
          {totalBrands > 0 && (
            <span className="flex items-center gap-1.5 bg-[var(--color-paper)] px-3.5 py-1.5 rounded-full border border-[var(--color-line)]">
              <span className="font-jetbrains-mono font-bold text-[var(--color-green)] text-[0.85rem]">
                {totalBrands}
              </span>
              <span>brands</span>
            </span>
          )}
          <button
            onClick={() => window.location.href = '/laptops/finder'}
            className="flex items-center gap-1.5 bg-[var(--color-paper)] px-3.5 py-1.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-green)] hover:text-[var(--color-green)] transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
              <path d="M12 8v4l3 3" />
            </svg>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Filters - Optional */}
      <div className="flex items-center gap-2 flex-wrap -mt-1">
        <span className="text-[0.6rem] font-jetbrains-mono uppercase tracking-[0.08em] text-[var(--color-ink-soft)] mr-1">
          Quick:
        </span>
        <button
          onClick={() => router.push('/laptops/finder?brands=Apple')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          🍎 Apple
        </button>
        <button
          onClick={() => router.push('/laptops/finder?brands=Dell')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          🖥️ Dell
        </button>
        <button
          onClick={() => router.push('/laptops/finder?brands=ASUS')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          💻 ASUS
        </button>
        <button
          onClick={() => router.push('/laptops/finder?categories=Gaming')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          🎮 Gaming
        </button>
        <button
          onClick={() => router.push('/laptops/finder?categories=Business')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          💼 Business
        </button>
        <button
          onClick={() => router.push('/laptops/finder?categories=Premium')}
          className="px-3 py-1 rounded-full border border-[var(--color-line)] text-[0.65rem] font-semibold text-[var(--color-ink-soft)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)] transition-colors"
        >
          ✨ Premium
        </button>
      </div>
    </div>
  );
}