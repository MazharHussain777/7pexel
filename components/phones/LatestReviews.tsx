// components/phones/LatestReviews.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchFeaturedPhones } from "@/app/phones/finder/data/phone-db.ts";

export function LatestReviews() {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchFeaturedPhones(6);
        setPhones(data);
      } catch (error) {
        console.error('Error fetching featured phones:', error);
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
            Top <em className="italic not-italic text-[var(--color-green)]">Rated</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-[var(--color-line)] rounded-[14px] p-4 bg-[var(--color-paper)] animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[12px] bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
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
          Top <em className="italic not-italic text-[var(--color-green)]">Rated</em>
        </h2>
        <Link href="/phones/finder" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {phones.map((phone) => {
          const brandColor = getBrandColor(phone.brand);
          const slug = phone.slug;
          
          return (
            <Link
              key={phone._id || phone.slug}
              href={`/phones/finder/${slug}`}
              className="group border border-[var(--color-line)] rounded-[14px] overflow-hidden bg-[var(--color-paper)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,24,15,0.10)] hover:border-[rgba(15,107,62,0.25)]"
            >
              <div className="flex items-center gap-4 p-4">
                <div 
                  className="w-16 h-16 rounded-[12px] flex items-center justify-center text-3xl flex-shrink-0 transition-transform group-hover:scale-105"
                  style={{ 
                    background: `linear-gradient(145deg, ${brandColor}15, ${brandColor}08)`,
                  }}
                >
                  {getBrandEmoji(phone.brand)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.55rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-semibold">
                      {phone.brand}
                    </span>
                    <span className="flex items-center gap-0.5 text-[0.65rem]">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold">{phone.rating || 4.5}</span>
                    </span>
                  </div>
                  <h4 className="font-fraunces font-medium text-[0.9rem] leading-[1.2] text-[var(--color-green-deep)] mt-0.5 truncate">
                    {phone.model}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[0.6rem] text-[var(--color-ink-soft)]">
                    <span>{phone.year}</span>
                    <span className="w-px h-3 bg-[var(--color-line)]" />
                    <span>{phone.price}</span>
                  </div>
                </div>
                <div className="text-[0.6rem] font-semibold text-[var(--color-green)]">
                  Details →
                </div>
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