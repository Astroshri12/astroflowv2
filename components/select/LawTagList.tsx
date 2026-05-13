"use client";

type Variant = "muted" | "accent" | "spectrum";

type Props = {
  laws: readonly string[];
  variant?: Variant;
};

/** Rotating rim + fill tints aligned with AstroFlow semantic palette */
const SPECTRUM_STYLES = [
  "border-accent/55 bg-[color-mix(in_oklab,var(--accent)_14%,var(--surface))] text-fg-secondary",
  "border-info/50 bg-[color-mix(in_oklab,var(--semantic-info)_12%,var(--surface))] text-fg-secondary",
  "border-success/48 bg-[color-mix(in_oklab,var(--semantic-success)_10%,var(--surface))] text-fg-secondary",
  "border-warning/45 bg-[color-mix(in_oklab,var(--semantic-warning)_10%,var(--surface))] text-fg-secondary",
] as const;

export function LawTagList({ laws, variant = "muted" }: Props) {
  if (variant === "spectrum") {
    return (
      <ul className="flex flex-wrap gap-2.5">
        {laws.map((law, i) => (
          <li
            key={law}
            className={`rounded-md border px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-px hover:shadow-[0_6px_16px_-8px_color-mix(in_oklab,var(--rim)_25%,transparent)] ${SPECTRUM_STYLES[i % SPECTRUM_STYLES.length]}`}
          >
            {law}
          </li>
        ))}
      </ul>
    );
  }

  const chip =
    variant === "accent"
      ? "border-accent/40 bg-[color-mix(in_oklab,var(--accent)_11%,var(--surface))] text-fg-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
      : "border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] text-fg-secondary";

  return (
    <ul className="flex flex-wrap gap-2">
      {laws.map((law) => (
        <li
          key={law}
          className={`rounded-md border px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide ${chip}`}
        >
          {law}
        </li>
      ))}
    </ul>
  );
}
