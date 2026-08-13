// app/news/page.tsx
import { Metadata } from "next";
import { NewsClient } from "./NewsClient";

export const metadata: Metadata = {
  title: "Latest Tech News — 7pexel",
  description: "Stay updated with the latest technology news, smartphone launches, laptop reviews, AI breakthroughs, and gadget announcements.",
  openGraph: {
    title: "Latest Tech News — 7pexel",
    description: "Stay updated with the latest technology news.",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}