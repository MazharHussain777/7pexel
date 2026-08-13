// components/SpecExplorer.tsx
"use client";

import { useState } from "react";
import { Icons } from "./icons/Icons";

interface SpecData {
  label: string;
  icon: string;
  name: string;
  price: string;
  rows: [string, string][];
}

const specData: Record<string, SpecData> = {
  phone: {
    label: "Phone",
    icon: "phone",
    name: "iPhone 16 Pro",
    price: "PKR 469,999",
    rows: [
      ["Display", '6.3" LTPO OLED, 120Hz'],
      ["Chipset", "A18 Pro (3nm)"],
      ["Camera", "48MP Triple + 5x Tele"],
      ["Battery", "3582 mAh, 27W wired"],
      ["Storage", "256GB / 512GB / 1TB"],
      ["Build", "Titanium frame, IP68"],
    ],
  },
  laptop: {
    label: "Laptop",
    icon: "laptop",
    name: 'MacBook Pro 14" M5',
    price: "PKR 589,999",
    rows: [
      ["Display", '14.2" Liquid Retina XDR'],
      ["Chipset", "Apple M5, 10-core GPU"],
      ["Memory", "16GB / 32GB unified"],
      ["Battery", "Up to 18 hrs"],
      ["Storage", "512GB / 1TB / 2TB SSD"],
      ["Ports", "3x TB4, HDMI, SDXC"],
    ],
  },
  watch: {
    label: "Watch",
    icon: "watch",
    name: "Apple Watch Series 12",
    price: "PKR 119,999",
    rows: [
      ["Display", "45mm AMOLED, always-on"],
      ["Sensors", "ECG, SpO2, Blood pressure"],
      ["Connectivity", "GPS + LTE"],
      ["Battery", "36 hrs typical use"],
      ["Water rating", "50m / WR50"],
      ["Case", "Titanium, 6 colors"],
    ],
  },
  audio: {
    label: "Audio",
    icon: "audio",
    name: "Sony WH-1000XM7",
    price: "PKR 89,999",
    rows: [
      ["Driver", "40mm dynamic"],
      ["ANC", "Adaptive, dual-processor"],
      ["Battery", "30 hrs ANC on"],
      ["Connectivity", "Bluetooth 5.3, LDAC"],
      ["Charging", "USB-C, 3min = 3hrs"],
      ["Weight", "248g"],
    ],
  },
};

export function SpecExplorer() {
  const [activeKey, setActiveKey] = useState("phone");

  const keys = Object.keys(specData);
  const active = specData[activeKey];

  return (
    <section className="py-12">
      <div className="flex justify-between items-baseline mb-6 flex-wrap gap-2.5">
        <h2 className="font-fraunces font-medium text-[1.7rem] tracking-[-0.01em]">
          Read the <em className="italic not-italic text-[var(--color-green)]">full spec sheet</em>
        </h2>
        <span className="text-[0.86rem] text-[var(--color-ink-soft)]">Tap a device type to inspect it</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] border border-[var(--color-line)] rounded-[var(--radius)] overflow-hidden bg-[var(--color-paper)]">
        <div className="bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] p-6.5 flex flex-row lg:flex-col gap-2 overflow-x-auto">
          {keys.map((key) => {
            const item = specData[key];
            const Icon = Icons[item.icon as keyof typeof Icons];
            const isActive = key === activeKey;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-white/18 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-4.5 h-4.5" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-7.5 lg:p-8.5">
          <div className="flex justify-between items-start flex-wrap gap-2.5 mb-5">
            <h3 className="font-fraunces font-medium text-[1.35rem]">{active.name}</h3>
            <span className="font-jetbrains-mono font-semibold text-[var(--color-green-deep)] text-[1rem] bg-green-950/10 px-4 py-2 rounded-full">
              {active.price}
            </span>
          </div>
          <div className="flex flex-col">
            {active.rows.map(([key, value]) => (
              <div key={key} className="flex justify-between py-3.5 border-b border-dashed border-[var(--color-line)] text-[0.9rem] last:border-b-0">
                <span className="text-[var(--color-ink-soft)] font-medium">{key}</span>
                <span className="font-semibold text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}