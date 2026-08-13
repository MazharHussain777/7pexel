// components/phones/PopularBrands.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBrands, fetchPhones } from "@/app/phones/finder/data/phone-db";

export function PopularBrands() {
  const [brands, setBrands] = useState<{ brand: string; count: number; latestModel: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandList = await fetchBrands();
        const brandData = await Promise.all(
          brandList.map(async (brand) => {
            const result = await fetchPhones({ brand, limit: 1 });
            return {
              brand,
              count: result.total,
              latestModel: result.data[0]?.model || '',
            };
          })
        );
        setBrands(brandData.sort((a, b) => b.count - a.count));
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBrands();
  }, []);

  if (loading) {
    return (
      <section className="py-4">
        <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
          <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
            Popular <em className="italic not-italic text-[var(--color-green)]">Brands</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-[var(--color-line)] rounded-[12px] p-4 bg-[var(--color-paper)] animate-pulse">
              <div className="w-12 h-12 rounded-[12px] bg-gray-200 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-4">
      <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
          Popular <em className="italic not-italic text-[var(--color-green)]">Brands</em>
        </h2>
        <Link href="/phones/finder" className="text-[0.8rem] font-semibold text-[var(--color-green)] hover:underline">
          View all brands →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {brands.map(({ brand, count, latestModel }) => {
          const brandColor = getBrandColor(brand);
          
          return (
            <Link
              key={brand}
              href={`/phones/finder?brand=${brand}`}
              className="border-[1.5px] border-[var(--color-line)] rounded-[12px] p-4 bg-[var(--color-paper)] text-center flex flex-col items-center gap-2 transition-all hover:border-[var(--color-green)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,24,15,0.08)]"
            >
              <div 
                className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl"
                style={{ 
                  background: `linear-gradient(145deg, ${brandColor}15, ${brandColor}08)`,
                }}
              >
                {getBrandEmoji(brand)}
              </div>
              <h6 className="font-fraunces font-semibold text-[0.84rem]">{brand}</h6>
              <span className="font-jetbrains-mono text-[0.66rem] text-[var(--color-ink-soft)]">
                {count} {count === 1 ? 'phone' : 'phones'}
              </span>
              {latestModel && (
                <span className="text-[0.55rem] text-[var(--color-ink-soft)]/60 truncate max-w-full">
                  {latestModel}
                </span>
              )}
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
    Huawei: "#CF0A2C",
    Sony: "#000000",
    LG: "#A50034",
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
    Huawei: "🔴",
    Sony: "🎮",
    LG: "🟣",
  };
  return emojis[brand] || "📱";
}