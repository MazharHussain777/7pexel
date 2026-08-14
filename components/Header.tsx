// components/Header.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS = [
  { href: "/phones", label: "Phones" },
  { href: "/laptops", label: "Laptops" },
  { href: "/technology", label: "Technology" }, // ✅ ADDED
  { href: "/news", label: "News" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
];

export function Header({ className = "" }: HeaderProps) {
  const router = useRouter();
  const {
    isSubscribed,
    subscriberEmail,
    subscribe,
    unsubscribe,
    isLoading,
    error,
    clearError,
    checkSubscriptionStatus,
  } = useSubscription();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [email, setEmail] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [unsubscribeStep, setUnsubscribeStep] = useState<"idle" | "confirm" | "final">("idle");
  const [unsubscribeSuccess, setUnsubscribeSuccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Check subscription status on mount
  useEffect(() => {
    const checkStatus = async () => {
      setIsChecking(true);
      await checkSubscriptionStatus();
      setIsChecking(false);
    };
    checkStatus();
  }, [checkSubscriptionStatus]);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
        setUnsubscribeStep("idle");
        setUnsubscribeSuccess(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/phone-finder?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      closeMenu();
    }
  };

  // Scroll effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setSubscribeSuccess(false);

    if (!agreedToTerms) {
      setLocalError("Please agree to the Privacy Policy and Terms of Service");
      return;
    }

    if (!email || !email.includes("@")) {
      setLocalError("Please enter a valid email");
      return;
    }

    setLocalLoading(true);

    try {
      const result = await subscribe(email);
      if (result.success) {
        setSubscribeSuccess(true);
        setEmail("");
        setAgreedToTerms(false);
        setShowSubscribePopup(false);
        setTimeout(() => setSubscribeSuccess(false), 3000);
      } else {
        setLocalError(result.message || "Failed to subscribe");
      }
    } catch (err: any) {
      setLocalError(err.message || "Something went wrong");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (unsubscribeStep === "idle") {
      setUnsubscribeStep("confirm");
    } else if (unsubscribeStep === "confirm") {
      setUnsubscribeStep("final");
      setUnsubscribeSuccess(false);

      try {
        const result = await unsubscribe();
        if (result.success) {
          setUnsubscribeSuccess(true);
          setTimeout(() => {
            setShowUserDropdown(false);
            setUnsubscribeStep("idle");
            setUnsubscribeSuccess(false);
          }, 2000);
        } else {
          setUnsubscribeStep("idle");
          setLocalError(result.message || "Failed to unsubscribe");
        }
      } catch (err: any) {
        setUnsubscribeStep("idle");
        setLocalError(err.message || "Failed to unsubscribe");
      }
    }
  };

  const resetUnsubscribe = () => {
    setUnsubscribeStep("idle");
    setUnsubscribeSuccess(false);
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

  const getAvatarLetter = () => {
    if (!subscriberEmail) return "?";
    return subscriberEmail.charAt(0).toUpperCase();
  };

  useEffect(() => {
    if (unsubscribeStep === "final" && unsubscribeSuccess) {
      const timer = setTimeout(() => {
        setShowUserDropdown(false);
        setUnsubscribeStep("idle");
        setUnsubscribeSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [unsubscribeStep, unsubscribeSuccess]);

  useEffect(() => {
    if (!showSubscribePopup) {
      setAgreedToTerms(false);
    }
  }, [showSubscribePopup]);

  // Show loading state while checking subscription
  if (isChecking) {
    return (
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b border-[#e8e8e8] ${className}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-lg bg-[#004643] flex items-center justify-center">
                <span className="relative text-white text-base md:text-lg font-bold font-['Poppins',sans-serif] tracking-tight">7P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif] tracking-[-0.5px] leading-none">7pexel</span>
              </div>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#e8e8e8]"
            : "bg-white border-b border-[#e8e8e8]"
        } ${className}`}
      >
        {/* Top accent line */}
        <div
          className={`h-0.5 w-full bg-[#004643] transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-100"
          }`}
        />

        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              onClick={closeMenu}
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-lg">
                <Image
                  src="/7pexel.jpeg"
                  alt="7pexel"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </Link>

            {/* Navigation - Centered */}
            <nav
              className="hidden md:flex items-center gap-8 flex-1 justify-center"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center gap-2 py-1 group px-1"
                  >
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-[#004643]"
                          : "text-[#666] hover:text-[#004643]"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Top-right corner indicator with glow */}
                    <span className="relative">
                      <span
                        className={`absolute -top-2 -right-2 w-2 h-2 rounded-full bg-[#004643] transition-all duration-300 ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-75"
                        }`}
                      />
                      {/* Glow effect on active */}
                      {isActive && (
                        <span className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-[#004643]/20 animate-pulse" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center bg-[#f5f5f5] rounded-full px-4 py-2 border border-transparent focus-within:border-[#004643] focus-within:bg-white transition-all duration-300">
                <i className="fas fa-search text-[#999] text-xs mr-3" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch(e);
                    }
                  }}
                  className="bg-transparent border-none outline-none text-sm text-[#1a1a1a] placeholder:text-[#999] w-32 lg:w-40 xl:w-52 font-['Poppins',sans-serif]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[#999] hover:text-[#555] transition-colors ml-2"
                  >
                    <i className="fas fa-times text-xs" />
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={handleSearch}
                    className="ml-2 bg-[#004643] text-white text-xs px-4 py-1.5 rounded-full hover:bg-[#003a33] transition-colors"
                  >
                    <i className="fas fa-arrow-right mr-1" />
                    Go
                  </button>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden w-10 h-10 rounded-lg hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#555]"
                aria-label="Toggle search"
              >
                <i className="fas fa-search text-lg" />
              </button>

              {/* Subscribe / Avatar Button */}
              {isSubscribed && subscriberEmail ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => {
                      setShowUserDropdown(!showUserDropdown);
                      setUnsubscribeStep("idle");
                      setUnsubscribeSuccess(false);
                    }}
                    className="w-10 h-10 rounded-full bg-[#004643] text-white font-bold text-base flex items-center justify-center hover:bg-[#003a33] transition-colors focus:outline-none"
                    aria-label="User menu"
                  >
                    {getAvatarLetter()}
                  </button>

                  {/* Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-[#e8e8e8] overflow-hidden max-h-[500px] overflow-y-auto">
                      {unsubscribeStep === "idle" ? (
                        <>
                          <div className="px-5 py-4 bg-[#f8f8f8] border-b border-[#e8e8e8]">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-[#004643] text-white font-bold text-xl flex items-center justify-center flex-shrink-0">
                                {getAvatarLetter()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-[#1a1a1a] truncate">
                                  {subscriberEmail}
                                </div>
                                <div className="text-xs text-[#004643] font-medium flex items-center gap-1">
                                  <i className="fas fa-check-circle text-[#00A86B] text-[10px]" />
                                  Subscribed
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="px-5 py-4 space-y-3">
                            <div className="text-xs text-[#666] leading-relaxed space-y-2">
                              <p>
                                <i className="fas fa-shield-alt text-[#004643] mr-2" />
                                We respect your privacy. Your email is safe with us.
                              </p>
                              <p>
                                <i className="fas fa-envelope text-[#004643] mr-2" />
                                You'll receive updates about:
                              </p>
                              <ul className="list-disc list-inside text-[#666] space-y-0.5 ml-4 text-[11px]">
                                <li>New tech reviews & comparisons</li>
                                <li>Exclusive deals & affiliate offers</li>
                                <li>Industry news & insights</li>
                                <li>Product announcements & updates</li>
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-[#e8e8e8]">
                              <button
                                onClick={() => setUnsubscribeStep("confirm")}
                                className="w-full text-center text-sm text-red-500 hover:text-red-600 font-medium transition-colors py-2.5 rounded-lg hover:bg-red-50"
                              >
                                <i className="fas fa-sign-out-alt mr-2" />
                                Unsubscribe
                              </button>
                            </div>
                          </div>
                        </>
                      ) : unsubscribeStep === "confirm" ? (
                        <>
                          <div className="px-5 py-6 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-4">
                              <i className="fas fa-exclamation-triangle text-2xl text-red-500" />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
                              Unsubscribe?
                            </h4>
                            <p className="text-sm text-[#666] mt-2 leading-relaxed">
                              You will no longer receive any emails from 7pexel.
                            </p>
                            <p className="text-xs text-[#999] mt-3">
                              This action cannot be undone.
                            </p>
                          </div>

                          <div className="px-5 pb-5 flex gap-3">
                            <button
                              onClick={resetUnsubscribe}
                              className="flex-1 py-2.5 rounded-lg border border-[#e8e8e8] text-sm font-medium text-[#555] hover:bg-[#f5f5f5] transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUnsubscribe}
                              disabled={isLoading}
                              className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <i className="fas fa-spinner fa-spin" />
                                  Unsubscribing...
                                </span>
                              ) : (
                                "Yes, Unsubscribe"
                              )}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-5 py-8 text-center">
                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${unsubscribeSuccess ? 'bg-emerald-50' : 'bg-red-50'}`}>
                              <i className={`${unsubscribeSuccess ? 'fas fa-check-circle text-emerald-500' : 'fas fa-exclamation-circle text-red-500'} text-3xl`} />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
                              {unsubscribeSuccess ? "Unsubscribed Successfully" : "Unsubscribe Failed"}
                            </h4>
                            <p className="text-sm text-[#666] mt-2 leading-relaxed">
                              {unsubscribeSuccess
                                ? "You have been unsubscribed from 7pexel newsletter."
                                : "There was an error processing your request. Please try again."
                              }
                            </p>
                            {!unsubscribeSuccess && (
                              <button
                                onClick={() => {
                                  setUnsubscribeStep("idle");
                                  setUnsubscribeSuccess(false);
                                }}
                                className="mt-4 text-sm text-[#004643] hover:underline font-medium"
                              >
                                Try Again
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSubscribePopup(true);
                    setLocalError("");
                    setSubscribeSuccess(false);
                    setAgreedToTerms(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#004643] rounded-lg hover:bg-[#003a33] transition-colors"
                >
                  <i className="fas fa-envelope text-xs" />
                  Subscribe
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden w-10 h-10 rounded-lg hover:bg-[#f5f5f5] transition-colors flex items-center justify-center"
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

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="flex items-center bg-[#f5f5f5] rounded-xl px-4 py-2.5 border border-[#e8e8e8]">
              <i className="fas fa-search text-[#999] mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search phones by name, brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-[#1a1a1a] placeholder:text-[#999] font-['Poppins',sans-serif]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#999] hover:text-[#555] transition-colors mr-2"
                >
                  <i className="fas fa-times" />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#004643] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#003a33] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-[72px] bg-white transition-all duration-300 ${
            isMenuOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
          }`}
          style={{ zIndex: 49 }}
        >
          <nav className="flex flex-col p-6 gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-[#004643] bg-[#f5f5f5]"
                      : "text-[#1a1a1a] hover:bg-[#f5f5f5]"
                  }`}
                  onClick={closeMenu}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#004643]' : 'bg-transparent'}`} />
                  {item.label}
                </Link>
              );
            })}

            <div className="border-t border-[#e8e8e8] my-4" />

            {isSubscribed && subscriberEmail ? (
              <div className="px-4 py-3 flex items-center justify-between bg-[#f8f8f8] rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#004643] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {getAvatarLetter()}
                  </div>
                  <span className="text-sm font-medium text-[#555] truncate">
                    {subscriberEmail}
                  </span>
                </div>
                <button
                  onClick={async () => {
                    if (confirm("Are you sure you want to unsubscribe from 7pexel newsletter?")) {
                      const result = await unsubscribe();
                      if (result.success) {
                        closeMenu();
                      } else {
                        alert(result.message || "Failed to unsubscribe");
                      }
                    }
                  }}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors font-medium whitespace-nowrap ml-2"
                >
                  <i className="fas fa-sign-out-alt mr-1" />
                  Unsubscribe
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSubscribePopup(true);
                  setLocalError("");
                  setSubscribeSuccess(false);
                  setAgreedToTerms(false);
                  closeMenu();
                }}
                className="py-3 text-center text-sm font-medium text-white bg-[#004643] rounded-lg hover:bg-[#003a33] transition-colors"
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
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowSubscribePopup(false);
              setLocalError("");
              setAgreedToTerms(false);
            }}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowSubscribePopup(false);
                  setLocalError("");
                  setAgreedToTerms(false);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-lg hover:bg-[#f5f5f5] transition-colors flex items-center justify-center text-[#999] hover:text-[#555]"
              >
                <i className="fas fa-times" />
              </button>

              <div className="p-8 pt-10">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
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
                  <h3 className="text-2xl font-extrabold text-[#1a1a1a] font-['Poppins',sans-serif]">
                    Subscribe to <span className="text-[#004643]">7pexel</span>
                  </h3>
                  <p className="text-sm text-[#666] mt-2 leading-relaxed">
                    Get the latest tech news, reviews, and insights delivered to your inbox
                  </p>
                </div>

                {subscribeSuccess ? (
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-700 flex items-center gap-3 justify-center">
                    <i className="fas fa-check-circle text-emerald-500" />
                    <span>Subscribed successfully! Check your email.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-6">
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3.5 rounded-lg border-2 border-[#e8e8e8] focus:border-[#004643] outline-none transition-all text-sm text-[#1a1a1a] placeholder:text-[#999]"
                        disabled={localLoading}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-[#e8e8e8] text-[#004643] focus:ring-[#004643] focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-xs text-[#666] leading-relaxed">
                          I agree to the{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            className="text-[#004643] hover:underline font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Privacy Policy
                          </Link>
                          {" "}and{" "}
                          <Link
                            href="/terms"
                            target="_blank"
                            className="text-[#004643] hover:underline font-medium"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms of Service
                          </Link>
                          . I understand my email will only be used for newsletters and updates.
                        </span>
                      </label>
                    </div>

                    {(localError || error) && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                        <i className="fas fa-exclamation-circle" />
                        {localError || error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={localLoading || !agreedToTerms}
                      className={`w-full mt-4 py-3.5 rounded-lg text-white font-semibold text-sm transition-colors ${
                        localLoading || !agreedToTerms
                          ? "bg-[#999] cursor-not-allowed opacity-50"
                          : "bg-[#004643] hover:bg-[#003a33]"
                      }`}
                    >
                      {localLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="fas fa-spinner fa-spin" />
                          Subscribing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Subscribe Now
                          <i className="fas fa-arrow-right text-xs" />
                        </span>
                      )}
                    </button>
                  </form>
                )}

                <p className="text-[11px] text-[#999] text-center mt-4 flex items-center justify-center gap-1.5">
                  <i className="fas fa-lock text-[10px]" />
                  No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}