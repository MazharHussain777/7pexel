// lib/analytics/index.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function trackPageView(url: string, title: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: url,
      send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    });
  }
  
  // Also push to dataLayer for GTM
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page: {
        url,
        title,
      },
    });
  }
}

export function trackEvent(action: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
  
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "custom_event",
      action,
      ...params,
    });
  }
}

export function trackSearch(query: string, results: number) {
  trackEvent("search", { query, results });
}

export function trackArticleRead(slug: string, title: string, category: string) {
  trackEvent("article_read", { slug, title, category });
}

export function trackArticleShare(slug: string, title: string, platform: string) {
  trackEvent("article_share", { slug, title, platform });
}