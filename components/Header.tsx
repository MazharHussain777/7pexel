// components/Header.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "fa-house" },
  { href: "/news", label: "News", icon: "fa-newspaper" },
  { href: "/phone-finder", label: "Phone Finder", icon: "fa-mobile-screen" },
  { href: "/reviews", label: "Reviews", icon: "fa-star" },
];

export function Header({ className = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { isSubscribed, subscriberEmail, subscribe, unsubscribe } = useSubscription();
  const pathname = usePathname();

  // ---- Sliding nav indicator ----
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);

  const moveIndicatorTo = useCallback((index: number) => {
    const el = linkRefs.current[index];
    const container = navRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) return;
    if (activeIndex !== -1) {
      // slight delay so refs are mounted on first paint
      requestAnimationFrame(() => moveIndicatorTo(activeIndex));
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname, activeIndex, hoveredIndex, moveIndicatorTo]);

  const handleNavEnter = (index: number) => {
    setHoveredIndex(index);
    moveIndicatorTo(index);
  };

  const handleNavLeave = () => {
    setHoveredIndex(null);
    if (activeIndex !== -1) {
      moveIndicatorTo(activeIndex);
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // ---- Scroll effect ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      subscribe(email);
      setShowSubscribePopup(false);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(127,1,31,0.08)] border-b border-[rgba(127,1,31,0.06)]"
            : "bg-white border-b border-transparent"
        } ${className}`}
      >
        {/* top accent line */}
        <div
          className={`h-[2px] w-full bg-gradient-to-r from-[#7F011F] via-[#c2183f] to-[#7F011F] bg-[length:200%_100%] transition-opacity duration-500 ${
            scrolled ? "opacity-100 animate-[gradient-shift_6s_linear_infinite]" : "opacity-0"
          }`}
        />

        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              onClick={closeMenu}
            >
              <div className="relative w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#7F011F] to-[#a80a30] flex items-center justify-center shadow-md shadow-[#7F011F]/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-4deg]">
                <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <span className="relative text-white text-sm md:text-base font-bold font-['Poppins',sans-serif]">
                  7P
                </span>
              </div>
              <span className="text-lg md:text-xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif] tracking-[-0.3px]">
                7pexel
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav
              ref={navRef}
              onMouseLeave={handleNavLeave}
              className="hidden md:flex items-center gap-1 relative"
              aria-label="Main navigation"
            >
              {/* sliding indicator */}
              <span
                className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-gradient-to-r from-[#7F011F] to-[#a80a30] shadow-sm shadow-[#7F011F]/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
              />

              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                const isHighlighted = hoveredIndex === i || (hoveredIndex === null && isActive);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    onMouseEnter={() => handleNavEnter(i)}
                    className={`relative z-10 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isHighlighted ? "text-white" : "text-[#555] hover:text-[#7F011F]"
                    }`}
                  >
                    <i className={`fas ${item.icon} text-[11px] opacity-80`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Subscription Status - Desktop */}
              {isSubscribed ? (
                <div className="hidden md:flex items-center gap-2 group relative">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#555] bg-[#f5ebd0] rounded-full border border-[rgba(127,1,31,0.06)]">
                    <i className="fas fa-check-circle text-[#00A86B] text-xs" />
                    <span className="font-medium">Subscribed</span>
                  </span>
                  <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-xl shadow-xl border border-[rgba(127,1,31,0.06)] p-3 min-w-[200px] z-10">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-envelope text-[#7F011F] text-xs" />
                      <span className="text-xs text-[#555] font-medium truncate max-w-[150px]">
                        {subscriberEmail || "subscribed@7pexel.com"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        unsubscribe();
                        closeMenu();
                      }}
                      className="mt-2 text-xs text-[#999] hover:text-[#7F011F] transition-colors w-full text-left"
                    >
                      <i className="fas fa-sign-out-alt mr-1" />
                      Unsubscribe
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowSubscribePopup(true)}
                  className="hidden md:flex relative items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-white bg-[#7F011F] rounded-full hover:bg-[#a80a30] transition-all shadow-sm shadow-[#7F011F]/20 overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <i className="fas fa-envelope text-xs relative" />
                  <span className="relative">Subscribe</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden w-9 h-9 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-[#1a1a1a] rounded-full transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-[#1a1a1a] rounded-full transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-[#1a1a1a] rounded-full transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-14 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ zIndex: 49 }}
        >
          <nav className="flex flex-col p-4 gap-0.5" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#7F011F] to-[#a80a30] shadow-sm shadow-[#7F011F]/20"
                      : "text-[#1a1a1a] hover:text-[#7F011F] hover:bg-[#7F011F]/5"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : "0ms" }}
                  onClick={closeMenu}
                >
                  <i className={`fas ${item.icon} text-sm ${isActive ? "" : "opacity-60"}`} />
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t border-gray-100 my-3" />

            {isSubscribed ? (
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-[#555] flex items-center gap-1.5">
                  <i className="fas fa-check-circle text-[#00A86B]" />
                  Subscribed
                </span>
                <button
                  onClick={() => {
                    unsubscribe();
                    closeMenu();
                  }}
                  className="text-xs text-[#999] hover:text-[#7F011F] transition-colors"
                >
                  <i className="fas fa-sign-out-alt mr-1" />
                  Unsubscribe
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSubscribePopup(true);
                  closeMenu();
                }}
                className="mx-4 py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-[#7F011F] to-[#a80a30] rounded-xl hover:opacity-90 transition-opacity"
              >
                <i className="fas fa-envelope mr-2" />
                Subscribe to Newsletter
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Subscribe Popup */}
      {showSubscribePopup && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowSubscribePopup(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
            <div
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSubscribePopup(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times" />
              </button>

              <div className="p-6 pt-8">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-3">
                    <i className="fas fa-envelope text-2xl text-[#7F011F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
                    Subscribe to 7pexel
                  </h3>
                  <p className="text-sm text-[#666] mt-1">
                    Get the latest tech news, reviews, and insights delivered to your inbox
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="mt-5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-sm text-[#1a1a1a] placeholder:text-[#999]"
                    disabled={loading}
                  />
                  {error && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle" />
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3 rounded-xl bg-[#7F011F] text-white font-medium text-sm transition-all hover:bg-[#a80a30] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fas fa-spinner fa-spin" />
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-[#999] text-center mt-3">
                  <i className="fas fa-lock mr-1" />
                  No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-95 {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-in {
          animation-duration: 200ms;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
      `}</style>
    </>
  );
}