// components/Blog.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "./icons/Icons";

const blogTypes = ["All", "Buying Guide", "News", "Review", "Comparison"];

interface Post {
  type: string;
  cat: string;
  icon: string;
  title: string;
  excerpt: string;
  read: string;
  c1: string;
  c2: string;
}

const posts: Post[] = [
  {
    type: "Buying Guide",
    cat: "Phones",
    icon: "phone",
    title: "Best Phones to Buy in 2026",
    excerpt: "Every price bracket covered, from budget to flagship, updated this month.",
    read: "8 min",
    c1: "#0A3F26",
    c2: "#1FA25A",
  },
  {
    type: "News",
    cat: "Laptops",
    icon: "laptop",
    title: "Intel Confirms Next-Gen Chip Launch Date",
    excerpt: "The new architecture promises a 30% efficiency jump over last generation.",
    read: "4 min",
    c1: "#2F5233",
    c2: "#4C7A1F",
  },
  {
    type: "Review",
    cat: "Watches",
    icon: "watch",
    title: "Apple Watch Series 12: Two Weeks In",
    excerpt: "The new blood-pressure sensor tested against a clinical cuff, daily.",
    read: "6 min",
    c1: "#5C6B1F",
    c2: "#8FA83E",
  },
  {
    type: "Comparison",
    cat: "Audio",
    icon: "audio",
    title: "AirPods Pro 3 vs Galaxy Buds: ANC Tested",
    excerpt: "Subway platforms and windy rooftops — which noise cancelling actually wins.",
    read: "5 min",
    c1: "#0F6B3E",
    c2: "#347A5B",
  },
  {
    type: "Buying Guide",
    cat: "Laptops",
    icon: "laptop",
    title: "Best Laptops Under PKR 200,000",
    excerpt: "Real benchmarks, not marketing specs — what actually performs at this price.",
    read: "9 min",
    c1: "#12836B",
    c2: "#2F5233",
  },
  {
    type: "News",
    cat: "Technology",
    icon: "ai",
    title: "On-Device AI: What Actually Runs Locally",
    excerpt: "Separating marketing claims from models that genuinely skip the network call.",
    read: "7 min",
    c1: "#0A3F26",
    c2: "#12836B",
  },
];

export function Blog() {
  const [activeType, setActiveType] = useState("All");

  const filteredPosts = activeType === "All" ? posts : posts.filter((p) => p.type === activeType);

  const IconComponent = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons];
    return Icon ? <Icon className="w-6 h-6 text-white" /> : null;
  };

  return (
    <section className="py-12">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
          From the <em className="italic not-italic text-[var(--color-green)]">blog</em>
        </h2>
        <Link href="#" className="text-[0.84rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 whitespace-nowrap">
          All articles
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {blogTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2.25 rounded-full border-[1.5px] text-[0.8rem] font-semibold transition-all duration-200 ${
              type === activeType
                ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.title}
            className="border border-[var(--color-line)] rounded-[var(--radius)] overflow-hidden bg-[var(--color-paper)] flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,24,15,0.12)]"
          >
            <div
              className="relative h-[150px] flex items-center justify-center"
              style={{ background: `linear-gradient(150deg, ${post.c1}, ${post.c2})` }}
            >
              <div className="absolute w-[160px] h-[160px] rounded-full blur-[36px] opacity-50 bg-white -top-[46px] -right-[26px]" />
              <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.06em] uppercase px-2.25 py-1 rounded-full bg-white/90 text-[var(--color-green-deep)] font-bold">
                  {post.type}
                </span>
                <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.06em] uppercase px-2.25 py-1 rounded-full bg-black/28 text-white">
                  {post.cat}
                </span>
              </div>
              <div className="w-[58px] h-[58px] rounded-[16px] bg-white/16 backdrop-blur-sm border border-white/30 flex items-center justify-center relative z-10">
                {IconComponent(post.icon)}
              </div>
            </div>
            <div className="p-4.5 pb-5 flex flex-col gap-2.5 flex-1">
              <h4 className="font-fraunces font-medium text-[1.05rem] leading-[1.28]">{post.title}</h4>
              <p className="text-[var(--color-ink-soft)] text-[0.85rem] leading-[1.5] flex-1">{post.excerpt}</p>
              <div className="flex justify-between items-center pt-3 border-t border-dashed border-[var(--color-line)] text-[0.76rem] text-[var(--color-ink-soft)]">
                <span>{post.read} read</span>
                <span>Read more →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}