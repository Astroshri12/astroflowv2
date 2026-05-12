"use client";

import type { VehicleType } from "@/types/astroflow";
import { ACTIVE_LAWS, INPUT_FIELDS, VEHICLE_LABEL } from "@/lib/constants";
import { LawTagList } from "@/components/select/LawTagList";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

type Props = {
  vType: VehicleType;
  inputs: Record<string, number>;
  onChange: (key: string, value: number) => void;
  onSubmit: () => void;
};

export function InputForm({ vType, inputs, onChange, onSubmit }: Props) {
  const fields = INPUT_FIELDS[vType];
  const laws = ACTIVE_LAWS[vType];

  return (
    <div className="flex flex-col gap-8 animate-fadein">
      <div>
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-[var(--cyan)]">
          Active criteria
        </p>
        <div className="mt-3">
          <LawTagList laws={laws} variant="accent" />
        </div>
      </div>

      <div className="clip-panel border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-orbitron)] text-xl tracking-wide text-[var(--text)]">
          {VEHICLE_LABEL[vType]} parameters
        </h2>
        <p className="mt-2 font-[family-name:var(--font-rajdhani)] text-sm text-[color-mix(in_oklab,var(--text)_68%,transparent)]">
          Defaults match typical classroom sizing. Adjust values to explore margins.
        </p>

        <form
          className="mt-8 grid gap-6 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider text-[color-mix(in_oklab,var(--text)_75%,transparent)]">
                {f.label}
                {f.unit ? ` (${f.unit})` : ""}
              </span>
              <input
                type="number"
                step={f.step ?? "any"}
                value={inputs[f.key] ?? ""}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isNaN(v)) onChange(f.key, v);
                }}
                className="rounded-sm border border-[color-mix(in_oklab,var(--rim)_14%,transparent)] bg-[var(--input-bg)] px-3 py-2 font-[family-name:var(--font-space-mono)] text-sm text-[var(--text)] outline-none transition-colors focus:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] focus:ring-1 focus:ring-[color-mix(in_oklab,var(--rim)_18%,transparent)]"
              />
            </label>
          ))}

          <div className="sm:col-span-2 mt-2 flex flex-wrap gap-3">
            <PrimaryButton type="submit" variant="primary">
              Run Structural Analysis
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
