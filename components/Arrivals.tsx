// components/Arrivals.tsx
import Link from "next/link";
import { Icons } from "./icons/Icons";

interface ArrivalItem {
  cat: string;
  icon: string;
  brand: string;
  name: string;
  c1: string;
  c2: string;
}

const arrivals: ArrivalItem[] = [
  { cat: "Phone", icon: "phone", brand: "Samsung", name: "Galaxy S25 Ultra", c1: "#0A3F26", c2: "#1FA25A" },
  { cat: "Laptop", icon: "laptop", brand: "Apple", name: "MacBook Pro M5", c1: "#2F5233", c2: "#4C7A1F" },
  { cat: "Watch", icon: "watch", brand: "Apple", name: "Watch Series 12", c1: "#5C6B1F", c2: "#8FA83E" },
  { cat: "Audio", icon: "audio", brand: "Sony", name: "WH-1000XM7", c1: "#0F6B3E", c2: "#347A5B" },
  { cat: "Laptop", icon: "laptop", brand: "Dell", name: "XPS 14", c1: "#12836B", c2: "#2F5233" },
  { cat: "Watch", icon: "watch", brand: "Garmin", name: "Fenix 8", c1: "#3B5C1E", c2: "#6E8F2B" },
  { cat: "Phone", icon: "phone", brand: "Google", name: "Pixel 10", c1: "#0A3F26", c2: "#12836B" },
  { cat: "Camera", icon: "camera", brand: "Sony", name: "Alpha A7 V", c1: "#1FA25A", c2: "#8FA83E" },
];

export function Arrivals() {
  const IconComponent = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons];
    return Icon ? <Icon className="w-7.5 h-7.5 text-white" /> : null;
  };

  return (
    <section className="py-12" id="arrivals">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
          New <em className="italic not-italic text-[var(--color-green)]">arrivals</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          View all devices
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
      <p className="text-[0.88rem] text-[var(--color-ink-soft)] -mt-4.5 mb-4">
        Fresh across every category — not just phones.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {arrivals.map((item) => (
          <div
            key={`${item.brand}-${item.name}`}
            className="border border-[var(--color-line)] rounded-[var(--radius)] overflow-hidden bg-[var(--color-paper)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,24,15,0.12)] group"
          >
            <div
              className="relative h-48 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
              style={{ background: `linear-gradient(150deg, ${item.c1}, ${item.c2})` }}
            >
              <div className="absolute w-[200px] h-[200px] rounded-full blur-[40px] opacity-40 bg-white -top-[60px] -right-[40px]" />
              <span className="absolute top-3 left-3 font-jetbrains-mono text-[0.6rem] tracking-[0.08em] uppercase bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/30">
                {item.cat}
              </span>
              <span className="absolute top-3 right-3 font-jetbrains-mono text-[0.6rem] tracking-[0.06em] uppercase bg-[#D4F26B] text-[var(--color-green-deep)] px-2.25 py-1 rounded-full font-bold">
                New
              </span>
              <div className="w-[80px] h-[80px] rounded-[20px] bg-white/16 backdrop-blur-sm border border-white/30 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {IconComponent(item.icon)}
              </div>
            </div>
            <div className="p-5">
              <div className="text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-ink-soft)] font-semibold">
                {item.brand}
              </div>
              <h4 className="font-fraunces font-medium text-[1.1rem] mt-1.5">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}