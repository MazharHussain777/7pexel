// app/page.tsx
"use client";

import { Header } from "@/components/Header";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { CategoryBar } from "@/components/CategoryBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <FeaturedBanner />
        <CategoryBar />
        {/* NewsGrid / Articles section completely removed */}
      </main>
    </div>
  );
}