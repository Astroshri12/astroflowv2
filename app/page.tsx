import Link from "next/link";
import type { ReactNode } from "react";
import { DataCredits } from "@/components/layout/DataCredits";
import { AgencyBackdropLogos } from "@/components/ui/AgencyBackdropLogos";
import { MissileGlyphAnimated, RocketGlyphAnimated } from "@/components/ui/AeroVehicleDecor";

/** Faint database stack — intel card top-right. */
function DatabaseWatermark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 140" fill="currentColor" aria-hidden>
      <ellipse cx="70" cy="26" rx="48" ry="18" opacity="0.2" />
      <path d="M22 26v26c0 10 21.5 18 48 18s48-8 48-18V26" opacity="0.14" />
      <ellipse cx="70" cy="52" rx="48" ry="18" opacity="0.18" />
      <path d="M22 52v26c0 10 21.5 18 48 18s48-8 48-18V52" opacity="0.12" />
      <ellipse cx="70" cy="78" rx="48" ry="18" opacity="0.16" />
    </svg>
  );
}

function IconRocket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 1.5 10.5 6H14l-2 2-3.5-.5L8 14l-1.5-6.5L3 8 1 6h3.5L8 1.5Z" strokeLinejoin="round" />
      <path d="M5.5 11.5 3 14" strokeLinecap="round" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 2v8.5M5 8.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13.5h10" strokeLinecap="round" />
    </svg>
  );
}

const STRUCTURAL_BG =
  "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=82";

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_88%,var(--surface-muted))] px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[9px] font-medium uppercase tracking-[0.14em] text-fg-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
      {children}
    </span>
  );
}

const dotGridFixed =
  "pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(color-mix(in_oklab,var(--rim)_4.5%,transparent)_1px,transparent_1px)] [background-size:20px_20px]";

