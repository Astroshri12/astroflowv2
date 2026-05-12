import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[color-mix(in_oklab,var(--rim)_10%,transparent)] px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
            AstroFlow
          </p>
          <h1 className="font-[family-name:var(--font-orbitron)] text-3xl tracking-wide sm:text-4xl">
            Aerospace mission intelligence & structural screening
          </h1>
          <p className="max-w-2xl font-[family-name:var(--font-rajdhani)] text-base leading-relaxed text-[color-mix(in_oklab,var(--text)_78%,transparent)]">
            Explore documented mission failures, dashboards, and pattern views — or run the
            multi-step physics + archive fusion analyzer for rocket, missile, and aircraft sizing
            exercises.
          </p>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/intel"
            className="clip-panel group border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-8 transition-colors hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)]"
          >
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl text-[var(--text)]">
              Mission intelligence
            </h2>
            <p className="mt-3 font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_72%,transparent)]">
              36 archived failures · dashboards · filters · timeline · pattern summaries over the
              database.
            </p>
            <span className="mt-6 inline-block font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider text-[var(--accent)]">
              Open intelligence suite →
            </span>
          </Link>
          <Link
            href="/analyze"
            className="clip-panel group border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-8 transition-colors hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)]"
          >
            <h2 className="font-[family-name:var(--font-orbitron)] text-xl text-[var(--text)]">
              Structural analysis
            </h2>
            <p className="mt-3 font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_72%,transparent)]">
              Three-step workflow: pick vehicle, enter parameters, view fused physics and archive
              verdict.
            </p>
            <span className="mt-6 inline-block font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider text-[var(--accent)]">
              Launch analyzer →
            </span>
          </Link>
        </div>
        <p className="font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_50%,transparent)]">
          <a
            className="text-[color-mix(in_oklab,var(--text)_70%,transparent)] underline decoration-[color-mix(in_oklab,var(--rim)_25%,transparent)] hover:text-[var(--accent)]"
            href="/api/export/missions"
            download="AstroFlow_Mission_Archive.html"
          >
            Download mission archive (HTML)
          </a>{" "}
          — same table as Mission intelligence, for offline use.
        </p>
      </main>
    </div>
  );
}
