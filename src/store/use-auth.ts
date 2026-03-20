import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("daba_token"),
  user: null,
  setAuth: (user, token) => {
    localStorage.setItem("daba_token", token);
    set({ user, token });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("daba_token");
    set({ user: null, token: null });
  },
}));
