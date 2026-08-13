// components/icons/LogoIcon.tsx
import { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 44 44" fill="none" {...props}>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A3F26" />
          <stop offset="1" stopColor="#1FA25A" />
        </linearGradient>
      </defs>
      <rect width="44" height="44" rx="13" fill="url(#logoGrad)" />
      <path d="M13 13.5H29.5L20.5 31H16L23.8 16.8H13V13.5Z" fill="#FBFDFB" />
      <circle cx="31" cy="31" r="2.4" fill="#D4F26B" />
      <circle cx="31" cy="24.5" r="1.3" fill="#FBFDFB" opacity="0.55" />
    </svg>
  );
}