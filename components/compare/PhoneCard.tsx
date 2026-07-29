// components/compare/PhoneCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  year: number;
  rating: number;
  isFlagship: boolean;
  image: string;
  specs: Record<string, any>;
}

interface PhoneCardProps {
  phone: Phone | null;
  onRemove?: () => void;
  index: number;
  isRemovable: boolean;
  onAddClick?: () => void;
}

const FALLBACK_IMAGE = "/images/phone-placeholder.png";

// Brand colors for premium badges
const BRAND_COLORS: Record<string, string> = {
  Apple: "from-blue-600 to-blue-700",
  Samsung: "from-blue-500 to-blue-600",
  Google: "from-green-500 to-green-600",
  OnePlus: "from-red-500 to-red-600",
  Xiaomi: "from-orange-500 to-orange-600",
  Nothing: "from-gray-700 to-gray-800",
  Sony: "from-gray-600 to-gray-700",
  Motorola: "from-blue-600 to-blue-700",
  Asus: "from-blue-500 to-blue-600",
  Huawei: "from-red-500 to-red-600",
  Oppo: "from-emerald-500 to-emerald-600",
  Vivo: "from-blue-500 to-blue-600",
  Realme: "from-yellow-500 to-yellow-600",
};

export function PhoneCard({ phone, onRemove, index, isRemovable, onAddClick }: PhoneCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!phone) {
    return (
      <button
        onClick={onAddClick}
        className="flex-shrink-0 w-[220px] bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#7F011F] hover:bg-[#7F011F]/5 transition-all duration-300 flex flex-col items-center justify-center p-6 aspect-[3/4] group cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-gray-100 group-hover:bg-[#7F011F]/10 transition-all flex items-center justify-center">
          <i className="fas fa-plus text-xl text-gray-300 group-hover:text-[#7F011F] transition-all" />
        </div>
        <p className="text-sm text-gray-400 mt-3 font-medium">Add Phone</p>
        <p className="text-xs text-gray-300">Slot {index + 1}</p>
      </button>
    );
  }

  const brandColor = BRAND_COLORS[phone.brand] || "from-gray-600 to-gray-700";

  const quickSpecs = [
    { icon: "fa-microchip", value: phone.specs?.chipset },
    { icon: "fa-memory", value: phone.specs?.ram },
    { icon: "fa-camera", value: phone.specs?.camera },
    { icon: "fa-battery-three-quarters", value: phone.specs?.battery },
  ].filter(s => s.value && s.value !== 'N/A' && s.value !== '');

  return (
    <div className="flex-shrink-0 w-[220px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative border border-gray-100/80 hover:border-[#7F011F]/20">
      {isRemovable && onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-[#7F011F] hover:text-white hover:border-[#7F011F] transition-all flex items-center justify-center text-xs text-gray-400 opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Remove phone"
        >
          <i className="fas fa-times" />
        </button>
      )}

      <Link href={`/phone-finder/${phone.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-[#7F011F]/20 border-t-[#7F011F] rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={imageError || !phone.image ? FALLBACK_IMAGE : phone.image}
            alt={`${phone.brand} ${phone.name}`}
            fill
            className={`object-contain p-4 transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="220px"
            priority={index < 2}
          />
          {/* Brand Badge - Premium gradient */}
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${brandColor} px-2.5 py-1 rounded-full shadow-sm`}>
              {phone.brand}
            </span>
          </div>
          {/* Flagship Badge */}
          {phone.isFlagship && (
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-bold text-white bg-gradient-to-r from-amber-400 to-amber-500 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                <i className="fas fa-crown text-[8px]" /> Flagship
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 text-center">
        <Link href={`/phone-finder/${phone.slug}`}>
          <h3 className="text-sm font-bold text-[#1a1a1a] hover:text-[#7F011F] transition-colors line-clamp-1 font-['Poppins',sans-serif]">
            {phone.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`text-[10px] ${i < Math.floor(phone.rating || 0) ? 'fas fa-star text-amber-400' : 'far fa-star text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400">{phone.rating?.toFixed(1) || 'N/A'}</span>
        </div>
        {quickSpecs.length > 0 && (
          <div className="grid grid-cols-2 gap-1 mt-2">
            {quickSpecs.slice(0, 4).map((spec, i) => (
              <div key={i} className="flex items-center justify-center gap-1 bg-gray-50/80 rounded-lg px-1.5 py-1 text-[9px] text-gray-600 font-medium truncate border border-gray-50">
                <i className={`fas ${spec.icon} text-[#7F011F]/50 text-[8px] flex-shrink-0`} />
                <span className="truncate">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}