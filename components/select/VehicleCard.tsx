"use client";

import type { VehicleType } from "@/types/astroflow";
import { VEHICLE_LABEL } from "@/lib/constants";

function VehicleGlyph({ type }: { type: VehicleType }) {
  const cls = "h-10 w-10 shrink-0 text-accent";
  switch (type) {
    case "rocket":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
          <path d="M16 4c-1.2 0-2 1-2.4 2.8L12 18c0 3 1.2 6 2.4 7h3.2c1.2-1 2.4-4 2.4-7l-1.6-11.2C18 5 17.2 4 16 4Z" opacity="0.92" />
          <path d="M11 22v5l5-2.5 5 2.5v-5H11Z" />
        </svg>
      );
    case "missile":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
          <path d="M6 16 14 9v14L6 16Z" opacity="0.45" />
          <rect x="14" y="13" width="14" height="6" rx="1" />
          <rect x="26" y="14.5" width="4" height="3" rx="0.5" opacity="0.75" />
        </svg>
      );
    case "aircraft":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
          <polygon points="16,5 22,14 28,14 28,18 22,18 16,27 10,18 4,18 4,14 10,14" />
        </svg>
      );
    default:
      return null;
  }
}

const BLURB: Record<VehicleType, string> = {
  rocket: "Launch loads, Max-Q, staging margins",
  missile: "Acceleration, fins, dynamic pressure",
  aircraft: "Lift, stall margin, wing loading",
};

type Props = {
  type: VehicleType;
  selected: boolean;
  onSelect: () => void;
};

export function VehicleCard({ type, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col gap-3 overflow-hidden border bg-[var(--surface)] p-6 text-left transition-all clip-panel animate-fadein hover:border-info/50 ${
        selected
          ? "border-[color-mix(in_oklab,var(--accent)_55%,transparent)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--rim)_12%,transparent)]"
          : "border-[color-mix(in_oklab,var(--rim)_12%,transparent)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <VehicleGlyph type={type} />
        <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-widest text-info/80">
          {type}
        </span>
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-orbitron)] text-lg tracking-wide text-foreground">
          {VEHICLE_LABEL[type]}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-rajdhani)] text-sm text-fg-soft">
          {BLURB[type]}
        </p>
      </div>
      <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
        Select configuration →
      </span>
    </button>
  );
}
