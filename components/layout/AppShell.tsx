"use client";

import Link from "next/link";
import { StepIndicator } from "@/components/layout/StepIndicator";

type Props = {
  step: 1 | 2 | 3;
  children: React.ReactNode;
};

export function AppShell({ step, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,var(--bg))] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-orbitron)] text-lg font-bold tracking-[0.2em] text-[var(--text)]">
              ASTRO
              <span className="text-[var(--accent)]">FLOW</span>
            </span>
            <span className="hidden font-[family-name:var(--font-rajdhani)] text-xs uppercase tracking-[0.35em] text-[color-mix(in_oklab,var(--text)_55%,transparent)] sm:inline">
              Structural Analysis Engine
            </span>
          </Link>
          <StepIndicator current={step} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        {children}
      </main>
      <footer className="border-t border-[color-mix(in_oklab,white_8%,transparent)] py-6 text-center font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-widest text-[color-mix(in_oklab,var(--text)_45%,transparent)]">
        AstroFlow · Educational physics screening · Not flight certification
      </footer>
    </div>
  );
}
