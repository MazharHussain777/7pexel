// app/technology/page.tsx
import { Metadata } from "next";
import { TechnologyClient } from "./TechnologyClient";

export const metadata: Metadata = {
  title: "Technology — Latest Tech News, Reviews & Buying Guides | 7pexel",
  description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, Green Tech, Cybersecurity, and more. Expert reviews, buying guides, and tech insights.",
  keywords: "technology, AI, artificial intelligence, quantum computing, AR/VR, green tech, cybersecurity, space tech, tech news, gadget reviews, tech buying guides, smart home, wearables, audio, gaming, cameras",
  openGraph: {
    title: "Technology — Latest Tech News, Reviews & Buying Guides | 7pexel",
    description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, Green Tech, and more.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Technology - 7pexel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology — Latest Tech News, Reviews & Buying Guides | 7pexel",
    description: "Your ultimate technology destination. Explore AI, Quantum Computing, AR/VR, Green Tech, and more.",
  },
  alternates: {
    canonical: "https://7pexel.com/technology",
  },
};

export default function TechnologyPage() {
  return <TechnologyClient />;
}