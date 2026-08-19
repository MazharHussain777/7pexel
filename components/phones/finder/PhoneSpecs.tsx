// components/phones/finder/PhoneSpecs.tsx
"use client";

import { useState, useEffect } from "react";
import { getBrandTheme } from "@/lib/phone-data";
import { getReviewStats } from "@/lib/review-service";

interface PhoneSpecsProps {
  phone: any;
}

export function PhoneSpecs({ phone }: PhoneSpecsProps) {
  const theme = getBrandTheme(phone.brand);
  
  // State for real-time reviews
  const [reviewsCount, setReviewsCount] = useState(phone.review_count || 0);
  const [averageRating, setAverageRating] = useState(phone.rating || 0);

  // Fetch real-time review stats
  useEffect(() => {
    const loadReviewStats = async () => {
      try {
        const stats = await getReviewStats(phone.slug);
        if (stats && stats.total_reviews > 0) {
          setAverageRating(stats.average_rating);
          setReviewsCount(stats.total_reviews);
        } else {
          setAverageRating(phone.rating || 0);
          setReviewsCount(phone.review_count || 0);
        }
      } catch (error) {
        console.error('Error loading review stats:', error);
        setAverageRating(phone.rating || 0);
        setReviewsCount(phone.review_count || 0);
      }
    };
    loadReviewStats();
  }, [phone.slug, phone.rating, phone.review_count]);

  // Helper to get value with fallback
  const getValue = (value: any, fallback: string = '—') => {
    if (value === undefined || value === null || value === '') return fallback;
    return value;
  };

  // Format chipset name - Full name
  const getFullChipsetName = (chipset: string) => {
    const chipsetMap: Record<string, string> = {
      apple: 'Apple A18 Pro',
      snapdragon: 'Snapdragon 8 Gen 4',
      tensor: 'Tensor G4',
      mediatek: 'Dimensity 9400',
      exynos: 'Exynos 2400',
      dimensity: 'Dimensity 9300',
    };
    return chipsetMap[chipset?.toLowerCase()] || chipset || 'N/A';
  };

  const chipsetName = getFullChipsetName(phone.chipset);
  const chipsetDetails = getValue(phone.chipset_details);

  // Get OS name
  const osName = getValue(
    phone.os?.charAt(0).toUpperCase() + phone.os?.slice(1),
    'Android'
  );

  // Format price
  const formattedPrice = phone.price ? `$${phone.price}` : 'Price on Request';
  
  // Get colors
  const colors = phone.colors || [];

  // Generate star rating display
  const getStarDisplay = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  // Get review count display
  const getReviewCountDisplay = (count: number) => {
    if (count === 0) return 'No reviews';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K reviews`;
    return `${count.toLocaleString()} reviews`;
  };

  // ============================================
  // 1. DISPLAY SPECS (First)
  // ============================================
  const displaySpecs = [
    { label: "Size", value: getValue(phone.display_size) },
    { label: "Resolution", value: getValue(phone.display_resolution) },
    { label: "Type", value: getValue(phone.display_type) },
    { label: "Protection", value: getValue(phone.display_protection) },
    { label: "Refresh Rate", value: getValue(phone.refresh_rate) },
    { label: "Brightness", value: getValue(phone.brightness) },
    { label: "Aspect Ratio", value: getValue(phone.aspect_ratio) },
    { label: "Pixel Density", value: getValue(phone.pixel_density) },
    { label: "Screen-to-Body", value: getValue(phone.screen_to_body_ratio) },
    { label: "Features", value: phone.display_features?.join(', ') || '—' },
  ];

  // ============================================
  // 2. PHYSICAL SPECS (Second)
  // ============================================
  const physicalSpecs = [
    { label: "Weight", value: getValue(phone.weight) },
    { label: "Dimensions", value: getValue(phone.dimensions) },
    { label: "Colors", value: colors.length > 0 ? colors.join(' · ') : '—' },
    { label: "Materials", value: phone.materials?.join(' · ') || '—' },
    { label: "Water Resistance", value: getValue(phone.water_resistance) },
    { label: "Dust Resistance", value: getValue(phone.dust_resistance) },
  ];

  // ============================================
  // 3. PERFORMANCE SPECS (Third)
  // ============================================
  const performanceSpecs = [
    { label: "Chipset", value: chipsetName },
    { label: "Chipset Details", value: chipsetDetails },
    { label: "CPU", value: getValue(phone.cpu) },
    { label: "CPU Cores", value: getValue(phone.cpu_cores) },
    { label: "CPU Frequency", value: getValue(phone.cpu_frequency) },
    { label: "GPU", value: getValue(phone.gpu) },
    { label: "GPU Details", value: getValue(phone.gpu_details) },
    { label: "RAM", value: `${getValue(phone.ram)}GB ${getValue(phone.ram_type)}` },
    { label: "Storage", value: `${getValue(phone.storage)}GB ${getValue(phone.storage_type)}` },
    { label: "Expandable", value: getValue(phone.expandable_storage) },
    { label: "AnTuTu Score", value: getValue(phone.antutu_score) },
    { label: "Geekbench Score", value: getValue(phone.geekbench_score) },
  ];

  // ============================================
  // 4. CONNECTIVITY SPECS (Fourth)
  // ============================================
  const connectivitySpecs = [
    { label: "SIM", value: getValue(phone.sim) },
    { label: "Network", value: getValue(phone.network) },
    { label: "WiFi", value: getValue(phone.wifi) },
    { label: "Bluetooth", value: getValue(phone.bluetooth) },
    { label: "NFC", value: getValue(phone.nfc) },
    { label: "USB", value: getValue(phone.usb) },
    { label: "GPS", value: getValue(phone.gps) },
    { label: "Sensors", value: phone.sensors?.join(', ') || '—' },
  ];

  // ============================================
  // 5. CAMERA SPECS (Fifth)
  // ============================================
  const cameraSpecs = [
    { label: "Camera Type", value: getValue(phone.camera) },
    { label: "Details", value: getValue(phone.camera_details) },
    { label: "Video Recording", value: getValue(phone.video_recording) },
    { label: "Front Camera", value: getValue(phone.front_camera) },
    { label: "Sensor", value: getValue(phone.camera_sensor) },
    { label: "Aperture", value: getValue(phone.aperture) },
    { label: "Optical Zoom", value: getValue(phone.optical_zoom) },
    { label: "Digital Zoom", value: getValue(phone.digital_zoom) },
    { label: "Features", value: phone.camera_features?.join(', ') || '—' },
  ];

  // ============================================
  // 6. AUDIO SPECS (Sixth)
  // ============================================
  const audioSpecs = [
    { label: "Speakers", value: getValue(phone.speakers) },
    { label: "Audio Jack", value: getValue(phone.audio_jack) },
    { label: "Audio Features", value: phone.audio_features?.join(', ') || '—' },
  ];

  // ============================================
  // 7. SOFTWARE SPECS (Seventh)
  // ============================================
  const softwareSpecs = [
    { label: "OS", value: osName },
    { label: "OS Version", value: getValue(phone.os_version) },
    { label: "UI Skin", value: getValue(phone.ui_skin) },
    { label: "Update Policy", value: getValue(phone.update_policy) },
    { label: "Security Updates", value: getValue(phone.security_updates) },
  ];

  // ============================================
  // 8. SECURITY SPECS (Eighth)
  // ============================================
  const securitySpecs = [
    { label: "Fingerprint", value: getValue(phone.fingerprint) },
    { label: "Face Unlock", value: getValue(phone.face_unlock) },
    { label: "Security Features", value: phone.security_features?.join(', ') || '—' },
  ];

  // ============================================
  // 9. BATTERY SPECS (Ninth)
  // ============================================
  const batterySpecs = [
    { label: "Capacity", value: `${getValue(phone.battery)} mAh` },
    { label: "Type", value: getValue(phone.battery_type) },
    { label: "Charging Speed", value: `${getValue(phone.charging)}W` },
    { label: "Charging Type", value: getValue(phone.charging_type) },
    { label: "Wireless Charging", value: getValue(phone.wireless_charging) },
    { label: "Reverse Charging", value: getValue(phone.reverse_charging) },
    { label: "Battery Life", value: getValue(phone.battery_life) },
    { label: "Charging Time", value: getValue(phone.charging_time) },
  ];

  // ============================================
  // 10. PRICING & INFO (Tenth)
  // ============================================
  const pricingSpecs = [
    { label: "Price", value: formattedPrice },
    { label: "Rating", value: `${averageRating.toFixed(1)}/5 ${getStarDisplay(averageRating)}`, isRating: true },
    { label: "Reviews", value: getReviewCountDisplay(reviewsCount), isReview: true },
    { label: "Brand", value: getValue(phone.brand) },
    { label: "Model", value: getValue(phone.model) },
    { label: "Year", value: getValue(phone.year) },
    { label: "Categories", value: phone.category?.join(', ') || '—' },
  ];

  // ============================================
  // 11. CONTENT SPECS (Eleventh)
  // ============================================
  const contentSpecs = [
    { label: "Highlights", value: phone.highlights?.join(' · ') || '—' },
    { label: "Author", value: getValue(phone.author) },
    { label: "Date", value: getValue(phone.date) },
    { label: "Read Time", value: getValue(phone.read_time) },
  ];

  // ============================================
  // ALL GROUPS IN SPECIFIED ORDER
  // ============================================
  const specGroups = [
    { id: "display", icon: "📺", title: "Display", color: "#2563EB", bg: "#EFF6FF", items: displaySpecs, order: 1 },
    { id: "physical", icon: "📐", title: "Physical", color: "#0891B2", bg: "#ECFEFF", items: physicalSpecs, order: 2 },
    { id: "performance", icon: "⚡", title: "Performance", color: "#D97706", bg: "#FFFBEB", items: performanceSpecs, order: 3 },
    { id: "connectivity", icon: "📶", title: "Connectivity", color: "#0284C7", bg: "#F0F9FF", items: connectivitySpecs, order: 4 },
    { id: "camera", icon: "📷", title: "Camera", color: "#DC2626", bg: "#FEF2F2", items: cameraSpecs, order: 5 },
    { id: "audio", icon: "🔊", title: "Audio", color: "#EA580C", bg: "#FFF7ED", items: audioSpecs, order: 6 },
    { id: "software", icon: "📱", title: "Software", color: "#7C3AED", bg: "#F5F3FF", items: softwareSpecs, order: 7 },
    { id: "security", icon: "🔒", title: "Security", color: "#475569", bg: "#F8FAFC", items: securitySpecs, order: 8 },
    { id: "battery", icon: "🔋", title: "Battery", color: "#16A34A", bg: "#F0FDF4", items: batterySpecs, order: 9 },
    { id: "pricing", icon: "💰", title: "Pricing & Info", color: "#059669", bg: "#ECFDF5", items: pricingSpecs, order: 10 },
    { id: "content", icon: "📝", title: "Content", color: "#6B7280", bg: "#F3F4F6", items: contentSpecs, order: 11 },
  ];

  // Sort groups by order
  const sortedGroups = [...specGroups].sort((a, b) => a.order - b.order);

  // Calculate total items
  const totalItems = specGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-10 rounded-full" style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})` }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
              Full Specifications
            </h2>
            <div className="flex items-center gap-1.5 text-[0.55rem] font-medium">
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {totalItems} Specs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid - 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedGroups.map((group) => (
          <SpecCard key={group.id} group={group} colors={colors} />
        ))}
      </div>
    </div>
  );
}

