"use client";

import type { MetricRow } from "@/types/astroflow";
import { formatMetricValue } from "@/lib/format";

type Props = { metric: MetricRow };

export function MetricCard({ metric }: Props) {
  const border = metric.ok
    ? "border-t-[var(--pass)]"
    : "border-t-[var(--fail)]";

  return (
    <div
      className={`clip-panel flex flex-col gap-2 border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[var(--surface)] p-4 pt-5 shadow-inner ${border} border-t-2`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wider text-[color-mix(in_oklab,var(--text)_65%,transparent)]">
          {metric.name}
        </span>
        <span
          className={`shrink-0 rounded-sm px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${
            metric.ok
              ? "bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--accent)]"
              : "bg-[color-mix(in_oklab,var(--fail)_18%,transparent)] text-[var(--fail)]"
          }`}
        >
          {metric.ok ? "OK" : "FLAG"}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-[family-name:var(--font-orbitron)] text-xl text-[var(--text)]">
          {formatMetricValue(metric)}
        </span>
        {metric.unit ? (
          <span className="font-[family-name:var(--font-space-mono)] text-xs text-[color-mix(in_oklab,var(--text-muted)_90%,transparent)]">
            {metric.unit}
          </span>
        ) : null}
      </div>
    </div>
  );
}
