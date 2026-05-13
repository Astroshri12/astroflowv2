"use client";

import Link from "next/link";
import { DataCredits } from "@/components/layout/DataCredits";
import { StepIndicator } from "@/components/layout/StepIndicator";
import { AgencyBackdropLogos } from "@/components/ui/AgencyBackdropLogos";

type Props = {
  step: 1 | 2 | 3;
  children: React.ReactNode;
};

export function AppShell({ step, children }: Props) {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-[var(--bg)] text-foreground">
      <AgencyBackdropLogos variant="muted" />
      <header className="border-b border-[color-mix(in_oklab,var(--rim)_7%,transparent)] bg-[color-mix(in_oklab,var(--surface)_88%,var(--bg))] shadow-[0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-orbitron)] text-lg font-bold tracking-[0.2em] text-foreground">
              ASTRO
              <span className="text-accent">FLOW</span>
            </span>
            <span className="hidden font-[family-name:var(--font-rajdhani)] text-xs uppercase tracking-[0.35em] text-fg-caption sm:inline">
              Structural Analysis Engine
            </span>
          </Link>
          <StepIndicator current={step} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        {children}
      </main>
      <footer className="border-t border-[color-mix(in_oklab,var(--rim)_8%,transparent)] py-8">
        <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-8">
          <DataCredits className="mx-auto max-w-3xl text-center text-balance" />
          <p className="text-center font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-widest text-fg-ghost">
            AstroFlow · Educational physics screening · Not flight certification
          </p>
        </div>
      </footer>
    </div>
  );
}
