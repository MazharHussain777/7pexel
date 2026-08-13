// components/Header.tsx
"use client";

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  );
}