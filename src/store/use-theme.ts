import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export const useThemeStore = create(
  persist<{
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
    toggleMode: () => void;
  }>(
    (set, get) => ({
      mode: "dark",
      setMode: (mode) => {
        applyTheme(mode);
        set({ mode });
      },
      toggleMode: () => get().setMode(get().mode === "dark" ? "light" : "dark"),
    }),
    {
      name: "daba-theme",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ mode: s.mode }),
      onRehydrateStorage: () => (state) => {
        if (state?.mode) applyTheme(state.mode);
      },
    }
  )
);
