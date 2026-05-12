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
        <h2 className="font-[family-name:var(--font-orbitron)] text-lg tracking-wide text-[var(--text)]">
          Mission failure archive analogs
        </h2>
        <div className="flex gap-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider">
          <span className="text-[color-mix(in_oklab,var(--fail)_85%,transparent)]">
            Severity-weighted risk: {(analogFailureRate * 100).toFixed(0)}%
          </span>
          <span className="text-[color-mix(in_oklab,var(--pass)_85%,transparent)]">
            Complementary confidence: {(analogSuccessRate * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_82%,transparent)]">
        {fusionNote}
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {neighbors.map((n) => (
          <li
            key={n.id}
            className="flex flex-col gap-2 border-l-2 border-[color-mix(in_oklab,var(--rim)_18%,transparent)] pl-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-[family-name:var(--font-orbitron)] text-sm text-[var(--text)]">
                {n.name}
                {n.year ? (
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-normal text-[color-mix(in_oklab,var(--text)_45%,transparent)]">
                    {" "}
                    · {n.year}
                  </span>
                ) : null}
              </span>
              {n.severity ? (
                <span className="rounded-sm bg-[color-mix(in_oklab,var(--marginal)_18%,transparent)] px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-[var(--marginal)]">
                  {n.severity}
                </span>
              ) : null}
              <span className="rounded-sm bg-[color-mix(in_oklab,var(--fail)_14%,transparent)] px-2 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-[color-mix(in_oklab,var(--text)_70%,transparent)]">
                archived failure
              </span>
              <span className="font-[family-name:var(--font-space-mono)] text-[10px] text-[var(--cyan)]">
                similarity {n.similarity.toFixed(3)}
              </span>
            </div>
            <p className="font-[family-name:var(--font-rajdhani)] text-xs leading-relaxed text-[color-mix(in_oklab,var(--text)_68%,transparent)]">
              {n.agency ? `${n.agency} · ` : ""}
              {n.summary}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
