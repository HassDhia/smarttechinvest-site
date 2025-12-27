export const durations = { xsm: 0.12, sm: 0.2, md: 0.32, lg: 0.5 } as const;
export const easings = { standard: [0.2, 0.8, 0.2, 1] as const } as const;
export const distances = { xsm: 4, sm: 6, md: 12 } as const;

export const microPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: durations.xsm },
} as const;

// Shared overlay/panel variants for reuse across overlays, drawers, dialogs
export const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: durations.md, ease: easings.standard } },
  exit: { opacity: 0, transition: { duration: durations.sm, delay: 0.02 } },
} as const;

export const panelVariants = {
  hidden: { opacity: 0, y: distances.sm },
  show: { opacity: 1, y: 0, transition: { duration: durations.md, ease: easings.standard } },
  exit: { opacity: 0, y: -distances.xsm, transition: { duration: durations.sm } },
} as const;


