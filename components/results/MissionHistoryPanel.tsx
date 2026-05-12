"use client";

import type { HistoricalContext } from "@/types/astroflow";

type Props = {
  historical: HistoricalContext;
};

export function MissionHistoryPanel({ historical }: Props) {
  const { analogFailureRate, analogSuccessRate, neighbors, fusionNote } =
    historical;

  return (
    <section className="clip-panel border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-[family-name:var(--font-orbitron)] text-lg tracking-wide text-foreground">
          Mission failure archive analogs
        </h2>
        <div className="flex flex-wrap gap-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider">
          <span className="text-danger">
            Severity-weighted risk: {(analogFailureRate * 100).toFixed(0)}%
          </span>
          <span className="text-success">
            Complementary confidence: {(analogSuccessRate * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-fg-soft">
        {fusionNote}
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {neighbors.map((n) => (
          <li
            key={n.id}
            className="flex flex-col gap-2 border-l-2 border-[color-mix(in_oklab,var(--rim)_18%,transparent)] pl-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-orbitron)] text-sm text-foreground">
                {n.name}
                {n.year ? (
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-normal text-fg-muted">
                    {" "}
                    · {n.year}
                  </span>
                ) : null}
              </span>
              {n.severity ? (
                <span className="rounded-sm bg-warning/18 px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-warning">
                  {n.severity}
                </span>
              ) : null}
              <span className="rounded-sm bg-danger/14 px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-danger">
                archived failure
              </span>
              <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-info">
                similarity {n.similarity.toFixed(3)}
              </span>
            </div>
            <p className="font-[family-name:var(--font-rajdhani)] text-xs leading-relaxed text-fg-soft">
              {n.agency ? `${n.agency} · ` : ""}
              {n.summary}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
