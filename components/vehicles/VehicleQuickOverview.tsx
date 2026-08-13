// components/vehicles/VehicleQuickOverview.tsx
import { Vehicle } from "@/app/auto/data/vehicles";
import { CATEGORIES } from "@/app/auto/data/vehicles";

interface VehicleQuickOverviewProps {
  vehicle: Vehicle;
}

export function VehicleQuickOverview({ vehicle }: VehicleQuickOverviewProps) {
  const mainCategory = vehicle.cats[0]
    ? CATEGORIES.find((c) => c.key === vehicle.cats[0])
    : null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-[var(--color-paper)] border border-[var(--color-line)]">
        <span className="text-xl">🏷️</span>
        <div>
          <span className="block text-[0.55rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">
            Body Type
          </span>
          <span className="font-semibold text-[0.85rem] text-[var(--color-ink)]">
            {vehicle.size}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-[var(--color-paper)] border border-[var(--color-line)]">
        <span className="text-xl">📁</span>
        <div>
          <span className="block text-[0.55rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">
            Category
          </span>
          <span className="font-semibold text-[0.85rem] text-[var(--color-ink)]">
            {mainCategory?.name || vehicle.cats[0] || "N/A"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-[var(--color-paper)] border border-[var(--color-line)]">
        <span className="text-xl">🔋</span>
        <div>
          <span className="block text-[0.55rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">
            Drivetrain
          </span>
          <span className="font-semibold text-[0.85rem] text-[var(--color-ink)]">
            {vehicle.drivetrain || "N/A"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-[var(--color-paper)] border border-[var(--color-line)]">
        <span className="text-xl">👥</span>
        <div>
          <span className="block text-[0.55rem] uppercase tracking-[0.06em] text-[var(--color-ink-soft)] font-jetbrains-mono">
            Seating
          </span>
          <span className="font-semibold text-[0.85rem] text-[var(--color-ink)]">
            {vehicle.seating || "N/A"} seats
          </span>
        </div>
      </div>
    </div>
  );
}