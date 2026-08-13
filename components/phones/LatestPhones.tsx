// components/phones/LatestPhones.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchLatestPhones } from "@/app/phones/finder/data/phone-db";

export function LatestPhones() {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchLatestPhones(6);
        setPhones(data);
      } catch (error) {
        console.error('Error fetching latest phones:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPhones();
  }, []);

  if (loading) {
    return (
      <section className="py-4">
        <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
          <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
            Latest <em className="italic not-italic text-[var(--color-green)]">Phones</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-[var(--color-line)] rounded-[12px] p-4 bg-[var(--color-paper)] animate-pulse">
              <div className="w-full aspect-square bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!phones || phones.length === 0) {
    return null;
  }

  return (
    <section className="py-4">
      <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
          Latest <em className="italic not-italic text-[var(--color-green)]">Phones</em>
        </h2>
        <Link href="/phones/finder" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {phones.map((phone) => {
          const brandColor = getBrandColor(phone.brand);
          const slug = phone.slug;
          
          return (
            <Link
              key={phone._id || phone.slug}
              href={`/phones/finder/${slug}`}
              className="group border border-[var(--color-line)] rounded-[12px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
            >
              <div 
                className="relative w-full aspect-square flex items-center justify-center text-4xl transition-transform group-hover:scale-105"
                style={{ 
                  background: `linear-gradient(145deg, ${brandColor}12, ${brandColor}05)`,
                }}
              >
                {getBrandEmoji(phone.brand)}
                <span className="absolute bottom-1.5 right-1.5 bg-black/40 backdrop-blur-sm text-white text-[0.4rem] font-medium px-1.5 py-0.5 rounded-full">
                  {phone.year}
                </span>
              </div>
              <div className="p-2.5 text-center">
                <div className="text-[0.5rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-semibold truncate">
                  {phone.brand}
                </div>
                <h4 className="font-fraunces font-medium text-[0.7rem] leading-[1.2] text-[var(--color-green-deep)] mt-0.5 truncate">
                  {phone.model}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Helper functions
function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    Apple: "#555555",
    Samsung: "#1428A0",
    Google: "#4285F4",
    OnePlus: "#E54141",
    Xiaomi: "#FF6900",
    Oppo: "#1A8C4A",
    Vivo: "#415FFF",
    Nothing: "#000000",
    Motorola: "#00B388",
  };
  return colors[brand] || "#555555";
}

function getBrandEmoji(brand: string): string {
  const emojis: Record<string, string> = {
    Apple: "🍎",
    Samsung: "📱",
    Google: "🔵",
    OnePlus: "🔴",
    Xiaomi: "🟠",
    Oppo: "🟢",
    Vivo: "🔷",
    Nothing: "⚫",
    Motorola: "🟩",
  };
  return emojis[brand] || "📱";
}