"use client";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  className?: string;
};

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-[family-name:var(--font-rajdhani)] text-sm font-semibold uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none clip-panel";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_1px_0_color-mix(in_oklab,var(--rim)_22%,transparent)] hover:opacity-90",
    ghost:
      "border border-[color-mix(in_oklab,var(--cyan)_40%,transparent)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] text-[var(--text)] hover:border-[color-mix(in_oklab,var(--text)_35%,transparent)]",
    danger:
      "border border-[color-mix(in_oklab,var(--text-muted)_45%,transparent)] text-[color-mix(in_oklab,var(--text)_82%,var(--rim))] hover:bg-[color-mix(in_oklab,var(--rim)_6%,transparent)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
