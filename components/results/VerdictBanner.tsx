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
    text: "text-[var(--pass)]",
    border: "border-[color-mix(in_oklab,var(--pass)_45%,transparent)]",
    glow: "shadow-[0_0_32px_rgba(255,255,255,0.08)]",
  },
  MARGINAL: {
    text: "text-[var(--marginal)]",
    border: "border-[color-mix(in_oklab,var(--marginal)_50%,transparent)]",
    glow: "shadow-[0_0_28px_rgba(255,255,255,0.05)]",
  },
  FAIL: {
    text: "text-[var(--fail)]",
    border: "border-[color-mix(in_oklab,var(--fail)_55%,transparent)]",
    glow: "shadow-[0_0_24px_rgba(0,0,0,0.45)]",
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
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
          Combined verdict · physics + mission archive
        </p>
        <p
          className={`mt-3 font-[family-name:var(--font-orbitron)] text-4xl font-bold tracking-[0.25em] animate-glow sm:text-5xl ${st.text}`}
        >
          {verdict}
        </p>
        <p className="mt-2 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
          Physics-only screening:{" "}
          <span
            className={
              physicsVerdict === verdict
                ? "text-[color-mix(in_oklab,var(--text)_75%,transparent)]"
                : "text-[var(--marginal)]"
            }
          >
            {physicsVerdict}
          </span>
          {physicsVerdict !== verdict ? " · adjusted using archive analogs" : ""}
        </p>
        <p className="mt-4 max-w-2xl font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_78%,transparent)]">
          {fusionNote}
        </p>
        <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-sm text-[color-mix(in_oklab,var(--text)_72%,transparent)]">
          {flagged} metrics flagged · {total} physics checks total
        </p>
      </div>
    </div>
  );
}
