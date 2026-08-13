// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Mazhar Hussan | 7pexel",
  description: "Mazhar Hussan - Founder of 7pexel, a mobile specification and comparison platform based in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[800px] mx-auto px-4 py-12 md:py-20">
        {/* Profile Section */}
        <div className="text-center mb-10">
          {/* Profile Image - No shadow */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 overflow-hidden rounded-full ring-2 ring-[#7F011F]/10">
              <Image
                src="/7pexel.jpeg"
                alt="Mazhar Hussan"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-1">
            Mazhar Hussan
          </h1>
          
          <p className="text-[#7F011F] font-medium text-sm">
            Founder of 7pexel
          </p>
          
          <div className="flex items-center justify-center gap-2 text-[#6d4a4a] text-sm mt-1">
            <i className="fas fa-map-marker-alt text-[#7F011F] text-xs" />
            <span>Pakistan</span>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
              About 7pexel
            </h2>
            <p className="text-[#555] leading-relaxed text-sm">
              7pexel is a mobile specification and comparison platform. We  will try to provide accurate specs, benchmarks, and side-by-side comparisons for  smartphones.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
              Our Mission
            </h2>
            <p className="text-[#555] leading-relaxed text-sm">
              In the name of Allah, we aim to help users make informed tech decisions through transparent, accurate, and easily accessible mobile information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
              Founder's Note
            </h2>
            <div className="bg-[#fbf8ff] p-4 rounded-xl border border-[#7F011F]/5">
              <p className="text-[#555] leading-relaxed text-sm italic">
                "As a tech enthusiast from Pakistan, I created 7pexel to bridge the information gap and help people make smarter tech choices."
              </p>
              <p className="text-[#7F011F] font-medium mt-2 text-xs">
                — Mazhar Hussan
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
              What We Offer
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fbf8ff] p-3 rounded-xl border border-[#7F011F]/5">
                <div className="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center mb-1">
                  <i className="fas fa-mobile-alt text-[#7F011F] text-sm" />
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">Phone Specs</h3>
                <p className="text-[0.6rem] text-[#6d4a4a]">Complete specifications</p>
              </div>
              <div className="bg-[#fbf8ff] p-3 rounded-xl border border-[#7F011F]/5">
                <div className="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center mb-1">
                  <i className="fas fa-arrows-left-right text-[#7F011F] text-sm" />
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">Comparisons</h3>
                <p className="text-[0.6rem] text-[#6d4a4a]">Side-by-side analysis</p>
              </div>
              <div className="bg-[#fbf8ff] p-3 rounded-xl border border-[#7F011F]/5">
                <div className="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center mb-1">
                  <i className="fas fa-chart-line text-[#7F011F] text-sm" />
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">Benchmarks</h3>
                <p className="text-[0.6rem] text-[#6d4a4a]">Performance scores</p>
              </div>
             
               
           
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
              Future Vision
            </h2>
            <p className="text-[#555] leading-relaxed text-sm">
              Insha'Allah, we plan to add ,news, reviews, and expanded tech categories.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/50">
            <p className="text-xs text-amber-700 leading-relaxed flex items-start gap-2">
              <i className="fas fa-info-circle text-amber-500 mt-0.5" />
              <span>Please note: While we strive for accuracy, mistakes in specifications or data may occur. We recommend verifying information from official sources.</span>
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 mt-10 pt-6 border-t border-[#7F011F]/10">
          <a
            href="https://twitter.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#1DA1F2] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://linkedin.com/in/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://youtube.com/@mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#FF0000] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube" />
          </a>
          <a
            href="https://instagram.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#E4405F] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://github.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#333] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="text-sm text-[#7F011F] hover:text-[#a80a30] font-medium transition-colors"
          >
            <i className="fas fa-envelope mr-2" />
            Contact Us
          </Link>
        </div>
      </main>
    </div>
  );
}