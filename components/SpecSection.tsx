// components/SpecSection.tsx

"use client";

import { Phone } from "@/types/phone";
import { SponsoredContent } from "./SponsoredContent";

interface SpecSectionProps {
  phone: Phone;
  relatedPhones?: Phone[];
}

export function SpecSection({ phone, relatedPhones = [] }: SpecSectionProps) {
  const { specs, benchmarks } = phone;

  const colors = specs.colors || [];
  const models = specs.models || [];
  const pricing = specs.pricing || [];

  const specGroups = [
    {
      title: "Display",
      icon: "fa-desktop",
      items: [
        { label: "Size", value: specs.display || "N/A" },
        { label: "Type", value: specs.displayType || "N/A" },
        { label: "Resolution", value: specs.resolution || "N/A" },
        { label: "Pixel density", value: specs.pixelDensity || "N/A" },
        { label: "Screen-to-body", value: specs.screenToBodyRatio || "N/A" },
        { label: "Refresh rate", value: specs.refreshRate || "N/A" },
        { label: "Brightness", value: specs.brightness || "N/A" },
        { label: "HDR support", value: specs.hdrSupport || "N/A" },
        { label: "Protection", value: specs.protection || "N/A" },
        { label: "Always-on display", value: specs.alwaysOnDisplay || "N/A" },
      ],
    },
    {
      title: "Performance",
      icon: "fa-microchip",
      items: [
        { label: "Chipset", value: specs.chipset || "N/A" },
        { label: "CPU", value: specs.cpu || "N/A" },
        { label: "GPU", value: specs.gpu || "N/A" },
        { label: "Neural engine", value: specs.neuralEngine || "N/A" },
        { label: "RAM", value: specs.ram || "N/A" },
        { label: "RAM type", value: specs.ramType || "N/A" },
        { label: "Storage", value: specs.storage || "N/A" },
        { label: "Storage type", value: specs.storageType || "N/A" },
      ],
    },
    {
      title: "Build & design",
      icon: "fa-shapes",
      items: [
        { label: "Dimensions", value: specs.dimensions || "N/A" },
        { label: "Weight", value: specs.weight || "N/A" },
        { label: "Build", value: specs.build || "N/A" },
        { label: "Colors", value: colors.length > 0 ? colors.join(" · ") : "N/A" },
        { label: "Color finish", value: specs.colorFinish || "N/A" },
        { label: "Water/dust rating", value: specs.waterResistance || "N/A" },
      ],
    },
    {
      title: "Main camera",
      icon: "fa-camera",
      items: [
        { label: "Wide", value: specs.cameraWide || "N/A" },
        { label: "Ultra wide", value: specs.cameraUltraWide || "N/A" },
        { label: "Telephoto", value: specs.cameraTelephoto || "N/A" },
        { label: "Features", value: specs.cameraFeatures || "N/A" },
        { label: "Video recording", value: specs.videoRecording || "N/A" },
      ],
    },
    {
      title: "Selfie camera",
      icon: "fa-user-circle",
      items: [
        { label: "Front sensor", value: specs.frontCamera || "N/A" },
        { label: "Front features", value: specs.frontFeatures || "N/A" },
      ],
    },
    {
      title: "Battery & charging",
      icon: "fa-battery-three-quarters",
      items: [
        { label: "Type", value: specs.batteryType || "N/A" },
        { label: "Capacity", value: specs.battery || "N/A" },
        { label: "Technology", value: specs.batteryTechnology || "N/A" },
        { label: "Wired charging", value: specs.wiredCharging || "N/A" },
        { label: "Wireless charging", value: specs.wirelessCharging || "N/A" },
        { label: "Video playback", value: specs.videoPlayback || "N/A" },
        { label: "Audio playback", value: specs.audioPlayback || "N/A" },
        { label: "Standby time", value: specs.standbyTime || "N/A" },
      ],
    },
    {
      title: "Software",
      icon: "fa-code",
      items: [
        { label: "OS", value: specs.os || "N/A" },
        { label: "OS updates", value: specs.osUpdates || "N/A" },
      ],
    },
    {
      title: "Audio",
      icon: "fa-volume-up",
      items: [
        { label: "Speakers", value: specs.audio || "N/A" },
        { label: "3.5mm jack", value: specs.headphoneJack || "N/A" },
        { label: "Audio recording", value: specs.audioRecording || "N/A" },
      ],
    },
    {
      title: "Connectivity",
      icon: "fa-wifi",
      items: [
        { label: "SIM", value: specs.sim || "N/A" },
        { label: "Network bands", value: specs.networkBands || "N/A" },
        { label: "WLAN", value: specs.wifi || "N/A" },
        { label: "Bluetooth", value: specs.bluetooth || "N/A" },
        { label: "GPS", value: specs.gps || "N/A" },
        { label: "NFC", value: specs.nfc || "N/A" },
        { label: "USB", value: specs.usb || "N/A" },
        { label: "Ultra wideband", value: specs.ultraWideband || "N/A" },
        { label: "Satellite SOS", value: specs.satelliteSOS || "N/A" },
        { label: "Crash detection", value: specs.crashDetection || "N/A" },
        { label: "Thread support", value: specs.threadSupport || "N/A" },
      ],
    },
    {
      title: "Security & sensors",
      icon: "fa-shield-alt",
      items: [
        { label: "Security", value: specs.security || "N/A" },
        { label: "Sensors", value: specs.sensors || "N/A" },
      ],
    },
    {
      title: "Additional features",
      icon: "fa-plus-circle",
      items: [
        { label: "Apple Pay", value: specs.applePay || "N/A" },
        { label: "MagSafe", value: specs.magSafe || "N/A" },
        { label: "Emergency SOS", value: specs.emergencySOS || "N/A" },
        { label: "Box contents", value: specs.boxContents || "N/A" },
      ],
    },
    {
      title: "Benchmarks",
      icon: "fa-tachometer-alt",
      items: [
        { label: "AnTuTu v10", value: benchmarks?.antutu ? `${benchmarks.antutu.toLocaleString()} pts` : "N/A" },
        { label: "GeekBench 6 single", value: benchmarks?.geekbench6Single ? `~${benchmarks.geekbench6Single}` : "N/A" },
        { label: "GeekBench 6 multi", value: benchmarks?.geekbench6Multi ? `~${benchmarks.geekbench6Multi}` : "N/A" },
        { label: "3DMark Wild Life X", value: benchmarks?.wildLifeExtreme || "N/A" },
      ],
    },
    {
      title: "Pricing & models",
      icon: "fa-tag",
      span: true,
      items: [
        { label: "Models", value: models.length > 0 ? models.join(" · ") : "N/A" },
        { label: "Pricing", value: pricing.length > 0 ? pricing.join(" — ") : "N/A" },
        { label: "Colors available", value: colors.length > 0 ? colors.join(" · ") : "N/A" },
      ],
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-baseline gap-3 mb-5 px-0.5">
        <h2 className="font-['Poppins',sans-serif] text-xl font-semibold text-[#2d1a1a]">Full specification</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(127,1,31,0.14)] to-transparent" />
        <span className="text-[0.65rem] text-[#6d4a4a] tracking-[0.5px] font-['Poppins',sans-serif]">100+ data points</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left Panel - Sponsored Content */}
        <div className="md:col-span-2">
          <SponsoredContent />
        </div>

        {/* Spec Cards Grid - Expanded to cover full remaining space (10 columns) */}
        <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-4 bg-white/88 backdrop-blur-sm border border-[rgba(127,1,31,0.14)] rounded-[22px] overflow-hidden shadow-md">
          {specGroups.map((group, index) => (
            <div
              key={index}
              className={`
                px-5 py-5 border-r border-[rgba(127,1,31,0.14)] border-b border-[rgba(127,1,31,0.14)]
                ${group.span ? "sm:col-span-2 xl:col-span-3 lg:col-span-4 border-r-0" : ""}
                hover:bg-[rgba(127,1,31,0.02)] transition-colors duration-200
              `}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <i className={`fas ${group.icon} text-[0.7rem]`} />
                </div>
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.8px] text-[#2d1a1a] font-['Poppins',sans-serif]">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-col gap-0.5">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between gap-3 py-1.5 border-b border-dashed border-[rgba(127,1,31,0.07)] last:border-b-0"
                  >
                    <span className="text-[0.65rem] text-[#6d4a4a] font-['Poppins',sans-serif] whitespace-nowrap flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="text-[0.72rem] font-semibold text-[#2d1a1a] font-['Poppins',sans-serif] text-right leading-snug">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}