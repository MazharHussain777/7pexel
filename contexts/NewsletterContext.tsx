// contexts/NewsletterContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NewsletterContextType {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
  showNewsletter: boolean;
  setShowNewsletter: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
  checkSubscription: (email: string) => Promise<boolean>;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export function NewsletterProvider({ children }: { children: ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [email, setEmail] = useState("");

  // Check subscription status on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('subscribedEmail');
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    
    if (savedEmail && subscribed) {
      setIsSubscribed(true);
      setShowNewsletter(false);
    }
  }, []);

  const checkSubscription = async (emailToCheck: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/newsletter/check?email=${encodeURIComponent(emailToCheck)}`);
      const data = await response.json();
      const isActive = data.isSubscribed || false;
      
      if (isActive) {
        setIsSubscribed(true);
        setShowNewsletter(false);
        localStorage.setItem('isSubscribed', 'true');
        localStorage.setItem('subscribedEmail', emailToCheck);
      }
      
      return isActive;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  return (
    <NewsletterContext.Provider 
      value={{ 
        isSubscribed, 
        setIsSubscribed, 
        showNewsletter, 
        setShowNewsletter,
        email,
        setEmail,
        checkSubscription
      }}
    >
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletter() {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
}