// src/store/authStore.js
import { create } from "zustand";
//import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserData } from "../types/User";

type AuthState = {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // ログイン完了処理
  login: (userData: UserData) => {
    set({ user: userData, isAuthenticated: true, isLoading: false });
  },

  // ログアウト完了処理
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),
}));
