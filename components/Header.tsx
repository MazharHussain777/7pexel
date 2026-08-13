// components/Header.tsx
"use client";

<<<<<<< HEAD
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogoIcon } from "./icons/LogoIcon";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"left" | "center" | "right">("center");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
=======
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface HeaderProps {
  className?: string;
}

const NAV_ITEMS = [
  { href: "/phone-finder", label: "Phone Finder" },
  { href: "/compare", label: "Compare" },
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
    checkSubscriptionStatus 
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

  // ---- Check subscription status on mount ----
  useEffect(() => {
    const checkStatus = async () => {
      setIsChecking(true);
      await checkSubscriptionStatus();
      setIsChecking(false);
    };
    checkStatus();
  }, [checkSubscriptionStatus]);

  // ---- Click outside dropdown ----
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
        setUnsubscribeStep("idle");
        setUnsubscribeSuccess(false);
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

<<<<<<< HEAD
  // Calculate dropdown position on open
  useEffect(() => {
    if (openDropdown && navRefs.current[openDropdown]) {
      const navElement = navRefs.current[openDropdown];
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        const dropdownWidth = 600; // Approximate dropdown width
        const viewportWidth = window.innerWidth;
        
        // Calculate available space
        const spaceLeft = rect.left;
        const spaceRight = viewportWidth - rect.right;
        const centerOffset = rect.left + rect.width / 2 - dropdownWidth / 2;
        
        // Determine best alignment
        if (spaceLeft < 100 && spaceRight < 100) {
          setDropdownPosition("center");
        } else if (spaceLeft < 100) {
          setDropdownPosition("left");
        } else if (spaceRight < 100) {
          setDropdownPosition("right");
        } else {
          // Prefer center, but check if it fits
          if (centerOffset < 20) {
            setDropdownPosition("left");
          } else if (centerOffset + dropdownWidth > viewportWidth - 20) {
            setDropdownPosition("right");
          } else {
            setDropdownPosition("center");
          }
        }
      }
    }
  }, [openDropdown]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      if (openDropdown) {
        const navElement = navRefs.current[openDropdown];
        if (navElement) {
          const rect = navElement.getBoundingClientRect();
          const dropdownWidth = 600;
          const viewportWidth = window.innerWidth;
          const centerOffset = rect.left + rect.width / 2 - dropdownWidth / 2;
          
          if (centerOffset < 20) {
            setDropdownPosition("left");
          } else if (centerOffset + dropdownWidth > viewportWidth - 20) {
            setDropdownPosition("right");
          } else {
            setDropdownPosition("center");
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openDropdown]);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  // Dropdown data - removed all icons
  const electronicsDropdown: DropdownSection[] = [
    {
      title: "Categories",
      items: [
        { label: "All Electronics", href: "/electronics" },
        { label: "Phones", href: "/phones" },
        { label: "Laptops", href: "/laptops" },
        { label: "Watches", href: "/watches" },
        { label: "Audio", href: "/audio" },
        { label: "Cameras", href: "/cameras" },
        { label: "Gaming", href: "/gaming" },
      ],
    },
    {
      title: "Popular Brands",
      items: [
        { label: "Apple", href: "/brands/apple" },
        { label: "Samsung", href: "/brands/samsung" },
        { label: "Sony", href: "/brands/sony" },
        { label: "Dell", href: "/brands/dell" },
        { label: "Google", href: "/brands/google" },
      ],
    },
  ];

  const autoDropdown: DropdownSection[] = [
    {
      title: "Auto & Vehicles",
      items: [
        { label: "All Auto", href: "/auto" },
        { label: "Electric Vehicles", href: "/auto/electric" },
        { label: "Hybrid Vehicles", href: "/auto/hybrid" },
        { label: "SUVs", href: "/auto/suv" },
        { label: "Sedans", href: "/auto/sedan" },
        { label: "Trucks", href: "/auto/trucks" },
        { label: "Motorcycles", href: "/auto/motorcycles" },
      ],
    },
    {
      title: "Auto News & Reviews",
      items: [
        { label: "Auto News", href: "/auto/news" },
        { label: "Car Reviews", href: "/auto/reviews" },
        { label: "Comparisons", href: "/auto/compare" },
        { label: "Buying Guides", href: "/auto/guides" },
        { label: "Upcoming Models", href: "/auto/upcoming" },
      ],
    },
  ];

  // Nav items - Blog and Compare links removed, Compare button stays
  const navItems = [
    { label: "Phones", href: "/phones" },
    { label: "Laptops", href: "/laptops" },
    { 
      label: "Electronics", 
      href: "/electronics",
      dropdown: electronicsDropdown,
      isDropdown: true,
    },
    { 
      label: "Auto", 
      href: "/auto",
      dropdown: autoDropdown,
      isDropdown: true,
    },
    { label: "Technology", href: "/technology" },
    { label: "News", href: "/news" },
    { label: "Reviews", href: "/reviews" },
    { label: "Guides", href: "/guides" },
  ];

  // Refined color palette based on #063F47
  const colors = {
    primary: "#063F47",
    primaryLight: "#0A5A64",
    primaryLighter: "#E8F0F1",
    primaryDark: "#042A30",
    primaryGradient: "linear-gradient(135deg, #063F47 0%, #0A5A64 50%, #063F47 100%)",
    primarySubtle: "rgba(6, 63, 71, 0.06)",
    primaryHover: "rgba(6, 63, 71, 0.1)",
    primaryGlow: "rgba(6, 63, 71, 0.15)",
    textDark: "#1A2A2E",
    textSoft: "#4A5A5E",
    textMuted: "#8A9A9E",
    borderLight: "rgba(6, 63, 71, 0.08)",
    borderMedium: "rgba(6, 63, 71, 0.12)",
  };

  // Get dropdown alignment class
  const getDropdownAlignment = () => {
    switch (dropdownPosition) {
      case "left":
        return "left-0 translate-x-0";
      case "right":
        return "right-0 translate-x-0";
      default:
        return "left-1/2 -translate-x-1/2";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-[20px] saturate-[140%] border-b" style={{ borderColor: colors.borderLight }}>
      <div className="flex items-center justify-between px-10 py-3.5 max-w-[1280px] mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <LogoIcon className="w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col leading-none">
            <span 
              className="font-fraunces font-bold text-[1.35rem] tracking-[-0.02em] transition-colors duration-300"
              style={{ color: colors.primary }}
            >
              7pexel
            </span>
            <span 
              className="font-jetbrains-mono text-[0.55rem] tracking-[0.2em] uppercase mt-0.5"
              style={{ color: colors.textMuted }}
            >
              Tech &amp; Electronics
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex gap-7 text-[0.85rem] font-medium" ref={dropdownRef}>
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative nav-item-wrapper"
              ref={(el) => {
                if (item.isDropdown) {
                  navRefs.current[item.label] = el;
                }
              }}
              onMouseEnter={() => item.isDropdown && handleMouseEnter(item.label)}
              onMouseLeave={item.isDropdown ? handleMouseLeave : undefined}
            >
              <Link
                href={item.href}
                className={`relative nav-link transition-all duration-200 flex items-center gap-1 ${
                  openDropdown === item.label ? "active" : ""
                }`}
                style={{ 
                  color: openDropdown === item.label ? colors.primary : colors.textDark,
                  opacity: openDropdown === item.label ? 1 : 0.75,
                }}
              >
                {item.label}
                {item.isDropdown && (
                  <svg
                    className={`w-3 h-3 transition-all duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    style={{ 
                      stroke: openDropdown === item.label ? colors.primary : colors.textMuted,
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu with smart positioning */}
              {item.isDropdown && openDropdown === item.label && item.dropdown && (
                <div
                  className={`absolute top-full mt-2.5 bg-white rounded-2xl shadow-[0_20px_60px_rgba(6,63,71,0.12)] border min-w-[600px] p-6 animate-dropdown ${getDropdownAlignment()}`}
                  style={{ 
                    borderColor: colors.borderLight,
                    maxWidth: `min(600px, calc(100vw - 40px))`,
                  }}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Subtle decorative line */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                    style={{ background: colors.primaryGradient }}
                  />
                  
                  <div className="grid grid-cols-2 gap-8 pt-1">
                    {item.dropdown.map((section) => (
                      <div key={section.title}>
                        <h4 
                          className="text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-3"
                          style={{ color: colors.textMuted }}
                        >
                          {section.title}
                        </h4>
                        <div className="space-y-0.5">
                          {section.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="dropdown-item group relative px-3.5 py-2.5 rounded-xl transition-all duration-200 block"
                              onMouseEnter={() => setHoveredItem(subItem.label)}
                              onMouseLeave={() => setHoveredItem(null)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="dropdown-item-text text-[0.85rem] font-medium transition-colors duration-200">
                                  {subItem.label}
                                </span>
                                {hoveredItem === subItem.label && (
                                  <span 
                                    className="text-xs font-medium transition-all duration-300"
                                    style={{ color: colors.primary }}
                                  >
                                    →
                                  </span>
                                )}
                              </div>
                              {subItem.description && (
                                <div 
                                  className="text-[0.65rem] mt-0.5"
                                  style={{ color: colors.textMuted }}
                                >
                                  {subItem.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: colors.borderLight }}>
                    <span className="text-[0.6rem] font-medium" style={{ color: colors.textMuted }}>
                      {item.label === "Electronics" ? "Browse all electronics categories" : "Explore all vehicles"}
                    </span>
                    <Link
                      href={item.href}
                      className="text-[0.7rem] font-semibold transition-all duration-200 flex items-center gap-1.5 group/link"
                      style={{ color: colors.primary }}
                    >
                      View All
                      <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Compare Button - Keep this */}
        <Link
          href="/compare"
          className="hidden md:block px-6 py-2.5 rounded-full text-[0.82rem] font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] compare-btn"
          style={{ 
            background: colors.primaryGradient,
            boxShadow: `0 2px 12px ${colors.primaryGlow}`,
          }}
        >
          Compare Now
        </Link>
      </div>

      {/* Mobile Navigation - Blog and Compare removed from here too */}
      <div className="md:hidden px-4 py-2.5 border-t overflow-x-auto" style={{ borderColor: colors.borderLight }}>
        <div className="flex gap-5 text-[0.78rem] font-medium whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors duration-200 hover:opacity-100"
              style={{ color: colors.textDark, opacity: 0.75 }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: top center;
        }

        /* For left-aligned dropdowns */
        .left-0.animate-dropdown {
          transform-origin: top left;
        }
        .left-0.animate-dropdown.from {
          transform: translateY(-8px) scale(0.97);
        }
        .left-0.animate-dropdown.to {
          transform: translateY(0) scale(1);
        }

        /* For right-aligned dropdowns */
        .right-0.animate-dropdown {
          transform-origin: top right;
        }

        /* Navigation link underline */
        .nav-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 0;
          height: 2px;
          background: ${colors.primaryGradient};
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link:hover::after {
          width: 70%;
        }
        .nav-link.active::after {
          width: 70%;
          opacity: 1;
        }

        /* Dropdown item styles */
        .dropdown-item {
          position: relative;
        }
        .dropdown-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 0;
          background: ${colors.primaryGradient};
          border-radius: 2px;
          transition: height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .dropdown-item:hover::before {
          height: 60%;
        }
        .dropdown-item:hover {
          background-color: ${colors.primarySubtle};
        }
        .dropdown-item:hover .dropdown-item-text {
          color: ${colors.primary};
        }

        /* Compare button */
        .compare-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(6, 63, 71, 0.25);
        }
        .compare-btn:active {
          transform: translateY(0px);
        }
      `}</style>
    </header>
=======
  // ---- Search ----
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
                const isActive = pathname === item.href;
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
              const isActive = pathname === item.href;
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
>>>>>>> 4342b619607c12c626558131bb24b975ec2918e6
  );
}