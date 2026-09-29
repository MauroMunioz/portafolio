import { create } from "zustand";

const STORAGE_KEY = "portfolio-lang";

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  return "es";
};

export const useLanguageStore = create((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    window.localStorage.setItem(STORAGE_KEY, language);
    set({ language });
  },
  toggleLanguage: () => {
    const next = get().language === "es" ? "en" : "es";
    window.localStorage.setItem(STORAGE_KEY, next);
    set({ language: next });
  },
}));
