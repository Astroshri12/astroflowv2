"use client";

type Props = {
  busy: boolean;
  text: string;
};

export function AiAnalysisPanel({ busy, text }: Props) {
  return (
    <section className="clip-panel relative border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--input-bg)] p-6">
      <div className="absolute -top-3 left-4 bg-[var(--bg)] px-2 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-widest text-[var(--cyan)]">
        {"// AI INTERPRETATION"}
      </div>

      <div className="relative mt-2 min-h-[120px]">
        {busy ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-[var(--accent)] [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-[var(--accent)] [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-[var(--accent)] [animation-delay:300ms]" />
              </span>
              <span className="font-[family-name:var(--font-space-mono)] text-xs text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                Contacting Claude…
              </span>
            </div>
            <div className="relative h-8 overflow-hidden rounded-sm border border-[color-mix(in_oklab,white_10%,transparent)] bg-[var(--bg)]">
              <div className="animate-scan-line absolute inset-y-0 w-px bg-[var(--cyan)] opacity-70" />
            </div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_92%,white)]">
            {text || "—"}
          </pre>
        )}
      </div>
    </section>
  );
}
