"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getInvestors } from "@/services/investorService";
import type { Investor } from "@/types/investor";

export type InvestorStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface InvestorFilters {
  search?: string;
  type?: Investor["type"] | "All";
  riskPreference?: Investor["riskPreference"] | "All";
  minCapacity?: number;
}

export function useInvestors() {
  const [investors, setInvestors] =
    useState<Investor[]>([]);

  const [filters, setFilters] =
    useState<InvestorFilters>({});

  const [status, setStatus] =
    useState<InvestorStatus>("idle");

  const [error, setError] =
    useState<string | null>(null);

  const fetchInvestors = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const data = await getInvestors();

      setInvestors(data);
      setStatus("success");
    } catch (err) {
      console.error(
        "Failed to load investors:",
        err
      );

      setInvestors([]);
      setStatus("error");

      setError(
        "Unable to load investors right now. Please try again."
      );
    }
  }, []);

  useEffect(() => {
    fetchInvestors();
  }, [fetchInvestors]);

  const updateFilter = useCallback(
    <K extends keyof InvestorFilters>(
      key: K,
      value: InvestorFilters[K]
    ) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const filteredInvestors =
    investors.filter((investor) => {

      /* Search */
      if (filters.search?.trim()) {
        const searchTerm =
          filters.search
            .toLowerCase()
            .trim();

        const matchesSearch = [
          investor.name,
          investor.company,
          investor.location,
          ...investor.preferredIndustries,
        ].some((value) =>
          value
            .toLowerCase()
            .includes(searchTerm)
        );

        if (!matchesSearch) {
          return false;
        }
      }

      /* Investor Type */
      if (
        filters.type &&
        filters.type !== "All" &&
        investor.type !== filters.type
      ) {
        return false;
      }

      /* Risk Preference */
      if (
        filters.riskPreference &&
        filters.riskPreference !== "All" &&
        investor.riskPreference !==
          filters.riskPreference
      ) {
        return false;
      }

      /* Investment Capacity */
      if (
        filters.minCapacity !== undefined &&
        investor.investmentCapacity <
          filters.minCapacity
      ) {
        return false;
      }

      return true;
    });

  return {
    investors: filteredInvestors,

    total: filteredInvestors.length,

    allInvestors: investors,

    filters,

    status,

    error,

    updateFilter,

    clearFilters,

    retry: fetchInvestors,
  };
}