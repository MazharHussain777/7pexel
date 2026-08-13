// app/auto/brands/components/BrandCard.tsx
"use client";

import Link from "next/link";
// ✅ Fix: Import Brand from the correct path
import { Brand } from "@/app/auto/data/vehicles";

interface BrandCardProps {
  brand: Brand;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: "grid" | "compact" | "mini";
  className?: string;
}

function getReadableTextColor(bg: string, fallback?: string) {
  if (fallback) return fallback;
  const hex = bg.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#151515" : "#FFFFFF";
}

function darken(hex: string, amount: number) {
  const h = hex.replace("#", "");
  const r = Math.max(0, parseInt(h.substring(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(h.substring(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(h.substring(4, 6), 16) - amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export function BrandCard({
  brand,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  variant = "grid",
  className = "",
}: BrandCardProps) {
  const textColor = getReadableTextColor(brand.color, brand.textColor);
  const shadowDark = darken(brand.color, 60);

  const getFontSize = (name: string) => {
    const len = name.length;
    if (len <= 6) return "1.3rem";
    if (len <= 10) return "1.1rem";
    if (len <= 14) return "0.95rem";
    if (len <= 18) return "0.8rem";
    return "0.7rem";
  };

  const styles = {
    grid: {
      minHeight: "80px",
      padding: "16px 14px",
      borderRadius: "12px",
      fontSize: getFontSize(brand.name),
      showCountry: true,
      showModels: true,
    },
    compact: {
      minHeight: "70px",
      padding: "12px 12px",
      borderRadius: "10px",
      fontSize: getFontSize(brand.name),
      showCountry: true,
      showModels: true,
    },
    mini: {
      minHeight: "60px",
      padding: "10px 10px",
      borderRadius: "10px",
      fontSize: "0.75rem",
      showCountry: false,
      showModels: true,
    },
  };

  const style = styles[variant];

  return (
    <Link
      href={`/auto/brands/${brand.slug}`}
      aria-label={`${brand.name} — ${brand.country}`}
      className={`group relative flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97] ${className}`}
      style={{
        backgroundColor: brand.color,
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 8px 0 0 ${shadowDark}, 0 12px 28px -8px ${brand.color}80`
          : `0 4px 0 0 ${shadowDark}, 0 4px 12px -4px rgba(0,0,0,0.15)`,
        minHeight: style.minHeight,
        padding: style.padding,
        borderRadius: style.borderRadius,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background: `linear-gradient(to bottom, rgba(255,255,255,${isHovered ? 0.2 : 0.12}), transparent)`,
        }}
      />

      {style.showCountry && (
        <span
          className="absolute top-2 left-3 text-[0.4rem] font-medium uppercase tracking-[0.08em] font-jetbrains-mono z-10 transition-opacity"
          style={{ color: textColor, opacity: isHovered ? 0.7 : 0.4 }}
        >
          {brand.country}
        </span>
      )}

      {style.showModels && (
        <span
          className="absolute top-2 right-3 text-[0.4rem] font-medium font-jetbrains-mono z-10 px-1.5 py-0.5 rounded"
          style={{ color: textColor, opacity: isHovered ? 0.7 : 0.4 }}
        >
          {brand.models}
        </span>
      )}

      <div className="relative z-10 w-full flex items-center justify-center text-center px-1">
        <h5
          className="font-fraunces font-bold uppercase leading-[1.15] tracking-[0.02em] w-full transition-all duration-200"
          style={{
            color: textColor,
            fontSize: style.fontSize,
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {brand.name}
        </h5>
      </div>

      <span
        className="absolute bottom-0 left-1/2 h-[2px] rounded-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: textColor,
          width: isHovered ? "35%" : "0%",
          transform: "translateX(-50%)",
          opacity: 0.4,
        }}
      />
    </Link>
  );
}