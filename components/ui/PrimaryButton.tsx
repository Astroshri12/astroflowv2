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
      "bg-accent text-on-accent shadow-[0_1px_0_color-mix(in_oklab,var(--rim)_22%,transparent)] hover:opacity-90",
    ghost:
      "border border-info/40 bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] text-foreground hover:border-fg-muted",
    danger:
      "border border-danger/40 bg-danger/[0.07] text-danger hover:bg-danger/12",
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
