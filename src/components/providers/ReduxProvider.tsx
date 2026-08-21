"use client";

import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store, type RootState, type AppDispatch } from "@/store";
import { setInterests } from "@/store/slices/interestsSlice";
import { setInvestments } from "@/store/slices/investmentsSlice";
import {
  loadInterests,
  loadInvestments,
  saveInterests,
  saveInvestments,
} from "@/utils/storage";

interface ReduxProviderProps {
  children: React.ReactNode;
}

function ReduxPersistence() {
  const dispatch = useDispatch<AppDispatch>();

  const interests = useSelector(
    (state: RootState) => state.interests.dealIds
  );

  const investments = useSelector(
    (state: RootState) => state.investments.investments
  );

  useEffect(() => {
    dispatch(setInterests(loadInterests()));
    dispatch(setInvestments(loadInvestments()));
  }, [dispatch]);

  useEffect(() => {
    saveInterests(interests);
  }, [interests]);

  useEffect(() => {
    saveInvestments(investments);
  }, [investments]);

  return null;
}

export default function ReduxProvider({
  children,
}: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <ReduxPersistence />
      {children}
    </Provider>
  );
}