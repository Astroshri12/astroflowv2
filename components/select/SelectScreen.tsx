"use client";

import { useRouter } from "next/navigation";
import type { VehicleType } from "@/types/astroflow";
import { GOVERNING_LAWS } from "@/lib/constants";
import { AppShell } from "@/components/layout/AppShell";
import { VehicleCard } from "@/components/select/VehicleCard";
import { LawTagList } from "@/components/select/LawTagList";
import { useAstroFlow } from "@/components/providers/AstroFlowProvider";
import { RocketGlyphAnimated } from "@/components/ui/AeroVehicleDecor";

const VEHICLES: VehicleType[] = ["rocket", "missile", "aircraft"];

export function SelectScreen() {
  const router = useRouter();
  const { vType, setVType } = useAstroFlow();

  return (
    <AppShell step={1}>
      <div className="flex flex-col gap-10">
        <header className="max-w-3xl animate-fadein">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-info">
            Mission setup
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-orbitron)] text-3xl tracking-wide text-foreground sm:text-4xl">
            Choose your vehicle class
          </h1>
          <p className="mt-4 font-[family-name:var(--font-rajdhani)] text-base leading-relaxed text-fg-soft">
            AstroFlow applies textbook structural and aerodynamic screening rules, then fuses the
            result with the documented mission-failure archive for a clear verdict.
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

        <section className="relative isolate overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--rim)_16%,transparent)] bg-gradient-to-br from-[var(--surface)] via-[color-mix(in_oklab,var(--surface-muted)_55%,var(--surface))] to-[color-mix(in_oklab,var(--accent)_8%,var(--surface-muted))] p-6 shadow-[0_3px_0_color-mix(in_oklab,var(--rim)_6%,transparent),0_20px_50px_-22px_color-mix(in_oklab,var(--accent)_18%,transparent)] sm:p-8">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--rim)_5%,transparent)_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.55]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-0.5 animate-border-shimmer opacity-55"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-6 -top-4 h-32 w-32 text-accent/20 sm:h-40 sm:w-40"
            aria-hidden
          >
            <RocketGlyphAnimated className="h-full w-full" />
          </div>
          <div className="relative z-[1]">
            <div className="flex min-w-0 gap-3">
                <div
                  className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-accent via-info to-[color-mix(in_oklab,var(--rim)_70%,var(--accent))]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <h2 className="font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.2em] text-foreground sm:text-base">
                    Governing laws reference
                  </h2>
                  <p className="mt-2 max-w-xl font-[family-name:var(--font-space-mono)] text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fg-caption">
                    Textbook physics wired into the screening pass · symbolic notation as shown
                  </p>
                </div>
              </div>
            <div className="mt-6 border-t border-[color-mix(in_oklab,var(--rim)_10%,transparent)] pt-6">
              <LawTagList laws={GOVERNING_LAWS} variant="spectrum" />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
