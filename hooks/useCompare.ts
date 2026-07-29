// @ts-nocheck
// app/compare/hooks/useCompare.ts

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone } from "@/app/compare/types";
import { MAX_PHONES } from "@/app/compare/config";

export function useCompare() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState("display");

  // Load phones from URL
  useEffect(() => {
    const phoneSlugs = searchParams.get('phones')?.split(',') || [];

    if (phoneSlugs.length === 0) {
      setLoading(false);
      return;
    }

    const fetchPhones = async () => {
      setLoading(true);
      setError("");

      try {
        const fetchedPhones: Phone[] = [];
        for (const slug of phoneSlugs) {
          const response = await fetch(`/api/phones/${slug}`);
          const result = await response.json();
          if (result.success) {
            fetchedPhones.push(result.data);
          }
        }
        setPhones(fetchedPhones);
      } catch (err) {
        setError("Failed to load phones");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [searchParams]);

  const updateUrl = useCallback((newPhones: Phone[]) => {
    const slugs = newPhones.map(p => p.slug);
    const params = new URLSearchParams();
    if (slugs.length > 0) {
      params.set('phones', slugs.join(','));
    }
    router.push(`/compare${params.toString() ? '?' + params.toString() : ''}`, { scroll: false });
  }, [router]);

  const addPhone = useCallback((phone: Phone) => {
    if (phones.length >= MAX_PHONES) return;
    const newPhones = [...phones, phone];
    setPhones(newPhones);
    updateUrl(newPhones);
    setShowModal(false);
  }, [phones, updateUrl]);

  const removePhone = useCallback((index: number) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
    updateUrl(newPhones);
  }, [phones, updateUrl]);

  const clearAll = useCallback(() => {
    setPhones([]);
    updateUrl([]);
  }, [updateUrl]);

  const canAddMore = phones.length < MAX_PHONES;

  return {
    phones,
    loading,
    error,
    showModal,
    setShowModal,
    activeSection,
    setActiveSection,
    addPhone,
    removePhone,
    clearAll,
    canAddMore,
    MAX_PHONES,
  };
}