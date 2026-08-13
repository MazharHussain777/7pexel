// components/Newsletter.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useNewsletter } from "@/contexts/NewsletterContext";

export function Newsletter() {
  const { 
    isSubscribed, 
    setIsSubscribed, 
    showNewsletter, 
    setShowNewsletter,
    email,
    setEmail,
    checkSubscription 
  } = useNewsletter();
  
  const [inputEmail, setInputEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user already subscribed
  useEffect(() => {
    const savedEmail = localStorage.getItem('subscribedEmail');
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    const dismissed = localStorage.getItem('newsletterDismissed') === 'true';
    
    if (subscribed && savedEmail) {
      setIsSubscribed(true);
      setIsVisible(false);
      setShowNewsletter(false);
    }
    
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
    }
    
    if (savedEmail && !subscribed) {
      checkSubscription(savedEmail);
    }
  }, []);

  // Hide newsletter if already subscribed
  useEffect(() => {
    if (isSubscribed) {
      setIsVisible(false);
      setShowNewsletter(false);
      localStorage.setItem('isSubscribed', 'true');
    }
  }, [isSubscribed]);

  // Auto-dismiss success message
  useEffect(() => {
    if (status === "success") {
      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
        setMessage("");
        // Hide newsletter after success
        setIsVisible(false);
        setIsDismissed(true);
        localStorage.setItem('newsletterDismissed', 'true');
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = inputEmail.trim();
    
    // Client-side validation
    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address (e.g., name@domain.com)");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: trimmedEmail, 
          source: "homepage-newsletter" 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "🎉 You're subscribed!");
        setEmail(trimmedEmail);
        setIsSubscribed(true);
        setShowNewsletter(false);
        setInputEmail("");
        
        // Save to localStorage
        localStorage.setItem('subscribedEmail', trimmedEmail);
        localStorage.setItem('isSubscribed', 'true');
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('newsletterDismissed', 'true');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleDismiss();
    }
  };

  // Don't render if user is subscribed or manually hidden
  if (!isVisible || !showNewsletter || isSubscribed || isDismissed) {
    return null;
  }

  return (
    <section 
      className="bg-gradient-to-br from-[var(--color-green-deep)] to-[var(--color-green)] rounded-[20px] p-10 md:p-12 my-6 text-white relative overflow-hidden"
      role="complementary"
      aria-label="Newsletter subscription"
      onKeyDown={handleKeyDown}
    >
      <div className="absolute w-[300px] h-[300px] rounded-full bg-white/5 -top-[80px] -right-[60px] pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-white/4 -bottom-[60px] -left-[40px] pointer-events-none" />
      
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Close newsletter"
        tabIndex={0}
      >
        ✕
      </button>
      
      <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
        <div className="flex-1 min-w-[200px]">
          <span className="inline-block font-jetbrains-mono text-[0.6rem] tracking-[0.08em] uppercase bg-white/15 px-3 py-0.75 rounded-full font-semibold mb-2.5">
            📬 Stay ahead
          </span>
          <h3 className="font-fraunces font-medium text-[1.6rem] leading-[1.3] mb-1">Subscribe to the 7pexel weekly</h3>
          <p className="text-[0.9rem] opacity-80 leading-[1.6] max-w-[440px]">
            Get the week's top tech stories, hands-on reviews and industry insights — delivered fresh every Monday.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2.5 flex-wrap relative z-10 flex-shrink-0 w-full md:w-auto">
          <div className="flex-1 min-w-[200px] md:min-w-[240px]">
            <input
              ref={inputRef}
              type="email"
              value={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
                if (status === "error" || status === "success") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              placeholder="Enter your email address"
              className={`w-full px-5 py-3.5 rounded-full border-none font-poppins text-[0.9rem] bg-white/92 text-[var(--color-ink)] outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.3)] ${
                status === "error" ? "ring-2 ring-red-400" : ""
              } ${status === "success" ? "ring-2 ring-[#D4F26B]" : ""}`}
              disabled={status === "loading" || status === "success"}
              required
              aria-invalid={status === "error"}
              aria-describedby={message ? "newsletter-message" : undefined}
            />
            {message && (
              <p 
                id="newsletter-message"
                className={`text-[0.7rem] mt-1.5 font-medium ${
                  status === "error" ? "text-red-300" : "text-[#D4F26B]"
                }`}
                role="alert"
              >
                {message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`px-8 py-3.5 rounded-full font-bold text-[0.9rem] transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
              status === "loading"
                ? "bg-white/50 text-[var(--color-green-deep)] cursor-not-allowed"
                : status === "success"
                ? "bg-[#D4F26B] text-[var(--color-green-deep)] cursor-default"
                : "bg-white text-[var(--color-green-deep)] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50"
            }`}
          >
            {status === "loading" && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {status === "loading" && "Subscribing..."}
            {status === "success" && "✓ Subscribed!"}
            {status === "idle" && (
              <>
                Subscribe
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}