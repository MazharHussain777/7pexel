// components/phones/PhonesHeader.tsx
"use client";

import Link from "next/link";
import { LogoIcon } from "@/components/icons/LogoIcon";

export function PhonesHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-[14px] saturate-[140%] border-b border-[var(--color-line)]">
      <div className="flex items-center justify-between px-10 py-4 max-w-[1280px] mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon className="w-10 h-10 flex-shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="font-fraunces font-bold text-[1.32rem] tracking-[-0.02em]">7pexel</span>
            <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.16em] uppercase text-[var(--color-ink-soft)] mt-0.5">Tech &amp; Electronics</span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-8 text-[0.86rem] font-medium">
          {["Phones", "Laptops", "Electronics", "Technology", "Blog", "Compare"].map((item) => (
            <Link
              key={item}
              href={item === "Phones" ? "/phones" : "#"}
              className={`relative opacity-72 hover:opacity-100 transition-opacity duration-200 after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[1.5px] after:bg-[var(--color-green)] after:transition-[width] after:duration-300 hover:after:w-full ${
                item === "Phones" ? "opacity-100 text-[var(--color-green)] after:w-full" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link
          href="#"
          className="hidden md:block px-5 py-2.5 border-[1.5px] border-[var(--color-ink)] rounded-full text-[0.82rem] font-semibold transition-all duration-200 hover:bg-[var(--color-ink)] hover:text-white"
        >
          Compare Now
        </Link>
      </div>
    </header>
  );
}