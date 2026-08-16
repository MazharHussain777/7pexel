// app/compare/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fetchPhones } from "@/app/phones/finder/data/phone-db";
import { IPhone } from "@/models/Phone";

const CATEGORY_ICONS: Record<string, string> = {
  phones: "📱",
  laptops: "💻",
  auto: "🚗",
};

const CATEGORY_LABELS: Record<string, string> = {
  phones: "Phones",
  laptops: "Laptops",
  auto: "Auto",
};

const CATEGORY_COLORS: Record<string, string> = {
  phones: "from-[#99032B] to-[#B8043A]",
  laptops: "from-[#B8043A] to-[#D10545]",
  auto: "from-[#D10545] to-[#E80650]",
};

// ─── COMPLETE PHONE SPECS MAPPING ──────────────────────
interface PhoneSpec {
  label: string;
  key: string;
  group: string;
  format?: (value: any) => string;
}

const PHONE_SPECS: PhoneSpec[] = [
  // Display
  { label: "Display Size", key: "displaySize", group: "📱 Display" },
  { label: "Display Type", key: "display", group: "📱 Display" },
  { label: "Refresh Rate", key: "refreshRate", group: "📱 Display" },
  { label: "Display Resolution", key: "displayResolution", group: "📱 Display" },
  { label: "Screen Protection", key: "screenProtection", group: "📱 Display" },
  { label: "HDR Support", key: "hdrSupport", group: "📱 Display" },
  { label: "Brightness", key: "brightness", group: "📱 Display" },
  
  // Performance
  { label: "Chipset", key: "chipset", group: "⚡ Performance" },
  { label: "Processor", key: "processor", group: "⚡ Performance" },
  { label: "GPU", key: "gpu", group: "⚡ Performance" },
  { label: "RAM", key: "ram", group: "⚡ Performance" },
  { label: "Storage", key: "storage", group: "⚡ Performance" },
  { label: "Expandable Storage", key: "expandableStorage", group: "⚡ Performance" },
  { label: "Operating System", key: "os", group: "⚡ Performance" },
  { label: "OS Version", key: "osVersion", group: "⚡ Performance" },
  
  // Camera
  { label: "Main Camera", key: "camera", group: "📷 Camera" },
  { label: "Camera Details", key: "cameraDetails", group: "📷 Camera" },
  { label: "Front Camera", key: "frontCamera", group: "📷 Camera" },
  { label: "Video Recording", key: "videoRecording", group: "📷 Camera" },
  { label: "Camera Features", key: "cameraFeatures", group: "📷 Camera" },
  { label: "OIS Support", key: "oisSupport", group: "📷 Camera" },
  { label: "Night Mode", key: "nightMode", group: "📷 Camera" },
  { label: "HDR Mode", key: "hdrMode", group: "📷 Camera" },
  
  // Battery
  { label: "Battery Capacity", key: "battery", group: "🔋 Battery" },
  { label: "Battery Type", key: "batteryType", group: "🔋 Battery" },
  { label: "Wired Charging", key: "charging", group: "🔋 Battery" },
  { label: "Wireless Charging", key: "wirelessCharging", group: "🔋 Battery" },
  { label: "Reverse Charging", key: "reverseCharging", group: "🔋 Battery" },
  { label: "Battery Life", key: "batteryLife", group: "🔋 Battery" },
  { label: "Fast Charging", key: "fastCharging", group: "🔋 Battery" },
  
  // Design & Build
  { label: "Weight", key: "weight", group: "🎨 Design" },
  { label: "Dimensions", key: "dimensions", group: "🎨 Design" },
  { label: "Colors", key: "colors", group: "🎨 Design", format: (v: string[]) => v?.join(" · ") || "—" },
  { label: "Build Material", key: "buildMaterial", group: "🎨 Design" },
  { label: "Water Resistance", key: "waterResistance", group: "🎨 Design" },
  { label: "Dust Resistance", key: "dustResistance", group: "🎨 Design" },
  { label: "IP Rating", key: "ipRating", group: "🎨 Design" },
  { label: "Year", key: "year", group: "🎨 Design" },
  
  // Connectivity
  { label: "5G", key: "connectivity", group: "📶 Connectivity", format: (v: string) => v?.includes("5G") ? "✅ Yes" : "❌ No" },
  { label: "Wi-Fi", key: "wifi", group: "📶 Connectivity" },
  { label: "Bluetooth", key: "bluetooth", group: "📶 Connectivity" },
  { label: "NFC", key: "nfc", group: "📶 Connectivity", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "USB Type", key: "usbType", group: "📶 Connectivity" },
  { label: "SIM Type", key: "simType", group: "📶 Connectivity" },
  { label: "Dual SIM", key: "dualSim", group: "📶 Connectivity", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "eSIM Support", key: "esimSupport", group: "📶 Connectivity", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  
  // Security
  { label: "Fingerprint Sensor", key: "fingerprint", group: "🔒 Security" },
  { label: "Face Unlock", key: "faceUnlock", group: "🔒 Security" },
  { label: "Security Features", key: "securityFeatures", group: "🔒 Security" },
  
  // Audio
  { label: "Speakers", key: "speakers", group: "🔊 Audio" },
  { label: "Audio Jack", key: "audioJack", group: "🔊 Audio", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Audio Codec", key: "audioCodec", group: "🔊 Audio" },
  
  // Sensors
  { label: "Accelerometer", key: "accelerometer", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Gyroscope", key: "gyroscope", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Proximity Sensor", key: "proximitySensor", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Barometer", key: "barometer", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Compass", key: "compass", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
  { label: "Heart Rate Sensor", key: "heartRateSensor", group: "📡 Sensors", format: (v: boolean) => v ? "✅ Yes" : "❌ No" },
];

const SPEC_GROUPS = [
  "📱 Display",
  "⚡ Performance",
  "📷 Camera",
  "🔋 Battery",
  "🎨 Design",
  "📶 Connectivity",
  "🔒 Security",
  "🔊 Audio",
  "📡 Sensors",
];

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState("phones");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ─── FETCH PHONES DATA ────────────────────────────────
  const loadPhones = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchPhones({ 
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        limit: 100 
      });
      
      const phoneData = result.data || [];
      setPhones(phoneData);
      
      const uniqueBrands = [...new Set(phoneData.map((p: IPhone) => p.brand))].sort();
      setBrands(['all', ...uniqueBrands]);
    } catch (error) {
      console.error('Error loading phones:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  // ─── FILTERED PHONES ──────────────────────────────────
  const filteredPhones = useMemo(() => {
    let list = phones;
    if (selectedBrand !== 'all') {
      list = list.filter(p => p.brand === selectedBrand);
    }
    return list;
  }, [phones, selectedBrand]);

  // ─── SELECTED PHONES DATA ─────────────────────────────
  const selectedPhonesData = useMemo(() => {
    return phones.filter(p => selectedItems.includes(p.slug || p._id?.toString() || ''));
  }, [phones, selectedItems]);

  // ─── TOGGLE SELECTION ──────────────────────────────────
  const toggleSelection = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 phones at a time");
        return prev;
      }
      return [...prev, id];
    });
  };

  // ─── CLEAR ALL SELECTIONS ─────────────────────────────
  const clearSelections = () => {
    setSelectedItems([]);
  };

  // ─── GET VALUE FROM PHONE ─────────────────────────────
  const getPhoneValue = (phone: IPhone, spec: PhoneSpec): string => {
    const value = phone[spec.key as keyof IPhone];
    if (value === null || value === undefined || value === "") return "—";
    if (spec.format) return spec.format(value);
    if (Array.isArray(value)) return value.join(" · ");
    return String(value);
  };

  // ─── SELECT TOP 4 ──────────────────────────────────────
  const selectTop4 = () => {
    const top = filteredPhones.slice(0, 4).map(p => p.slug || p._id?.toString() || '');
    setSelectedItems(top);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F5]">
        <Header />
        <main className="wrap py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#99032B] border-t-transparent mb-4" />
          <p className="text-[#6d4a4a]">Loading phones...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <Header />

      <main className="wrap py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[#8B7355] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[#99032B] transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <span className="text-[#4A3520] font-semibold">Compare</span>
        </div>

        {/* Hero */}
        <section className="relative rounded-[24px] overflow-hidden mb-8 bg-gradient-to-br from-[#66021D] via-[#99032B] to-[#B8043A] text-white">
          <div className="relative z-10 p-10 md:p-14">
            <div className="max-w-[700px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📊</span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-white/15 px-4 py-1.5 rounded-full font-semibold">
                  Side-by-Side
                </span>
                <span className="text-[0.7rem] font-jetbrains-mono uppercase tracking-[0.15em] bg-[#FF6B6B] text-white px-4 py-1.5 rounded-full font-semibold">
                  {phones.length} Phones
                </span>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.03em] leading-[1.08]">
                Compare <em className="italic not-italic text-[#FF6B6B]">Phones</em> Side-by-Side
              </h1>
              <p className="mt-4 text-white/85 text-[1.05rem] leading-[1.7] max-w-[600px]">
                Select up to 4 phones to compare all specifications.
              </p>
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
            <circle cx="700" cy="60" r="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            <circle cx="700" cy="60" r="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* Selection Bar */}
        {selectedItems.length > 0 && (
          <section className="mb-8 p-5 border-2 border-[#99032B] rounded-[16px] bg-[#FFF5F0]">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold text-[0.9rem] text-[#4A3520]">Comparing:</span>
                {selectedPhonesData.map((phone) => (
                  <span
                    key={phone._id?.toString() || phone.slug}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8D5C4] text-[0.8rem] shadow-sm"
                  >
                    <span className="text-sm">📱</span>
                    <span className="font-medium text-[#4A3520]">{phone.brand} {phone.model}</span>
                    <button
                      onClick={() => toggleSelection(phone.slug || phone._id?.toString() || '')}
                      className="text-[#8B7355] hover:text-[#99032B] transition-colors ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <span className="text-[0.7rem] text-[#8B7355]">({selectedItems.length}/4)</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={clearSelections}
                  className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[0.8rem] font-semibold text-[#8B7355] hover:border-[#99032B] hover:text-[#99032B] transition-colors"
                >
                  Clear All
                </button>
                {selectedItems.length >= 2 && (
                  <button
                    onClick={() => setViewMode("table")}
                    className="px-4 py-2 rounded-full bg-[#99032B] text-white font-semibold text-[0.8rem] transition-all duration-300 hover:bg-[#B8043A] hover:scale-105 hover:shadow-[0_8px_30px_rgba(153,3,43,0.4)] active:scale-95"
                  >
                    Compare Now →
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Category & Brand Filters */}
        <section className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.75rem] font-semibold text-[#8B7355] mr-1">Category:</span>
            <button
              onClick={() => setSelectedCategory("phones")}
              className={`px-4 py-2 rounded-full font-semibold text-[0.8rem] transition-all duration-300 ${
                selectedCategory === "phones"
                  ? "bg-[#99032B] text-white shadow-md scale-105"
                  : "bg-white text-[#8B7355] border border-[#E8D5C4] hover:border-[#99032B] hover:text-[#4A3520] hover:shadow-sm hover:scale-105"
              }`}
            >
              📱 Phones
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-[0.75rem] font-semibold text-[#8B7355] mr-1">Brand:</span>
            {brands.map((brand) => {
              const label = brand === 'all' ? 'All Brands' : brand;
              const isActive = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full font-semibold text-[0.8rem] transition-all duration-300 ${
                    isActive
                      ? "bg-[#99032B] text-white shadow-md scale-105"
                      : "bg-white text-[#8B7355] border border-[#E8D5C4] hover:border-[#99032B] hover:text-[#4A3520] hover:shadow-sm hover:scale-105"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Grid */}
        {viewMode === "grid" && (
          <section>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[0.85rem] text-[#8B7355]">
                  {filteredPhones.length} phones found
                </span>
                {filteredPhones.length > 0 && (
                  <button
                    onClick={selectTop4}
                    className="text-[0.7rem] text-[#99032B] hover:underline font-medium transition-all duration-300 hover:scale-105"
                  >
                    Select Top 4
                  </button>
                )}
              </div>
              <span className="text-[0.7rem] text-[#8B7355]">
                Select up to 4 to compare
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {filteredPhones.map((phone) => {
                const id = phone.slug || phone._id?.toString() || '';
                const isSelected = selectedItems.includes(id);
                const imageUrl = phone.image || '/images/placeholder-phone.jpg';
                
                return (
                  <div
                    key={id}
                    className={`group border rounded-[12px] overflow-hidden bg-white transition-all duration-300 ${
                      isSelected
                        ? "border-[#99032B] shadow-[0_0_0_2px_rgba(153,3,43,0.3)] shadow-lg scale-[1.02]"
                        : "border-[#E8D5C4] hover:shadow-[0_8px_20px_rgba(153,3,43,0.10)] hover:-translate-y-1 hover:scale-[1.02]"
                    }`}
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
                      <Image
                        src={imageUrl}
                        alt={`${phone.brand} ${phone.model}`}
                        fill
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
                        priority={false}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-phone.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#99032B] to-[#B8043A] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                      <span className="absolute top-2 left-2 text-[0.4rem] px-1.5 py-0.5 rounded-full bg-black/70 text-white font-bold backdrop-blur-sm">
                        📱
                      </span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 text-[0.4rem] px-1.5 py-0.5 rounded-full bg-[#99032B] text-white font-bold shadow-lg animate-pulse">
                          ✓
                        </span>
                      )}
                    </div>
                    
                    <div className="p-2 text-center">
                      <div className="text-[0.45rem] font-semibold text-[#8B7355] truncate mb-0.5">
                        {phone.brand}
                      </div>
                      <h4 className="font-fraunces font-medium text-[0.7rem] leading-[1.2] text-[#4A3520] group-hover:text-[#99032B] transition-colors line-clamp-1">
                        {phone.model}
                      </h4>
                      <div className="text-[0.5rem] text-[#8B7355] mt-0.5">
                        {phone.year} · {phone.ram}GB · {phone.storage}GB
                      </div>
                      <button
                        onClick={() => toggleSelection(id)}
                        className={`w-full mt-1.5 py-1.5 rounded-full font-semibold text-[0.6rem] transition-all duration-300 ${
                          isSelected
                            ? "bg-[#FFF0ED] text-[#99032B] border border-[#E8C4B8] hover:bg-[#FFE8E0] hover:scale-105 active:scale-95"
                            : "bg-[#99032B] text-white hover:bg-[#B8043A] hover:scale-105 hover:shadow-[0_4px_15px_rgba(153,3,43,0.3)] active:scale-95 shadow-md"
                        }`}
                      >
                        {isSelected ? "Remove" : "Compare"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPhones.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[20px] border border-[#E8D5C4]">
                <span className="text-4xl">🔍</span>
                <h3 className="mt-3 text-xl font-medium text-[#4A3520]">No phones found</h3>
                <p className="text-[0.95rem] text-[#8B7355] mt-1">Try adjusting your filters.</p>
                <button
                  onClick={() => { setSelectedBrand("all"); }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#99032B] text-white font-semibold text-[0.85rem] transition-all duration-300 hover:bg-[#B8043A] hover:scale-105 active:scale-95"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* Comparison Table - All Phone Specs */}
        {viewMode === "table" && selectedItems.length >= 2 && (
          <section className="mt-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="font-fraunces font-medium text-[1.5rem] tracking-[-0.01em] text-[#4A3520]">
                Comparison <em className="italic not-italic text-[#99032B]">Table</em>
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[0.8rem] font-semibold text-[#8B7355] hover:border-[#99032B] hover:text-[#99032B] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  ← Back to products
                </button>
                <button
                  onClick={clearSelections}
                  className="px-4 py-2 rounded-full border border-[#E8C4B8] text-[#99032B] text-[0.8rem] font-semibold hover:bg-[#FFF0ED] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-[16px] border border-[#E8D5C4] shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#FFF5F0] to-white border-b-2 border-[#E8D5C4]">
                    <th className="p-5 text-left font-fraunces font-semibold text-[0.9rem] text-[#4A3520] min-w-[160px] sticky left-0 bg-[#FFF5F0] z-10">
                      Specifications
                    </th>
                    {selectedPhonesData.map((phone, index) => (
                      <th key={phone._id?.toString() || phone.slug} className="p-4 text-center min-w-[200px]">
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-24 rounded-[12px] overflow-hidden mb-2 bg-white shadow-md transition-all duration-300 hover:scale-105">
                            <Image
                              src={phone.image || '/images/placeholder-phone.jpg'}
                              alt={`${phone.brand} ${phone.model}`}
                              fill
                              className="object-contain p-1"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder-phone.jpg';
                              }}
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#99032B] text-white text-[0.5rem] font-bold flex items-center justify-center shadow-lg">
                              {index + 1}
                            </div>
                          </div>
                          <span className="text-[0.55rem] font-semibold text-[#8B7355]">{phone.brand}</span>
                          <span className="font-fraunces font-medium text-[0.9rem] text-[#4A3520]">{phone.model}</span>
                          <span className="text-[0.6rem] text-[#8B7355]">{phone.year}</span>
                          <span className="text-[0.7rem] font-bold text-[#99032B] mt-0.5">${phone.price || "N/A"}</span>
                          <button
                            onClick={() => toggleSelection(phone.slug || phone._id?.toString() || '')}
                            className="mt-1 text-[0.5rem] text-[#99032B] hover:underline transition-all duration-300 hover:scale-105"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SPEC_GROUPS.map((group) => {
                    const groupSpecs = PHONE_SPECS.filter(s => s.group === group);
                    const hasData = groupSpecs.some(spec => 
                      selectedPhonesData.some(phone => getPhoneValue(phone, spec) !== "—")
                    );
                    
                    if (!hasData) return null;
                    
                    return (
                      <>
                        <tr className="bg-[#FFF5F0] border-b border-[#E8D5C4]">
                          <td colSpan={selectedPhonesData.length + 1} className="p-3 pl-5 font-bold text-[0.9rem] text-[#99032B]">
                            {group}
                          </td>
                        </tr>
                        
                        {groupSpecs.map((spec) => (
                          <tr key={spec.key} className="border-b border-[#E8D5C4] bg-white hover:bg-[#FFF5F0] transition-colors duration-200">
                            <td className="p-4 pl-5 font-medium text-[0.8rem] text-[#4A3520] sticky left-0 bg-white hover:bg-[#FFF5F0] z-5">
                              {spec.label}
                            </td>
                            {selectedPhonesData.map((phone) => {
                              const value = getPhoneValue(phone, spec);
                              const isHighlight = value !== "—" && value !== "❌ No" && value !== "No";
                              
                              return (
                                <td key={phone._id?.toString() || phone.slug} className="p-4 text-center">
                                  {value !== "—" ? (
                                    <span className={`px-2.5 py-1 rounded-lg text-[0.75rem] transition-all duration-300 inline-block ${
                                      isHighlight 
                                        ? "bg-[#FFF5F0] border border-[#E8D5C4] hover:bg-[#99032B] hover:text-white hover:scale-105 hover:shadow-lg cursor-default" 
                                        : "text-[#B8A898]"
                                    }`}>
                                      {value}
                                    </span>
                                  ) : (
                                    <span className="text-[#D5C8C0] text-[0.75rem]">—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </>
                    );
                  })}

                  {/* Pros */}
                  <tr className="bg-[#F0F8F0] border-b border-[#E8D5C4]">
                    <td colSpan={selectedPhonesData.length + 1} className="p-3 pl-5 font-bold text-[0.9rem] text-[#2D7D3A]">
                      ✅ Pros
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8D5C4] bg-white hover:bg-[#F5FFF5] transition-colors duration-200">
                    <td className="p-4 pl-5 font-medium text-[0.8rem] text-[#4A3520] sticky left-0 bg-white hover:bg-[#F5FFF5] z-5">
                      Advantages
                    </td>
                    {selectedPhonesData.map((phone) => (
                      <td key={phone._id?.toString() || phone.slug} className="p-4 text-center">
                        <ul className="text-[0.7rem] text-left list-disc list-inside text-[#4A3520] space-y-0.5">
                          {phone.pros?.map((pro: string, i: number) => (
                            <li key={i} className="hover:text-[#2D7D3A] transition-colors duration-300">{pro}</li>
                          )) || <li className="text-[#B8A898]">—</li>}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr className="bg-[#FFF5F0] border-b border-[#E8D5C4]">
                    <td colSpan={selectedPhonesData.length + 1} className="p-3 pl-5 font-bold text-[0.9rem] text-[#99032B]">
                      ❌ Cons
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-[#FFF5F0] transition-colors duration-200">
                    <td className="p-4 pl-5 font-medium text-[0.8rem] text-[#4A3520] sticky left-0 bg-white hover:bg-[#FFF5F0] z-5">
                      Disadvantages
                    </td>
                    {selectedPhonesData.map((phone) => (
                      <td key={phone._id?.toString() || phone.slug} className="p-4 text-center">
                        <ul className="text-[0.7rem] text-left list-disc list-inside text-[#4A3520] space-y-0.5">
                          {phone.cons?.map((con: string, i: number) => (
                            <li key={i} className="hover:text-[#99032B] transition-colors duration-300">{con}</li>
                          )) || <li className="text-[#B8A898]">—</li>}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-[#FFF5F0] to-white rounded-[12px] border border-[#E8D5C4]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[0.9rem] text-[#4A3520]">📊 Comparison Summary</span>
                  <span className="text-[0.75rem] text-[#8B7355] ml-3">
                    {selectedItems.length} phones compared · {PHONE_SPECS.length} specifications
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[0.8rem] font-semibold text-[#8B7355] hover:border-[#99032B] hover:text-[#99032B] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    🖨️ Print
                  </button>
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      navigator.clipboard?.writeText(url);
                      alert("Link copied to clipboard!");
                    }}
                    className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[0.8rem] font-semibold text-[#8B7355] hover:border-[#99032B] hover:text-[#99032B] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {viewMode === "table" && selectedItems.length < 2 && (
          <div className="text-center py-16 bg-white rounded-[20px] border border-[#E8D5C4]">
            <span className="text-4xl">📊</span>
            <h3 className="mt-3 text-xl font-medium text-[#4A3520]">Select at least 2 phones to compare</h3>
            <p className="text-[0.95rem] text-[#8B7355] mt-1">
              Go back and select 2-4 phones to see a side-by-side comparison.
            </p>
            <button
              onClick={() => setViewMode("grid")}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#99032B] text-white font-semibold text-[0.85rem] transition-all duration-300 hover:bg-[#B8043A] hover:scale-105 hover:shadow-[0_8px_30px_rgba(153,3,43,0.4)] active:scale-95"
            >
              Browse Phones
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}