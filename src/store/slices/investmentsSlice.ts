import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Investment {
  dealId: string;
  investedAmount: number;
  investedAt: string;
  status: "Active" | "Completed";
}

interface InvestmentsState {
  investments: Investment[];
}

const initialState: InvestmentsState = {
  investments: [],
};

const investmentsSlice = createSlice({
  name: "investments",
  initialState,

  reducers: {
    addInvestment: (
      state,
      action: PayloadAction<Investment>
    ) => {
      const exists = state.investments.some(
        (investment) =>
          investment.dealId === action.payload.dealId
      );

      if (!exists) {
        state.investments.push(action.payload);
      }
    },

    removeInvestment: (
      state,
      action: PayloadAction<string>
    ) => {
      state.investments = state.investments.filter(
        (investment) =>
          investment.dealId !== action.payload
      );
    },

    updateInvestmentStatus: (
      state,
      action: PayloadAction<{
        dealId: string;
        status: "Active" | "Completed";
      }>
    ) => {
      const investment = state.investments.find(
        (item) =>
          item.dealId === action.payload.dealId
      );

      if (investment) {
        investment.status = action.payload.status;
      }
    },

    clearInvestments: (state) => {
      state.investments = [];
    },

    setInvestments: (
      state,
      action: PayloadAction<Investment[]>
    ) => {
      state.investments = action.payload;
    },
  },
});

export const {
  addInvestment,
  removeInvestment,
  updateInvestmentStatus,
  clearInvestments,
  setInvestments,
} = investmentsSlice.actions;

export default investmentsSlice.reducer;