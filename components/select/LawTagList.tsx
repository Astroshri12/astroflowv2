"use client";

type Props = {
  laws: readonly string[];
  variant?: "muted" | "accent";
};

export function LawTagList({ laws, variant = "muted" }: Props) {
  const chip =
    variant === "accent"
      ? "border-[color-mix(in_oklab,white_22%,transparent)] bg-[color-mix(in_oklab,white_8%,transparent)] text-[color-mix(in_oklab,var(--text)_95%,white)]"
      : "border-[color-mix(in_oklab,white_12%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] text-[color-mix(in_oklab,var(--text)_88%,transparent)]";

  return (
    <ul className="flex flex-wrap gap-2">
      {laws.map((law) => (
        <li
          key={law}
          className={`rounded-sm border px-2.5 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide ${chip}`}
        >
          {law}
        </li>
      ))}
    </ul>
  );
}
