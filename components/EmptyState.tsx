// app/auto/brands/components/EmptyState.tsx
"use client";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-4xl mb-4">🔍</span>
      <h3 className="text-xl font-medium text-[var(--color-ink)] mb-2">No brands found</h3>
      <p className="text-[0.9rem] text-[var(--color-ink-soft)] mb-4">
        Try adjusting your filters or search terms
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-[var(--color-green)] text-white font-semibold text-[0.85rem] transition-all hover:bg-[var(--color-green-deep)]"
      >
        Reset filters
      </button>
    </div>
  );
}