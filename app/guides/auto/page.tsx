// app/guides/auto/page.tsx
import { Metadata } from "next";
import { CategoryGuidesPage } from "@/components/CategoryGuidesPage";

export const metadata: Metadata = {
  title: "Auto Buying Guides — Expert Reviews & Comparisons | 7pexel",
  description: "Expert car and vehicle buying guides, reviews, and comparisons. Find the best cars, SUVs, trucks, and EVs with our comprehensive guides.",
  keywords: "auto guides, car buying guide, best cars, vehicle reviews, car comparison, electric vehicles, SUVs, trucks, auto guides",
  openGraph: {
    title: "Auto Buying Guides — 7pexel",
    description: "Expert car buying guides, reviews, and comparisons. Find the best vehicles for your lifestyle.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Auto Buying Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Buying Guides — 7pexel",
    description: "Expert car and vehicle buying guides, reviews, and comparisons.",
  },
  alternates: {
    canonical: "https://7pexel.com/guides/auto",
  },
};

export default function AutoGuidesPage() {
  return (
    <CategoryGuidesPage
      category="auto"
      icon="🚗"
      gradient="from-[#2F5233] via-[#4C7A1F] to-[#2F5233]"
      title="Auto"
      description="Expert advice, reviews, and comparisons to help you find the best vehicles — from sedans to SUVs to electric cars."
    />
  );
}