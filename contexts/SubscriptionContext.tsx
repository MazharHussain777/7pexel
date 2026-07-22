// contexts/SubscriptionContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriberEmail: string | null;
  subscribe: (email: string) => void;
  unsubscribe: () => void;
  checkSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);

  const checkSubscription = () => {
    const subscribed = localStorage.getItem("7pexel_subscribed") === "true";
    const email = localStorage.getItem("7pexel_subscriber_email") || null;
    setIsSubscribed(subscribed);
    setSubscriberEmail(email);
  };

  useEffect(() => {
    checkSubscription();

    // Listen for subscription changes
    const handleSubscriptionChange = () => {
      checkSubscription();
    };

    window.addEventListener("subscriptionChanged", handleSubscriptionChange);
    return () => {
      window.removeEventListener("subscriptionChanged", handleSubscriptionChange);
    };
  }, []);

  const subscribe = (email: string) => {
    localStorage.setItem("7pexel_subscribed", "true");
    localStorage.setItem("7pexel_subscriber_email", email);
    setIsSubscribed(true);
    setSubscriberEmail(email);
    window.dispatchEvent(new Event("subscriptionChanged"));
  };

  const unsubscribe = () => {
    localStorage.removeItem("7pexel_subscribed");
    localStorage.removeItem("7pexel_subscriber_email");
    setIsSubscribed(false);
    setSubscriberEmail(null);
    window.dispatchEvent(new Event("subscriptionChanged"));
  };

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, subscriberEmail, subscribe, unsubscribe, checkSubscription }}
    >
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