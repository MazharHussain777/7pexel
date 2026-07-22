// app/phone-finder/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Phone Not Found | TechBlog",
  description: "The smartphone you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Phone Not Found | TechBlog",
    description: "The smartphone you're looking for doesn't exist or has been moved.",
  },
};

export default function PhoneNotFound() {
  return (
    <div className="min-h-screen bg-[#fbf8ff]">
      <Header />
      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-20 text-center">
        {/* 404 Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "404 - Phone Not Found",
              description: "The requested phone page could not be found.",
              url: "https://techblog.com/phone-finder",
            }),
          }}
        />

        <div className="w-24 h-24 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-6">
          <i className="fas fa-mobile-alt text-4xl text-[#7F011F]/40" />
        </div>
        <h1 className="text-4xl font-bold text-[#2d1a1a] mb-4 font-['Poppins',sans-serif]">
          Phone Not Found
        </h1>
        <p className="text-[#6d4a4a] mb-8 max-w-md mx-auto">
          The smartphone you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/phone-finder"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-[#7F011F]/30 transition-all font-['Poppins',sans-serif]"
          >
            <i className="fas fa-arrow-left" />
            Browse All Phones
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-[rgba(127,1,31,0.2)] text-[#2d1a1a] px-8 py-4 rounded-2xl hover:bg-[#f5ebd0] transition-colors font-['Poppins',sans-serif]"
          >
            <i className="fas fa-home" />
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}