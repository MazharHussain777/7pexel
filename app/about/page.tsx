// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "About Mazhar Hussan | 7pexel",
  description: "Mazhar Hussan - Tech enthusiast and founder of 7pexel based in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[600px] mx-auto px-4 py-20 text-center">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28 overflow-hidden rounded-full ring-4 ring-[#004643]/10">
            <Image
              src="/7pexel.jpeg"
              alt="Mazhar Hussan"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">
          Mazhar Hussan
        </h1>
        
        <p className="text-[#004643] font-medium mb-6">
          Founder of 7pexel
        </p>

        <div className="text-[#555] text-sm leading-relaxed space-y-3 max-w-md mx-auto">
          <p>
            Tech enthusiast and content creator passionate about 
            smartphones, gadgets, and helping people make smarter 
            tech decisions.
          </p>
          <p className="flex items-center justify-center gap-2">
            <i className="fas fa-map-marker-alt text-[#004643]" />
            <span>Pakistan</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <a
            href="https://twitter.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-lg bg-[#f8f8f8] hover:bg-[#1DA1F2] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://linkedin.com/in/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-lg bg-[#f8f8f8] hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://youtube.com/@mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-lg bg-[#f8f8f8] hover:bg-[#FF0000] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube" />
          </a>
          <a
            href="https://instagram.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-lg bg-[#f8f8f8] hover:bg-[#E4405F] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://github.com/mazharhussan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-lg bg-[#f8f8f8] hover:bg-[#333] hover:text-white transition-colors flex items-center justify-center text-[#555]"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </main>
    </div>
  );
}