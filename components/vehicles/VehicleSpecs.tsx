// components/vehicles/VehicleSpecs.tsx
"use client";

import { Vehicle, VehicleVariant } from "@/app/auto/data/vehicles";

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  // ─── FORMAT HELPERS ──────────────────────────────────
  const formatPrice = (price: number): string => {
    return "$" + price.toLocaleString("en-US");
  };

  const formatSpecValue = (key: string, value: any): string => {
    if (typeof value === "number") {
      if (key === "horsepower" || key === "torque") return value.toLocaleString();
      if (key === "range") return `${value} mi`;
      if (key === "seating") return `${value} seats`;
      return value.toLocaleString();
    }
    return value;
  };

  const getSpecUnit = (key: string): string => {
    if (key === "horsepower") return " hp";
    if (key === "torque") return " lb-ft";
    if (key === "range") return " mi";
    return "";
  };

  // ─── DRIVETRAIN INFO ──────────────────────────────────
  const getDrivetrainInfo = (value: string): { label: string; description: string; icon: string } => {
    const drivetrains: Record<string, { label: string; description: string; icon: string }> = {
      "AWD": { label: "All-Wheel Drive", description: "Power distributed to all 4 wheels for maximum traction and stability", icon: "🔄" },
      "4WD": { label: "4-Wheel Drive", description: "Off-road capable with low-range gearing for tough terrain", icon: "🏔️" },
      "RWD": { label: "Rear-Wheel Drive", description: "Power sent to rear wheels for sporty handling and balance", icon: "🏎️" },
      "FWD": { label: "Front-Wheel Drive", description: "Power sent to front wheels for optimal fuel efficiency", icon: "⛽" },
      "RWD/AWD": { label: "RWD or AWD", description: "Available in both Rear or All-Wheel Drive configurations", icon: "🔄" },
      "Rear-Wheel Drive": { label: "Rear-Wheel Drive", description: "Power sent to rear wheels for sporty handling and balance", icon: "🏎️" },
      "All-Wheel Drive": { label: "All-Wheel Drive", description: "Power distributed to all 4 wheels for maximum traction", icon: "🔄" },
    };
    return drivetrains[value] || { label: value, description: "Power delivery configuration", icon: "🔄" };
  };

  // ─── TRANSMISSION INFO ──────────────────────────────────
  const getTransmissionInfo = (value: string): { label: string; description: string } => {
    const transmissions: Record<string, { label: string; description: string }> = {
      "Automatic": { label: "Automatic", description: "Fully automatic transmission with smooth shifting" },
      "Manual": { label: "Manual", description: "Driver-operated clutch and shifter for full control" },
      "CVT": { label: "CVT", description: "Continuously Variable Transmission for optimal efficiency" },
      "Dual-Clutch": { label: "Dual-Clutch", description: "Fast-shifting automated manual with two clutches" },
      "Single-Speed": { label: "Single-Speed", description: "Direct drive electric transmission" },
    };
    return transmissions[value] || { label: value, description: "Transmission type" };
  };

  // ─── ENGINE INFO ──────────────────────────────────────
  const getEngineInfo = (value: string): { label: string; description: string } => {
    const engines: Record<string, { label: string; description: string }> = {
      "Electric": { label: "Electric Motor", description: "Zero-emission electric powertrain with instant torque" },
      "V8": { label: "V8 Engine", description: "8-cylinder engine with powerful performance" },
      "V6": { label: "V6 Engine", description: "6-cylinder engine with balanced performance and efficiency" },
      "I4": { label: "Inline-4 Engine", description: "4-cylinder engine for optimal fuel efficiency" },
      "I4 Hybrid": { label: "I4 Hybrid", description: "Combines electric motor with internal combustion engine" },
      "Turbo": { label: "Turbocharged Engine", description: "Forced induction for increased power and efficiency" },
    };
    return engines[value] || { label: value, description: "Engine configuration" };
  };

  // ─── SPEC GROUPS ──────────────────────────────────────
  const powertrainSpecs = [
    { key: "engine", label: "Engine Type", icon: "⚙️" },
    { key: "horsepower", label: "Horsepower", icon: "💪" },
    { key: "torque", label: "Torque", icon: "🔧" },
    { key: "transmission", label: "Transmission", icon: "⚡" },
    { key: "drivetrain", label: "Drivetrain", icon: "🔄" },
  ];

  const performanceSpecs = [
    { key: "acceleration", label: "0-60 mph", icon: "🚀" },
    { key: "topSpeed", label: "Top Speed", icon: "🏁" },
    { key: "range", label: "Range", icon: "🔋" },
    { key: "charging", label: "Charging", icon: "⚡" },
  ];

  const dimensionsSpecs = [
    { key: "seating", label: "Seating Capacity", icon: "👥" },
    { key: "cargo", label: "Cargo Space", icon: "📦" },
  ];

  const warrantySpecs = [
    { key: "warranty", label: "Warranty", icon: "🛡️" },
  ];

  // ─── FILTER SPECS ─────────────────────────────────────
  const filterSpecs = (specs: typeof powertrainSpecs) => {
    return specs.filter((s) => vehicle[s.key as keyof Vehicle]);
  };

  // ─── SPEC GROUP COMPONENT ────────────────────────────
  const SpecGroup = ({
    title,
    icon,
    specs,
  }: {
    title: string;
    icon: string;
    specs: typeof powertrainSpecs;
  }) => {
    const filtered = filterSpecs(specs);
    if (filtered.length === 0) return null;

    return (
      <div className="border border-[var(--color-line)] rounded-[16px] overflow-hidden bg-[var(--color-paper)] transition-all hover:shadow-[0_4px_12px_rgba(15,24,15,0.06)]">
        <div className="px-5 py-3.5 bg-green-950/5 border-b border-[var(--color-line)] flex items-center gap-2.5">
          <span className="text-lg">{icon}</span>
          <h3 className="font-fraunces font-semibold text-[0.95rem] text-[var(--color-ink)]">{title}</h3>
          <span className="ml-auto text-[0.6rem] text-[var(--color-ink-soft)] font-jetbrains-mono">{filtered.length} specs</span>
        </div>
        <div className="divide-y divide-[var(--color-line)]">
          {filtered.map(({ key, label, icon: specIcon }) => {
            const value = vehicle[key as keyof Vehicle];
            if (!value) return null;
            
            let displayValue = formatSpecValue(key, value);
            let specDescription = "";
            let extraIcon = "";
            
            if (key === "drivetrain") {
              const info = getDrivetrainInfo(String(value));
              displayValue = info.label;
              specDescription = info.description;
              extraIcon = info.icon;
            }
            if (key === "transmission") {
              const info = getTransmissionInfo(String(value));
              displayValue = info.label;
              specDescription = info.description;
            }
            if (key === "engine") {
              const info = getEngineInfo(String(value));
              displayValue = info.label;
              specDescription = info.description;
            }

            // Get variant differences if available
            let variantDiff = "";
            if (vehicle.variants && vehicle.variants.length > 0) {
              const variants = vehicle.variants;
              if (key === "horsepower") {
                const hpValues = variants.map(v => v.horsepower);
                if (hpValues.length > 1) {
                  variantDiff = `Variants: ${hpValues.join(" · ")} hp`;
                }
              }
              if (key === "range") {
                const rangeValues = variants.map(v => v.range);
                if (rangeValues.length > 1) {
                  variantDiff = `Variants: ${rangeValues.join(" · ")} mi`;
                }
              }
              if (key === "acceleration") {
                const accelValues = variants.map(v => v.acceleration);
                if (accelValues.length > 1) {
                  variantDiff = `Variants: ${accelValues.join(" · ")}`;
                }
              }
              if (key === "drivetrain") {
                const dtValues = variants.map(v => v.drivetrain);
                if (dtValues.length > 1) {
                  variantDiff = `Variants: ${dtValues.join(" · ")}`;
                }
              }
            }

            return (
              <div key={key} className="px-5 py-4 hover:bg-green-950/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-base flex-shrink-0 w-6 text-center">{specIcon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-[0.85rem] text-[var(--color-ink)]">{label}</span>
                      <div className="flex items-center gap-2">
                        {extraIcon && <span className="text-sm">{extraIcon}</span>}
                        <span className="font-semibold text-[0.95rem] text-[var(--color-green-deep)]">
                          {displayValue}
                          {getSpecUnit(key)}
                        </span>
                      </div>
                    </div>
                    {specDescription && (
                      <p className="text-[0.65rem] text-[var(--color-ink-soft)] mt-0.5">{specDescription}</p>
                    )}
                    {variantDiff && (
                      <p className="text-[0.6rem] text-[var(--color-green)] mt-0.5">{variantDiff}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ─── GET FILTERED SPECS COUNT ──────────────────────────
  const getSpecCount = () => {
    const allSpecs = [
      "engine", "horsepower", "torque", "transmission", "drivetrain",
      "acceleration", "topSpeed", "range", "charging",
      "seating", "cargo", "warranty"
    ];
    return allSpecs.filter(s => vehicle[s as keyof Vehicle]).length;
  };

  // ─── RENDER VARIANTS ────────────────────────────────────
  const renderVariants = () => {
    if (!vehicle.variants || vehicle.variants.length === 0) return null;

    return (
      <div className="variants-section mb-6">
        <h3 className="font-fraunces font-semibold text-[1.1rem] mb-3 text-[var(--color-ink)]">🚗 Available Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {vehicle.variants.map((variant, index) => (
            <div 
              key={index}
              className={`p-4 bg-[var(--color-paper)] border rounded-[12px] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,24,15,0.08)] ${
                variant.isPopular ? 'border-[var(--color-green)] bg-green-50' : 
                variant.isPerformance ? 'border-red-300 bg-red-50' : 
                'border-[var(--color-line)]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl block mb-1">⚡</span>
                  <h4 className="font-fraunces font-semibold text-[0.95rem] text-[var(--color-ink)]">{variant.name}</h4>
                  <p className="text-[0.75rem] text-[var(--color-ink-soft)]">{variant.drivetrain} · {variant.horsepower} hp</p>
                </div>
                {variant.isPopular && (
                  <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[var(--color-green)] text-white font-bold">⭐ Most Popular</span>
                )}
                {variant.isPerformance && (
                  <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">🏎️ Fastest</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-bold text-[0.9rem] text-[var(--color-green-deep)]">{formatPrice(variant.price)}</span>
                <span className="text-[0.7rem] text-[var(--color-ink-soft)]">{variant.range} mi range</span>
              </div>
              <div className="mt-1.5 flex gap-2 text-[0.6rem] text-[var(--color-ink-soft)]">
                <span>0-60: {variant.acceleration}</span>
                <span>·</span>
                <span>Top: {variant.topSpeed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── RENDER FEATURES ────────────────────────────────────
  const renderFeatures = () => {
    if (!vehicle.features || vehicle.features.length === 0) return null;

    const featureIcons: Record<string, string> = {
      "Long Range Battery": "🔋",
      "Instant Torque": "🚀",
      "Smart Connectivity": "📱",
      "Safety First": "🛡️",
      "Premium Interior": "✨",
      "Autopilot": "🤖",
      "Glass Roof": "🌤️",
      "Fast Charging": "⚡",
      "Dual Motor": "⚡",
      "Performance Upgrade": "🏎️",
      "Track Mode": "🏁",
      "Heated Seats": "🔥",
      "Premium Sound": "🔊",
      "Wireless Charging": "📱",
      "Blind Spot Monitoring": "👀",
      "Lane Keep Assist": "🛤️",
    };

    return (
      <div className="features-section mb-6">
        <h3 className="font-fraunces font-semibold text-[1.1rem] mb-3 text-[var(--color-ink)]">✨ Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vehicle.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[12px]">
              <span className="text-xl flex-shrink-0">{featureIcons[feature] || "✨"}</span>
              <div>
                <h4 className="font-fraunces font-semibold text-[0.85rem] text-[var(--color-ink)]">{feature}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── RENDER COMPARISON TABLE ────────────────────────────
  const renderComparisonTable = () => {
    if (!vehicle.variants || vehicle.variants.length < 2) return null;

    return (
      <div className="comparison-section mb-6">
        <h3 className="font-fraunces font-semibold text-[1.1rem] mb-3 text-[var(--color-ink)]">📊 Variant Comparison</h3>
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[16px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-green-950/5 border-b border-[var(--color-line)]">
                  <th className="px-4 py-3 text-left text-[0.65rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">Feature</th>
                  {vehicle.variants.map((variant, i) => (
                    <th key={i} className="px-4 py-3 text-left text-[0.65rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">
                      {variant.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "drivetrain", label: "Drivetrain" },
                  { key: "horsepower", label: "Horsepower", unit: " hp" },
                  { key: "torque", label: "Torque", unit: " lb-ft" },
                  { key: "acceleration", label: "0-60 mph" },
                  { key: "range", label: "Range", unit: " mi" },
                  { key: "topSpeed", label: "Top Speed" },
                  { key: "price", label: "Price", format: (v: number) => formatPrice(v) },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-[var(--color-line)] last:border-0 hover:bg-green-950/5">
                    <td className="px-4 py-3 font-medium text-[0.8rem] text-[var(--color-ink)]">{row.label}</td>
                    {vehicle.variants.map((variant, i) => {
                      let value = variant[row.key as keyof VehicleVariant];
                      if (row.format) {
                        value = row.format(value as number);
                      }
                      return (
                        <td key={i} className="px-4 py-3 text-[0.85rem] text-[var(--color-ink)]">
                          {value}{row.unit || ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="mb-12 max-w-[91vw] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[16px] mb-6">
        <span className="text-3xl">📊</span>
        <div>
          <h2 className="font-fraunces font-medium text-[1.8rem] tracking-[-0.01em]">
            Technical <em className="italic not-italic text-[var(--color-green)]">Specifications</em>
          </h2>
          <p className="text-[0.75rem] text-[var(--color-ink-soft)]">
            Complete {vehicle.model} specifications and options
          </p>
        </div>
        <span className="ml-auto text-[0.7rem] font-jetbrains-mono bg-green-950/10 text-[var(--color-green-deep)] px-3 py-1 rounded-full font-semibold">
          {getSpecCount()} specs
        </span>
      </div>

      {/* Variants */}
      {renderVariants()}

      {/* Features */}
      {renderFeatures()}

      {/* Comparison Table */}
      {renderComparisonTable()}

      {/* Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SpecGroup title="Powertrain" icon="🔧" specs={powertrainSpecs} />
        <SpecGroup title="Performance" icon="🏎️" specs={performanceSpecs} />
        <SpecGroup title="Dimensions & Capacity" icon="📐" specs={dimensionsSpecs} />
        <SpecGroup title="Warranty & Coverage" icon="🛡️" specs={warrantySpecs} />
      </div>

      {/* Takeaways */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-green-950/5 rounded-[12px] border border-[var(--color-line)]">
          <span className="text-lg block mb-1">🏎️</span>
          <h4 className="font-fraunces font-semibold text-[0.85rem]">Performance</h4>
          <p className="text-[0.65rem] text-[var(--color-ink-soft)]">
            {vehicle.acceleration ? `${vehicle.acceleration} 0-60 mph` : "N/A"} · 
            {vehicle.topSpeed ? ` ${vehicle.topSpeed}` : " N/A"}
          </p>
          {vehicle.variants && vehicle.variants.length > 0 && (
            <span className="text-[0.55rem] text-[var(--color-green)] block mt-0.5">
              Best: {vehicle.variants.reduce((a, b) => 
                parseFloat(a.acceleration) < parseFloat(b.acceleration) ? a : b
              ).acceleration}
            </span>
          )}
        </div>
        <div className="p-4 bg-green-950/5 rounded-[12px] border border-[var(--color-line)]">
          <span className="text-lg block mb-1">🔋</span>
          <h4 className="font-fraunces font-semibold text-[0.85rem]">Efficiency</h4>
          <p className="text-[0.65rem] text-[var(--color-ink-soft)]">
            {vehicle.range ? `${vehicle.range} mi range` : "N/A"} · 
            {vehicle.charging ? ` ${vehicle.charging}` : " N/A"}
          </p>
          {vehicle.variants && vehicle.variants.length > 0 && (
            <span className="text-[0.55rem] text-[var(--color-green)] block mt-0.5">
              Best: {vehicle.variants.reduce((a, b) => a.range > b.range ? a : b).range} mi
            </span>
          )}
        </div>
        <div className="p-4 bg-green-950/5 rounded-[12px] border border-[var(--color-line)]">
          <span className="text-lg block mb-1">🛡️</span>
          <h4 className="font-fraunces font-semibold text-[0.85rem]">Coverage</h4>
          <p className="text-[0.65rem] text-[var(--color-ink-soft)]">
            {vehicle.warranty || "Standard warranty included"}
          </p>
        </div>
      </div>
    </section>
  );
}