// components/QuickAccess.tsx
import Link from "next/link";
import { Icons } from "./icons/Icons";

export function QuickAccess() {
  const items = [
    { label: "Phones", icon: "phone", color: "#1FA25A" },
    { label: "Laptops", icon: "laptop", color: "#2F5233" },
    { label: "Watches", icon: "watch", color: "#8FA83E" },
    { label: "Audio", icon: "audio", color: "#347A5B" },
    { label: "Cameras", icon: "camera", color: "#12836B" },
    { label: "Gaming", icon: "gamepad", color: "#4C7A1F" },
    { label: "AI", icon: "ai", color: "#0F6B3E" },
    { label: "Compare", icon: "compare", color: "#1FA25A" },
  ];

  const IconComponent = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons];
    return Icon ? <Icon className="w-5.5 h-5.5" /> : null;
  };

  return (
    <section className="py-12">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
          Quick <em className="italic not-italic text-[var(--color-green)]">access</em>
        </h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3.5">
        {items.map((item) => (
          <Link
            key={item.label}
            href="#"
            className="flex flex-col items-center gap-2.5 text-center p-5.5 border border-[var(--color-line)] rounded-[18px] bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-green)] hover:shadow-[0_14px_28px_rgba(15,107,62,0.12)]"
            style={{ "--qc-color": item.color } as React.CSSProperties}
          >
            <div
              className="w-13 h-13 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:-rotate-6"
              style={{ backgroundColor: `color-mix(in srgb, ${item.color} 14%, white)` }}
            >
              <span className={`text-[${item.color}]`}>{IconComponent(item.icon)}</span>
            </div>
            <span className="text-[0.78rem] font-semibold text-[var(--color-ink)]">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}