// @ts-nocheck
// components/phone-finder/SpecSection.tsx
"use client";

import { Phone, getPhoneTheme } from "@/types/phone";
import { SponsoredContent } from "./SponsoredContent";
import { useMemo } from "react";

interface SpecSectionProps {
  phone: Phone;
  relatedPhones?: Phone[];
}

export function SpecSection({ phone, relatedPhones = [] }: SpecSectionProps) {
  const { specs, benchmarks } = phone;
  
  const theme = useMemo(() => getPhoneTheme(phone.slug), [phone.slug]);
  const primaryColor = theme.primary;
  const secondaryColor = theme.secondary;
  const accentColor = theme.accent;
  const glowColor = theme.glow;

  const colors = specs.colors || [];
  const models = specs.models || [];
  const pricing = specs.pricing || [];

  // ========== ALL SPEC GROUPS WITH FULL DETAILS ==========
  const specGroups = [
    // ===== 1. DISPLAY (13 fields) =====
    {
      id: "display",
      title: "Display",
      icon: "fa-desktop",
      items: [
        { label: "Size", value: specs.display || "N/A" },
        { label: "Type", value: specs.displayType || "N/A" },
        { label: "Resolution", value: specs.resolution || "N/A" },
        { label: "Pixel Density", value: specs.pixelDensity || "N/A" },
        { label: "Screen-to-Body", value: specs.screenToBodyRatio || "N/A" },
        { label: "Refresh Rate", value: specs.refreshRate || "N/A" },
        { label: "Brightness", value: specs.brightness || "N/A" },
        { label: "Protection", value: specs.protection || "N/A" },
        { label: "HDR Support", value: specs.hdrSupport || "N/A" },
        { label: "Always-On Display", value: specs.alwaysOnDisplay || "N/A" },
        { label: "Color Depth", value: specs.displayColorDepth || "1B colors" },
        { label: "Aspect Ratio", value: specs.displayAspectRatio || "20:9" },
        { label: "Color Gamut", value: specs.displayColorGamut || "DCI-P3 100%" },
      ],
    },

    // ===== 2. BUILD & DESIGN (12 fields) =====
    {
      id: "build",
      title: "Build & Design",
      icon: "fa-shapes",
      items: [
        { label: "Height", value: specs.height || specs.dimensions?.split('×')[0]?.trim() || "N/A" },
        { label: "Width", value: specs.width || specs.dimensions?.split('×')[1]?.trim() || "N/A" },
        { label: "Thickness", value: specs.thickness || specs.dimensions?.split('×')[2]?.trim() || "N/A" },
        { label: "Weight", value: specs.weight || "N/A" },
        { label: "Frame Material", value: specs.frameMaterial || "Titanium" },
        { label: "Back Material", value: specs.backMaterial || "Glass" },
        { label: "Build", value: specs.build || "N/A" },
        { label: "Colors", value: colors.length > 0 ? colors.join(" · ") : "N/A" },
        { label: "Color Finish", value: specs.colorFinish || "N/A" },
        { label: "Water Resistance", value: specs.waterResistance || "N/A" },
        { label: "Dust Resistance", value: specs.dustResistance || "IP68" },
        { label: "Drop Protection", value: specs.dropProtection || "Gorilla Glass" },
      ],
    },

    // ===== 3. PERFORMANCE (17 fields) =====
    {
      id: "performance",
      title: "Performance",
      icon: "fa-microchip",
      items: [
        { label: "Chipset", value: specs.chipset || "N/A" },
        { label: "CPU", value: specs.cpu || "N/A" },
        { label: "CPU Architecture", value: specs.cpuArchitecture || "ARMv9" },
        { label: "CPU Cache", value: specs.cpuCache || "8MB L3" },
        { label: "GPU", value: specs.gpu || "N/A" },
        { label: "GPU Cores", value: specs.gpuCores || "6-core" },
        { label: "GPU Clock Speed", value: specs.gpuClockSpeed || "900MHz" },
        { label: "Neural Engine", value: specs.neuralEngine || "N/A" },
        { label: "NPU Performance", value: specs.npuPerformance || "45 TOPS" },
        { label: "Manufacturing Process", value: specs.manufacturingProcess || "4nm" },
        { label: "RAM", value: specs.ram || "N/A" },
        { label: "RAM Type", value: specs.ramType || "N/A" },
        { label: "RAM Frequency", value: specs.ramFrequency || "8533MHz" },
        { label: "Storage", value: specs.storage || "N/A" },
        { label: "Storage Type", value: specs.storageType || "N/A" },
        { label: "Storage Speed", value: specs.storageSpeed || "4200MB/s" },
        { label: "Expandable Storage", value: specs.expandableStorage || "No" },
      ],
    },

    // ===== 4. BATTERY & CHARGING (15 fields) =====
    {
      id: "battery",
      title: "Battery & Charging",
      icon: "fa-battery-three-quarters",
      items: [
        { label: "Capacity", value: specs.battery || "N/A" },
        { label: "Type", value: specs.batteryType || "Li-Ion" },
        { label: "Voltage", value: specs.batteryVoltage || "3.87V" },
        { label: "Cells", value: specs.batteryCells || "Single-cell" },
        { label: "Technology", value: specs.batteryTechnology || "Silicon-Carbon" },
        { label: "Battery Health", value: specs.batteryHealth || "80% after 800 cycles" },
        { label: "Wired Charging", value: specs.wiredCharging || "N/A" },
        { label: "Wired Charging Time", value: specs.wiredChargingTime || "0-100% in 45 min" },
        { label: "Wireless Charging", value: specs.wirelessCharging || "N/A" },
        { label: "Wireless Charging Time", value: specs.wirelessChargingTime || "0-100% in 90 min" },
        { label: "Reverse Charging", value: specs.reverseCharging || "10W" },
        { label: "Charging Type", value: specs.chargingType || "USB-C PD 3.0" },
        { label: "Video Playback", value: specs.videoPlayback || "N/A" },
        { label: "Audio Playback", value: specs.audioPlayback || "N/A" },
        { label: "Standby Time", value: specs.standbyTime || "N/A" },
      ],
    },

    // ===== 5. MAIN CAMERA (20 fields) =====
    {
      id: "camera",
      title: "Main Camera",
      icon: "fa-camera",
      items: [
        { label: "Main Camera", value: specs.camera || "N/A" },
        { label: "Wide Sensor", value: specs.cameraWide || "N/A" },
        { label: "Sensor Size", value: specs.wideSensorSize || '1/1.3"' },
        { label: "Pixel Size", value: specs.widePixelSize || "1.2µm" },
        { label: "Aperture", value: specs.wideAperture || "f/1.8" },
        { label: "Ultra-Wide", value: specs.cameraUltraWide || "N/A" },
        { label: "Ultra-Wide FOV", value: specs.ultraWideFOV || "120°" },
        { label: "Ultra-Wide Aperture", value: specs.ultraWideAperture || "f/2.0" },
        { label: "Telephoto", value: specs.cameraTelephoto || "N/A" },
        { label: "Telephoto Zoom", value: specs.telephotoZoom || "5x" },
        { label: "Telephoto Aperture", value: specs.telephotoAperture || "f/2.4" },
        { label: "Periscope Zoom", value: specs.periscopeZoom || "No" },
        { label: "Laser AF", value: specs.laserAF || "Yes" },
        { label: "OIS", value: specs.ois || "Yes" },
        { label: "Camera Features", value: specs.cameraFeatures || "N/A" },
        { label: "Video Recording", value: specs.videoRecording || "N/A" },
        { label: "Slow Motion Video", value: specs.slowMotionVideo || "720p@960fps" },
        { label: "Video Stabilization", value: specs.videoStabilization || "OIS + EIS" },
        { label: "Flash Type", value: specs.flashType || "Dual-LED" },
        { label: "HDR Video", value: specs.hdrVideo || "Yes" },
      ],
    },

    // ===== 6. FRONT CAMERA (6 fields) =====
    {
      id: "selfie",
      title: "Selfie Camera",
      icon: "fa-user-circle",
      items: [
        { label: "Front Camera", value: specs.frontCamera || "N/A" },
        { label: "Front Features", value: specs.frontFeatures || "N/A" },
        { label: "Pixel Size", value: specs.frontPixelSize || "0.8µm" },
        { label: "Sensor", value: specs.frontSensor || "Sony IMX709" },
        { label: "Video Recording", value: specs.frontVideo || "4K@60fps" },
        { label: "Front Flash", value: specs.frontFlash || "Yes (screen flash)" },
      ],
    },

    // ===== 7. AUDIO (10 fields) =====
    {
      id: "audio",
      title: "Audio",
      icon: "fa-volume-up",
      items: [
        { label: "Speakers", value: specs.audio || "N/A" },
        { label: "Speaker Output", value: specs.speakerOutput || "Stereo 24-bit/96kHz" },
        { label: "Audio Codec", value: specs.audioCodec || "Dolby Atmos" },
        { label: "3.5mm Jack", value: specs.headphoneJack || "N/A" },
        { label: "Audio Recording", value: specs.audioRecording || "N/A" },
        { label: "Microphones", value: specs.microphones || "3 microphones" },
        { label: "Noise Cancellation", value: specs.noiseCancellation || "Yes" },
        { label: "Audio Zoom", value: specs.audioZoom || "Yes" },
        { label: "Hi-Res Audio", value: specs.hiResAudio || "Yes" },
        { label: "Bluetooth Audio", value: specs.bluetoothAudio || "LDAC" },
      ],
    },

    // ===== 8. SOFTWARE (10 fields) =====
    {
      id: "software",
      title: "Software",
      icon: "fa-code",
      items: [
        { label: "OS", value: specs.os || "N/A" },
        { label: "OS Version", value: specs.osVersion || "15.0" },
        { label: "OS Updates", value: specs.osUpdates || "N/A" },
        { label: "Security Updates", value: specs.securityUpdates || "5 years" },
        { label: "UI / Skin", value: specs.ui || "One UI 6" },
        { label: "UI Version", value: specs.uiVersion || "6.1" },
        { label: "Google Play Services", value: specs.googlePlayServices || "Yes" },
        { label: "Customization", value: specs.customization || "Yes" },
        { label: "Bloatware", value: specs.bloatware || "Minimal" },
        { label: "Update Frequency", value: specs.updateFrequency || "Monthly" },
      ],
    },

    // ===== 9. CONNECTIVITY - 20 → 11 IMPORTANT SPECS =====
    {
      id: "connectivity",
      title: "Connectivity",
      icon: "fa-wifi",
      items: [
        { label: "SIM", value: specs.sim || "N/A" },
        { label: "SIM Slots", value: specs.simSlots || "Dual" },
        { label: "Network Technology", value: specs.networkTechnology || "5G" },
        { label: "5G Bands", value: specs.bands5G || "n1,n2,n3,n5,n7,n8,n12,n20" },
        { label: "Wi-Fi", value: specs.wifi || "N/A" },
        { label: "Wi-Fi Bands", value: specs.wifiBands || "2.4GHz/5GHz/6GHz" },
        { label: "Bluetooth", value: specs.bluetooth || "N/A" },
        { label: "NFC", value: specs.nfc || "N/A" },
        { label: "USB", value: specs.usb || "N/A" },
        { label: "Ultra Wideband", value: specs.ultraWideband || "N/A" },
        { label: "Satellite SOS", value: specs.satelliteSOS || "N/A" },
      ],
    },

    // ===== 10. SECURITY & SENSORS - 16 → 11 IMPORTANT SPECS =====
    {
      id: "security",
      title: "Security & Sensors",
      icon: "fa-shield-alt",
      items: [
        { label: "Security", value: specs.security || "N/A" },
        { label: "Fingerprint Type", value: specs.fingerprintType || "Ultrasonic" },
        { label: "Fingerprint Location", value: specs.fingerprintLocation || "In-display" },
        { label: "Face Unlock Type", value: specs.faceUnlockType || "3D Face ID" },
        { label: "Accelerometer", value: specs.accelerometer || "Yes" },
        { label: "Gyroscope", value: specs.gyroscope || "Yes" },
        { label: "Proximity Sensor", value: specs.proximitySensor || "Yes" },
        { label: "Barometer", value: specs.barometer || "Yes" },
        { label: "Compass", value: specs.compass || "Yes" },
        { label: "Ambient Light Sensor", value: specs.ambientLightSensor || "Yes" },
        { label: "Heart Rate Sensor", value: specs.heartRateSensor || "Yes" },
      ],
    },

    // ===== 11. ADDITIONAL FEATURES (10 fields) =====
    {
      id: "additional",
      title: "Additional Features",
      icon: "fa-plus-circle",
      items: [
        { label: "Apple Pay", value: specs.applePay || "N/A" },
        { label: "Google Pay", value: specs.googlePay || "Yes" },
        { label: "MagSafe", value: specs.magSafe || "N/A" },
        { label: "Emergency SOS", value: specs.emergencySOS || "N/A" },
        { label: "Stylus Support", value: specs.stylusSupport || "No" },
        { label: "Quick Start Guide", value: specs.quickStartGuide || "Yes" },
        { label: "SIM Ejector Tool", value: specs.simEjectorTool || "Yes" },
        { label: "Warranty Card", value: specs.warrantyCard || "Yes" },
        { label: "Accessories Included", value: specs.accessoriesIncluded || "Yes" },
        { label: "Box Contents", value: specs.boxContents || "N/A" },
      ],
    },

    // ===== 12. BENCHMARKS (8 fields) =====
    {
      id: "benchmarks",
      title: "Benchmarks",
      icon: "fa-tachometer-alt",
      items: [
        { label: "AnTuTu v11", value: benchmarks?.antutu ? `${benchmarks.antutu.toLocaleString()} pts` : "N/A" },
        { label: "AnTuTu v10", value: benchmarks?.antutuV10 ? `${benchmarks.antutuV10.toLocaleString()} pts` : "N/A" },
        { label: "GeekBench 6 Single", value: benchmarks?.geekbench6Single ? `~${benchmarks.geekbench6Single.toLocaleString()}` : "N/A" },
        { label: "GeekBench 6 Multi", value: benchmarks?.geekbench6Multi ? `~${benchmarks.geekbench6Multi.toLocaleString()}` : "N/A" },
        { label: "GeekBench 5 Single", value: benchmarks?.geekbench5Single ? `~${benchmarks.geekbench5Single.toLocaleString()}` : "N/A" },
        { label: "GeekBench 5 Multi", value: benchmarks?.geekbench5Multi ? `~${benchmarks.geekbench5Multi.toLocaleString()}` : "N/A" },
        { label: "3DMark Wild Life X", value: benchmarks?.wildLifeExtreme || "N/A" },
        { label: "GFXBench Manhattan 1440p", value: benchmarks?.gfxBenchManh1440p ? `${benchmarks.gfxBenchManh1440p} fps` : "N/A" },
      ],
    },
  ];

  // ===== PRICING & MODELS - At the End (11 fields) =====
  const pricingGroup = {
    id: "pricing",
    title: "Pricing & Models",
    icon: "fa-tag",
    items: [
      { label: "Models", value: models.length > 0 ? models.join(" · ") : "N/A" },
      { label: "Model Variations", value: specs.modelVariations?.length > 0 ? specs.modelVariations.join(" · ") : "N/A" },
      { label: "Price (256GB)", value: specs.price256GB || "N/A" },
      { label: "Price (512GB)", value: specs.price512GB || "N/A" },
      { label: "Price (1TB)", value: specs.price1TB || "N/A" },
      { label: "Pricing", value: pricing.length > 0 ? pricing.join(" — ") : "N/A" },
      { label: "Colors Available", value: colors.length > 0 ? colors.join(" · ") : "N/A" },
      { label: "Release Date", value: specs.releaseDate || "N/A" },
      { label: "Availability", value: specs.availability || "In Stock" },
      { label: "Regions", value: specs.regions || "Global" },
      { label: "Carriers", value: specs.carriers || "AT&T, Verizon, T-Mobile" },
    ],
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-4 px-0.5">
        <div 
          className="w-1 h-6 rounded-full"
          style={{ 
            background: `linear-gradient(180deg, ${primaryColor}, ${secondaryColor})`,
            boxShadow: `0 2px 12px ${glowColor}`
          }}
        />
        <h2 
          className="font-['Poppins',sans-serif] text-2xl font-bold"
          style={{ 
            color: primaryColor,
            textShadow: `0 0 30px ${glowColor}`
          }}
        >
          Full Specifications
        </h2>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${primaryColor}40, transparent)` }} />
        <span 
          className="text-[0.7rem] font-semibold tracking-[0.5px] font-['Poppins',sans-serif]"
          style={{ color: primaryColor }}
        >
          95+ data points
        </span>
      </div>

      {/* Grid - Left: Sponsor, Right: Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Panel - Sponsored Content (2 cols) */}
        <div className="md:col-span-2">
          <SponsoredContent theme={theme} />
        </div>

        {/* Right Panel - Masonry Spec Cards (10 cols) */}
        <div className="md:col-span-10">
          <div 
            className="columns-1 sm:columns-2 xl:columns-3 gap-3 space-y-0 w-full"
            style={{ 
              columnRule: `1px solid ${primaryColor}08`
            }}
          >
            {/* ===== ALL SPEC CARDS ===== */}
            {specGroups.map((group) => (
              <div
                key={group.id}
                className="break-inside-avoid mb-3 bg-white border rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                style={{ 
                  borderColor: `${primaryColor}12`,
                  boxShadow: `0 1px 8px ${primaryColor}05`
                }}
              >
                <div 
                  className="flex items-center gap-2 px-3.5 py-2.5"
                  style={{ 
                    borderBottom: `1px solid ${primaryColor}08`,
                    background: `linear-gradient(135deg, ${primaryColor}04, transparent)`
                  }}
                >
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <i className={`fas ${group.icon} text-white text-[0.65rem]`} />
                  </div>
                  <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.5px] font-['Poppins',sans-serif] flex-1" style={{ color: primaryColor }}>
                    {group.title}
                  </h3>
                  <span className="text-[0.45rem] font-bold px-1.5 py-0.5 rounded-full" style={{ color: primaryColor, backgroundColor: `${primaryColor}08` }}>
                    {group.items.length}
                  </span>
                </div>
                <div className="px-3.5 py-2">
                  {group.items.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-baseline justify-between gap-2 py-1.5">
                        <span className="text-[0.7rem] font-medium text-gray-400 font-['Poppins',sans-serif] whitespace-nowrap flex-shrink-0">{item.label}</span>
                        <span className="text-[0.78rem] font-medium font-['Poppins',sans-serif] text-right leading-snug text-gray-700">{item.value}</span>
                      </div>
                      {idx < group.items.length - 1 && <div className="w-full h-px" style={{ background: `linear-gradient(90deg, ${primaryColor}08, ${primaryColor}03, transparent)` }} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ===== PRICING & MODELS - At the End ===== */}
            <div
              className="break-inside-avoid mb-3 bg-white border-2 rounded-[14px] overflow-hidden shadow-md sm:col-span-2 xl:col-span-3"
              style={{ 
                borderColor: `${primaryColor}25`,
                boxShadow: `0 2px 16px ${primaryColor}12`
              }}
            >
              <div 
                className="flex items-center gap-2 px-3.5 py-2.5"
                style={{ 
                  borderBottom: `2px solid ${primaryColor}15`,
                  background: `linear-gradient(135deg, ${primaryColor}08, ${secondaryColor}05)`
                }}
              >
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  <i className="fas fa-tag text-white text-[0.65rem]" />
                </div>
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.5px] font-['Poppins',sans-serif] flex-1" style={{ color: primaryColor }}>
                  Pricing & Models
                </h3>
                <span className="text-[0.45rem] font-bold px-1.5 py-0.5 rounded-full" style={{ color: primaryColor, backgroundColor: `${primaryColor}10` }}>
                  {pricingGroup.items.length}
                </span>
              </div>
              <div className="px-3.5 py-2">
                {pricingGroup.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between gap-2 py-1.5">
                      <span className="text-[0.72rem] font-semibold text-gray-500 font-['Poppins',sans-serif] whitespace-nowrap flex-shrink-0">
                        {item.label}
                      </span>
                      <span className={`text-[0.82rem] font-semibold font-['Poppins',sans-serif] text-right leading-snug ${
                        item.value === 'N/A' ? 'text-gray-300' : 'text-[#1a1a1a]'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                    {idx < pricingGroup.items.length - 1 && (
                      <div className="w-full h-px" style={{ background: `linear-gradient(90deg, ${primaryColor}12, ${primaryColor}05, transparent)` }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}