// components/technology/icons.tsx
// Centralized line-icon set (Lucide-style, hand-authored) used across the
// Technology category pages so nothing relies on emoji glyphs.

import type { SVGProps } from "react";

export type IconName =
  // category-level
  | "brain"
  | "sparkles"
  | "atom"
  | "glasses"
  | "leaf"
  | "shield-check"
  | "rocket"
  | "dna"
  // sub-category level
  | "cpu"
  | "message-square"
  | "eye"
  | "pen-line"
  | "image"
  | "film"
  | "music"
  | "compass"
  | "briefcase"
  | "smartphone"
  | "layers"
  | "globe"
  | "sun"
  | "wind"
  | "recycle"
  | "network"
  | "lock"
  | "shield-alert"
  | "orbit"
  | "satellite"
  | "test-tube"
  | "heart-pulse"
  // utility / UI
  | "flame"
  | "star"
  | "clock"
  | "list-checks"
  | "folder-open"
  | "file-search"
  | "home"
  | "arrow-left"
  | "grid";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

const paths: Record<IconName, React.ReactNode> = {
  brain: (
    <>
      <path d="M9.5 3.5a2.5 2.5 0 0 0-2.45 2.02A3 3 0 0 0 5 8.4V9a3 3 0 0 0 0 6v.6a3 3 0 0 0 2.05 2.88A2.5 2.5 0 0 0 9.5 20.5" />
      <path d="M14.5 3.5a2.5 2.5 0 0 1 2.45 2.02A3 3 0 0 1 19 8.4V9a3 3 0 0 1 0 6v.6a3 3 0 0 1-2.05 2.88 2.5 2.5 0 0 1-2.45 2.02" />
      <path d="M9.5 3.5v17M14.5 3.5v17M9.5 8h5M9.5 12h5M9.5 16h5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <path d="M12 8.5c.6 2 1.5 2.9 3.5 3.5-2 .6-2.9 1.5-3.5 3.5-.6-2-1.5-2.9-3.5-3.5 2-.6 2.9-1.5 3.5-3.5Z" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </>
  ),
  glasses: (
    <>
      <circle cx="6.5" cy="14.5" r="3.2" />
      <circle cx="17.5" cy="14.5" r="3.2" />
      <path d="M9.7 14.5h4.6M3.3 14.5 5 7.5c.3-1.1 1-1.8 2-1.8M20.7 14.5 19 7.5c-.3-1.1-1-1.8-2-1.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 20c8.5 0 14-5.5 14-14 0-.6 0-1.3-.1-2C10.4 4 5 9.4 5 18c-.7 0-1.4 0-2-.1" />
      <path d="M5 20c0-4 2-7 6-9.5" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.5 3.5c3 .5 5 2.5 5.5 5.5.4 2.5-.5 5.5-3 8l-2.5-2.5-2.5-2.5c2.5-2.5 5.5-3.4 8-3M6 15c-1.5 1-2 3.5-2.5 5.5 2-.5 4.5-1 5.5-2.5" />
      <path d="M9 14.5 5.5 11c1-2.3 2.7-3.6 4-4.3M14.5 15c-.7 1.3-2 3-4.3 4l-3.5-3.5" />
      <circle cx="15" cy="9" r="1.4" />
    </>
  ),
  dna: (
    <>
      <path d="M7 3c0 4.5 10 4.5 10 9s-10 4.5-10 9M17 3c0 4.5-10 4.5-10 9s10 4.5 10 9" />
      <path d="M8.2 7h7.6M8.2 17h7.6M7.5 12h9" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  "message-square": (
    <path d="M4 5h16v11H9l-4 3.5V16H4V5Z" />
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  "pen-line": (
    <>
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M14 6.5 17.5 10" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5-5 3.5 3.5L16 12l4 5" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M8 4.5v15M16 4.5v15M3 9.5h5M16 9.5h5M3 14.5h5M16 14.5h5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5.5L20 4v12.5" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16.5" r="2.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.8 4.8-4.8 1.8 1.8-4.8 4.8-1.8Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="1.5" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  smartphone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
      <path d="M11 18.5h2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </>
  ),
  wind: (
    <path d="M3.5 8h11a2.5 2.5 0 1 0-2.4-3.2M3.5 12.5h14.5a2.5 2.5 0 1 1-2.4 3.2M3.5 17h8.5a2 2 0 1 1-1.9 2.6" />
  ),
  recycle: (
    <>
      <path d="m7 4.5-3 5 3 1.7M4.2 9.4l3.3 1M9.5 3.5h5l2.7 4.6M14.7 5.9l2.1 3M16.8 20.5H12l-2.5-4.4M14.6 18l-2.4 3M4.2 15.6l2.4 4.9h5.6" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 6.5v4M12 10.5 5 16M12 10.5l7 5.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  "shield-alert": (
    <>
      <path d="M12 3.5 5 6v6c0 4.5 3 7.5 7 8.5 4-1 7-4 7-8.5V6l-7-2.5Z" />
      <path d="M12 8.5v4M12 15.5h.01" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(-25 12 12)" />
      <circle cx="20.3" cy="8.4" r="1.3" />
    </>
  ),
  satellite: (
    <>
      <path d="m8 12-4 4 3.5 3.5 4-4M13 7l4-4 3.5 3.5-4 4" />
      <path d="m10 10 4 4M8.5 15.5l-2.3 2.3M14 7 16.3 4.7" />
      <path d="M11 6.5 6.5 11l6.5 6.5 4.5-4.5-6.5-6.5Z" />
    </>
  ),
  "test-tube": (
    <>
      <path d="M9 2.5h6M10 3v13a2 2 0 0 0 4 0V3" />
      <path d="M10 13.5h4" />
    </>
  ),
  "heart-pulse": (
    <path d="M12.5 20s-7.5-4.5-9-9.8C2.6 6.8 5 4 8 4c1.7 0 3 .9 4 2.3C13 5 14.3 4 16 4c3 0 5.4 2.8 4.5 6.2-.4 1.4-1.2 2.7-2.1 3.9h-3l-1.5-2.5-2 4-1.5-2.5H8" />
  ),
  flame: (
    <path d="M12 21.5c-4 0-6.5-2.7-6.5-6 0-2.5 1.4-4 2.6-5.7.7-1 1.2-2.2 1.2-3.8 1.8 1 3 3 3 5 1.5-1 2-2.7 2-4.3 2.3 1.6 4.2 4.5 4.2 8 0 3.8-2.5 6.8-6.5 6.8Z" />
  ),
  star: (
    <path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 19.3l1.3-6-4.6-4.1 6.1-.6L12 3Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  "list-checks": (
    <path d="m4 6.5 1.5 1.5L8 5.5M4 13.5 5.5 15 8 12.5M4 20.5 5.5 22 8 19.5M11.5 6.5h9M11.5 13.5h9M11.5 20.5h9" />
  ),
  "folder-open": (
    <path d="M3.5 8.5V6a1.5 1.5 0 0 1 1.5-1.5h4l2 2.5H19A1.5 1.5 0 0 1 20.5 8.5M3.5 8.5h17l-2 9.5a1.5 1.5 0 0 1-1.5 1.2H7a1.5 1.5 0 0 1-1.5-1.2l-2-9.5Z" />
  ),
  "file-search": (
    <>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <circle cx="11" cy="14.5" r="2.3" />
      <path d="m13.8 17-1.7-1.7" />
    </>
  ),
  home: (
    <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z" />
  ),
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  grid: (
    <path d="M4 4h6.5v6.5H4V4Zm9.5 0H20v6.5h-6.5V4ZM4 13.5h6.5V20H4v-6.5Zm9.5 0H20V20h-6.5v-6.5Z" />
  ),
};

export function Icon({ name, size = 16, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

// Category-level icon lookup (used by CategoryHero)
export const categoryIconMap: Record<string, IconName> = {
  ai: "brain",
  "generative-ai": "sparkles",
  "quantum-computing": "atom",
  "ar-vr": "glasses",
  "green-tech": "leaf",
  cybersecurity: "shield-check",
  "space-tech": "rocket",
  biotech: "dna",
};

// Sub-category icon lookup (used by SubCategoriesGrid via page.tsx data)
export const subCategoryIconMap: Record<string, IconName> = {
  "machine-learning": "brain",
  "deep-learning": "cpu",
  nlp: "message-square",
  "computer-vision": "eye",
  "text-generation": "pen-line",
  "image-generation": "image",
  "video-generation": "film",
  "audio-generation": "music",
  "quantum-hardware": "cpu",
  "quantum-algorithms": "compass",
  "quantum-applications": "briefcase",
  "augmented-reality": "smartphone",
  "virtual-reality": "glasses",
  "mixed-reality": "layers",
  metaverse: "globe",
  "renewable-energy": "sun",
  "carbon-capture": "wind",
  "sustainable-tech": "recycle",
  "network-security": "network",
  "data-privacy": "lock",
  "threat-intelligence": "shield-alert",
  "zero-trust": "shield-check",
  "space-exploration": "orbit",
  "satellite-tech": "satellite",
  "commercial-spaceflight": "rocket",
  "gene-editing": "dna",
  "health-tech": "heart-pulse",
  bioengineering: "test-tube",
};