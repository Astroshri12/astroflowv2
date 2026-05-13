"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DataCredits } from "@/components/layout/DataCredits";
import { AgencyBackdropLogos } from "@/components/ui/AgencyBackdropLogos";
import { MissileGlyphAnimated, RocketGlyphAnimated } from "@/components/ui/AeroVehicleDecor";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MissionFailure, FailureCategory } from "@/types/mission-intel";
import { MISSION_FAILURES } from "@/data/mission-failures";

/** Distinct chart tones — navy ladder for contrast on white surfaces. */
const CAT_COLORS: Record<FailureCategory, string> = {
  propulsion: "#1e3a5f",
  software: "#2c4a6e",
  structural: "#3d5a80",
  human: "#4d6b92",
  guidance: "#5f7da3",
  design: "#7a93b8",
  environmental: "#9eb0cd",
  comms: "#c5d0e3",
};

const SEV_COLORS: Record<string, string> = {
  CRITICAL: "var(--semantic-danger)",
  HIGH: "var(--accent)",
  MEDIUM: "var(--semantic-info)",
  LOW: "var(--foreground-muted)",
};

const CHART_COLS = [
  "#dce5f2",
  "#b8c8e0",
  "#8fa6c9",
  "#5f7da3",
  "#3d5a80",
  "#2c4a6e",
  "#1e3a5f",
];

type StatGlyphVariant = "missions" | "cost" | "fatalities" | "critical";

