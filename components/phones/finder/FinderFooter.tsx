// components/phones/finder/FinderFooter.tsx
"use client";

import Link from "next/link";

export function FinderFooter() {
  const handleMainPhonesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('🔗 Navigate to full Phones Directory (all 500+ devices) — you would be redirected to /phones');
  };

  return (
    <div className="flex justify-between items-center mt-9 pt-5 border-t border-[#E8E8E8] text-[0.75rem] text-[#8B7355] flex-wrap gap-2.5">
      <span>
        ✨ Explore the full{" "}
        <a href="#" onClick={handleMainPhonesClick} className="text-[#FF6B00] font-semibold no-underline hover:underline">
          📱 Phones Directory
        </a>{" "}
        — all devices in our database.
      </span>
      <span>
        🔗 <a href="#" className="text-[#FF6B00] font-semibold no-underline hover:underline">7pexel.com/phones</a>
      </span>
    </div>
  );
}