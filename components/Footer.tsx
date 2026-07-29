// components/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/phone-finder", label: "Phone Finder" },
    { href: "/compare", label: "Compare" },
  ];

  return (
    <footer className={`bg-[#f8f8f8] border-t border-[#e8e8e8] mt-auto ${className}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/7pexel.jpeg"
                  alt="7pexel"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif]">
                7pexel
              </span>
            </Link>
            <p className="text-sm text-[#666] mt-3 leading-relaxed max-w-xs">
              Premium tech insights, reviews, and comparisons for the modern world.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#e8e8e8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#e8e8e8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#e8e8e8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-sm" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-[#e8e8e8] hover:bg-[#004643] hover:text-white transition-colors flex items-center justify-center text-[#555]"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-sm" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      pathname === link.href
                        ? "text-[#004643] font-medium"
                        : "text-[#666] hover:text-[#004643]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/phone-finder"
                  className="text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  Phone Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  Compare Phones
                </Link>
              </li>
            
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-[#1a1a1a] uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  <i className="fas fa-envelope text-[#004643] w-4 text-center" />
                  <span>contact@7pexel.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  <i className="fas fa-phone text-[#004643] w-4 text-center" />
                  <span>+1 (555) 123-4567</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-[#666] hover:text-[#004643] transition-colors"
                >
                  <i className="fas fa-map-marker-alt text-[#004643] w-4 text-center" />
                  <span>San Francisco, CA</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#e8e8e8] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#999]">
            &copy; {currentYear} 7pexel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-xs text-[#999] hover:text-[#004643] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-xs text-[#999] hover:text-[#004643] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-[#999] hover:text-[#004643] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#999] hover:text-[#004643] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}