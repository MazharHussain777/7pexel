// app/privacy/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | 7pexel",
  description: "Privacy Policy for 7pexel - Your privacy matters to us.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif] mb-2">
            Privacy <span className="text-[#004643]">Policy</span>
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
          {/* What we collect */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              What We Collect
            </h2>
            <p>
              When you subscribe to our newsletter, we collect your email address. 
              That's it. We keep it simple.
            </p>
          </section>

          {/* How we use it */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              How We Use Your Email
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Send you newsletter updates and tech insights</li>
              <li>Notify you about new content and reviews</li>
              <li>Share announcements and updates about 7pexel</li>
              <li>Respond to your questions or feedback</li>
            </ul>
          </section>

          {/* What we DON'T do */}
          <section className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif] text-emerald-800">
              What We DON'T Do
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-emerald-700">
              <li>❌ We never sell or share your email with anyone</li>
              <li>❌ We never misuse your personal information</li>
              <li>❌ We never spam you with irrelevant content</li>
              <li>❌ We never share your data with third parties</li>
            </ul>
          </section>

          {/* Future Use */}
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              Future Updates
            </h2>
            <p>
              We may use your email to inform you about new categories, features, 
              or updates to our website. We'll always keep you in the loop about 
              what's new at 7pexel.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#f8f8f8] rounded-xl p-5">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins',sans-serif]">
              Questions?
            </h2>
            <p className="mb-2">
              If you have any questions about your privacy or our policies, 
              feel free to reach out.
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
          We value your trust. Your privacy matters to us.
        </p>
      </main>
    </div>
  );
}