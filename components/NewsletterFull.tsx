// components/NewsletterFull.tsx
"use client";

import { useState } from "react";
import { useSubscription } from "@/contexts/SubscriptionContext";

export function NewsletterFull() {
  const { isSubscribed, subscribe } = useSubscription();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If subscribed, hide the entire component - returns nothing
  if (isSubscribed) {
    return null;
  }

  const handleSubscribe = async (e: React.FormEvent) => {
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
      subscribe(email);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Full newsletter form - only shown when NOT subscribed
  return (
    <div className="bg-gradient-to-r from-[#7F011F]/5 via-[#a80a30]/5 to-[#f5ebd0]/30 rounded-3xl p-8 md:p-12 border border-[rgba(127,1,31,0.06)]">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#7F011F]/10 flex items-center justify-center mb-4">
          <i className="fas fa-envelope text-2xl text-[#7F011F]" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-[#2d1a1a] font-['Poppins',sans-serif]">
          Stay Ahead in Tech
        </h3>
        <p className="text-[#6d4a4a] mt-2 text-sm md:text-base max-w-lg mx-auto">
          Subscribe to our newsletter and get the latest tech news, reviews, and insights delivered to your inbox weekly.
        </p>

        {success ? (
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-700 flex items-center gap-3 justify-center">
            <i className="fas fa-check-circle text-emerald-500" />
            <span>Subscribed successfully! Check your email.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-[rgba(127,1,31,0.1)] focus:border-[#7F011F] focus:shadow-[0_0_0_3px_rgba(127,1,31,0.08)] outline-none transition-all text-[#2d1a1a] placeholder:text-[#6d4a4a]/50 font-['Poppins',sans-serif]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#7F011F] text-white font-medium text-sm transition-all hover:bg-[#a80a30] hover:shadow-lg hover:shadow-[#7F011F]/30 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="fas fa-spinner fa-spin" />
                  Subscribing...
                </span>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2" />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}

        {error && (
          <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
            <i className="fas fa-exclamation-circle" />
            {error}
          </p>
        )}

        <p className="text-[10px] text-[#6d4a4a]/60 mt-3 flex items-center justify-center gap-1">
          <i className="fas fa-lock text-[8px]" />
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}