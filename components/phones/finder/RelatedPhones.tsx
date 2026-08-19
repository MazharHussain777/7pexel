// components/phones/finder/RelatedPhones.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { getBrandEmoji, getBrandTheme, getPhoneSlug } from "@/app/phones/finder/data/phone-helpers";
import { getImageKitUrl, getPhoneImage } from "@/lib/imagekit";

interface RelatedPhonesProps {
  relatedPhones: any[];
  currentSlug: string;
}

export function RelatedPhones({ relatedPhones, currentSlug }: RelatedPhonesProps) {
  if (!relatedPhones || relatedPhones.length === 0) return null;

  const firstPhone = relatedPhones[0];
  const theme = getBrandTheme(firstPhone?.brand || "Apple");

  // Take only 9 phones for the grid
  const displayPhones = relatedPhones.slice(0, 9);

  // Get image URL with ImageKit support
  const getImageUrl = (phone: any, width?: number, height?: number) => {
    if (phone.image) {
      if (phone.image.includes('ik.imagekit.io')) return phone.image;
      if (phone.image.includes('http')) return phone.image;
      return getImageKitUrl(phone.image, { width: width || 200, height: height || 300, quality: 80, format: 'webp' });
    }
    return getPhoneImage(phone.brand, phone.model, { width: width || 200, height: height || 300, quality: 80 });
  };

  return (
    <section className="mt-8 w-full" aria-label="Similar phones">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 px-3 md:px-4 lg:px-6">
        <div className="w-1 h-6 rounded-full" style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})` }} />
        <h3 className="font-['Poppins',sans-serif] text-xl font-bold" style={{ color: theme.primary }}>
          Similar Phones
        </h3>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${theme.primary}40, transparent)` }} />
        <span className="text-[0.65rem] font-semibold tracking-[0.5px]" style={{ color: theme.primary }}>
          {displayPhones.length} devices
        </span>
      </div>

      {/* 9 Phones in 1 Row */}
      <div className="w-full px-3 md:px-4 lg:px-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-2 md:gap-2.5">
          {displayPhones.map((phone) => {
            const slug = phone.slug || getPhoneSlug(phone.model);
            return (
              <RelatedPhoneCard key={phone._id || phone.id || slug} phone={phone} slug={slug} theme={theme} getImageUrl={getImageUrl} />
            );
          })}
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-4 text-center">
        <Link
          href="/phones/finder"
          className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[var(--color-green)] hover:underline transition-all duration-200 hover:gap-3"
        >
          Browse all phones
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// Related Phone Card - Clean, No border, No shadow
function RelatedPhoneCard({ phone, slug, theme, getImageUrl }: { 
  phone: any; 
  slug: string; 
  theme: { primary: string; secondary: string };
  getImageUrl: (phone: any, width?: number, height?: number) => string;
}) {
  const brandColor = theme.primary;
  
  // Get image URL with ImageKit
  const imageUrl = getImageUrl(phone, 200, 300);
  
  return (
    <Link
      href={`/phones/finder/${slug}`}
      className="group block transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Area - No border, just clean */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-[#f5f8f6] to-[#e8f0ec] rounded-lg">
        <Image
          src={imageUrl}
          alt={`${phone.brand} ${phone.model}`}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, 11vw"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex items-center justify-center text-4xl md:text-5xl';
              fallback.textContent = getBrandEmoji(phone.brand);
              parent.appendChild(fallback);
            }
          }}
        />
        
        {/* Year Badge - Clean, minimal */}
        <div className="absolute bottom-1.5 right-1.5 bg-black/30 backdrop-blur-sm text-white text-[0.35rem] font-medium px-1.5 py-0.5 rounded-full">
          {phone.year}
        </div>
      </div>

      {/* Content - Clean, no borders */}
      <div className="p-2 text-center">
        <div className="text-[0.45rem] uppercase tracking-[0.08em] text-[var(--color-ink-soft)] font-semibold truncate">
          {phone.brand}
        </div>
        <h4 className="font-['Poppins',sans-serif] font-medium text-[0.6rem] leading-[1.2] text-[var(--color-green-deep)] mt-0.5 truncate">
          {phone.model}
        </h4>
      </div>
    </Link>
  );
}