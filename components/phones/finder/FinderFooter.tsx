// components/phones/finder/FinderFooter.tsx
"use client";

import Link from "next/link";

export function FinderFooter() {
  const handleMainPhonesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('🔗 Navigate to full Phones Directory (all 500+ devices) — you would be redirected to /phones');
  };

  return (
    <div className="flex justify-between items-center mt-9 pt-5 border-t border-[#e9f0eb] text-[0.75rem] text-[var(--color-ink-soft)] flex-wrap gap-2.5">
      <span>
        ✨ Explore the full{" "}
        <a href="#" onClick={handleMainPhonesClick} className="text-[var(--color-green)] font-semibold no-underline hover:underline">
          📱 Phones Directory
        </a>{" "}
        — all devices in our database.
      </span>
      <span>
        🔗 <a href="#" className="text-[var(--color-green)] font-semibold no-underline hover:underline">7pexel.com/phones</a>
      </span>
    </div>
  );
}