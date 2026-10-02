const nav = typeof navigator !== "undefined" ? navigator : {};

export const LOW_POWER =
  (typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches) ||
  (nav.hardwareConcurrency ?? 8) <= 4 ||
  (nav.deviceMemory ?? 8) <= 4;
