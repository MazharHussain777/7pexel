// components/CompareClient.tsx
"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AIComparison } from "./AIComparison";

interface Phone {
  _id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  gallery: string[];
  rating: number;
  review_count: number;
  category: string[];
  display: string;
  display_size: string;
  display_resolution: string;
  display_type: string;
  display_protection: string;
  display_features: string[];
  refresh_rate: string;
  brightness: string;
  aspect_ratio: string;
  pixel_density: string;
  screen_to_body_ratio: string;
  camera: string;
  camera_details: string;
  camera_features: string[];
  video_recording: string;
  front_camera: string;
  front_camera_features: string[];
  camera_sensor: string;
  aperture: string;
  optical_zoom: string;
  digital_zoom: string;
  battery: string;
  battery_type: string;
  charging: string;
  charging_type: string;
  wireless_charging: string;
  reverse_charging: string;
  battery_life: string;
  charging_time: string;
  chipset: string;
  chipset_details: string;
  cpu: string;
  cpu_cores: string;
  cpu_frequency: string;
  gpu: string;
  gpu_details: string;
  ram: string;
  ram_type: string;
  storage: string;
  storage_type: string;
  expandable_storage: string;
  antutu_score: string;
  geekbench_score: string;
  os: string;
  os_version: string;
  ui_skin: string;
  update_policy: string;
  security_updates: string;
  weight: string;
  dimensions: string;
  colors: string[];
  materials: string[];
  water_resistance: string;
  dust_resistance: string;
  sim: string;
  network: string;
  wifi: string;
  bluetooth: string;
  nfc: string;
  usb: string;
  gps: string;
  sensors: string[];
  speakers: string;
  audio_jack: string;
  audio_features: string[];
  fingerprint: string;
  face_unlock: string;
  security_features: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  author_avatar: string;
  author_bio: string;
  author_social: string[];
  date: string;
  read_time: string;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  published: boolean;
  content_html?: string;
  content_plain?: string;
}

interface CompareClientProps {
  initialPhones: Phone[];
  preSelectedPhones?: Phone[];
  searchQuery?: string;
  matchedQuery?: string;
}

