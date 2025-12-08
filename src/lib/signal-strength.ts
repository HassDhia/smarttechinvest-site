export type SignalStrengthTier = "high" | "medium" | "exploratory";

function normalizeScore(raw?: number | null): number | null {
  if (typeof raw !== "number" || Number.isNaN(raw)) return null;
  if (raw <= 1 && raw >= 0) return raw;
  if (raw > 1) return Math.min(raw / 100, 1);
  if (raw < 0) return 0;
  return null;
}

export function getSignalStrengthTier(raw?: number | null): SignalStrengthTier | null {
  const normalized = normalizeScore(raw);
  if (normalized === null) return null;

  if (normalized >= 0.7) return "high";
  if (normalized >= 0.4) return "medium";
  return "exploratory";
}

export function getSignalStrengthLabel(raw?: number | null): string | null {
  const tier = getSignalStrengthTier(raw);
  if (!tier) return null;
  if (tier === "high") return "High";
  if (tier === "medium") return "Medium";
  return "Exploratory";
}

export function getSignalStrengthHelperText() {
  return "Signal Strength reflects source alignment and repeatability, not certainty of outcome.";
}
