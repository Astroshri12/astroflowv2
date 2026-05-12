/**
 * Faint NASA / ESA / ISRO-style marks for page backgrounds (educational watermark).
 * Not official reproductions — simplified geometry inspired by public insignia.
 */

function NasaMeatballMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden>
      <circle cx="64" cy="64" r="58" fill="#0B3D91" />
      <ellipse
        cx="64"
        cy="64"
        rx="48"
        ry="17"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        transform="rotate(-32 64 64)"
        opacity="0.92"
      />
      <path d="M36 92 64 22l28 70H36Z" fill="#FC3D21" />
      <circle cx="38" cy="44" r="3.2" fill="#FFFFFF" />
      <circle cx="52" cy="34" r="3.2" fill="#FFFFFF" />
      <circle cx="70" cy="32" r="3.2" fill="#FFFFFF" />
      <circle cx="88" cy="38" r="3.2" fill="#FFFFFF" />
      <circle cx="96" cy="52" r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

function EsaRoundelMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" aria-hidden>
      <circle cx="64" cy="64" r="58" fill="#003399" />
      <path d="M38 46h52v9H38zm0 18h44v9H38zm0 18h52v9H38z" fill="#FFFFFF" opacity="0.96" />
    </svg>
  );
}

function IsroEmblemMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 100" fill="none" aria-hidden>
      <rect x="14" y="18" width="112" height="20" rx="2" fill="#FF9933" />
      <rect x="14" y="40" width="112" height="20" rx="2" fill="#FFFFFF" />
      <rect x="14" y="62" width="112" height="20" rx="2" fill="#138808" />
      <circle cx="70" cy="50" r="14" fill="none" stroke="#0c1929" strokeWidth="2.2" opacity="0.42" />
      <circle cx="70" cy="50" r="3.5" fill="#0c1929" opacity="0.38" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = 70 + 9 * Math.cos(a);
        const y1 = 50 + 9 * Math.sin(a);
        const x2 = 70 + 12.5 * Math.cos(a);
        const y2 = 50 + 12.5 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0c1929" strokeWidth="1.4" opacity="0.38" />;
      })}
      <path
        d="M98 28c8 6 12 14 12 22"
        stroke="#0c1929"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.32"
      />
      <circle cx="112" cy="26" r="4" fill="#0c1929" opacity="0.28" />
    </svg>
  );
}

type LayerProps = {
  /** Slightly stronger marks on darker-tinted shells */
  variant?: "light" | "muted";
};

export function AgencyBackdropLogos({ variant = "light" }: LayerProps) {
  const strength = variant === "muted" ? "opacity-[0.055] sm:opacity-[0.07]" : "opacity-[0.065] sm:opacity-[0.085]";

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${strength}`}
      aria-hidden
    >
      <div className="absolute left-[min(4%,2rem)] top-[min(16%,7rem)] w-[min(42vw,11.5rem)] animate-agency-drift sm:w-48">
        <NasaMeatballMark className="h-auto w-full drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]" />
      </div>
      <div className="absolute right-[min(3%,1.25rem)] top-[min(22%,8.5rem)] w-[min(38vw,10.5rem)] animate-agency-drift-alt sm:right-8 sm:w-44">
        <EsaRoundelMark className="h-auto w-full drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]" />
      </div>
      <div className="absolute bottom-[min(8%,3.5rem)] left-1/2 w-[min(72vw,20rem)] -translate-x-1/2 sm:bottom-10 sm:w-[22rem]">
        <div className="animate-agency-drift-slow">
          <IsroEmblemMark className="h-auto w-full drop-shadow-[0_1px_0_rgba(255,255,255,0.28)]" />
        </div>
      </div>
    </div>
  );
}
