import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface InterestsState {
  dealIds: string[];
}

const initialState: InterestsState = {
  dealIds: [],
};

const interestsSlice = createSlice({
  name: "interests",
  initialState,

  reducers: {
    addInterest: (
      state,
      action: PayloadAction<string>
    ) => {
      if (!state.dealIds.includes(action.payload)) {
        state.dealIds.push(action.payload);
      }
    },

    removeInterest: (
      state,
      action: PayloadAction<string>
    ) => {
      state.dealIds = state.dealIds.filter(
        (id) => id !== action.payload
      );
    },

    toggleInterest: (
      state,
      action: PayloadAction<string>
    ) => {
      if (state.dealIds.includes(action.payload)) {
        state.dealIds = state.dealIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.dealIds.push(action.payload);
      }
    },

    clearInterests: (state) => {
      state.dealIds = [];
    },

    setInterests: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.dealIds = action.payload;
    },
  },
});

export const {
  addInterest,
  removeInterest,
  toggleInterest,
  clearInterests,
  setInterests,
} = interestsSlice.actions;

export default interestsSlice.reducer;