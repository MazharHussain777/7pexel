// contexts/SubscriptionContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriberEmail: string | null;
  isLoading: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<{ success: boolean; message?: string }>;
  unsubscribe: (email?: string) => Promise<{ success: boolean; message?: string }>;
  clearError: () => void;
  checkSubscriptionStatus: (email?: string) => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIBED_KEY = "7pexel_subscribed";
const SUBSCRIBER_EMAIL_KEY = "7pexel_subscriber_email";

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load subscription status from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SUBSCRIBED_KEY) === "true";
    const storedEmail = localStorage.getItem(SUBSCRIBER_EMAIL_KEY);
    
    if (stored && storedEmail) {
      setIsSubscribed(true);
      setSubscriberEmail(storedEmail);
    }
  }, []);

  // Sync with server on mount and when subscription changes
  useEffect(() => {
    if (isSubscribed && subscriberEmail) {
      // Verify subscription status with server
      const verifySubscription = async () => {
        try {
          const response = await fetch(`/api/subscribe/status?email=${encodeURIComponent(subscriberEmail)}`);
          const result = await response.json();
          
          if (!result.success || !result.data?.isActive) {
            // Server says not subscribed, clear local state
            localStorage.removeItem(SUBSCRIBED_KEY);
            localStorage.removeItem(SUBSCRIBER_EMAIL_KEY);
            setIsSubscribed(false);
            setSubscriberEmail(null);
          }
        } catch (err) {
          // Silent fail - keep local state
          console.error("Failed to verify subscription:", err);
        }
      };
      
      verifySubscription();
    }
  }, [isSubscribed, subscriberEmail]);

  const subscribe = useCallback(async (email: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        // Store in localStorage
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        localStorage.setItem(SUBSCRIBER_EMAIL_KEY, email);
        
        setIsSubscribed(true);
        setSubscriberEmail(email);
        
        return { success: true, message: result.message };
      } else {
        setError(result.error || "Failed to subscribe");
        return { success: false, message: result.error };
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to subscribe";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const unsubscribe = useCallback(async (email?: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    setError(null);

    const targetEmail = email || subscriberEmail;

    if (!targetEmail) {
      setError("No email to unsubscribe");
      return { success: false, message: "No email to unsubscribe" };
    }

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear localStorage
        localStorage.removeItem(SUBSCRIBED_KEY);
        localStorage.removeItem(SUBSCRIBER_EMAIL_KEY);
        
        setIsSubscribed(false);
        setSubscriberEmail(null);
        
        return { success: true, message: result.message };
      } else {
        setError(result.error || "Failed to unsubscribe");
        return { success: false, message: result.error };
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to unsubscribe";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [subscriberEmail]);

  const checkSubscriptionStatus = useCallback(async (email?: string): Promise<boolean> => {
    const targetEmail = email || subscriberEmail;
    if (!targetEmail) return false;

    try {
      const response = await fetch(`/api/unsubscribe?email=${encodeURIComponent(targetEmail)}`);
      const result = await response.json();
      
      if (result.success && result.data?.isActive) {
        return true;
      }
      
      // If server says not subscribed, clear local state
      if (!result.data?.isActive) {
        localStorage.removeItem(SUBSCRIBED_KEY);
        localStorage.removeItem(SUBSCRIBER_EMAIL_KEY);
        setIsSubscribed(false);
        setSubscriberEmail(null);
      }
      
      return false;
    } catch (err) {
      console.error("Failed to check subscription status:", err);
      return isSubscribed; // Fallback to local state
    }
  }, [subscriberEmail, isSubscribed]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    isSubscribed,
    subscriberEmail,
    isLoading,
    error,
    subscribe,
    unsubscribe,
    clearError,
    checkSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}