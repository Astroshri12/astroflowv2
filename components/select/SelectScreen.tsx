"use client";

import { useRouter } from "next/navigation";
import type { VehicleType } from "@/types/astroflow";
import { GOVERNING_LAWS } from "@/lib/constants";
import { AppShell } from "@/components/layout/AppShell";
import { VehicleCard } from "@/components/select/VehicleCard";
import { LawTagList } from "@/components/select/LawTagList";
import { useAstroFlow } from "@/components/providers/AstroFlowProvider";

const VEHICLES: VehicleType[] = ["rocket", "missile", "aircraft"];

export function SelectScreen() {
  const router = useRouter();
  const { vType, setVType } = useAstroFlow();

  return (
    <AppShell step={1}>
      <div className="flex flex-col gap-10">
        <header className="max-w-3xl animate-fadein">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-[var(--cyan)]">
            Mission setup
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-orbitron)] text-3xl tracking-wide text-[var(--text)] sm:text-4xl">
            Choose your vehicle class
          </h1>
          <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-base leading-relaxed text-[color-mix(in_oklab,var(--text)_75%,transparent)]">
            AstroFlow applies textbook structural and aerodynamic screening rules,
            then summarizes findings with an AI co-pilot tuned for students.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {VEHICLES.map((v) => (
            <VehicleCard
              key={v}
              type={v}
              selected={vType === v}
              onSelect={() => {
                setVType(v);
                router.push("/analyze/input");
              }}
            />
          ))}
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.25em] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
            Governing laws reference
          </h2>
          <LawTagList laws={GOVERNING_LAWS} />
        </section>
      </div>
    </AppShell>
  );
}
