import type { MetricRow } from "@/types/astroflow";

export function formatMetricValue(m: MetricRow): string {
  const v = m.value;
  if (!Number.isFinite(v)) return "—";
  if (m.unit === "%") return `${v.toFixed(1)}`;
  if (Math.abs(v) >= 1000)
    return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (Math.abs(v) >= 100)
    return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (Math.abs(v) >= 10)
    return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return v.toLocaleString(undefined, { maximumFractionDigits: 4 });
}
