/**
 * Small decorative rocket / missile glyphs with CSS motion (see `globals.css`).
 * Marked aria-hidden — purely ornamental.
 */

type Props = {
  className?: string;
  /** `onAccent`: light strokes for buttons with navy background */
  palette?: "accent" | "onAccent";
};

export function RocketGlyphAnimated({ className = "", palette = "accent" }: Props) {
  const body = palette === "onAccent" ? "text-white opacity-95" : "text-accent opacity-95";
  const fins = palette === "onAccent" ? "text-white/75" : "text-accent/70";
  const exhaust = palette === "onAccent" ? "text-amber-200/90" : "text-warning/85";

  return (
    <span className={`inline-flex shrink-0 origin-center animate-rocket-bob ${className}`} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 24 32" fill="none" aria-hidden>
        <path
          d="M12 2 17 12h4l-3 3-5-1-1 14-1-14-5 1-3-3h4L12 2Z"
          fill="currentColor"
          className={body}
        />
        <path d="M9 22 7 28M15 22l2 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={fins} />
        <ellipse cx="12" cy="29" rx="3" ry="1.2" fill="currentColor" className={`animate-exhaust-flicker ${exhaust}`} />
      </svg>
    </span>
  );
}

export function MissileGlyphAnimated({ className = "" }: Omit<Props, "palette">) {
  return (
    <span className={`inline-flex shrink-0 origin-center animate-missile-cruise ${className}`} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 40 16" fill="none" aria-hidden>
        <path
          d="M2 8h22l4-3v6l-4-3H2a2 2 0 0 1-2-2V8Z"
          fill="currentColor"
          className="text-fg-secondary opacity-90"
        />
        <path d="M26 5 34 8l-8 3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="text-fg-muted" />
        <path d="M8 11v2M14 11v2M20 11v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-[color-mix(in_oklab,var(--surface)_92%,transparent)]" />
        <circle cx="4" cy="8" r="1.5" fill="currentColor" className="animate-exhaust-flicker text-info/90" />
      </svg>
    </span>
  );
}
