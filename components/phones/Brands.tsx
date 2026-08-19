// components/phones/Brands.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBrandsFromDB } from "@/lib/phone-data-service";

const BRAND_COLORS: Record<string, { primary: string; secondary: string; bg: string }> = {
  Apple: { primary: "#555555", secondary: "#8E8E93", bg: "#F5F5F7" },
  Samsung: { primary: "#1428A0", secondary: "#4A6CF7", bg: "#E8EDF9" },
  Google: { primary: "#4285F4", secondary: "#34A853", bg: "#E8F0FE" },
  OnePlus: { primary: "#E54141", secondary: "#FF6B6B", bg: "#FDE8E8" },
  Xiaomi: { primary: "#FF6900", secondary: "#FF9E44", bg: "#FFF0E5" },
  Oppo: { primary: "#1A8C4A", secondary: "#34A853", bg: "#E5F5ED" },
  Vivo: { primary: "#415FFF", secondary: "#6B8AFF", bg: "#E8ECFF" },
  Nothing: { primary: "#000000", secondary: "#333333", bg: "#F5F5F5" },
  Motorola: { primary: "#00B388", secondary: "#33C9A8", bg: "#E5F5F0" },
  Huawei: { primary: "#CF0A2C", secondary: "#E53935", bg: "#FDE8EA" },
  Sony: { primary: "#000000", secondary: "#444444", bg: "#F5F5F5" },
  LG: { primary: "#A50034", secondary: "#C62828", bg: "#FDE8ED" },
  Nokia: { primary: "#0944B3", secondary: "#4A7CD4", bg: "#E8EEFB" },
  Asus: { primary: "#005A9C", secondary: "#3A8BC4", bg: "#E8F0F8" },
  Lenovo: { primary: "#E2231A", secondary: "#FF4D44", bg: "#FDE8E6" },
  Honor: { primary: "#0A0A0A", secondary: "#2D2D2D", bg: "#F5F5F5" },
  Realme: { primary: "#FF6C00", secondary: "#FF9E44", bg: "#FFF0E5" },
  Tecno: { primary: "#FF3366", secondary: "#FF6699", bg: "#FDE8EE" },
  Infinix: { primary: "#FF6600", secondary: "#FF9E44", bg: "#FFF0E5" },
  "Black Shark": { primary: "#000000", secondary: "#2D2D2D", bg: "#F5F5F5" },
  Razer: { primary: "#00FF00", secondary: "#66FF66", bg: "#E8FFE8" },
};

function getBrandColors(brand: string) {
  return BRAND_COLORS[brand] || { primary: "#FF6B00", secondary: "#FFA500", bg: "#FFF5EB" };
}

export function Brands() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandList = await fetchBrandsFromDB();
        setBrands(Array.isArray(brandList) ? brandList : []);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    loadBrands();
  }, []);

  if (loading) {
    return (
      <section className="py-6">
        <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
          <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
            <em className="italic not-italic text-[#FF6B00]">Brands</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-[#FFE4C4] rounded-[12px] p-4 bg-white animate-pulse">
              <div className="h-5 bg-[#FFF0E0] rounded w-3/4 mx-auto" />
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
    <section className="py-6">
      <div className="flex justify-between items-baseline mb-5 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em]">
          <em className="italic not-italic text-[#FF6B00]">Brands</em>
        </h2>
        <Link href="/phones/finder" className="text-[0.8rem] font-semibold text-[#FF6B00] hover:underline">
          View all →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {brands.map((brandName) => {
          const colors = getBrandColors(brandName);
          
          return (
            <Link
              key={brandName}
              href={`/phones/finder?brand=${encodeURIComponent(brandName)}`}
              className="group border border-[#E8E8E8] rounded-[16px] py-5 px-4 bg-white text-center flex items-center justify-center transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)] hover:border-[#FF6B00]"
            >
              <h6 
                className="font-semibold text-[1rem] tracking-[-0.01em] transition-colors"
                style={{ color: colors.primary }}
              >
                {brandName}
              </h6>
            </Link>
          );
        })}
      </div>
    </section>
  );
}