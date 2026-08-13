// components/phones/finder/PhoneSpecs.tsx
"use client";

import { Phone, getBrandTheme } from "@/lib/phone-data";

interface PhoneSpecsProps {
  phone: Phone;
}

export function PhoneSpecs({ phone }: PhoneSpecsProps) {
  const theme = getBrandTheme(phone.brand);
  const chipsetName = phone.chipset?.charAt(0).toUpperCase() + phone.chipset?.slice(1) || "N/A";
  const displayMain = phone.display === "large" ? "6.7\"+" : phone.display === "medium" ? "6.1-6.7\"" : "Under 6.1\"";
  const cameraName = phone.camera?.charAt(0).toUpperCase() + phone.camera?.slice(1) || "N/A";
  const batteryMain = `${phone.battery}mAh`;
  const osName = phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1) || "Android";
  const price = phone.price ? `$${phone.price}` : "Price on Request";

  // Build specs for the spec cards
  const displaySpecs = [
    { label: "Size", value: displayMain },
    { label: "Type", value: phone.display === "large" ? "AMOLED Large Display" : phone.display === "medium" ? "AMOLED Mid-Size" : "AMOLED Compact" },
    { label: "Resolution", value: phone.display === "large" ? "1440 x 3200" : phone.display === "medium" ? "1080 x 2400" : "1080 x 2340" },
    { label: "Refresh Rate", value: phone.refresh_rate ? `${phone.refresh_rate}Hz` : "Standard" },
    { label: "Aspect Ratio", value: "20:9" },
    { label: "HDR Support", value: "HDR10+" },
    { label: "Color Depth", value: "1B colors" },
    { label: "Brightness", value: phone.price > 899 ? "2000 nits" : "1200 nits" },
    { label: "Protection", value: "Gorilla Glass Victus 2" },
    { label: "Always-On Display", value: "Yes" },
    { label: "Screen-to-Body", value: phone.display === "large" ? "92%" : "88%" },
  ];

  const performanceSpecs = [
    { label: "Chipset", value: chipsetName },
    { label: "CPU", value: phone.chipset === "snapdragon" ? "Octa-core (1x3.36GHz + 5x2.8GHz + 2x2.0GHz)" : phone.chipset === "apple" ? "Hexa-core (2x3.78GHz + 4x2.11GHz)" : "Octa-core" },
    { label: "CPU Architecture", value: "ARMv9" },
    { label: "GPU", value: phone.chipset === "snapdragon" ? "Adreno 750" : phone.chipset === "apple" ? "Apple GPU (5-core)" : "Mali-G710" },
    { label: "Neural Engine", value: phone.chipset === "apple" ? "16-core Neural Engine" : phone.chipset === "snapdragon" ? "Hexagon NPU" : "N/A" },
    { label: "Manufacturing Process", value: phone.chipset === "apple" ? "3nm" : "4nm" },
    { label: "RAM", value: `${phone.ram}GB` },
    { label: "RAM Type", value: "LPDDR5X" },
    { label: "Storage", value: `${phone.storage}GB` },
    { label: "Storage Type", value: "UFS 4.0" },
    { label: "Expandable Storage", value: "No" },
    { label: "AnTuTu v11", value: phone.price > 899 ? "1,850,000 pts" : "1,200,000 pts" },
  ];

  const cameraSpecs = [
    { label: "Main Camera", value: cameraName },
    { label: "Wide Sensor", value: phone.price > 899 ? "50MP" : "48MP" },
    { label: "Sensor Size", value: '1/1.3"' },
    { label: "Pixel Size", value: "1.2µm" },
    { label: "Aperture", value: "f/1.8" },
    { label: "Ultra-Wide", value: phone.price > 899 ? "12MP" : "8MP" },
    { label: "Telephoto", value: phone.price > 899 ? "10MP" : "N/A" },
    { label: "OIS", value: "Yes" },
    { label: "Video Recording", value: "8K@30fps, 4K@120fps" },
    { label: "Slow Motion", value: "720p@960fps" },
    { label: "Flash", value: "Dual-LED" },
    { label: "HDR Video", value: "Yes" },
    { label: "Night Mode", value: "Yes" },
    { label: "Portrait Mode", value: "Yes" },
  ];

  const selfieSpecs = [
    { label: "Front Camera", value: "12MP" },
    { label: "Sensor", value: "Sony IMX709" },
    { label: "Aperture", value: "f/2.2" },
    { label: "Video Recording", value: "4K@60fps" },
    { label: "Features", value: "Portrait Mode, HDR, Night Mode" },
    { label: "Front Flash", value: "Yes (screen flash)" },
  ];

  const batterySpecs = [
    { label: "Capacity", value: batteryMain },
    { label: "Type", value: "Li-Ion" },
    { label: "Technology", value: "Silicon-Carbon" },
    { label: "Wired Charging", value: phone.charging ? `${phone.charging}W` : "Standard" },
    { label: "Wired Charging Time", value: phone.charging && phone.charging >= 45 ? "0-100% in 45 min" : "0-100% in 75 min" },
    { label: "Wireless Charging", value: phone.charging && phone.charging >= 25 ? "15W" : "No" },
    { label: "Reverse Charging", value: phone.charging && phone.charging >= 45 ? "10W" : "No" },
    { label: "Battery Health", value: "80% after 800 cycles" },
    { label: "Video Playback", value: "Up to 20 hours" },
    { label: "Audio Playback", value: "Up to 85 hours" },
    { label: "Standby Time", value: "Up to 500 hours" },
  ];

  const softwareSpecs = [
    { label: "OS", value: osName },
    { label: "OS Version", value: osName === "iOS" ? "iOS 18" : "Android 15" },
    { label: "OS Updates", value: osName === "iOS" ? "6 years" : "4 years" },
    { label: "Security Updates", value: osName === "iOS" ? "6 years" : "5 years" },
    { label: "UI / Skin", value: osName === "iOS" ? "iOS" : "One UI 6" },
    { label: "Google Play", value: osName === "Android" ? "Yes" : "No" },
    { label: "Customization", value: osName === "Android" ? "Yes" : "Limited" },
  ];

  const connectivitySpecs = [
    { label: "SIM", value: "Dual SIM" },
    { label: "5G", value: phone.connectivity?.includes("5g") ? "✅ Yes" : "❌ No" },
    { label: "Wi-Fi", value: phone.connectivity?.includes("wifi7") ? "Wi-Fi 7" : phone.connectivity?.includes("wifi6") ? "Wi-Fi 6" : "Wi-Fi 5" },
    { label: "Bluetooth", value: phone.connectivity?.includes("bluetooth") ? "5.4" : "5.3" },
    { label: "NFC", value: phone.connectivity?.includes("nfc") ? "✅ Yes" : "❌ No" },
    { label: "USB", value: "USB-C 3.2" },
    { label: "Ultra Wideband", value: phone.connectivity?.includes("nfc") ? "Yes" : "No" },
    { label: "Satellite SOS", value: phone.os === "ios" ? "Yes" : "No" },
  ];

  const securitySpecs = [
    { label: "Fingerprint", value: "Under-display" },
    { label: "Fingerprint Type", value: "Ultrasonic" },
    { label: "Face Unlock", value: "3D Face ID" },
    { label: "Accelerometer", value: "Yes" },
    { label: "Gyroscope", value: "Yes" },
    { label: "Proximity", value: "Yes" },
    { label: "Barometer", value: "Yes" },
    { label: "Compass", value: "Yes" },
    { label: "Heart Rate Sensor", value: "Yes" },
  ];

  const additionalSpecs = [
    { label: "Water Resistance", value: "IP68" },
    { label: "Dust Resistance", value: "IP68" },
    { label: "Build", value: "Glass front, glass back, aluminum frame" },
    { label: "Box Contents", value: "Phone, USB-C Cable, Ejector Tool" },
    { label: "Colors", value: "Black, White, Green" },
    { label: "Release Date", value: `Q1 ${phone.year || "2026"}` },
    { label: "Availability", value: "In Stock" },
    { label: "Accessories", value: "Screen protector, Case" },
  ];

  const pricingSpecs = [
    { label: "💰 Price", value: price },
    { label: "🧠 RAM", value: `${phone.ram}GB` },
    { label: "💾 Storage", value: `${phone.storage}GB` },
    { label: "🎨 Colors", value: "Black · White · Green" },
    { label: "📅 Release Year", value: phone.year || "2026" },
    { label: "📱 Model", value: phone.model },
    { label: "🌍 Regions", value: "Global" },
    { label: "📶 Carriers", value: "AT&T, Verizon, T-Mobile" },
  ];

  // Group specs for masonry layout
  const specGroups = [
    { id: "performance", title: "Performance", icon: "fa-microchip", items: performanceSpecs },
    { id: "display", title: "Display", icon: "fa-desktop", items: displaySpecs },
    { id: "camera", title: "Main Camera", icon: "fa-camera", items: cameraSpecs },
    { id: "battery", title: "Battery & Charging", icon: "fa-battery-three-quarters", items: batterySpecs },
    { id: "connectivity", title: "Connectivity", icon: "fa-wifi", items: connectivitySpecs },
    { id: "software", title: "Software", icon: "fa-code", items: softwareSpecs },
    { id: "security", title: "Security & Sensors", icon: "fa-shield-alt", items: securitySpecs },
    { id: "selfie", title: "Selfie Camera", icon: "fa-user-circle", items: selfieSpecs },
    { id: "additional", title: "Additional Features", icon: "fa-plus-circle", items: additionalSpecs },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-4 px-3 md:px-4 lg:px-6">
        <div className="w-1 h-6 rounded-full" style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})` }} />
        <h2 className="font-['Poppins',sans-serif] text-2xl font-bold" style={{ color: theme.primary }}>
          Full Specifications
        </h2>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${theme.primary}40, transparent)` }} />
        <span className="text-[0.7rem] font-semibold tracking-[0.5px]" style={{ color: theme.primary }}>
          90+ data points
        </span>
      </div>

      {/* Masonry Layout - Left Empty (12%) | Right Specs (88vw) */}
      <div className="flex w-full">
        {/* Left Empty Space - 12% */}
        <div className="hidden lg:block w-[12%] flex-shrink-0" />
        
        {/* Right Specs - 88vw with Masonry Layout */}
        <div className="w-[88vw] flex-shrink-0 px-3 md:px-4 lg:px-6">
          <div className="columns-1 sm:columns-2 xl:columns-3 gap-2 md:gap-2.5 space-y-0">
            {specGroups.map((group) => (
              <div
                key={group.id}
                className="break-inside-avoid mb-2 md:mb-2.5"
              >
                <MasonrySpecCard group={group} theme={theme} />
              </div>
            ))}

            {/* Pricing & Models - Special Full Width Card with Vertical Layout */}
            <div className="break-inside-avoid mb-2 md:mb-2.5 col-span-1 sm:col-span-2 xl:col-span-3">
              <MasonryPricingCard pricingSpecs={pricingSpecs} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Masonry Spec Card Component with Enhanced Horizontal Lines
