"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getDeals,
  type DealFilters,
  type DealSortOption,
  type DealsResponse,
} from "@/services/dealService";

export type DealExplorerStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

interface UseDealExplorerOptions {
  pageSize?: number;
}

function useDebounce<T>(
  value: T,
  delay: number
) {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDealExplorer(
  options: UseDealExplorerOptions = {}
) {
  const pageSize = options.pageSize ?? 10;

  const [filters, setFilters] =
    useState<DealFilters>({});

  const debouncedSearch = useDebounce(
    filters.search ?? "",
    400
  );

  const [sortBy, setSortBy] =
    useState<DealSortOption>("newest");

  const [page, setPage] = useState(1);

  const [result, setResult] =
    useState<DealsResponse | null>(null);

  const [status, setStatus] =
    useState<DealExplorerStatus>("idle");

  const [error, setError] =
    useState<string | null>(null);

  const requestId = useRef(0);

  const fetchDeals = useCallback(async () => {
    const currentRequest = ++requestId.current;

    setStatus("loading");
    setError(null);

    try {
      const response = await getDeals({
        filters: {
          ...filters,
          search: debouncedSearch,
        },
        sortBy,
        page,
        pageSize,
      });

      if (currentRequest !== requestId.current) {
        return;
      }

      setResult(response);
      setStatus("success");
    } catch (err) {
      if (currentRequest !== requestId.current) {
        return;
      }

      console.error(
        "Failed to load deals:",
        err
      );

      setResult(null);
      setStatus("error");

      setError(
        "Unable to load opportunities right now. Please try again."
      );
    }
  }, [
    filters,
    debouncedSearch,
    sortBy,
    page,
    pageSize,
  ]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const updateFilter = useCallback(
    <K extends keyof DealFilters>(
      key: K,
      value: DealFilters[K]
    ) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));

      setPage(1);
    },
    []
  );

  const updateFilters = useCallback(
    (newFilters: DealFilters) => {
      setFilters(newFilters);
      setPage(1);
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const changeSort = useCallback(
    (value: DealSortOption) => {
      setSortBy(value);
      setPage(1);
    },
    []
  );

  const changePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const retry = useCallback(() => {
    fetchDeals();
  }, [fetchDeals]);

  return {
    deals: result?.data ?? [],

    total: result?.total ?? 0,

    page: result?.page ?? page,

    pageSize:
      result?.pageSize ?? pageSize,

    totalPages:
      result?.totalPages ?? 0,

    filters,

    sortBy,

    status,

    error,

    updateFilter,

    updateFilters,

    clearFilters,

    changeSort,

    changePage,

    retry,
  };
}