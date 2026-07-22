// app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { CategoryBar } from "@/components/CategoryBar";
import { NewsGrid, Article } from "@/components/NewsGrid";

export default function Home() {
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?limit=5`);
      const result = await response.json();
      if (result.success) {
        setNewsItems(result.data);
      } else {
        setNewsItems([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        <FeaturedBanner />
        <CategoryBar />
        {!loading && <NewsGrid items={newsItems} />}
      </main>
    </div>
  );
}