// @ts-nocheck
// app/compare/CompareClient.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AddPhoneModal } from "@/components/compare/AddPhoneModal";
import { Phone } from "@/types/phone";

const MAX_PHONES = 3;

// ============= SPEC GROUPS =============
const SPEC_GROUPS = [
  {
    id: "display",
    label: "📱 Display",
    fields: [
      { key: "specs.display", label: "Size" },
      { key: "specs.displayType", label: "Type" },
      { key: "specs.resolution", label: "Resolution" },
      { key: "specs.pixelDensity", label: "Pixel Density" },
      { key: "specs.refreshRate", label: "Refresh Rate" },
      { key: "specs.brightness", label: "Brightness" },
      { key: "specs.protection", label: "Protection" },
      { key: "specs.hdrSupport", label: "HDR Support" },
    ]
  },
  {
    id: "performance",
    label: "⚡ Performance",
    fields: [
      { key: "specs.chipset", label: "Processor" },
      { key: "specs.cpu", label: "CPU" },
      { key: "specs.gpu", label: "GPU" },
      { key: "specs.ram", label: "RAM" },
      { key: "specs.storage", label: "Storage" },
      { key: "specs.expandableStorage", label: "Expandable Storage" },
    ]
  },
  {
    id: "camera",
    label: "📷 Camera",
    fields: [
      { key: "specs.camera", label: "Main Camera" },
      { key: "specs.cameraWide", label: "Wide Lens" },
      { key: "specs.cameraUltraWide", label: "Ultra-Wide" },
      { key: "specs.cameraTelephoto", label: "Telephoto" },
      { key: "specs.cameraFeatures", label: "Features" },
      { key: "specs.videoRecording", label: "Video Recording" },
      { key: "specs.frontCamera", label: "Front Camera" },
    ]
  },
  {
    id: "battery",
    label: "🔋 Battery",
    fields: [
      { key: "specs.battery", label: "Capacity" },
      { key: "specs.wiredCharging", label: "Wired Charging" },
      { key: "specs.wirelessCharging", label: "Wireless Charging" },
      { key: "specs.videoPlayback", label: "Video Playback" },
    ]
  },
  {
    id: "design",
    label: "🎨 Design",
    fields: [
      { key: "specs.weight", label: "Weight" },
      { key: "specs.build", label: "Build" },
      { key: "specs.colors", label: "Colors", format: (v: string[]) => v?.join(" · ") || "—" },
      { key: "specs.waterResistance", label: "Water Resistance" },
    ]
  },
  {
    id: "software",
    label: "💻 Software",
    fields: [
      { key: "specs.os", label: "OS" },
      { key: "specs.osUpdates", label: "OS Updates" },
    ]
  },
  {
    id: "pricing",
    label: "💰 Price",
    fields: [
      { key: "specs.pricing", label: "Pricing", format: (v: string[]) => v?.join(" — ") || "—" },
      { key: "specs.releaseDate", label: "Release Date" },
    ]
  }
];