function MasonrySpecCard({ group, theme }: { group: any; theme: { primary: string; secondary: string } }) {
  const itemCount = group.items.length;
  
  // Dynamic padding based on item count
  const getPaddingClass = () => {
    if (itemCount >= 14) return "py-2.5";
    if (itemCount >= 10) return "py-2";
    if (itemCount >= 7) return "py-1.5";
    return "py-1";
  };

  return (
    <div 
      className="bg-white border rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--color-green)]/30 w-full"
      style={{ borderColor: `${theme.primary}10` }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: `1px solid ${theme.primary}08`, background: `linear-gradient(135deg, ${theme.primary}04, transparent)` }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
          <i className={`fas ${group.icon} text-white text-[0.55rem]`} />
        </div>
        <h3 className="text-[0.68rem] font-bold uppercase tracking-[0.5px] flex-1 truncate" style={{ color: theme.primary }}>
          {group.title}
        </h3>
        <span className="text-[0.35rem] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ color: theme.primary, backgroundColor: `${theme.primary}08` }}>
          {group.items.length}
        </span>
      </div>
      
      {/* Items with Enhanced Horizontal Lines */}
      <div className={`px-3 ${getPaddingClass()}`}>
        {group.items.map((item: any, idx: number) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between gap-2 py-1">
              <span className="text-[0.6rem] font-medium text-gray-400 whitespace-nowrap flex-shrink-0">{item.label}</span>
              <span className="text-[0.68rem] font-medium text-right leading-snug text-gray-700 truncate max-w-[60%]">{item.value}</span>
            </div>
            {/* Enhanced Horizontal Line with gradient and better visibility */}
            {idx < group.items.length - 1 && (
              <div className="relative w-full my-1">
                <div 
                  className="w-full h-[1px]" 
                  style={{ 
                    background: `linear-gradient(90deg, ${theme.primary}12, ${theme.primary}06, transparent)`,
                  }} 
                />
                <div 
                  className="absolute top-0 left-0 w-1/3 h-[1px]" 
                  style={{ 
                    background: `linear-gradient(90deg, ${theme.primary}20, transparent)`,
                  }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Masonry Pricing Card with Vertical Layout and Enhanced Lines
function MasonryPricingCard({ pricingSpecs, theme }: { pricingSpecs: { label: string; value: string }[]; theme: { primary: string; secondary: string } }) {
  return (
    <div
      className="bg-white border-2 rounded-[12px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      style={{ borderColor: `${theme.primary}20`, boxShadow: `0 2px 12px ${theme.primary}08` }}
    >
      <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: `2px solid ${theme.primary}10`, background: `linear-gradient(135deg, ${theme.primary}06, ${theme.secondary}03)` }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
          <i className="fas fa-tag text-white text-[0.55rem]" />
        </div>
        <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.5px] flex-1" style={{ color: theme.primary }}>
          Pricing & Models
        </h3>
        <span className="text-[0.4rem] font-bold px-1.5 py-0.5 rounded-full" style={{ color: theme.primary, backgroundColor: `${theme.primary}08` }}>
          {pricingSpecs.length}
        </span>
      </div>
      
      {/* Vertical Layout - Single Column with better spacing */}
      <div className="px-3 py-2 space-y-0">
        {pricingSpecs.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between gap-3 py-1.5">
              <span className="text-[0.65rem] font-semibold text-gray-400 whitespace-nowrap flex-shrink-0 tracking-wide">
                {item.label}
              </span>
              <span className={`text-[0.75rem] font-semibold text-right leading-snug ${
                item.value === 'N/A' ? 'text-gray-300' : 
                item.label === '💰 Price' ? 'text-[var(--color-green)] text-[0.85rem] font-bold' : 
                'text-[#1a1a1a]'
              }`}>
                {item.value}
              </span>
            </div>
            {/* Enhanced Horizontal Line with gradient */}
            {idx < pricingSpecs.length - 1 && (
              <div className="relative w-full">
                <div 
                  className="w-full h-[1px]" 
                  style={{ 
                    background: `linear-gradient(90deg, ${theme.primary}10, ${theme.primary}04, transparent)`,
                  }} 
                />
                <div 
                  className="absolute top-0 left-0 w-1/4 h-[1px]" 
                  style={{ 
                    background: `linear-gradient(90deg, ${theme.primary}18, transparent)`,
                  }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}