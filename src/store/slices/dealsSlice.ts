import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getDeals,
  type DealFilters,
  type DealSortOption,
} from "@/services/dealService";

import type { Deal } from "@/types/deal";

interface DealsState {
  items: Deal[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  filters: DealFilters;
  sortBy: DealSortOption;

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DealsState = {
  items: [],
  total: 0,

  page: 1,
  pageSize: 10,
  totalPages: 0,

  filters: {},
  sortBy: "newest",

  status: "idle",
  error: null,
};

export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async ({
    filters,
    sortBy,
    page,
    pageSize,
  }: {
    filters?: DealFilters;
    sortBy?: DealSortOption;
    page?: number;
    pageSize?: number;
  } = {}) => {
    const response = await getDeals({
      filters,
      sortBy,
      page,
      pageSize,
    });

    return response;
  }
);

const dealsSlice = createSlice({
  name: "deals",

  initialState,

  reducers: {
    setFilters: (
      state,
      action: {
        payload: DealFilters;
      }
    ) => {
      state.filters = action.payload;
      state.page = 1;
    },

    setSortBy: (
      state,
      action: {
        payload: DealSortOption;
      }
    ) => {
      state.sortBy = action.payload;
      state.page = 1;
    },

    setPage: (
      state,
      action: {
        payload: number;
      }
    ) => {
      state.page = action.payload;
    },

    clearFilters: (state) => {
      state.filters = {};
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.items = action.payload.data;
        state.total = action.payload.total;

        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;

        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";

        state.error =
          action.error.message ??
          "Unable to load deals.";
      });
  },
});

export const {
  setFilters,
  setSortBy,
  setPage,
  clearFilters,
} = dealsSlice.actions;

export default dealsSlice.reducer;