// ============================================
// SPEC CARD COMPONENT - Same styling as before
// ============================================

interface SpecCardProps {
  group: {
    id: string;
    icon: string;
    title: string;
    color: string;
    bg: string;
    items: { label: string; value: string; isRating?: boolean; isReview?: boolean }[];
  };
  colors: string[];
}

function SpecCard({ group, colors }: SpecCardProps) {
  const isPricingCard = group.id === 'pricing';
  const isPhysicalCard = group.id === 'physical';
  
  // Get rating color
  const getRatingColor = (value: string) => {
    const rating = parseFloat(value);
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div 
      className={`bg-white border-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${isPricingCard ? 'border-green-200' : ''}`}
      style={{ 
        borderColor: isPricingCard ? '#05966930' : `${group.color}20`,
        borderRadius: '4px',
        boxShadow: 'none'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center gap-2.5 px-3.5 py-3 border-b-2"
        style={{ 
          borderColor: isPricingCard ? '#05966920' : `${group.color}20`,
          background: isPricingCard ? 'linear-gradient(135deg, #ECFDF5, transparent)' : `linear-gradient(135deg, ${group.bg}, transparent)`
        }}
      >
        <span className="text-base flex-shrink-0">{group.icon}</span>
        <h3 className={`text-[0.7rem] font-bold flex-1 truncate ${isPricingCard ? 'text-green-700' : ''}`} style={isPricingCard ? { color: '#059669' } : { color: group.color }}>
          {group.title}
        </h3>
        <span 
          className="text-[0.35rem] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ color: isPricingCard ? '#059669' : group.color, background: isPricingCard ? '#05966912' : `${group.color}12` }}
        >
          {group.items.length}
        </span>
      </div>

      {/* Items */}
      <div className="px-3.5 py-2.5 space-y-0">
        {group.items.map((item, idx) => {
          const isLast = idx === group.items.length - 1;
          const hasValue = item.value !== '—' && item.value !== 'N/A';
          const isLongValue = item.value.length > 25;
          
          // Check special items
          const isRatingItem = item.isRating || item.label === 'Rating';
          const isReviewItem = item.isReview || item.label === 'Reviews';
          const isPriceItem = item.label === 'Price';
          
          // Get rating color for rating items
          const ratingColor = isRatingItem ? getRatingColor(item.value) : '';
          
          return (
            <div key={idx}>
              <div className={`flex ${isLongValue ? 'flex-col items-start gap-0.5' : 'items-center justify-between'} gap-2 py-1.5`}>
                {/* Label */}
                <span className={`text-[0.65rem] font-medium text-gray-500 tracking-wide ${isLongValue ? '' : 'whitespace-nowrap flex-shrink-0'}`}>
                  {item.label}
                </span>
                {/* Value - Same styling as before */}
                <span className={`text-[0.75rem] font-medium leading-relaxed w-full ${
                  hasValue ? 'text-gray-700' : 'text-gray-300 italic'
                } ${isLongValue ? 'break-words' : 'text-right'}
                ${isRatingItem ? ratingColor : ''}
                ${isReviewItem ? 'text-purple-600' : ''}
                ${isPriceItem ? 'text-green-700 text-[0.85rem] font-semibold' : ''}`}>
                  {item.value}
                </span>
              </div>
              {/* Grid line */}
              {!isLast && (
                <div className="w-full py-0.5">
                  <div 
                    className="w-full h-[1px]" 
                    style={{ 
                      background: isPricingCard ? `linear-gradient(90deg, #05966910, #05966903, transparent)` : `linear-gradient(90deg, ${group.color}10, ${group.color}03, transparent)`,
                      borderRadius: '2px'
                    }} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Colors Grid - Only for Physical card */}
      {isPhysicalCard && colors.length > 0 && (
        <div className="px-3.5 pb-3">
          <div className="text-[0.5rem] font-medium text-gray-400 uppercase tracking-wide mb-1.5">Available Colors</div>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((color: string) => (
              <span
                key={color}
                className="text-[0.45rem] font-medium px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${group.color}06`,
                  borderColor: `${group.color}15`,
                  color: group.color
                }}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div 
        className="px-3.5 py-1.5 border-t-2 text-center"
        style={{ 
          borderColor: isPricingCard ? '#05966915' : `${group.color}15`,
          background: isPricingCard ? '#ECFDF540' : `${group.bg}40`
        }}
      >
        <span className="text-[0.35rem] font-medium uppercase tracking-wider" style={{ color: isPricingCard ? '#05966960' : `${group.color}60` }}>
          {group.items.length} Specifications
        </span>
      </div>
    </div>
  );
}