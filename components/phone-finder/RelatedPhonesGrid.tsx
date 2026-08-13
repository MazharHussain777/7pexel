// @ts-nocheck
// components/RelatedPhonesGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  brandLogo: string;
  year: number;
  rating: number;
  reviewCount: number;
  isFlagship: boolean;
  isEditorChoice: boolean;
  tags: string[];
  image: string;
  specs: {
    display: string;
    displayType: string;
    resolution: string;
    pixelDensity: string;
    screenToBodyRatio: string;
    refreshRate: string;
    brightness: string;
    protection: string;
    hdrSupport: string;
    alwaysOnDisplay: string;
    chipset: string;
    cpu: string;
    gpu: string;
    neuralEngine: string;
    ram: string;
    ramType: string;
    storage: string;
    storageType: string;
    camera: string;
    cameraWide: string;
    cameraUltraWide: string;
    cameraTelephoto: string;
    cameraFeatures: string;
    videoRecording: string;
    frontCamera: string;
    frontFeatures: string;
    dimensions: string;
    weight: string;
    build: string;
    colors: string[];
    colorFinish: string;
    waterResistance: string;
    battery: string;
    batteryType: string;
    wiredCharging: string;
    wirelessCharging: string;
    batteryTechnology: string;
    videoPlayback: string;
    audioPlayback: string;
    standbyTime: string;
    os: string;
    osUpdates: string;
    audio: string;
    headphoneJack: string;
    audioRecording: string;
    sim: string;
    networkBands: string;
    wifi: string;
    bluetooth: string;
    nfc: string;
    usb: string;
    gps: string;
    ultraWideband: string;
    satelliteSOS: string;
    crashDetection: string;
    threadSupport: string;
    security: string;
    sensors: string;
    applePay: string;
    magSafe: string;
    emergencySOS: string;
    boxContents: string;
    models: string[];
    pricing: string[];
  };
  benchmarks: {
    antutu: number;
    geekbench6Single: number;
    geekbench6Multi: number;
    wildLifeExtreme: string;
  };
  stats: {
    views: string;
    favorites: string;
    shares: string;
    reviews: string;
  };
}

interface RelatedPhonesGridProps {
  relatedPhones: Phone[];
  currentSlug: string;
}

function RelatedPhoneCard({ phone, index }: { phone: Phone; index: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showImage = phone.image && !imgFailed;

  return (
    <Link
      href={`/phone-finder/${phone.slug}`}
      className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-lg border border-[rgba(127,1,31,0.06)] overflow-hidden transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-4px_rgba(127,1,31,0.15)] hover:border-[#7F011F]/30 hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7F011F] focus-visible:ring-offset-1"
    >
      {/* Image - No Badge */}
      <div className="relative w-full aspect-square bg-gradient-to-b from-[#fdfaf5] to-[#f7f0e2] overflow-hidden">
        {showImage ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[#efe6d0]/40" />
            )}
            <Image
              src={phone.image}
              alt={`${phone.brand} ${phone.name}`}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16.6vw, (max-width: 1536px) 14.28vw, 12.5vw"
              className={`object-contain p-1.5 transition-all duration-500 ease-out group-hover:scale-[1.05] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority={index < 3}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-mobile-alt text-xl text-[#7F011F]/15" />
          </div>
        )}

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#7F011F]/0 via-[#7F011F]/0 to-[#7F011F]/0 group-hover:from-[#7F011F]/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-500" />
      </div>

      {/* Name & Brand - Brand near name */}
      <div className="px-1 py-1.5 text-center border-t border-[rgba(127,1,31,0.04)]">
        {/* Brand Name - Above Phone Name */}
        <span className="text-[0.35rem] sm:text-[0.4rem] font-bold uppercase tracking-[0.06em] text-[#7F011F]/60 block mb-0.5">
          {phone.brand}
        </span>
        {/* Phone Name */}
        <span className="text-[0.5rem] sm:text-[0.6rem] font-medium text-[#2d1a1a] font-['Poppins',sans-serif] line-clamp-2 group-hover:text-[#7F011F] transition-colors leading-tight block">
          {phone.name}
        </span>
      </div>
    </Link>
  );
}

function RelatedPhoneCardSkeleton() {
  return (
    <div className="flex flex-col bg-white/90 rounded-lg border border-[rgba(127,1,31,0.06)] overflow-hidden">
      <div className="w-full aspect-square bg-[#efe6d0]/40 animate-pulse" />
      <div className="px-1 py-1.5 text-center border-t border-[rgba(127,1,31,0.04)]">
        <div className="h-1 w-8 mx-auto rounded-full bg-[#efe6d0]/60 animate-pulse mb-0.5" />
        <div className="h-1.5 w-12 mx-auto rounded-full bg-[#efe6d0]/60 animate-pulse" />
      </div>
    </div>
  );
}

export function RelatedPhonesGrid({ relatedPhones, currentSlug }: RelatedPhonesGridProps) {
  // Filter out the current phone and limit to 11
  const displayPhones = relatedPhones
    .filter(phone => phone.slug !== currentSlug)
    .slice(0, 11);

  if (displayPhones.length === 0) {
    return null;
  }

  return (
    <section className="mt-4 sm:mt-6" aria-labelledby="related-phones-title">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-0.5 h-3 sm:h-3.5 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
          <h2 className="text-[0.55rem] sm:text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#2d1a1a]/70 font-['Poppins',sans-serif]">
            Related
          </h2>
          <span className="text-[0.4rem] sm:text-[0.45rem] font-medium text-[#6d4a4a]/50 bg-[#f5ebd0]/30 px-1.5 sm:px-2 py-0.5 rounded-full">
            {displayPhones.length}
          </span>
        </div>
        <Link
          href="/phone-finder"
          className="text-[0.4rem] sm:text-[0.45rem] font-medium text-[#7F011F]/70 hover:text-[#7F011F] transition-colors flex items-center gap-1 group"
        >
          View All
          <i className="fas fa-arrow-right text-[0.3rem] sm:text-[0.35rem] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 gap-1.5 sm:gap-2 md:gap-2.5">
        {displayPhones.map((phone, index) => (
          <RelatedPhoneCard key={phone._id || phone.slug} phone={phone} index={index} />
        ))}
      </div>
    </section>
  );
}