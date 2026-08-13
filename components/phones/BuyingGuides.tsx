// components/phones/BuyingGuides.tsx
import Link from "next/link";
import { Icons } from "@/components/icons/Icons";

const guides = [
  { title: "Best Smartphones 2026", sub: "Every price bracket covered" },
  { title: "Best Budget Phones", sub: "Under PKR 100,000" },
  { title: "Best Camera Phones", sub: "Tested in low light" },
];

export function BuyingGuides() {
  return (
    <section className="py-11">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.6rem] tracking-[-0.01em]">
          Buying <em className="italic not-italic text-[var(--color-green)]">guides</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          View all guides
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href="#"
            className="flex items-center gap-3.5 px-4.5 py-4.5 border border-[var(--color-line)] rounded-[16px] bg-[var(--color-paper)] transition-all duration-200 hover:border-[var(--color-green)] hover:-translate-y-0.75 hover:shadow-[0_14px_26px_rgba(15,24,15,0.08)]"
          >
            <div className="w-10 h-10 rounded-[11px] bg-green-950/10 flex items-center justify-center flex-shrink-0">
              <Icons.book className="w-4.5 h-4.5 text-[var(--color-green)]" />
            </div>
            <div className="flex-1">
              <h4 className="text-[0.88rem] font-semibold leading-[1.3]">{guide.title}</h4>
              <span className="text-[0.72rem] text-[var(--color-ink-soft)] mt-0.75 block">{guide.sub}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}