// app/not-found.tsx
import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="text-6xl font-bold text-[#7F011F] mb-6">404</h1>
        <h2 className="text-3xl font-bold text-[#2d1a1a] mb-4">Phone Not Found</h2>
        <p className="text-[#6d4a4a] mb-8 max-w-md mx-auto">
          The smartphone you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/phone-finder"  // ✅ FIXED: Changed from /phones to /phone-finder
          className="inline-flex items-center gap-2 bg-[#7F011F] text-white px-8 py-4 rounded-2xl hover:bg-[#a80a30] transition-colors shadow-lg shadow-[#7F011F]/30"
        >
          <i className="fas fa-arrow-left" />
          Browse All Phones
        </Link>
      </main>
    </div>
  );
}