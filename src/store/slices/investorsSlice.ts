import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Investor } from "@/types/investor";

interface InvestorsState {
  investors: Investor[];
}

const initialState: InvestorsState = {
  investors: [],
};

const investorsSlice = createSlice({
  name: "investors",
  initialState,

  reducers: {
    setInvestors: (
      state,
      action: PayloadAction<Investor[]>
    ) => {
      state.investors = action.payload;
    },

    clearInvestors: (state) => {
      state.investors = [];
    },

    addInvestor: (
      state,
      action: PayloadAction<Investor>
    ) => {
      const exists = state.investors.some(
        (investor) =>
          investor.id === action.payload.id
      );

      if (!exists) {
        state.investors.push(action.payload);
      }
    },

    removeInvestor: (
      state,
      action: PayloadAction<string>
    ) => {
      state.investors = state.investors.filter(
        (investor) =>
          investor.id !== action.payload
      );
    },
  },
});

export const {
  setInvestors,
  clearInvestors,
  addInvestor,
  removeInvestor,
} = investorsSlice.actions;

export default investorsSlice.reducer;