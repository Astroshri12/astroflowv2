"use client";

import type { Verdict } from "@/types/astroflow";

type Props = {
  verdict: Verdict;
  physicsVerdict: Verdict;
  flagged: number;
  total: number;
  fusionNote: string;
};

const verdictStyle: Record<
  Verdict,
  { text: string; border: string; glow: string }
> = {
  PASS: {
    text: "text-success",
    border: "border-success/45",
    glow: "shadow-[0_0_32px_color-mix(in_oklab,var(--rim)_10%,transparent)]",
  },
  MARGINAL: {
    text: "text-warning",
    border: "border-warning/50",
    glow: "shadow-[0_0_28px_color-mix(in_oklab,var(--rim)_8%,transparent)]",
  },
  FAIL: {
    text: "text-danger",
    border: "border-danger/55",
    glow: "shadow-[0_0_24px_color-mix(in_oklab,var(--fail)_18%,transparent)]",
  },
};

export function VerdictBanner({
  verdict,
  physicsVerdict,
  flagged,
  total,
  fusionNote,
}: Props) {
  const st = verdictStyle[verdict];

  return (
    <div
      className={`clip-panel relative overflow-hidden border bg-[color-mix(in_oklab,var(--surface)_94%,var(--bg))] px-6 py-8 ${st.border} ${st.glow}`}
    >
      <div className="pointer-events-none absolute inset-0 animate-scan opacity-40" />
      <div className="relative flex flex-col items-center text-center">
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-fg-caption">
          Combined verdict · physics + mission archive
        </p>
        <p
          className={`mt-3 font-[family-name:var(--font-orbitron)] text-4xl font-bold tracking-[0.25em] animate-glow sm:text-5xl ${st.text}`}
        >
          {verdict}
        </p>
        <p className="mt-2 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider text-fg-caption">
          Physics-only screening:{" "}
          <span
            className={
              physicsVerdict === verdict
                ? "text-fg-secondary"
                : "text-warning"
            }
          >
            {physicsVerdict}
          </span>
          {physicsVerdict !== verdict ? " · adjusted using archive analogs" : ""}
        </p>
        <p className="mt-4 max-w-2xl font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-fg-soft">
          {fusionNote}
        </p>
        <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-sm text-fg-soft">
          {flagged} metrics flagged · {total} physics checks total
        </p>
      </div>
    </div>
  );
}
