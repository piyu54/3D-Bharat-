"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "3d-bharat-interests";

export function useInterests() {
  const [interests, setInterests] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setInterests(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load interests:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(interests)
      );
    } catch (error) {
      console.error(
        "Failed to save interests:",
        error
      );
    }
  }, [interests, isLoaded]);

  const addInterest = useCallback(
    (dealId: string) => {
      setInterests((current) => {
        if (current.includes(dealId)) {
          return current;
        }

        return [...current, dealId];
      });
    },
    []
  );

  const removeInterest = useCallback(
    (dealId: string) => {
      setInterests((current) =>
        current.filter(
          (id) => id !== dealId
        )
      );
    },
    []
  );

  const isInterested = useCallback(
    (dealId: string) => {
      return interests.includes(dealId);
    },
    [interests]
  );

  return {
    interests,
    isLoaded,
    addInterest,
    removeInterest,
    isInterested,
  };
}