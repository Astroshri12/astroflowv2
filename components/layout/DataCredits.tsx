/**
 * Public-data attribution — shown in footers site-wide.
 */
export function DataCredits({ className = "" }: { className?: string }) {
  return (
    <p
      className={`max-w-prose font-[family-name:var(--font-space-mono)] text-[10px] leading-relaxed tracking-[0.06em] text-fg-caption sm:text-[11px] ${className}`}
    >
      Curated mission material draws on public references from{" "}
      <abbr title="National Aeronautics and Space Administration" className="font-semibold text-fg-secondary no-underline">
        NASA
      </abbr>
      ,{" "}
      <abbr title="European Space Agency" className="font-semibold text-fg-secondary no-underline">
        ESA
      </abbr>
      ,{" "}
      <abbr title="Indian Space Research Organisation" className="font-semibold text-fg-secondary no-underline">
        ISRO
      </abbr>
      , the{" "}
      <abbr title="Federal Aviation Administration" className="font-semibold text-fg-secondary no-underline">
        FAA
      </abbr>
      , and similar open sources. AstroFlow is for{" "}
      <strong className="font-semibold text-fg-secondary">educational purposes only</strong>
      — not flight certification, airworthiness approval, or operational guidance.
    </p>
  );
}
