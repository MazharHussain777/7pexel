// app/terms/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Terms of Service | 7pexel",
  description: "Terms of Service for using 7pexel website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
            Terms of <span className="text-[#004643]">Service</span>
          </h1>
          <p className="text-[#666] text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="space-y-6 text-[#555] leading-relaxed">
          {/* Simple Terms */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              Simple Terms
            </h2>
            <p>
              By using 7pexel, you agree to keep it simple and respectful. 
              Our content is for informational purposes, and we hope you enjoy it.
            </p>
          </section>

          {/* What you CAN do */}
          <section className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif] text-emerald-800">
              What You CAN Do ✅
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-emerald-700">
              <li>Read and enjoy our content</li>
              <li>Share articles with friends and family</li>
              <li>Subscribe to our newsletter</li>
              <li>Give us feedback and suggestions</li>
            </ul>
          </section>

          {/* What you CANNOT do */}
          <section className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif] text-red-800">
              What You CANNOT Do ❌
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-red-700">
              <li>Use our website for illegal activities</li>
              <li>Attempt to hack or disrupt our services</li>
              <li>Misuse our contact information</li>
            </ul>
          </section>

          {/* Email Usage */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              About Your Email
            </h2>
            <p>
              When you subscribe to our newsletter, we'll use your email to send 
              you updates, tech insights, and news about 7pexel. We respect your 
              privacy and will never share or misuse your information.
            </p>
            <p className="mt-2">
              You can unsubscribe anytime with one click.
            </p>
          </section>

          {/* Future Updates */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              Future Updates
            </h2>
            <p>
              As we grow, we may add new categories, features, or services. 
              We'll keep you informed about everything new at 7pexel through 
              our newsletter.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#f8f8f8] rounded-xl p-5">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              Questions?
            </h2>
            <p className="mb-2">
              If you have any questions about our terms, just ask.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#004643] hover:underline font-medium text-sm"
            >
              <i className="fas fa-arrow-right text-xs" />
              Contact Us
            </Link>
          </section>
        </div>

        <p className="text-xs text-[#999] mt-8 text-center border-t border-[#e8e8e8] pt-6">
          Thank you for being part of 7pexel. 🙏
        </p>
      </main>
    </div>
  );
}