// ============= PHONE CARD =============
function PhoneCard({ 
  phone, 
  onRemove, 
  isRemovable,
  onAddClick 
}: { 
  phone: Phone | null; 
  onRemove?: () => void; 
  isRemovable: boolean;
  onAddClick?: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  if (!phone) {
    return (
      <div 
        onClick={onAddClick}
        className="w-[220px] flex-shrink-0 cursor-pointer group"
      >
        <div className="aspect-[3/4] bg-white rounded-2xl border-2 border-dashed border-[#7F011F]/20 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:border-[#7F011F] group-hover:bg-[#7F011F]/5">
          <div className="w-16 h-16 rounded-full bg-[#7F011F]/10 flex items-center justify-center group-hover:bg-[#7F011F] transition-colors">
            <i className="fas fa-plus text-2xl text-[#7F011F]/40 group-hover:text-white" />
          </div>
          <span className="text-sm font-medium text-[#6d4a4a]">Add Phone</span>
        </div>
      </div>
    );
  }

  const imageUrl = imgError ? "/images/phone-placeholder.png" : (phone.image || "/images/phone-placeholder.png");

  return (
    <div className="w-[220px] flex-shrink-0 relative group">
      <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[3/4] bg-gradient-to-b from-[#faf8f5] to-[#f5f0e8] overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${phone.brand} ${phone.name} smartphone`}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="220px"
            onError={() => setImgError(true)}
          />
          
          {phone.isFlagship && (
            <div className="absolute top-3 left-3 bg-[#7F011F] text-white text-[0.45rem] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Flagship
            </div>
          )}

          {isRemovable && onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7F011F] hover:border-[#7F011F]/30 transition-all shadow-sm hover:shadow-md"
              aria-label="Remove phone"
            >
              <i className="fas fa-times text-sm" />
            </button>
          )}
        </div>

        <div className="p-3 text-center">
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.08em] text-[#7F011F]/70 block">
            {phone.brand}
          </span>
          <span className="text-sm font-semibold text-[#1a1a1a] font-['Poppins',sans-serif] line-clamp-2 mt-0.5">
            {phone.name}
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            {phone.year && (
              <span className="text-[0.55rem] text-[#6d4a4a]/50">
                {phone.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= SPEC GROUP =============
function SpecGroup({ 
  group, 
  phones 
}: { 
  group: typeof SPEC_GROUPS[0]; 
  phones: Phone[] 
}) {
  const getValue = (phone: Phone, field: any) => {
    const parts = field.key.split('.');
    let value = phone as any;
    for (const part of parts) {
      if (value === null || value === undefined) return "—";
      value = value[part];
    }
    if (value === null || value === undefined || value === "") return "—";
    if (field.format) return field.format(value);
    return String(value);
  };

  const hasData = group.fields.some(field => {
    return phones.some(phone => getValue(phone, field) !== "—");
  });

  if (!hasData || phones.length < 2) return null;

  return (
    <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#fbf8ff] to-[#f5f0e8] border-b border-[rgba(0,0,0,0.04)]">
        <h3 className="text-sm font-bold text-[#1a1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
          <span className="text-[#7F011F]">{group.label}</span>
          <span className="text-[0.55rem] text-[#6d4a4a]/40 font-medium ml-auto">
            {group.fields.length} specs
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#faf8f5] border-b border-[rgba(0,0,0,0.04)]">
              <th className="px-5 py-3 text-left text-xs font-semibold text-[#6d4a4a]/70 uppercase tracking-wider min-w-[180px]">
                Specification
              </th>
              {phones.map((phone, idx) => (
                <th key={phone._id || phone.slug || idx} className="px-4 py-3 text-center min-w-[140px]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[#1a1a1a]">{phone.brand}</span>
                    <span className="text-[0.5rem] text-[#6d4a4a]/50 truncate max-w-[120px]">
                      {phone.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.fields.map((field, idx) => {
              const values = phones.map(p => getValue(p, field));
              const allSame = values.every(v => v === values[0]);
              
              return (
                <tr 
                  key={field.key} 
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#faf8f5]'} hover:bg-[#f5f0e8] transition-colors ${allSame ? 'opacity-60' : ''}`}
                >
                  <td className="px-5 py-3 text-xs font-medium text-[#6d4a4a]">
                    {field.label}
                  </td>
                  {phones.map((phone, phoneIdx) => {
                    const value = values[phoneIdx];
                    const isDifferent = !allSame;
                    
                    return (
                      <td key={phone._id || phone.slug || phoneIdx} className="px-4 py-3 text-center">
                        <span className={`text-xs font-medium ${isDifferent && value !== "—" ? 'text-[#7F011F] font-semibold' : 'text-[#1a1a1a]'}`}>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============= MAIN CLIENT COMPONENT =============
interface CompareClientProps {
  initialPhones: any[];
}

export default function CompareClient({ initialPhones }: CompareClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [phones, setPhones] = useState<Phone[]>(initialPhones || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const slugs = searchParams.get('phones')?.split(',') || [];
    if (slugs.length === 0) {
      setPhones([]);
      return;
    }

    const currentSlugs = phones.map(p => p.slug);
    if (slugs.every(s => currentSlugs.includes(s)) && currentSlugs.length === slugs.length) {
      return;
    }

    const fetchPhones = async () => {
      setLoading(true);
      setError(null);
      const fetched: Phone[] = [];

      for (const slug of slugs) {
        try {
          const res = await fetch(`/api/phones/${slug}`);
          const result = await res.json();
          if (result.success && result.data) {
            if (!result.data.image) {
              result.data.image = "/images/phone-placeholder.png";
            }
            fetched.push(result.data);
          }
        } catch (err) {
          console.error(`Error fetching phone ${slug}:`, err);
        }
      }

      setPhones(fetched);
      setLoading(false);
    };

    fetchPhones();
  }, [searchParams]);

  const updateUrl = useCallback((newPhones: Phone[]) => {
    const slugs = newPhones.map(p => p.slug);
    const params = new URLSearchParams();
    if (slugs.length > 0) params.set('phones', slugs.join(','));
    router.push(`/compare${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  }, [router]);

  const handleAddPhone = (phone: Phone) => {
    if (phones.length >= MAX_PHONES) return;
    const newPhones = [...phones, phone];
    setPhones(newPhones);
    updateUrl(newPhones);
    setShowModal(false);
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
    updateUrl(newPhones);
  };

  const handleClearAll = () => {
    setPhones([]);
    updateUrl([]);
  };

  if (loading) return <CompareSkeleton />;

  const hasPhones = phones.length > 0;
  const p1 = phones[0];
  const p2 = phones[1];

  return (
    <div className="w-[77vw] max-w-[77vw] mx-auto px-4 py-6 md:py-8">
      {/* SEO-Friendly Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-gradient-to-b from-[#7F011F] to-[#a80a30] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
              {hasPhones ? (
                <span className="flex items-center gap-2">
                  <span className="text-[#7F011F]">{phones.length}</span> 
                  <span className="text-gray-400 font-medium text-xl">Phones Compared</span>
                </span>
              ) : (
                "Compare Smartphones"
              )}
            </h2>
          </div>
          {hasPhones && (
            <p className="text-sm text-gray-400 mt-1 ml-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#7F011F]/60">✦</span>
              {phones.map((p, i) => (
                <span key={p._id || p.slug || i}>
                  <span className="font-medium text-gray-600">{p.brand} {p.name}</span>
                  {i < phones.length - 1 && <span className="text-gray-300 mx-1">vs</span>}
                </span>
              ))}
            </p>
          )}
          {hasPhones && phones.length === 2 && (
            <p className="text-xs text-[#6d4a4a]/50 mt-1 ml-4">
              {p1?.brand} {p1?.name} vs {p2?.brand} {p2?.name} - Complete comparison of specifications, camera, battery, and performance
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasPhones && phones.length > 1 && (
            <button
              onClick={handleClearAll}
              className="text-sm text-gray-400 hover:text-[#7F011F] transition-colors px-4 py-2 rounded-full border border-gray-200 hover:border-[#7F011F]/30 hover:bg-[#7F011F]/5"
            >
              <i className="fas fa-times mr-1.5" />
              Clear All
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            disabled={phones.length >= MAX_PHONES}
            className={`text-sm px-5 py-2 rounded-full font-medium transition-all ${
              phones.length >= MAX_PHONES
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white hover:shadow-lg hover:shadow-[#7F011F]/30 transform hover:-translate-y-0.5'
            }`}
          >
            <i className={`fas ${phones.length >= MAX_PHONES ? 'fa-lock' : 'fa-plus'} mr-1.5`} />
            {phones.length >= MAX_PHONES ? 'Max Reached' : 'Add Phone'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-red-600">
            <i className="fas fa-exclamation-circle" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-1.5 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
          >
            <i className="fas fa-redo mr-1.5" />
            Retry
          </button>
        </div>
      )}

      {/* Phone Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {phones.map((phone, idx) => (
          <PhoneCard
            key={phone._id || phone.slug || idx}
            phone={phone}
            onRemove={() => handleRemovePhone(idx)}
            isRemovable={phones.length > 1}
          />
        ))}
        {phones.length < MAX_PHONES && (
          <PhoneCard
            key="add-phone-card"
            phone={null}
            isRemovable={false}
            onAddClick={() => setShowModal(true)}
          />
        )}
      </div>

      {/* Empty State */}
      {!hasPhones && !error && (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <i className="fas fa-arrows-left-right text-3xl text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
            Compare Smartphones Side by Side
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
            Add up to {MAX_PHONES} phones to compare specifications, features, and performance.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#a80a30] shadow-lg shadow-[#7F011F]/25 transition-all"
          >
            <i className="fas fa-plus" />
            Add First Phone
          </button>
        </div>
      )}

      {/* Comparison Table */}
      {hasPhones && phones.length >= 2 && !error && (
        <div className="space-y-6 mt-6">
          {/* SEO-friendly comparison summary */}
          <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] p-4 shadow-sm">
            <p className="text-xs text-[#6d4a4a]/70 font-['Poppins',sans-serif]">
              <span className="font-semibold text-[#1a1a1a]">Comparison Summary:</span>
              {phones.map((p, i) => (
                <span key={p._id || p.slug}>
                  {i > 0 && " vs "}
                  <span className="font-medium text-[#7F011F]">{p.brand} {p.name}</span>
                  {p.specs?.chipset && ` (${p.specs.chipset})`}
                  {p.specs?.camera && `, ${p.specs.camera} camera`}
                  {p.specs?.battery && `, ${p.specs.battery} battery`}
                </span>
              ))}
            </p>
          </div>

          {SPEC_GROUPS.map((group) => (
            <SpecGroup
              key={group.id}
              group={group}
              phones={phones}
            />
          ))}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pb-2 border-t border-[rgba(0,0,0,0.06)]">
            <button
              onClick={() => {
                const url = window.location.href;
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(url).catch(() => {});
                }
              }}
              className="text-xs text-gray-400 hover:text-[#7F011F] transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 hover:border-[#7F011F]/30"
            >
              <i className="fas fa-link" />
              Copy Comparison Link
            </button>
            <Link
              href="/phone-finder"
              className="text-xs text-gray-400 hover:text-[#7F011F] transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 hover:border-[#7F011F]/30"
            >
              <i className="fas fa-search" />
              Browse All Phones
            </Link>
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 hover:border-red-200"
            >
              <i className="fas fa-trash-alt" />
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Add Phone Modal */}
      <AddPhoneModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleAddPhone}
        existingPhones={phones}
        maxPhones={MAX_PHONES}
      />
    </div>
  );
}