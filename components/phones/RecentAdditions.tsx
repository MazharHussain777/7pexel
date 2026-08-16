// components/phones/RecentAdditions.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchLatestPhones } from "@/app/phones/finder/data/phone-db";

export function RecentAdditions() {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchLatestPhones(6);
        setPhones(data);
      } catch (error) {
        console.error('Error fetching recent phones:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPhones();
  }, []);

  if (loading) {
    return (
      <section className="py-6">
        <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
          <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
            Recent <em className="italic not-italic text-[#FF6B00]">Additions</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-[#FFE4C4] rounded-[12px] p-4 bg-white animate-pulse">
              <div className="w-full aspect-square bg-[#F5F5F5] rounded mb-2" />
              <div className="h-4 bg-[#F5F5F5] rounded w-3/4 mx-auto" />
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
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
          Recent <em className="italic not-italic text-[#FF6B00]">Additions</em>
        </h2>
        <Link href="/phones/finder" className="text-[0.8rem] font-semibold text-[#FF6B00] hover:underline">
          View all →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {phones.map((phone) => {
          const brandColor = getBrandColor(phone.brand);
          const slug = phone.slug;
          
          // Use the image from database (ImageKit URL) directly
          const imageUrl = phone.image || phone.imageUrl || '/images/placeholder-phone.jpg';
          
          return (
            <Link
              key={phone._id || phone.slug}
              href={`/phones/finder/${slug}`}
              className="group border border-[#E8E8E8] rounded-[12px] overflow-hidden bg-white transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(255,107,0,0.12)] hover:border-[#FF6B00]"
            >
              {/* Image Area - White background */}
              <div className="relative w-full aspect-square overflow-hidden bg-white">
                <Image
                  src={imageUrl}
                  alt={`${phone.brand} ${phone.model}`}
                  fill
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center text-4xl bg-white';
                      fallback.textContent = getBrandEmoji(phone.brand);
                      parent.appendChild(fallback);
                    }
                  }}
                />
                
                {/* Year Badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-[#FF6B00]/80 backdrop-blur-sm text-white text-[0.4rem] font-medium px-1.5 py-0.5 rounded-full">
                  {phone.year}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-2.5 text-center">
                <div className="text-[0.5rem] uppercase tracking-[0.08em] text-[#8B7355] font-semibold truncate">
                  {phone.brand}
                </div>
                <h4 className="font-fraunces font-medium text-[0.7rem] leading-[1.2] text-[#4A3520] mt-0.5 truncate">
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

function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    Apple: "#FF6B00",
    Samsung: "#FF8C00",
    Google: "#FFA500",
    OnePlus: "#FF6B00",
    Xiaomi: "#FF8C00",
    Oppo: "#FFA500",
    Vivo: "#FFB347",
    Nothing: "#FF6B00",
    Motorola: "#FF8C00",
    Huawei: "#FF6B00",
    Sony: "#FF8C00",
    LG: "#FFA500",
  };
  return colors[brand] || "#FF6B00";
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