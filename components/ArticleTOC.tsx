// components/ArticleTOC.tsx
"use client";

import { useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTOCProps {
  items: TOCItem[];
}

export function ArticleTOC({ items }: ArticleTOCProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="bg-[#f5ebd0]/30 rounded-2xl p-4 mb-8 border border-[rgba(127,1,31,0.06)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-bold text-[#2d1a1a] font-['Poppins',sans-serif] flex items-center gap-2">
          <i className="fas fa-list-ul text-[#7F011F]" />
          Table of Contents
        </h3>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-[#7F011F] transition-transform`} />
      </button>
      
      {isOpen && (
        <ul className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={`#section-${index}`}
                className="text-sm text-[#6d4a4a] hover:text-[#7F011F] transition-colors block py-1"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(`section-${index}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}