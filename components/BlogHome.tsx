// components/BlogHome.tsx
"use client";

import { Header } from "./Header";
import { FeaturedBanner } from "./FeaturedBanner";
import { PostGrid } from "./PostGrid";
import { CategoryBar } from "./CategoryBar";

export function BlogHome() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1320px] mx-auto px-8 py-10">
        <CategoryBar />
        <FeaturedBanner />
        <PostGrid />
      </main>
    </div>
  );
}