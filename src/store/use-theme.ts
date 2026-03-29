import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

function applyTheme(mode: ThemeMode) {
  // Redesign: forced light mode globally
  document.documentElement.classList.remove("dark");
  document.documentElement.setAttribute("data-theme", "light");
}

export const useThemeStore = create(
  persist<{
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
    toggleMode: () => void;
  }>(
    (set, get) => ({
      mode: "light",
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
        // Migration: ensure every user is switched to light theme for the new redesign
        if (state?.mode === "dark") {
          state.setMode("light");
        }
        applyTheme("light");
      },
    }
  )
);