function StatGlyph({ variant }: { variant: StatGlyphVariant }) {
  const cls = "h-8 w-8 shrink-0 text-accent";
  switch (variant) {
    case "missions":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
          <rect x="5" y="18" width="5" height="10" rx="1" opacity="0.85" />
          <rect x="13.5" y="12" width="5" height="16" rx="1" />
          <rect x="22" y="6" width="5" height="22" rx="1" opacity="0.75" />
        </svg>
      );
    case "cost":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="6" y="7" width="20" height="18" rx="2" />
          <path d="M10 12h12M10 16h12M10 20h8" strokeLinecap="round" />
        </svg>
      );
    case "fatalities":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <path d="M16 7 26 24H6L16 7Z" strokeLinejoin="round" />
          <path d="M16 12v7M16 22v1" strokeLinecap="round" />
        </svg>
      );
    case "critical":
      return (
        <svg className={cls} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="4" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function Pill({ cat }: { cat: FailureCategory }) {
  const c = CAT_COLORS[cat] ?? "#888";
  return (
    <span
      className="rounded-sm px-1.5 py-0.5 font-[family-name:var(--font-space-mono)] text-[10px] font-bold uppercase"
      style={{
        color: c,
        border: `1px solid ${c}55`,
        background: `${c}22`,
      }}
    >
      {cat}
    </span>
  );
}

function SevDot({ sev }: { sev: MissionFailure["severity"] }) {
  const c = SEV_COLORS[sev] ?? "#888";
  return (
    <span className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[11px]" style={{ color: c }}>
      <span className="inline-block h-2 w-2 rounded-full shadow-[0_0_6px_currentColor]" style={{ background: c }} />
      {sev}
    </span>
  );
}

function MissionModal({
  m,
  onClose,
}: {
  m: MissionFailure | null;
  onClose: () => void;
}) {
  if (!m) return null;
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[color-mix(in_oklab,var(--rim)_52%,transparent)] p-4 backdrop-blur-md"
      onClick={onClose}
      aria-hidden
    >
      <div
        role="dialog"
        className="relative max-h-[88vh] w-full max-w-[780px] overflow-y-auto rounded-lg border border-[color-mix(in_oklab,var(--rim)_14%,transparent)] bg-[var(--surface)] p-8 text-left shadow-[0_16px_48px_color-mix(in_oklab,var(--rim)_16%,transparent)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded border border-[color-mix(in_oklab,var(--rim)_18%,transparent)] bg-[color-mix(in_oklab,var(--rim)_8%,transparent)] px-2 py-1 font-[family-name:var(--font-space-mono)] text-[11px] text-foreground"
          onClick={onClose}
        >
          Close
        </button>
        <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-black text-foreground">{m.name}</h3>
        <p className="mt-2 font-[family-name:var(--font-space-mono)] text-[11px] text-fg-caption">
          {m.year} · {m.agency} · {m.type}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["Failure category", <Pill key="p" cat={m.category} />],
            ["Severity", <SevDot key="s" sev={m.severity} />],
            ["Vehicle", m.vehicle],
            ["Cost lost", `$${m.cost}M`],
            ["Destination", m.destination],
            [
              "Casualties",
              m.casualties > 0 ? (
                <span className="text-danger">{m.casualties} fatalities (recorded)</span>
              ) : (
                <span className="text-success">None</span>
              ),
            ],
          ].map(([lbl, val]) => (
            <div
              key={String(lbl)}
              className="rounded-md border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] p-3"
            >
              <div className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-fg-caption">
                {lbl}
              </div>
              <div className="mt-1 text-sm">{val as ReactNode}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,var(--rim)_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-secondary">
              Failure description
            </h4>
            <p className="mt-2">{m.desc}</p>
          </section>
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,var(--rim)_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-secondary">
              Root cause
            </h4>
            <p className="mt-2">{m.root}</p>
          </section>
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,var(--rim)_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-soft">
              Lessons learned
            </h4>
            <ul className="mt-3 space-y-2 rounded-md border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] p-4">
              {m.lessons.map((l, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="font-bold text-accent">›</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

type TabKey = "dashboard" | "missions" | "timeline" | "patterns" | "analyzer";

export function MissionIntelApp() {
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState<string>("ALL");
  const [sevF, setSevF] = useState<string>("ALL");
  const [eraF, setEraF] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("year-desc");
  const [modal, setModal] = useState<MissionFailure | null>(null);

  const missions = MISSION_FAILURES;

  const filtered = useMemo(() => {
    let ms = missions.filter((m) => {
      if (catF !== "ALL" && m.category !== catF) return false;
      if (sevF !== "ALL" && m.severity !== sevF) return false;
      if (eraF !== "ALL") {
        const [a, b] = eraF.split("-").map(Number);
        if (m.year < a || m.year > b) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.vehicle.toLowerCase().includes(q) &&
          !m.agency.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
    if (sort === "year-desc") ms = [...ms].sort((a, b) => b.year - a.year);
    else if (sort === "year-asc") ms = [...ms].sort((a, b) => a.year - b.year);
    else if (sort === "cost-desc") ms = [...ms].sort((a, b) => b.cost - a.cost);
    else ms = [...ms].sort((a, b) => a.name.localeCompare(b.name));
    return ms;
  }, [missions, search, catF, sevF, eraF, sort]);

  const catData = useMemo(() => {
    const c: Partial<Record<FailureCategory, number>> = {};
    missions.forEach((m) => {
      c[m.category] = (c[m.category] ?? 0) + 1;
    });
    return Object.entries(c).map(([name, value]) => ({
      name: name.toUpperCase(),
      value: value as number,
      color: CAT_COLORS[name as FailureCategory] ?? "#888",
    }));
  }, [missions]);

  /** Patterns tab: same breakdown as sidebar / missions list (respects filters). */
  const patternCatData = useMemo(() => {
    const c: Partial<Record<FailureCategory, number>> = {};
    filtered.forEach((m) => {
      c[m.category] = (c[m.category] ?? 0) + 1;
    });
    return Object.entries(c).map(([name, value]) => ({
      name: name.toUpperCase(),
      value: value as number,
      color: CAT_COLORS[name as FailureCategory] ?? "#888",
    }));
  }, [filtered]);

  const decData = useMemo(() => {
    const d: Record<number, number> = {};
    missions.forEach((m) => {
      const k = Math.floor(m.year / 10) * 10;
      d[k] = (d[k] ?? 0) + 1;
    });
    return Object.entries(d)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([k, v]) => ({ name: `${k}s`, value: v }));
  }, [missions]);

  const totalCost = useMemo(() => missions.reduce((s, m) => s + m.cost, 0), [missions]);
  const totalDeaths = useMemo(() => missions.reduce((s, m) => s + m.casualties, 0), [missions]);

  const CATS = [...new Set(missions.map((m) => m.category))];
  const SEVS = ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;
  const ERAS = [
    ["ALL", "ALL ERAS"],
    ["1957-1969", "SPACE RACE"],
    ["1970-1989", "COLD WAR"],
    ["1990-2009", "MODERN"],
    ["2010-2025", "RECENT"],
  ] as const;

  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(min-width: 1024px)").matches) return;
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [tab]);

  const tabBtn = (t: TabKey, label: string, highlight?: boolean) => (
    <button
      type="button"
      key={t}
      onClick={() => setTab(t)}
      className={`rounded px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide transition-colors ${
        tab === t
          ? highlight
            ? "border border-[color-mix(in_oklab,var(--rim)_18%,transparent)] bg-[color-mix(in_oklab,var(--rim)_6%,transparent)] text-foreground"
            : "border border-[color-mix(in_oklab,var(--rim)_18%,transparent)] bg-[color-mix(in_oklab,var(--rim)_6%,transparent)] text-accent"
          : "border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] text-fg-caption hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative isolate min-h-screen bg-[var(--bg)] text-foreground">
      <AgencyBackdropLogos variant="muted" />
      <header className="sticky top-0 z-[200] flex flex-wrap items-center gap-4 border-b border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--bg)_96%,transparent)] px-6 py-4 backdrop-blur-xl">
        <div>
          <Link href="/" className="font-[family-name:var(--font-orbitron)] text-lg font-black tracking-[0.08em]">
            <span className="text-foreground">
              ASTRO<span className="text-accent">FLOW</span>
            </span>
          </Link>
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.15em] text-fg-caption">
            Mission intelligence · {missions.length} failures indexed
          </p>
        </div>
        <nav className="flex flex-wrap gap-1">
          {tabBtn("dashboard", "Dashboard")}
          {tabBtn("missions", "Missions")}
          {tabBtn("timeline", "Timeline")}
          {tabBtn("patterns", "Patterns")}
          {tabBtn("analyzer", "Analyzer", true)}
        </nav>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          <div className="hidden items-center gap-2 sm:flex" aria-hidden>
            <RocketGlyphAnimated className="h-8 w-6 text-accent" />
            <MissileGlyphAnimated className="h-5 w-14 text-fg-secondary" />
          </div>
          <div className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[11px] text-fg-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_8px_color-mix(in_oklab,var(--accent)_55%,transparent)]" />
            LIVE
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="flex h-fit flex-col gap-3 rounded-lg border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_96%,var(--bg))] p-4 lg:sticky lg:top-[88px]">
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.2em] text-fg-caption">
            Search & filter
          </p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mission, vehicle, agency…"
            className="w-full rounded border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--input-bg)] px-3 py-2 font-[family-name:var(--font-space-mono)] text-xs text-foreground outline-none focus:border-accent/45"
          />
          <div className="rounded-md border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-fg-caption">
              Category
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setCatF("ALL")}
                className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${catF === "ALL" ? "border border-accent text-accent" : "border border-transparent text-fg-caption"}`}
              >
                ALL
              </button>
              {CATS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCatF(catF === c ? "ALL" : c)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${catF === c ? "border border-accent text-accent" : "border border-transparent text-fg-caption"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-fg-caption">
              Era
            </p>
            <div className="flex flex-wrap gap-1">
              {ERAS.map(([v, l]) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setEraF(v)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[9px] uppercase ${eraF === v ? "border border-accent text-accent" : "border border-transparent text-fg-caption"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-fg-caption">
              Severity
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setSevF("ALL")}
                className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${sevF === "ALL" ? "border border-accent text-accent" : "border border-transparent text-fg-caption"}`}
              >
                ALL
              </button>
              {SEVS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSevF(sevF === s ? "ALL" : s)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${sevF === s ? "border border-accent text-accent" : "border border-transparent text-fg-caption"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 border-t border-[color-mix(in_oklab,var(--rim)_8%,transparent)] pt-4 font-[family-name:var(--font-space-mono)] text-[11px]">
            <div className="flex justify-between rounded bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] px-2 py-2">
              <span className="text-fg-caption">Filtered</span>
              <span className="text-accent">{filtered.length}</span>
            </div>
            <div className="flex justify-between rounded bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] px-2 py-2">
              <span className="text-fg-caption">Casualties</span>
              <span className="text-accent">{totalDeaths}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              const res = await fetch("/api/export/missions");
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "AstroFlow_Mission_Archive.html";
              a.rel = "noopener";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="mt-2 w-full rounded-md border border-[color-mix(in_oklab,var(--rim)_18%,transparent)] bg-transparent py-2.5 font-[family-name:var(--font-orbitron)] text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-[color-mix(in_oklab,var(--rim)_6%,transparent)]"
          >
            Download HTML report
          </button>
        </aside>

        <main ref={mainRef} className="min-w-0 space-y-6">
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  [
                    {
                      variant: "missions" as const,
                      val: missions.length,
                      label: "MISSIONS INDEXED",
                      sub: "Documented failures",
                    },
                    {
                      variant: "cost" as const,
                      val: `$${(totalCost / 1000).toFixed(1)}B`,
                      label: "TOTAL COST LOST",
                      sub: "Estimated",
                    },
                    {
                      variant: "fatalities" as const,
                      val: totalDeaths,
                      label: "FATALITIES",
                      sub: "Recorded",
                    },
                    {
                      variant: "critical" as const,
                      val: missions.filter((m) => m.severity === "CRITICAL").length,
                      label: "CRITICAL EVENTS",
                      sub: "Max severity",
                    },
                  ] as const
                ).map(({ variant, val, label, sub }) => (
                  <div
                    key={label}
                    className="clip-panel relative overflow-hidden border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--surface)] p-5"
                  >
                    <div className="absolute left-0 right-0 top-0 h-px bg-[color-mix(in_oklab,var(--rim)_18%,transparent)]" />
                    <StatGlyph variant={variant} />
                    <div className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-accent">{val}</div>
                    <div className="mt-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-fg-caption">
                      {label}
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-space-mono)] text-[10px] text-fg-caption">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_82%,var(--bg))] p-4">
                  <p className="mb-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-caption">
                    Failure categories
                  </p>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={catData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {catData.map((e, i) => (
                          <Cell key={e.name} fill={e.color ?? CHART_COLS[i % CHART_COLS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#ffffff",
                          border: "1px solid #c7d6eb",
                          borderRadius: 6,
                          fontSize: "11px",
                          color: "#0f172a",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_82%,var(--bg))] p-4">
                  <p className="mb-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-caption">
                    Failures by decade
                  </p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={decData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
                      <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          background: "#ffffff",
                          border: "1px solid #c7d6eb",
                          borderRadius: 6,
                          fontSize: "11px",
                          color: "#0f172a",
                        }}
                      />
                      <Bar dataKey="value" fill="#3d5a80" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {tab === "missions" && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-[family-name:var(--font-space-mono)] text-xs text-fg-caption">
                  Showing <span className="text-info">{filtered.length}</span> of {missions.length}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[11px] text-foreground"
                >
                  <option value="year-desc">Year ↓</option>
                  <option value="year-asc">Year ↑</option>
                  <option value="cost-desc">Cost ↓</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[color-mix(in_oklab,var(--rim)_12%,transparent)]">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead className="bg-[color-mix(in_oklab,var(--rim)_6%,transparent)]">
                    <tr>
                      {["Mission", "Year", "Agency", "Vehicle", "Type", "Severity", "Cost", ""].map((h) => (
                        <th
                          key={h}
                          className="border-b border-[color-mix(in_oklab,var(--rim)_12%,transparent)] px-4 py-3 text-left font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-fg-secondary"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m) => (
                      <tr
                        key={m.id}
                        className="cursor-pointer border-b border-[color-mix(in_oklab,var(--rim)_6%,transparent)] hover:bg-[color-mix(in_oklab,var(--rim)_5%,transparent)]"
                        onClick={() => setModal(m)}
                      >
                        <td className="px-4 py-3 font-semibold">{m.name}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-space-mono)] text-info">{m.year}</td>
                        <td className="px-4 py-3">{m.agency}</td>
                        <td className="px-4 py-3 text-fg-muted">{m.vehicle}</td>
                        <td className="px-4 py-3">
                          <Pill cat={m.category} />
                        </td>
                        <td className="px-4 py-3">
                          <SevDot sev={m.severity} />
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-space-mono)] text-info">${m.cost}M</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            className="rounded border border-[color-mix(in_oklab,var(--rim)_14%,transparent)] px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] text-fg-soft"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModal(m);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "timeline" && (
            <div className="relative">
              <div
                className="pointer-events-none absolute bottom-0 left-3 top-2 w-px -translate-x-1/2 bg-[color-mix(in_oklab,var(--rim)_22%,transparent)]"
                aria-hidden
              />
              <div className="flex flex-col gap-6">
                {[...missions].sort((a, b) => a.year - b.year).map((m) => (
                  <div key={m.id} className="relative z-[1] flex gap-4">
                    <div className="flex w-6 shrink-0 justify-center pt-2">
                      <div
                        className="h-3 w-3 shrink-0 rounded-full border-2 bg-[var(--bg)] shadow-[0_0_8px_currentColor]"
                        style={{
                          borderColor: SEV_COLORS[m.severity] ?? "#a1a1aa",
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="min-w-0 flex-1 rounded-lg border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[var(--surface)] p-4 text-left transition-colors hover:border-[color-mix(in_oklab,var(--rim)_22%,transparent)]"
                      onClick={() => setModal(m)}
                    >
                      <div className="font-[family-name:var(--font-orbitron)] text-[11px] uppercase tracking-wide text-fg-secondary">{m.year}</div>
                      <div className="mt-1 font-[family-name:var(--font-space-mono)] text-sm font-bold">{m.name}</div>
                      <p className="mt-2 line-clamp-3 text-sm text-fg-soft">{m.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Pill cat={m.category} />
                        <SevDot sev={m.severity} />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "patterns" && (
            <div className="space-y-6">
              <div>
                <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-caption">
                  Root cause pattern analysis
                </p>
                {filtered.length > 0 && filtered.length < missions.length ? (
                  <p className="mt-1.5 max-w-2xl text-sm text-fg-muted">
                    Category counts match your sidebar filters ({filtered.length} of {missions.length}{" "}
                    missions).
                  </p>
                ) : null}
              </div>
              {filtered.length === 0 ? (
                <div className="rounded-lg border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] px-6 py-10 text-center">
                  <p className="font-[family-name:var(--font-rajdhani)] text-sm font-medium text-fg-secondary">
                    No missions match these filters.
                  </p>
                  <p className="mt-2 text-sm text-fg-soft">
                    Clear the search box or reset category, severity, and era to see category patterns
                    again.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[...patternCatData]
                    .sort((a, b) => b.value - a.value)
                    .map((d) => {
                      const pct = Math.round((d.value / filtered.length) * 100);
                      return (
                        <div key={d.name} className="clip-panel border border-[color-mix(in_oklab,var(--rim)_10%,transparent)] bg-[var(--surface)] p-5">
                          <div className="font-[family-name:var(--font-space-mono)] text-[11px] text-fg-caption">{d.name}</div>
                          <div className="font-[family-name:var(--font-orbitron)] text-3xl font-black" style={{ color: d.color }}>
                            {d.value}
                          </div>
                          <div className="mt-1 font-[family-name:var(--font-space-mono)] text-[11px] text-info">
                            {pct}% of filtered set
                          </div>
                          <div className="mt-3 h-1 overflow-hidden rounded bg-[color-mix(in_oklab,var(--rim)_10%,transparent)]">
                            <div className="h-full rounded" style={{ width: `${pct}%`, background: d.color }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
              <div className="rounded-lg border border-[color-mix(in_oklab,var(--rim)_12%,transparent)] bg-[color-mix(in_oklab,var(--rim)_4%,transparent)] p-6">
                <h3 className="border-b border-[color-mix(in_oklab,var(--rim)_10%,transparent)] pb-2 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-fg-secondary">
                  Key systemic insights
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                  {[
                    "Software and guidance failures are highly preventable with full envelope testing and independent parameter verification.",
                    "Propulsion failures drive outsized cost impact — proof testing, FOD controls, and COPV handling discipline matter.",
                    "Human factors and schedule pressure repeatedly override engineering judgment — independent safety authority is essential.",
                    "Design single-point failures are reduced by poka-yoke, orientation keys, and redundant sensing paths.",
                    "Rigorous SI units and ICD discipline prevent integration errors like mixed lbf·s vs N·s.",
                  ].map((ins, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-accent">›</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "analyzer" && (
            <div className="clip-panel relative overflow-hidden border border-[color-mix(in_oklab,var(--rim)_14%,transparent)] bg-[var(--surface)] p-8 text-center">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 animate-border-shimmer opacity-60"
                aria-hidden
              />
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                <RocketGlyphAnimated className="h-11 w-8 text-accent sm:translate-y-0.5" />
                <div>
                  <h3 className="font-[family-name:var(--font-orbitron)] text-xl text-foreground">Structural analysis workflow</h3>
                  <p className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-fg-soft">
                    Run the three-step AstroFlow analyzer (vehicle selection → parameters → fused physics + archive verdict).
                  </p>
                </div>
                <MissileGlyphAnimated className="h-8 w-[4.25rem] text-fg-muted sm:translate-y-0.5" />
              </div>
              <Link
                href="/analyze"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 font-[family-name:var(--font-orbitron)] text-xs font-bold uppercase tracking-widest text-on-accent transition-[transform,filter] hover:opacity-90 active:scale-[0.99]"
              >
                <RocketGlyphAnimated className="h-5 w-4" palette="onAccent" />
                Open analyzer
              </Link>
            </div>
          )}
        </main>
      </div>

      <footer className="mx-auto mt-10 max-w-[1400px] border-t border-[color-mix(in_oklab,var(--rim)_10%,transparent)] px-4 pb-10 pt-8 sm:px-6">
        <DataCredits className="max-w-3xl text-balance" />
      </footer>

      <MissionModal m={modal} onClose={() => setModal(null)} />
    </div>
  );
}
