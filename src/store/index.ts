import { configureStore } from "@reduxjs/toolkit";

import dealsReducer from "@/store/slices/dealsSlice";
import investorsReducer from "@/store/slices/investorsSlice";
import interestsReducer from "@/store/slices/interestsSlice";
import investmentsReducer from "@/store/slices/investmentsSlice";

export const store = configureStore({
  reducer: {
    deals: dealsReducer,
    investors: investorsReducer,
    interests: interestsReducer,
    investments: investmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;