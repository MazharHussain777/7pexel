// app/news/not-found.tsx
import Link from "next/link";
import { Header } from "@/components/Header";

export default function NewsNotFound() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-6">
          <i className="fas fa-newspaper text-4xl text-[#7F011F]/40" />
        </div>
        <h1 className="text-3xl font-bold text-[#2d1a1a] mb-4">Article Not Found</h1>
        <p className="text-[#6d4a4a] mb-8 max-w-md mx-auto">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-4 rounded-2xl hover:bg-[#a80a30] transition-colors shadow-lg shadow-[#7F011F]/30"
        >
          <i className="fas fa-arrow-left" />
          Browse All News
        </Link>
      </main>
    </div>
  );
}