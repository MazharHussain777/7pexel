// components/TripleGrid.tsx
"use client";

import Link from "next/link";
import { Icons } from "./icons/Icons";

interface TripleItem {
  title: string;
  icon: string;
  items: string[];
}

const tripleData: TripleItem[] = [
  {
    title: "Brands",
    icon: "tag",
    items: ["Apple", "Samsung", "Google", "Sony", "Garmin", "Dell", "Asus"],
  },
  {
    title: "News",
    icon: "news",
    items: ["iPhone 16 launch recap", "Intel next-gen chip date set", "Galaxy S25 leaks confirmed", "AI features rolling out"],
  },
  {
    title: "Guides",
    icon: "book",
    items: ["Best Phones 2026", "Best Laptops Under 200K", "Best Earbuds This Year", "How to Pick a Smartwatch"],
  },
];

export function TripleGrid() {
  const IconComponent = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons];
    return Icon ? <Icon className="w-4 h-4 text-[var(--color-green)]" /> : null;
  };

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tripleData.map((col, index) => (
          <div 
            key={col.title} 
            className="group relative border border-[var(--color-line)] rounded-[var(--radius)] p-7 bg-[var(--color-paper)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(15,24,15,0.08)] hover:border-[var(--color-green)]/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative gradient background on hover */}
            <div className="absolute inset-0 rounded-[var(--radius)] bg-gradient-to-br from-[var(--color-green)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative dot pattern */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="4" cy="4" r="2" fill="var(--color-green)" />
                <circle cx="12" cy="4" r="2" fill="var(--color-green)" />
                <circle cx="20" cy="4" r="2" fill="var(--color-green)" />
                <circle cx="4" cy="12" r="2" fill="var(--color-green)" />
                <circle cx="12" cy="12" r="2" fill="var(--color-green)" />
                <circle cx="20" cy="12" r="2" fill="var(--color-green)" />
              </svg>
            </div>

            <h3 className="flex items-center gap-3 font-fraunces font-medium italic text-[1.2rem] text-[var(--color-green-deep)] mb-5 relative z-10">
              <span className="relative w-9 h-9 rounded-[10px] bg-gradient-to-br from-[var(--color-green)]/10 to-[var(--color-green-bright)]/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="absolute inset-0 rounded-[10px] bg-[var(--color-green)]/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {IconComponent(col.icon)}
              </span>
              <span className="relative">
                {col.title}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--color-green)] to-[var(--color-green-bright)] group-hover:w-full transition-all duration-500 ease-out" />
              </span>
              <span className="ml-auto text-[0.6rem] font-jetbrains-mono text-[var(--color-ink-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {col.items.length}
              </span>
            </h3>

            <ul className="list-none flex flex-col gap-1.5 relative z-10">
              {col.items.map((item, idx) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group/item flex items-center gap-3 text-[0.88rem] text-[var(--color-ink-soft)] py-2.5 px-3 rounded-lg transition-all duration-300 hover:text-[var(--color-green)] hover:bg-[var(--color-green)]/5 hover:pl-4"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]/20 group-hover/item:bg-[var(--color-green)] transition-all duration-300 group-hover/item:scale-150" />
                    <span className="flex-1">{item}</span>
                    <Icons.chev className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-[var(--color-green)]" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* View all link */}
            <div className="mt-4 pt-4 border-t border-[var(--color-line)] relative z-10">
              <Link 
                href="#" 
                className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-green)] transition-colors duration-200 group/view"
              >
                View all
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover/view:translate-x-1">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-px -right-px w-12 h-12 rounded-br-[var(--radius)] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-[var(--color-green)]/10 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}