"use client";

const STEPS = [
  { id: 1 as const, label: "Select", short: "01" },
  { id: 2 as const, label: "Parameters", short: "02" },
  { id: 3 as const, label: "Results", short: "03" },
];

type Props = { current: 1 | 2 | 3 };

export function StepIndicator({ current }: Props) {
  return (
    <nav
      className="flex items-center gap-2 sm:gap-4"
      aria-label="Analysis progress"
    >
      {STEPS.map((s) => {
        const active = s.id === current;
        const done = s.id < current;
        return (
          <div
            key={s.id}
            className={`flex items-center gap-2 rounded-sm px-2 py-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wider transition-colors ${
              active
                ? "bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] text-accent"
                : done
                  ? "text-info/85"
                  : "text-fg-ghost"
            }`}
          >
            <span
              className={`inline-flex h-6 min-w-6 items-center justify-center rounded-sm border text-[10px] ${
                active
                  ? "border-accent bg-[color-mix(in_oklab,var(--accent)_15%,transparent)]"
                  : done
                    ? "border-info/45"
                    : "border-foreground/25"
              }`}
            >
              {s.short}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
