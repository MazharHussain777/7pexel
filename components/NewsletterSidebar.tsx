// components/NewsletterSidebar.tsx
"use client";

import { useState, useEffect } from "react";

interface NewsletterSidebarProps {
  className?: string;
  onSubscribe?: () => void;
}

export function NewsletterSidebar({ className = "", onSubscribe }: NewsletterSidebarProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem("7pexel_subscribed") === "true";
    setIsSubscribed(subscribed);
  }, []);

  if (isSubscribed) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      localStorage.setItem("7pexel_subscribed", "true");
      localStorage.setItem("7pexel_subscriber_email", email);
      setIsSubscribed(true);
      setSuccess(true);
      setEmail("");
      window.dispatchEvent(new Event("subscriptionChanged"));
      onSubscribe?.();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-[#f5ebd0]/30 rounded-[3px] p-5 border border-[rgba(127,1,31,0.06)] ${className}`}>
      <div className="text-center">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-2">
          <i className="fas fa-envelope text-[#7F011F] text-lg" />
        </div>
        <h4 className="text-base font-bold text-[#1a1a1a] font-['Poppins',sans-serif]">
          Subscribe
        </h4>
        <p className="text-xs text-[#666] mt-0.5">
          Get the latest tech news
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all bg-white text-sm text-[#1a1a1a] placeholder:text-[#999]"
            disabled={loading}
          />
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          {success && (
            <p className="text-xs text-emerald-600">✓ Subscribed!</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#7F011F] text-white text-sm font-medium transition-all hover:bg-[#a80a30] disabled:opacity-50"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}