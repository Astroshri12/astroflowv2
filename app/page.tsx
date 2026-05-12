import Link from "next/link";

export default function HomePage() {
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
            className="clip-panel group flex min-h-[12.5rem] flex-col border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-6 shadow-[0_1px_0_color-mix(in_oklab,var(--rim)_6%,transparent)] transition-[border-color,box-shadow] hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)] hover:shadow-[0_2px_12px_color-mix(in_oklab,var(--rim)_8%,transparent)] sm:min-h-0 sm:p-8"
          >
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
          </Link>

          <Link
            href="/analyze"
            className="clip-panel group flex min-h-[12.5rem] flex-col border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-6 shadow-[0_1px_0_color-mix(in_oklab,var(--rim)_6%,transparent)] transition-[border-color,box-shadow] hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)] hover:shadow-[0_2px_12px_color-mix(in_oklab,var(--rim)_8%,transparent)] sm:min-h-0 sm:p-8"
          >
            <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
              Structural analysis
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-soft sm:text-[0.9375rem] sm:leading-relaxed">
              Three-step workflow: pick vehicle, enter parameters, view fused physics and archive
              verdict.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-space-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-accent transition-transform group-hover:gap-2">
              Launch analyzer
              <span aria-hidden className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
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
