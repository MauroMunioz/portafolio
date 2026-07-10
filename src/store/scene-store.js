import { create } from "zustand";

export const SECTIONS = ["hero", "about", "experience", "work", "contact"];

export const useSceneStore = create((set) => ({
  globalProgress: 0,
  activeSection: "hero",
  sectionProgress: 0,
  typingEnergy: 0,
  transmission: "idle",
  focusedProject: -1,
  setScroll: (globalProgress, activeSection, sectionProgress) =>
    set({ globalProgress, activeSection, sectionProgress }),
  setTypingEnergy: (typingEnergy) => set({ typingEnergy }),
  setTransmission: (transmission) => set({ transmission }),
  setFocusedProject: (focusedProject) => set({ focusedProject }),
}));