export default function HomePage() {
  return (
    <div className="relative isolate flex min-h-screen flex-col text-foreground">
      {/* Canvas */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#e8ecf3]" aria-hidden />
      <div className={dotGridFixed} aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_85%_55%_at_50%_-10%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_oklab,var(--rim)_3%,transparent)] via-transparent to-[color-mix(in_oklab,var(--accent)_4%,transparent)] to-100%"
        aria-hidden
      />
      <AgencyBackdropLogos variant="light" />

      <nav className="relative z-[1] border-b border-[color-mix(in_oklab,var(--rim)_7%,transparent)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] shadow-[0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
          <Link href="/" className="group flex items-baseline gap-1 transition-opacity hover:opacity-85">
            <span className="font-[family-name:var(--font-orbitron)] text-sm font-bold tracking-[0.22em] text-foreground sm:text-base">
              ASTRO
            </span>
            <span className="font-[family-name:var(--font-orbitron)] text-sm font-bold tracking-[0.22em] text-accent sm:text-base">
              FLOW
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/intel"
              className="rounded-md px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted transition-colors hover:bg-[color-mix(in_oklab,var(--surface-muted)_70%,transparent)] hover:text-accent"
            >
              Intel
            </Link>
            <Link
              href="/analyze"
              className="rounded-md px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted transition-colors hover:bg-[color-mix(in_oklab,var(--surface-muted)_70%,transparent)] hover:text-accent"
            >
              Analyzer
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-[1] mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-8 sm:py-16">
        <header className="animate-fadein flex flex-wrap items-start gap-5 sm:gap-7">
          <div
            className="mt-1 w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-accent via-foreground to-[color-mix(in_oklab,var(--rim)_75%,var(--accent))] shadow-[2px_0_12px_color-mix(in_oklab,var(--accent)_22%,transparent)] sm:w-1.5"
            aria-hidden
          />
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
            <p className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] font-semibold uppercase tracking-[0.26em] text-fg-caption">
              <span>Team Astro presents</span>
              <RocketGlyphAnimated className="h-6 w-[1.125rem] text-accent sm:hidden" />
            </p>
            <h1 className="font-[family-name:var(--font-orbitron)] text-[clamp(1.7rem,0.9rem+2.8vw,2.55rem)] font-bold leading-[1.08] tracking-tight text-foreground">
              Where mission archives meet launch-grade structural insight
            </h1>
            <p className="max-w-[46rem] font-[family-name:var(--font-rajdhani)] text-[0.9375rem] font-medium leading-[1.65] text-fg-soft sm:text-[1.02rem]">
              <strong className="font-semibold text-fg-secondary">AstroFlow</strong> connects curated
              launch-failure intel (dashboards, filters, and timelines) with a guided three-step
              analyzer that layers simple physics checks onto the same archive context. Built for
              coursework, design reviews, and mission storytelling on rockets, missiles, and aircraft.
              Educational use only.
            </p>
          </div>
          <div className="relative mt-0.5 hidden h-[4.25rem] w-[4.25rem] shrink-0 sm:block" aria-hidden>
            <div className="absolute inset-0 rounded-full border border-dashed border-accent/35 animate-hero-orbit opacity-90" />
            <div className="absolute inset-[10px] flex items-center justify-center">
              <RocketGlyphAnimated className="h-11 w-8 text-accent drop-shadow-[0_2px_8px_color-mix(in_oklab,var(--accent)_25%,transparent)]" />
            </div>
          </div>
        </header>

        <div className="mt-11 grid animate-fadein gap-6 [animation-delay:80ms] sm:mt-16 sm:grid-cols-2 sm:gap-7">
          <Link
            href="/intel"
            className="clip-panel group relative flex min-h-[15rem] flex-col overflow-hidden border border-[color-mix(in_oklab,var(--rim)_11%,transparent)] bg-[var(--surface)] shadow-[0_2px_0_color-mix(in_oklab,var(--rim)_5%,transparent),0_12px_40px_-16px_color-mix(in_oklab,var(--rim)_14%,transparent)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_28%,transparent)] hover:shadow-[0_4px_0_color-mix(in_oklab,var(--rim)_6%,transparent),0_20px_48px_-14px_color-mix(in_oklab,var(--accent)_12%,transparent)] sm:min-h-0"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--rim)_4%,transparent)_1px,transparent_1px)] [background-size:17px_17px] opacity-80"
              aria-hidden
            />
            <DatabaseWatermark className="pointer-events-none absolute -right-3 -top-2 h-[11.5rem] w-[11.5rem] text-[color-mix(in_oklab,var(--accent)_12%,transparent)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-52 sm:w-52" />
            <div className="pointer-events-none absolute right-6 top-24 z-[2] opacity-[0.42] sm:right-8 sm:top-28" aria-hidden>
              <RocketGlyphAnimated className="h-12 w-9 text-accent" />
            </div>
            <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-7 sm:p-8">
              <div className="h-0.5 w-11 shrink-0 rounded-full bg-gradient-to-r from-accent to-foreground/90" aria-hidden />
              <h2 className="mt-6 font-[family-name:var(--font-orbitron)] text-xl font-bold tracking-tight text-foreground">
                Mission intelligence
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>36 archived failures</Tag>
                <Tag>Dashboards</Tag>
                <Tag>Timelines</Tag>
              </div>
              <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-fg-soft">
                Pattern summaries and filters over the full mission-failure archive — built for
                classroom and briefing-room use.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 border-b border-transparent font-[family-name:var(--font-space-mono)] text-[11px] font-bold uppercase tracking-[0.16em] text-accent transition-[gap,border-color] group-hover:gap-2.5 group-hover:border-accent/30">
                Open intelligence suite
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>

          <Link
            href="/analyze"
            className="clip-panel group relative flex min-h-[15rem] flex-col overflow-hidden border border-[color-mix(in_oklab,var(--rim)_18%,transparent)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.45)] sm:min-h-0"
          >
            <div
              className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center saturate-[0.75]"
              style={{ backgroundImage: `url(${STRUCTURAL_BG})` }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zinc-950/93 via-[#0f141c]/88 to-zinc-950/95" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:17px_17px]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
            <div className="pointer-events-none absolute bottom-5 left-4 z-[2] opacity-55 sm:bottom-7 sm:left-6" aria-hidden>
              <MissileGlyphAnimated className="h-8 w-[4.5rem] text-zinc-200" />
            </div>
            <div className="relative z-[1] flex min-h-0 flex-1 flex-col p-7 sm:p-8">
              <div className="h-0.5 w-11 shrink-0 rounded-full bg-gradient-to-r from-white/95 to-white/40" aria-hidden />
              <h2 className="mt-6 font-[family-name:var(--font-orbitron)] text-xl font-bold tracking-tight text-white">
                Structural analysis
              </h2>
              <div className="mt-4">
                <span className="inline-block rounded-md border border-white/15 bg-accent/95 px-3 py-1 font-[family-name:var(--font-space-mono)] text-[9px] font-bold uppercase tracking-[0.18em] text-on-accent shadow-sm backdrop-blur-sm">
                  3-step workflow
                </span>
              </div>
              <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-zinc-200/95">
                Pick vehicle class, enter parameters, then review fused physics and archive verdict
                in one pass.
              </p>
              <span className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-md bg-accent py-3.5 font-[family-name:var(--font-space-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-on-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_14px_color-mix(in_oklab,var(--accent)_35%,transparent)] transition-[filter,transform] group-hover:brightness-110 group-active:scale-[0.99]">
                Launch analyzer
                <IconRocket className="h-4 w-4 opacity-95" />
              </span>
            </div>
          </Link>
        </div>

        <div className="relative mt-9 grid animate-fadein gap-0 overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--rim)_9%,transparent)] bg-[var(--surface)] shadow-sm [animation-delay:140ms] sm:mt-11 sm:grid-cols-4 sm:divide-x sm:divide-[color-mix(in_oklab,var(--rim)_8%,transparent)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[3px] animate-border-shimmer opacity-70"
            aria-hidden
          />
          {[
            { label: "Core status", value: "Nominal", dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.45)]" },
            { label: "Uplink latency", value: "14.2 ms" },
            { label: "Active analytics", value: "12 nodes" },
            { label: "Security tier", value: "Level 4" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1.5 border-b border-[color-mix(in_oklab,var(--rim)_7%,transparent)] px-5 py-4 last:border-b-0 sm:border-b-0 sm:py-5"
            >
              <span className="font-[family-name:var(--font-space-mono)] text-[9px] font-semibold uppercase tracking-[0.18em] text-fg-caption">
                {row.label}
              </span>
              <span className="flex items-center gap-2.5 font-[family-name:var(--font-space-mono)] text-sm font-bold tabular-nums tracking-tight text-foreground">
                {"dot" in row && row.dot ? (
                  <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${row.dot}`} aria-hidden />
                ) : null}
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <footer className="mt-auto flex animate-fadein flex-col gap-6 border-t border-[color-mix(in_oklab,var(--rim)_9%,transparent)] pt-9 [animation-delay:200ms] sm:pt-11">
          <DataCredits className="text-balance" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.14em] text-fg-muted">
              <span className="font-semibold text-fg-secondary">© {new Date().getFullYear()} AstroFlow</span>
              <span className="text-fg-caption">Educational screening · not flight certification</span>
            </div>
            <a
              className="inline-flex items-center gap-2 self-start rounded-md border border-transparent px-2 py-1 font-[family-name:var(--font-space-mono)] font-semibold uppercase tracking-[0.12em] text-fg-secondary transition-colors hover:border-[color-mix(in_oklab,var(--rim)_12%,transparent)] hover:bg-[color-mix(in_oklab,var(--surface-muted)_50%,transparent)] hover:text-accent sm:self-auto"
              href="/api/export/missions"
              download="AstroFlow_Mission_Archive.html"
            >
              <IconDownload className="h-3.5 w-3.5 shrink-0 opacity-80" />
              Download mission archive (HTML)
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
