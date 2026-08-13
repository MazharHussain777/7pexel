// components/QuickAccess.tsx (homepage version)
import Link from "next/link";
import { Icons } from "@/components/icons/Icons";

const quickItems = [
  { label: "Phones", icon: "phone", color: "#1FA25A", href: "/phones" },
  { label: "Laptops", icon: "laptop", color: "#0A3F6E", href: "/guides/laptops" },
  { label: "Auto", icon: "car", color: "#2F5233", href: "/auto" },
  { label: "Technology", icon: "flask", color: "#12836B", href: "/technology" },
  { label: "Guides", icon: "book", color: "#8FA83E", href: "/guides" },
  { label: "News", icon: "news", color: "#347A5B", href: "/news" },
  { label: "Phone Finder", icon: "search", color: "#0F6B3E", href: "/phones/finder" },
  { label: "Comparisons", icon: "compare", color: "#4C7A1F", href: "/phones/finder" },
];

export function QuickAccess() {
  const IconComponent = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons];
    return Icon ? <Icon className="w-4.5 h-4.5" /> : null;
  };

  return (
    <section className="py-11 pt-2">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {quickItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-2.25 text-center px-2 py-4.5 border border-[var(--color-line)] rounded-[16px] bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-green)] hover:shadow-[0_14px_28px_rgba(15,107,62,0.12)]"
            style={{ "--qc-color": item.color } as React.CSSProperties}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:-rotate-6"
              style={{ backgroundColor: `${item.color}22` }}
            >
              <span style={{ color: item.color }}>{IconComponent(item.icon)}</span>
            </div>
            <span className="text-[0.74rem] font-semibold text-[var(--color-ink)]">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}