export function CompareClient({ 
  initialPhones, 
  preSelectedPhones = [],
  searchQuery = '',
  matchedQuery = ''
}: CompareClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPhones, setSelectedPhones] = useState<Phone[]>(preSelectedPhones);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<Phone[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filterBrand, setFilterBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [hoveredPhone, setHoveredPhone] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(preSelectedPhones.length >= 2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSpecGroup, setActiveSpecGroup] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  // Get phone slugs from URL
  const urlSlugs = useMemo(() => {
    const phonesParam = searchParams.get("phones");
    if (phonesParam) {
      return phonesParam.split(",").filter(Boolean);
    }
    return [];
  }, [searchParams]);

  // Load phones from URL on mount
  useEffect(() => {
    if (urlSlugs.length > 0 && initialPhones.length > 0) {
      const phones = urlSlugs
        .map(slug => initialPhones.find(p => p.slug === slug))
        .filter((p): p is Phone => p !== undefined);
      if (phones.length > 0) {
        setSelectedPhones(phones);
        if (phones.length >= 2) {
          setShowComparison(true);
        }
      }
    }
  }, [urlSlugs, initialPhones]);

  // Get unique brands
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    initialPhones.forEach(phone => {
      brandSet.add(phone.brand);
    });
    return Array.from(brandSet).sort();
  }, [initialPhones]);

  // Filter and sort phones
  const filteredPhones = useMemo(() => {
    let phones = [...initialPhones];

    if (searchInput) {
      const query = searchInput.toLowerCase();
      phones = phones.filter(p =>
        p.brand.toLowerCase().includes(query) ||
        p.model.toLowerCase().includes(query)
      );
    }

    if (filterBrand !== "all") {
      phones = phones.filter(p => p.brand === filterBrand);
    }

    switch (sortBy) {
      case "rating":
        phones.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "price-low":
        phones.sort((a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0"));
        break;
      case "price-high":
        phones.sort((a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0"));
        break;
      case "newest":
      default:
        phones.sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));
        break;
    }

    return phones;
  }, [initialPhones, searchInput, filterBrand, sortBy]);

  // Search function
  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    const normalizedQuery = query.toLowerCase().trim();
    
    const results = initialPhones.filter(phone => {
      const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
      const slug = phone.slug.toLowerCase();
      const brand = phone.brand.toLowerCase();
      const model = phone.model.toLowerCase();
      
      return fullName.includes(normalizedQuery) || 
             slug.includes(normalizedQuery) || 
             brand.includes(normalizedQuery) || 
             model.includes(normalizedQuery);
    });
    
    results.sort((a, b) => {
      const aScore = getRelevanceScore(a, normalizedQuery);
      const bScore = getRelevanceScore(b, normalizedQuery);
      return bScore - aScore;
    });
    
    setSearchResults(results.slice(0, 10));
    setIsSearching(false);
  }, [initialPhones]);

  // Get relevance score
  function getRelevanceScore(phone: Phone, query: string): number {
    const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
    const model = phone.model.toLowerCase();
    const brand = phone.brand.toLowerCase();
    
    let score = 0;
    if (fullName === query) score = 100;
    else if (fullName.includes(query)) score = 80;
    else if (model === query) score = 70;
    else if (model.includes(query)) score = 60;
    else if (brand === query) score = 50;
    else if (brand.includes(query)) score = 40;
    else if (phone.slug.includes(query)) score = 30;
    
    return score;
  }

  const isSelected = useCallback((phone: Phone) => {
    return selectedPhones.some(p => p.slug === phone.slug);
  }, [selectedPhones]);

  const addToCompare = useCallback((phone: Phone) => {
    if (selectedPhones.some(p => p.slug === phone.slug)) return;
    if (selectedPhones.length >= 4) {
      alert("You can compare up to 4 phones at a time.");
      return;
    }
    
    const newSelected = [...selectedPhones, phone];
    setSelectedPhones(newSelected);
    const slugs = newSelected.map(p => p.slug).join(",");
    router.push(`/compare?phones=${slugs}`, { scroll: false });
    
    if (newSelected.length >= 2) {
      setIsAnimating(true);
      setShowComparison(true);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          comparisonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }, 300);
    }
  }, [selectedPhones, router]);

  const removeFromCompare = useCallback((phone: Phone) => {
    const newSelected = selectedPhones.filter(p => p.slug !== phone.slug);
    setSelectedPhones(newSelected);
    const slugs = newSelected.map(p => p.slug).join(",");
    if (slugs) {
      router.push(`/compare?phones=${slugs}`, { scroll: false });
    } else {
      router.push("/compare", { scroll: false });
      setShowComparison(false);
      setShowAI(false);
    }
    
    if (newSelected.length < 2) {
      setShowComparison(false);
      setShowAI(false);
    }
  }, [selectedPhones, router]);

  const clearCompare = useCallback(() => {
    setSelectedPhones([]);
    setShowComparison(false);
    setShowAI(false);
    router.push("/compare", { scroll: false });
  }, [router]);

  const handleSearchResultClick = useCallback((phone: Phone) => {
    addToCompare(phone);
    setSearchInput('');
    setSearchResults([]);
  }, [addToCompare]);

  // Get comparison specs with highlighting
  const comparisonSpecs = useMemo(() => {
    if (selectedPhones.length < 2) return [];

    const specGroups = [
      {
        id: "display",
        group: "Display",
        icon: "🖥️",
        specs: [
          { key: "display_size", label: "Size" },
          { key: "display_resolution", label: "Resolution" },
          { key: "display_type", label: "Type" },
          { key: "refresh_rate", label: "Refresh Rate" },
          { key: "brightness", label: "Brightness" },
          { key: "pixel_density", label: "Pixel Density" },
          { key: "display_protection", label: "Protection" },
          { key: "screen_to_body_ratio", label: "Screen to Body" },
        ]
      },
      {
        id: "camera",
        group: "Camera",
        icon: "📷",
        specs: [
          { key: "camera", label: "Main Camera" },
          { key: "camera_details", label: "Camera Details" },
          { key: "video_recording", label: "Video Recording" },
          { key: "front_camera", label: "Front Camera" },
          { key: "optical_zoom", label: "Optical Zoom" },
          { key: "digital_zoom", label: "Digital Zoom" },
          { key: "camera_sensor", label: "Sensor" },
          { key: "aperture", label: "Aperture" },
        ]
      },
      {
        id: "performance",
        group: "Performance",
        icon: "⚡",
        specs: [
          { key: "chipset", label: "Chipset" },
          { key: "chipset_details", label: "Chipset Details" },
          { key: "cpu", label: "CPU" },
          { key: "cpu_cores", label: "CPU Cores" },
          { key: "cpu_frequency", label: "CPU Frequency" },
          { key: "gpu", label: "GPU" },
          { key: "ram", label: "RAM" },
          { key: "ram_type", label: "RAM Type" },
          { key: "storage", label: "Storage" },
          { key: "storage_type", label: "Storage Type" },
          { key: "expandable_storage", label: "Expandable" },
          { key: "antutu_score", label: "Antutu Score" },
          { key: "geekbench_score", label: "Geekbench Score" },
        ]
      },
      {
        id: "battery",
        group: "Battery",
        icon: "🔋",
        specs: [
          { key: "battery", label: "Capacity" },
          { key: "battery_type", label: "Battery Type" },
          { key: "charging", label: "Charging" },
          { key: "charging_type", label: "Charging Type" },
          { key: "wireless_charging", label: "Wireless Charging" },
          { key: "reverse_charging", label: "Reverse Charging" },
          { key: "battery_life", label: "Battery Life" },
          { key: "charging_time", label: "Charging Time" },
        ]
      },
      {
        id: "physical",
        group: "Physical",
        icon: "📏",
        specs: [
          { key: "weight", label: "Weight" },
          { key: "dimensions", label: "Dimensions" },
          { key: "water_resistance", label: "Water Resistance" },
          { key: "dust_resistance", label: "Dust Resistance" },
          { key: "materials", label: "Materials" },
          { key: "colors", label: "Colors" },
        ]
      },
      {
        id: "connectivity",
        group: "Connectivity",
        icon: "📶",
        specs: [
          { key: "sim", label: "SIM" },
          { key: "network", label: "Network" },
          { key: "wifi", label: "WiFi" },
          { key: "bluetooth", label: "Bluetooth" },
          { key: "nfc", label: "NFC" },
          { key: "usb", label: "USB" },
          { key: "gps", label: "GPS" },
          { key: "sensors", label: "Sensors" },
        ]
      },
      {
        id: "audio",
        group: "Audio & Security",
        icon: "🔒",
        specs: [
          { key: "speakers", label: "Speakers" },
          { key: "audio_jack", label: "Audio Jack" },
          { key: "audio_features", label: "Audio Features" },
          { key: "fingerprint", label: "Fingerprint" },
          { key: "face_unlock", label: "Face Unlock" },
          { key: "security_features", label: "Security Features" },
        ]
      },
      {
        id: "software",
        group: "Software",
        icon: "📱",
        specs: [
          { key: "os", label: "OS" },
          { key: "os_version", label: "OS Version" },
          { key: "ui_skin", label: "UI Skin" },
          { key: "update_policy", label: "Update Policy" },
          { key: "security_updates", label: "Security Updates" },
        ]
      }
    ];

    return specGroups.map(({ id, group, icon, specs }) => ({
      id,
      group,
      icon,
      specs: specs.map(({ key, label }) => {
        const values = selectedPhones.map(phone => ({
          phone,
          value: (phone as any)[key] || "—",
          formatted: (phone as any)[key] || "—",
        }));
        return { key, label, values };
      }),
    }));
  }, [selectedPhones]);

  // Auto comparison combinations
  const phoneCombinations = useMemo(() => {
    if (initialPhones.length < 2) return [];
    
    const combos: { phone1: Phone; phone2: Phone; slug: string }[] = [];
    const maxCombos = Math.min(initialPhones.length, 30);
    
    for (let i = 0; i < maxCombos; i++) {
      for (let j = i + 1; j < Math.min(maxCombos, i + 5); j++) {
        const phone1 = initialPhones[i];
        const phone2 = initialPhones[j];
        if (phone1 && phone2) {
          combos.push({
            phone1,
            phone2,
            slug: `${phone1.slug}-vs-${phone2.slug}`,
          });
        }
      }
    }
    
    return combos;
  }, [initialPhones]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
      {/* Hero Header */}
      <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#7F011F] to-[#a80a30] text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <h1 className="font-fraunces text-3xl md:text-5xl font-medium mb-3 tracking-tight">
            Compare <span className="text-white/80">Smartphones</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            Select up to 4 phones to compare specs, prices, camera quality, 
            battery life, and performance side by side.
          </p>
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {initialPhones.length} Phones Available
            </span>
            {selectedPhones.length > 0 && (
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {selectedPhones.length} Selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Show matched query info */}
      {matchedQuery && preSelectedPhones.length === 2 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-[#0F6B3E]/10 to-[#0F6B3E]/5 border border-[#0F6B3E]/20 rounded-2xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="text-sm font-medium text-[#0F6B3E]">
                Found match for: <span className="font-bold">"{searchQuery}"</span>
              </p>
              <p className="text-xs text-[#6d4a4a]">
                Comparing: {preSelectedPhones[0]?.brand} {preSelectedPhones[0]?.model} vs {preSelectedPhones[1]?.brand} {preSelectedPhones[1]?.model}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SEARCH BAR - Smart Phone Search */}
      {/* ============================================================ */}
      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-[#7F011F]/20 p-2 shadow-lg focus-within:border-[#7F011F] transition-all">
            <svg className="w-5 h-5 text-[#6d4a4a] ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search any phone comparison (e.g., S24 Ultra vs S23 Ultra, iPhone 15 vs Pixel 8)..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleSearch(e.target.value);
              }}
              className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-sm"
            />
            {isSearching && (
              <div className="w-5 h-5 border-2 border-[#7F011F] border-t-transparent rounded-full animate-spin mr-3" />
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[var(--color-line)] shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.map((phone) => {
                const isSelectedPhone = selectedPhones.some(p => p.slug === phone.slug);
                return (
                  <button
                    key={phone.slug}
                    onClick={() => handleSearchResultClick(phone)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#fbf8ff] transition-colors border-b border-[var(--color-line)] last:border-b-0"
                    disabled={isSelectedPhone || selectedPhones.length >= 4}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                      {phone.image ? (
                        <img src={phone.image} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#7F011F]">
                          {phone.brand.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">
                        {phone.brand} {phone.model}
                      </div>
                      <div className="text-xs text-[#6d4a4a]">
                        ${phone.price} • {phone.year}
                      </div>
                    </div>
                    <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                      isSelectedPhone ? 'bg-[#7F011F] text-white' : 
                      selectedPhones.length >= 4 ? 'bg-[#f5f5f5] text-[#6d4a4a]' : 
                      'bg-[#f5f5f5] hover:bg-[#7F011F] hover:text-white'
                    }`}>
                      {isSelectedPhone ? '✓ Added' : selectedPhones.length >= 4 ? 'Max' : 'Add'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Search suggestions */}
        {searchInput.length === 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-[#6d4a4a]">Popular comparisons:</span>
            {initialPhones.slice(0, 5).map((phone, idx) => {
              const nextPhone = initialPhones[idx + 1];
              if (!nextPhone) return null;
              return (
                <button
                  key={`${phone.slug}-${nextPhone.slug}`}
                  onClick={() => {
                    setSearchInput(`${phone.brand} ${phone.model} vs ${nextPhone.brand} ${nextPhone.model}`);
                    handleSearch(`${phone.brand} ${phone.model} vs ${nextPhone.brand} ${nextPhone.model}`);
                  }}
                  className="text-xs px-3 py-1 rounded-full bg-[#f5f5f5] hover:bg-[#7F011F] hover:text-white transition-colors"
                >
                  {phone.model} vs {nextPhone.model}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: SELECTED PHONES DISPLAY */}
      {/* ============================================================ */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-fraunces text-xl font-medium flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#7F011F] rounded-full"></span>
            Selected Phones
            {selectedPhones.length > 0 && (
              <span className="text-sm font-normal text-[#6d4a4a]">
                ({selectedPhones.length} of 4)
              </span>
            )}
          </h2>
          {selectedPhones.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs text-[#6d4a4a] hover:text-[#7F011F] transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {/* Selected Phones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {selectedPhones.map((phone, idx) => (
            <div
              key={phone.slug}
              className="group relative bg-white border-2 border-[#7F011F] rounded-2xl p-4 shadow-lg shadow-[#7F011F]/10 transition-all hover:shadow-xl hover:-translate-y-1 animate-fadeIn"
            >
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#7F011F] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {idx + 1}
              </div>
              <button
                onClick={() => removeFromCompare(phone)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-[var(--color-line)] text-[#6d4a4a] hover:bg-[#7F011F] hover:text-white hover:border-[#7F011F] transition-all flex items-center justify-center shadow-sm"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-16 h-16 mx-auto mb-2 rounded-xl overflow-hidden bg-[#f5f5f5] border border-[var(--color-line)]">
                {phone.image ? (
                  <img src={phone.image} alt="" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[#7F011F]">
                    {phone.brand.charAt(0)}
                  </div>
                )}
              </div>
              <h4 className="text-xs font-semibold text-center line-clamp-1 group-hover:text-[#7F011F] transition-colors">
                {phone.brand} {phone.model}
              </h4>
              <p className="text-[10px] text-[#6d4a4a] text-center">{phone.year}</p>
              <p className="text-xs font-bold text-[#0F6B3E] text-center mt-0.5">
                ${phone.price}
              </p>
            </div>
          ))}
          
          {/* Empty slots */}
          {selectedPhones.length < 4 && (
            Array.from({ length: 4 - selectedPhones.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="border-2 border-dashed border-[var(--color-line)] rounded-2xl p-4 flex flex-col items-center justify-center min-h-[140px] bg-[#fbf8ff] transition-all hover:border-[#7F011F]/30"
              >
                <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-2xl text-[#6d4a4a]">
                  +
                </div>
                <p className="text-xs text-[#6d4a4a] mt-2">Select a phone</p>
                <p className="text-[10px] text-[#6d4a4a]">Slot {selectedPhones.length + idx + 1}</p>
              </div>
            ))
          )}
        </div>

        {/* Status message */}
        {selectedPhones.length > 0 && selectedPhones.length < 2 && (
          <div className="mt-4 text-center text-sm text-[#6d4a4a] bg-amber-50 border border-amber-200 rounded-xl p-3 animate-pulse">
            💡 Select one more phone to start comparing
          </div>
        )}

        {selectedPhones.length >= 2 && (
          <div className="mt-4 text-center text-sm text-[#0F6B3E] bg-green-50 border border-green-200 rounded-xl p-3 animate-fadeIn">
            ✅ {selectedPhones.length} phones selected! Scroll down to see the comparison.
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: AI COMPARISON */}
      {/* ============================================================ */}
      {selectedPhones.length >= 2 && (
        <div className="mb-8">
          {!showAI ? (
            <button
              onClick={() => setShowAI(true)}
              className="w-full p-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm">
                  🤖
                </div>
                <div className="text-left">
                  <div className="font-fraunces text-xl font-medium">AI Smart Analysis</div>
                  <div className="text-sm text-white/80">Get AI-powered insights and smart recommendations</div>
                </div>
              </div>
              <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ) : (
            <div className="bg-white rounded-3xl border border-[var(--color-line)] shadow-xl overflow-hidden animate-slideUp">
              <div className="p-6 border-b border-[var(--color-line)] bg-gradient-to-r from-purple-50 to-purple-100/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h3 className="font-fraunces text-xl font-medium">AI Smart Analysis</h3>
                    <p className="text-sm text-[#6d4a4a]">Powered by advanced artificial intelligence</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAI(false)}
                  className="text-[#6d4a4a] hover:text-[#7F011F] transition-colors p-2 hover:bg-white/50 rounded-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <AIComparison 
                phones={initialPhones} 
                selectedPhones={selectedPhones} 
              />
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: COMPARISON RESULTS TABLE */}
      {/* ============================================================ */}
      {showComparison && selectedPhones.length >= 2 && (
        <div 
          ref={comparisonRef}
          className={`mb-12 overflow-x-auto transition-all duration-700 ${
            isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
          }`}
        >
          <div className="bg-white rounded-3xl border border-[var(--color-line)] shadow-xl overflow-hidden animate-slideUp">
            {/* Header with count */}
            <div className="p-6 border-b border-[var(--color-line)] bg-gradient-to-r from-[#fbf8ff] to-white flex items-center justify-between">
              <div>
                <h2 className="font-fraunces text-2xl font-medium">
                  Comparison <span className="text-[#7F011F]">Results</span>
                </h2>
                <p className="text-sm text-[#6d4a4a] mt-1">
                  Comparing {selectedPhones.length} smartphones side by side
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full font-medium">
                  {selectedPhones.length} Phones
                </span>
              </div>
            </div>

            {/* Phone Headers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-[var(--color-line)] bg-[#fbf8ff]/50">
              <div className="hidden md:block md:col-span-1"></div>
              {selectedPhones.map((phone, idx) => (
                <div key={phone.slug} className="text-center group">
                  <div className="relative">
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#7F011F] text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                      {idx + 1}
                    </div>
                    <div className="w-20 h-20 mx-auto mb-3 rounded-2xl overflow-hidden bg-white shadow-md border border-[var(--color-line)] group-hover:border-[#7F011F] transition-all group-hover:shadow-xl">
                      {phone.image ? (
                        <img
                          src={phone.image}
                          alt={`${phone.brand} ${phone.model}`}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#7F011F]">
                          {phone.brand.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-[#7F011F] transition-colors">
                      {phone.brand} {phone.model}
                    </h3>
                    <p className="text-xs text-[#6d4a4a]">{phone.year}</p>
                    <p className="text-sm font-bold text-[#0F6B3E] mt-1">
                      ${phone.price}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <span className="text-yellow-500 text-xs">★</span>
                        <span className="text-xs font-medium">{phone.rating || "N/A"}</span>
                      </div>
                      <Link
                        href={`/phones/finder/${phone.slug}`}
                        className="text-xs text-[#7F011F] hover:underline"
                        target="_blank"
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Specs by Group with navigation */}
            <div className="sticky top-0 z-10 bg-white border-b border-[var(--color-line)]">
              <div className="flex gap-2 p-2 overflow-x-auto">
                {comparisonSpecs.map(({ id, group, icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSpecGroup(id);
                      document.getElementById(`spec-group-${id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      activeSpecGroup === id || !activeSpecGroup
                        ? 'bg-[#7F011F] text-white'
                        : 'bg-[#f5f5f5] text-[#6d4a4a] hover:bg-[#e8e8e8]'
                    }`}
                  >
                    {icon} {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Specs by Group */}
            {comparisonSpecs.map(({ id, group, icon, specs }) => (
              <div key={id} id={`spec-group-${id}`}>
                <div className="p-3 bg-[#fbf8ff]/50 border-b border-[var(--color-line)]">
                  <h4 className="text-xs font-bold text-[#6d4a4a] uppercase tracking-wider flex items-center gap-2">
                    <span>{icon}</span> {group}
                  </h4>
                </div>
                {specs.map(({ key, label, values }) => {
                  const numericValues = values.map(v => {
                    const num = parseFloat(v.value);
                    return { value: v, num: isNaN(num) ? null : num };
                  });
                  const hasNumeric = numericValues.some(v => v.num !== null);
                  const bestNum = hasNumeric ? Math.max(...numericValues.filter(v => v.num !== null).map(v => v.num!)) : null;

                  return (
                    <div
                      key={key}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border-b border-[var(--color-line)] hover:bg-[#fbf8ff] transition-colors group"
                    >
                      <div className="font-medium text-xs text-[#6d4a4a] uppercase tracking-wider md:col-span-1 flex items-center">
                        {label}
                      </div>
                      {values.map((v, idx) => {
                        const isBest = bestNum !== null && numericValues[idx].num === bestNum && numericValues[idx].num !== null;
                        const isWorst = bestNum !== null && numericValues[idx].num !== null && 
                          numericValues[idx].num === Math.min(...numericValues.filter(v => v.num !== null).map(v => v.num!));
                        
                        return (
                          <div
                            key={idx}
                            className={`text-sm text-center p-2 rounded-xl transition-all ${
                              isBest 
                                ? "bg-gradient-to-r from-[#0F6B3E]/10 to-[#0F6B3E]/5 text-[#0F6B3E] font-semibold border border-[#0F6B3E]/20 shadow-sm" 
                                : isWorst
                                ? "text-[#6d4a4a] bg-[#f5f5f5]"
                                : "text-[#1a1a1a]"
                            }`}
                          >
                            {v.formatted}
                            {isBest && (
                              <span className="block text-[10px] text-[#0F6B3E] font-bold mt-0.5">
                                ⭐ Best
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Share */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-[#fbf8ff] to-white border-t border-[var(--color-line)]">
              <div className="hidden md:block md:col-span-1"></div>
              <div className="text-center col-span-1 md:col-span-3">
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/compare?phones=${selectedPhones.map(p => p.slug).join(",")}`;
                    navigator.clipboard.writeText(url);
                    alert("✅ Comparison link copied to clipboard!");
                  }}
                  className="text-xs text-[#7F011F] hover:underline flex items-center justify-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Comparison
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 4: PHONE SELECTION GRID */}
      {/* ============================================================ */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-fraunces text-xl font-medium flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#7F011F] rounded-full"></span>
              All Phones
            </h2>
            <p className="text-sm text-[#6d4a4a] mt-0.5">
              Click <span className="font-semibold text-[#7F011F]">Compare</span> on any phone to add it to comparison
            </p>
          </div>
          <span className="text-xs bg-[#f5f5f5] px-3 py-1 rounded-full">
            {filteredPhones.length} phones
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-2xl border border-[var(--color-line)] shadow-sm">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-[#fbf8ff] focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-sm transition-all"
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[var(--color-line)] bg-[#fbf8ff] focus:outline-none focus:ring-2 focus:ring-[#7F011F] text-sm transition-all"
          >
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Phone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPhones.map((phone) => {
            const selected = isSelected(phone);
            const isMaxSelected = selectedPhones.length >= 4 && !selected;
            
            return (
              <div
                key={phone.slug}
                className={`group relative border rounded-2xl p-4 bg-white transition-all duration-300 ${
                  selected 
                    ? "border-[#7F011F] ring-2 ring-[#7F011F]/20 shadow-lg scale-95" 
                    : isMaxSelected
                    ? "border-[var(--color-line)] opacity-60 cursor-not-allowed"
                    : "border-[var(--color-line)] hover:border-[#7F011F]/30 hover:shadow-xl hover:-translate-y-2"
                }`}
                onMouseEnter={() => setHoveredPhone(phone.slug)}
                onMouseLeave={() => setHoveredPhone(null)}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {phone.is_new && (
                    <span className="bg-[#7F011F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      NEW
                    </span>
                  )}
                  {phone.is_featured && (
                    <span className="bg-[#0F6B3E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      FEATURED
                    </span>
                  )}
                  {phone.is_trending && (
                    <span className="bg-[#FF6B35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      TRENDING
                    </span>
                  )}
                </div>

                {/* Selected indicator */}
                {selected && (
                  <div className="absolute top-3 right-3 bg-[#7F011F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                    ✓ Added
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-[#fbf8ff] to-[#f5f5f5]">
                  {phone.image ? (
                    <img
                      src={phone.image}
                      alt={`${phone.brand} ${phone.model}`}
                      className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[#7F011F]/20">
                      {phone.brand.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-[#7F011F] transition-colors">
                  {phone.brand} {phone.model}
                </h3>
                <p className="text-xs text-[#6d4a4a]">{phone.year}</p>
                <p className="text-sm font-bold text-[#0F6B3E] mt-1">
                  ${phone.price}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-xs font-medium">{phone.rating || "N/A"}</span>
                  {phone.review_count > 0 && (
                    <span className="text-[10px] text-[#6d4a4a]">
                      ({phone.review_count})
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--color-line)]">
                  <button
                    onClick={() => {
                      if (selected) {
                        removeFromCompare(phone);
                      } else if (!isMaxSelected) {
                        addToCompare(phone);
                      }
                    }}
                    disabled={isMaxSelected}
                    className={`flex-1 text-xs font-medium px-3 py-2 rounded-xl transition-all duration-300 ${
                      selected
                        ? "bg-[#7F011F] text-white hover:bg-[#a80a30] shadow-lg shadow-[#7F011F]/30"
                        : isMaxSelected
                        ? "bg-[#f5f5f5] text-[#6d4a4a] cursor-not-allowed"
                        : "bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white hover:shadow-lg hover:shadow-[#7F011F]/30 hover:-translate-y-0.5"
                    }`}
                  >
                    {selected ? "✕ Remove" : "➕ Compare"}
                  </button>
                  <Link
                    href={`/phones/finder/${phone.slug}`}
                    className="text-xs font-medium px-3 py-2 rounded-xl bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e8e8e8] border border-[var(--color-line)] transition-all"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPhones.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">No phones found</h3>
            <p className="text-[#6d4a4a]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Auto Comparison Combinations */}
      <div className="mt-16 pt-8 border-t border-[var(--color-line)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-fraunces text-2xl font-medium">
              Popular <span className="text-[#7F011F]">Comparisons</span>
            </h2>
            <p className="text-sm text-[#6d4a4a] mt-1">
              Compare your favorite phones side by side
            </p>
          </div>
          <span className="text-xs text-[#6d4a4a]">
            {phoneCombinations.length} comparisons
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {phoneCombinations.slice(0, 20).map(({ phone1, phone2, slug }) => (
            <Link
              key={slug}
              href={`/compare?phones=${phone1.slug},${phone2.slug}`}
              className="group p-4 bg-white rounded-2xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                    {phone1.image ? (
                      <img src={phone1.image} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#7F011F]">
                        {phone1.brand.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-1">
                      {phone1.brand} {phone1.model}
                    </span>
                    <span className="text-xs text-[#6d4a4a]">${phone1.price}</span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-[#7F011F] flex-shrink-0 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-medium text-[#1a1a1a] group-hover:text-[#7F011F] transition-colors line-clamp-1">
                      {phone2.brand} {phone2.model}
                    </span>
                    <span className="text-xs text-[#6d4a4a]">${phone2.price}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                    {phone2.image ? (
                      <img src={phone2.image} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#7F011F]">
                        {phone2.brand.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-line)]">
                <span className="text-[10px] text-[#6d4a4a]">
                  {phone1.year} vs {phone2.year}
                </span>
                <span className="text-[10px] text-[#7F011F] font-medium group-hover:underline">
                  Compare Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}