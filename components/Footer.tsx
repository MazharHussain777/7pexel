// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] pt-10 pb-10 mt-5">
      <div className="wrap flex justify-between items-center flex-wrap gap-4 text-[0.8rem] text-[var(--color-ink-soft)]">
        <span>© 2026 7pexel — device intelligence, decoded.</span>
        <div className="flex gap-5.5 font-medium">
          {["Reviews", "Guides", "News", "Contact"].map((item) => (
            <Link key={item} href="#" className="opacity-75 hover:opacity-100 hover:text-[var(--color-green)] transition-opacity duration-200">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}