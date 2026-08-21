// components/CompareButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface CompareButtonProps {
  phoneSlug: string;
  phoneBrand: string;
  phoneModel: string;
  className?: string;
  variant?: "default" | "small" | "icon";
}

export function CompareButton({
  phoneSlug,
  phoneBrand,
  phoneModel,
  className = "",
  variant = "default",
}: CompareButtonProps) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    // Check if phone is already in comparison
    const urlParams = new URLSearchParams(window.location.search);
    const phonesParam = urlParams.get("phones");
    if (phonesParam) {
      const slugs = phonesParam.split(",");
      setIsSelected(slugs.includes(phoneSlug));
    }
  }, [phoneSlug]);

  const handleCompare = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let phonesParam = urlParams.get("phones") || "";
    let slugs = phonesParam ? phonesParam.split(",") : [];

    if (isSelected) {
      // Remove from comparison
      slugs = slugs.filter(s => s !== phoneSlug);
    } else {
      // Add to comparison (max 4)
      if (slugs.length >= 4) {
        alert("You can compare up to 4 phones at a time.");
        return;
      }
      slugs.push(phoneSlug);
    }

    // Update URL
    const newPhonesParam = slugs.join(",");
    if (newPhonesParam) {
      router.push(`/compare?phones=${newPhonesParam}`);
    } else {
      router.push("/compare");
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleCompare}
        className={`p-2 rounded-full transition-all ${
          isSelected
            ? "bg-[#7F011F] text-white hover:bg-[#a80a30]"
            : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e8e8e8]"
        } ${className}`}
        title={isSelected ? "Remove from comparison" : "Add to comparison"}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSelected ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          )}
        </svg>
      </button>
    );
  }

  if (variant === "small") {
    return (
      <button
        onClick={handleCompare}
        className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-all ${
          isSelected
            ? "bg-[#7F011F] text-white hover:bg-[#a80a30]"
            : "bg-[#f5f5f5] text-[#1a1a1a] hover:bg-[#e8e8e8] border border-[var(--color-line)]"
        } ${className}`}
      >
        {isSelected ? "Remove" : "Compare"}
      </button>
    );
  }

  return (
    <button
      onClick={handleCompare}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
        isSelected
          ? "bg-[#7F011F] text-white hover:bg-[#a80a30]"
          : "bg-white text-[#1a1a1a] hover:bg-[#f5f5f5] border border-[var(--color-line)] hover:border-[#7F011F]"
      } ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isSelected ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        )}
      </svg>
      {isSelected ? "Remove from Compare" : "Add to Compare"}
    </button>
  );
}