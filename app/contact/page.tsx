// app/contact/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Contact 7pexel",
  description: "Connect with 7pexel via email or social media.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[600px] mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 overflow-hidden rounded-xl">
            <Image
              src="/7pexel.jpeg"
              alt="7pexel"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">
          Contact Us
        </h1>
        
        <p className="text-[#666] mb-8">
          We'd love to hear from you
        </p>

        {/* Email */}
        <a
          href="mailto:contact@7pexel.com"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#004643] text-white rounded-lg hover:bg-[#003a33] transition-colors text-sm font-medium"
        >
          <i className="fas fa-envelope" />
          contact@7pexel.com
        </a>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <a href="#" className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]">
            <i className="fab fa-youtube" />
          </a>
          <a href="#" className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" className="w-10 h-10 rounded-lg bg-[#f8f8f8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </main>
    </div>
  );
}