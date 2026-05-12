import Link from "next/link";

/** Faint stacked-cylinder / database motif for the light intel card (top-right). */
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

/** Desaturated rocket / hangar — used only as a CSS background layer. */
const STRUCTURAL_BG =
  "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80";

export default function HomePage() {
  const dotGridLight =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--rim)_7%,transparent)_1px,transparent_1px)] [background-size:16px_16px]";
  const dotGridDark =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:16px_16px]";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-foreground">
      <header className="border-b border-[color-mix(in_oklab,var(--rim)_10%,transparent)] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:max-w-4xl sm:gap-6">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-fg-caption">
            AstroFlow
          </p>
          <h1 className="font-[family-name:var(--font-orbitron)] text-[clamp(1.75rem,0.9rem+3.2vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-foreground sm:leading-[1.1]">
            Aerospace mission intelligence & structural screening
          </h1>
          <p className="max-w-[42rem] text-[0.9375rem] leading-relaxed text-fg-soft sm:text-base sm:leading-[1.6]">
            Explore documented mission failures, dashboards, and pattern views — or run the
            multi-step physics + archive fusion analyzer for rocket, missile, and aircraft sizing
            exercises.
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-10 sm:max-w-4xl sm:gap-12 sm:px-6 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <Link
            href="/intel"
            className="clip-panel group relative flex min-h-[12.5rem] flex-col overflow-hidden border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[#fcf8fa] p-6 shadow-[0_1px_0_color-mix(in_oklab,var(--rim)_6%,transparent)] transition-[border-color,box-shadow] hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)] hover:shadow-[0_2px_12px_color-mix(in_oklab,var(--rim)_8%,transparent)] sm:min-h-0 sm:p-8"
          >
            <div className={dotGridLight} aria-hidden />
            <DatabaseWatermark className="pointer-events-none absolute -right-4 -top-2 h-44 w-44 text-[color-mix(in_oklab,var(--rim)_18%,transparent)] sm:h-52 sm:w-52" />
            <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
              <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                Mission intelligence
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-soft sm:text-[0.9375rem] sm:leading-relaxed">
                36 archived failures · dashboards · filters · timeline · pattern summaries over the
                database.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-accent transition-transform group-hover:gap-2">
                Open intelligence suite
                <span aria-hidden className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>

          <Link
            href="/analyze"
            className="clip-panel group relative flex min-h-[12.5rem] flex-col overflow-hidden border border-white/15 bg-zinc-950 p-6 shadow-[0_1px_0_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] hover:border-white/25 hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:min-h-0 sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${STRUCTURAL_BG})` }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/88 via-zinc-950/82 to-zinc-950/92 mix-blend-multiply"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-zinc-950/55" aria-hidden />
            <div className={dotGridDark} aria-hidden />
            <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
              <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                Structural analysis
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem] sm:leading-relaxed">
                Three-step workflow: pick vehicle, enter parameters, view fused physics and archive
                verdict.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-amber-300/95 transition-transform group-hover:gap-2">
                Launch analyzer
                <span aria-hidden className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        </div>

        <p className="border-t border-[color-mix(in_oklab,var(--rim)_8%,transparent)] pt-8 text-xs leading-relaxed text-fg-muted sm:pt-10 sm:text-[13px]">
          <a
            className="font-medium text-fg-secondary underline decoration-[color-mix(in_oklab,var(--rim)_22%,transparent)] underline-offset-2 transition-colors hover:text-accent"
            href="/api/export/missions"
            download="AstroFlow_Mission_Archive.html"
          >
            Download mission archive (HTML)
          </a>{" "}
          <span className="text-fg-caption">— same table as Mission intelligence, for offline use.</span>
        </p>
      </main>
    </div>
  );
}
