"use client";

import type { VehicleType } from "@/types/astroflow";
import { VEHICLE_LABEL } from "@/lib/constants";

const ICONS: Record<VehicleType, string> = {
  rocket: "🚀",
  missile: "🎯",
  aircraft: "✈️",
};

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
      className={`group relative flex flex-col gap-3 overflow-hidden border bg-[var(--surface)] p-6 text-left transition-all clip-panel animate-fadein hover:border-[var(--cyan)] ${
        selected
          ? "border-[color-mix(in_oklab,var(--accent)_55%,transparent)] shadow-[0_0_0_1px_color-mix(in_oklab,white_12%,transparent)]"
          : "border-[color-mix(in_oklab,white_12%,transparent)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden>
          {ICONS[type]}
        </span>
        <span className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-widest text-[color-mix(in_oklab,var(--cyan)_70%,transparent)]">
          {type}
        </span>
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-orbitron)] text-lg tracking-wide text-[var(--text)]">
          {VEHICLE_LABEL[type]}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-rajdhani)] text-sm text-[color-mix(in_oklab,var(--text)_72%,transparent)]">
          {BLURB[type]}
        </p>
      </div>
      <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
        Select configuration →
      </span>
    </button>
  );
}
