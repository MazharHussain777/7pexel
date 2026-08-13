// components/vehicles/VehicleHero.tsx
import Image from "next/image";
import Link from "next/link";
import { Brand, Vehicle, CATEGORIES, formatPrice } from "@/app/auto/data/vehicles";

interface VehicleHeroProps {
  vehicle: Vehicle;
  brand?: Brand;
}

export function VehicleHero({ vehicle, brand }: VehicleHeroProps) {
  return (
    <div className="relative w-full max-w-[91vw] mx-auto bg-[#eef1e9] border border-[var(--color-line)] rounded-[16px] overflow-hidden mb-8">
      <div className="relative w-full aspect-[21/9] min-h-[400px] lg:min-h-[560px]">
        <Image
          src={vehicle.img}
          alt={`${brand?.name || vehicle.brandId} ${vehicle.model}`}
          width={1600}
          height={900}
          className="w-full h-full object-cover"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white font-fraunces font-bold text-lg flex-shrink-0 shadow-lg border border-white/20"
                    style={{ background: brand?.grad || "linear-gradient(150deg,#333,#666)" }}
                  >
                    {brand?.logo || brand?.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <Link
                      href={`/auto/brands/${brand?.slug || vehicle.brandId}`}
                      className="text-[0.85rem] font-medium text-white/80 hover:text-white transition-colors"
                    >
                      {brand?.name || vehicle.brandId}
                    </Link>
                    <div className="flex items-center gap-2 text-[0.7rem] text-white/60">
                      <span>🌍 {brand?.country || "N/A"}</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span>📅 {brand?.founded || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <h1 className="font-fraunces font-bold text-[clamp(2.4rem,5vw,4.2rem)] tracking-[-0.02em] leading-[1.05] text-white drop-shadow-lg">
                  {vehicle.model}
                </h1>

                <div className="flex gap-2 flex-wrap mt-3">
                  {vehicle.cats.map((c) => {
                    const cat = CATEGORIES.find((cat) => cat.key === c);
                    return (
                      <Link
                        key={c}
                        href={`/auto/${c}`}
                        className="text-[0.6rem] px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold uppercase tracking-[0.05em] hover:bg-[var(--color-green)] transition-colors border border-white/10"
                      >
                        {cat?.icon || ""} {cat?.name || c}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 flex-shrink-0">
                <div className="px-5 py-3 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white text-center min-w-[120px]">
                  <span className="block text-[0.55rem] uppercase tracking-[0.08em] text-white/60 font-jetbrains-mono">
                    Starting MSRP
                  </span>
                  <span className="font-fraunces font-bold text-[1.6rem] leading-none">
                    {formatPrice(vehicle.price)}
                  </span>
                </div>

                {vehicle.range && (
                  <div className="px-5 py-3 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white text-center min-w-[100px]">
                    <span className="block text-[0.55rem] uppercase tracking-[0.08em] text-white/60 font-jetbrains-mono">
                      Range
                    </span>
                    <span className="font-fraunces font-bold text-[1.6rem] leading-none">
                      {vehicle.range}
                    </span>
                    <span className="text-[0.7rem] text-white/70 ml-1">mi</span>
                  </div>
                )}

                {vehicle.horsepower && (
                  <div className="px-5 py-3 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white text-center min-w-[100px]">
                    <span className="block text-[0.55rem] uppercase tracking-[0.08em] text-white/60 font-jetbrains-mono">
                      Horsepower
                    </span>
                    <span className="font-fraunces font-bold text-[1.6rem] leading-none">
                      {vehicle.horsepower.toLocaleString()}
                    </span>
                  </div>
                )}

                {vehicle.acceleration && (
                  <div className="px-5 py-3 rounded-[14px] bg-white/15 backdrop-blur-md border border-white/20 text-white text-center min-w-[100px]">
                    <span className="block text-[0.55rem] uppercase tracking-[0.08em] text-white/60 font-jetbrains-mono">
                      0-60 mph
                    </span>
                    <span className="font-fraunces font-bold text-[1.6rem] leading-none">
                      {vehicle.acceleration}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}