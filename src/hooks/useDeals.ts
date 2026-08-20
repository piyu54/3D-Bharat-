"use client";

import { useEffect } from "react";

import {
  fetchDeals,
  setFilters,
  setPage,
  setSortBy,
} from "@/store/slices/dealsSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

import type {
  DealFilters,
  DealSortOption,
} from "@/services/dealService";

export const useDeals = () => {
  const dispatch = useAppDispatch();

  const {
    items,
    total,
    page,
    pageSize,
    totalPages,
    filters,
    sortBy,
    status,
    error,
  } = useAppSelector((state) => state.deals);

  useEffect(() => {
    dispatch(
      fetchDeals({
        filters,
        sortBy,
        page,
        pageSize,
      })
    );
  }, [dispatch, filters, sortBy, page, pageSize]);

  const updateFilters = (newFilters: DealFilters) => {
    dispatch(setFilters(newFilters));
  };

  const updateSort = (newSort: DealSortOption) => {
    dispatch(setSortBy(newSort));
  };

  const updatePage = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return {
    deals: items,
    total,
    page,
    pageSize,
    totalPages,
    filters,
    sortBy,
    status,
    error,

    updateFilters,
    updateSort,
    updatePage,
  };
};