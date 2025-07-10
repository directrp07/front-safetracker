import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppUser, AppProduct, AppEvaluation } from "../types";
import { setUser as setUserStorage } from "../lib/local-storage";

interface AppState {
  user: AppUser | null;
  currentProduct: AppProduct | null;
  currentEvaluation: AppEvaluation | null;
  setUser: (user: AppUser | null) => void;
  setCurrentProduct: (product: AppProduct | null) => void;
  setCurrentEvaluation: (evaluation: AppEvaluation | null) => void;
  logout: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      currentProduct: null,
      currentEvaluation: null,
      setUser: (user) => {
        set({ user });
        setUserStorage(user);
      },
      setCurrentProduct: (product) => set({ currentProduct: product }),
      setCurrentEvaluation: (evaluation) =>
        set({ currentEvaluation: evaluation }),
      logout: () => {
        set({ user: null, currentProduct: null, currentEvaluation: null });
        setUserStorage(null);
      },
    }),
    {
      name: "safemoney-app-state",
      partialize: (state) => ({
        user: state.user,
        currentProduct: state.currentProduct,
        currentEvaluation: state.currentEvaluation,
      }),
    }
  )
);
