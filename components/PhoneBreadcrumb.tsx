// components/PhoneBreadcrumb.tsx
"use client";

interface PhoneBreadcrumbProps {
  currentPage: string;
}

export function PhoneBreadcrumb({ currentPage }: PhoneBreadcrumbProps) {
  return (
    <div className="text-sm text-[#6d4a4a] mb-3">
      <i className="fas fa-home text-[#7F011F]/60" /> Home /{" "}
      <span className="text-[#7F011F] font-medium">{currentPage}</span>
    </div>
  );
}