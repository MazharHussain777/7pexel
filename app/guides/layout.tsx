// app/guides/layout.tsx
import { Metadata } from "next";
import { ReactNode } from "react";

interface GuidesLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
  description: "Expert smartphone guides covering buying advice, camera tips, battery life, performance, security, and more.",
};

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {children}
    </div>
  );
}