"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
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

/** Distinct chart tones — all neutral zinc steps (monochrome). */
const CAT_COLORS: Record<FailureCategory, string> = {
  propulsion: "#e4e4e7",
  software: "#d4d4d8",
  structural: "#c4c4c8",
  human: "#a1a1aa",
  guidance: "#94949c",
  design: "#86868d",
  environmental: "#78787f",
  comms: "#6b6b70",
};

const SEV_COLORS: Record<string, string> = {
  CRITICAL: "#fafafa",
  HIGH: "#d4d4d8",
  MEDIUM: "#a1a1aa",
  LOW: "#71717a",
};

const CHART_COLS = [
  "#e4e4e7",
  "#c4c4c8",
  "#a1a1aa",
  "#86868d",
  "#71717a",
  "#52525b",
  "#3f3f46",
  "#27272a",
];

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
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
      aria-hidden
    >
      <div
        role="dialog"
        className="relative max-h-[88vh] w-full max-w-[780px] overflow-y-auto rounded-lg border border-[color-mix(in_oklab,white_14%,transparent)] bg-[var(--surface)] p-8 text-left shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded border border-[color-mix(in_oklab,white_18%,transparent)] bg-[color-mix(in_oklab,white_8%,transparent)] px-2 py-1 font-[family-name:var(--font-space-mono)] text-[11px] text-[var(--text)]"
          onClick={onClose}
        >
          Close
        </button>
        <h3 className="font-[family-name:var(--font-orbitron)] text-xl font-black text-[var(--text)]">{m.name}</h3>
        <p className="mt-2 font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
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
                <span className="text-[var(--fail)]">⚠ {m.casualties} fatalities</span>
              ) : (
                <span className="text-[var(--pass)]">None</span>
              ),
            ],
          ].map(([lbl, val]) => (
            <div
              key={String(lbl)}
              className="rounded-md border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,white_4%,transparent)] p-3"
            >
              <div className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                {lbl}
              </div>
              <div className="mt-1 text-sm">{val as ReactNode}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,white_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_70%,transparent)]">
              Failure description
            </h4>
            <p className="mt-2">{m.desc}</p>
          </section>
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,white_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_70%,transparent)]">
              Root cause
            </h4>
            <p className="mt-2">{m.root}</p>
          </section>
          <section>
            <h4 className="border-b border-[color-mix(in_oklab,white_12%,transparent)] pb-1 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_75%,transparent)]">
              Lessons learned
            </h4>
            <ul className="mt-3 space-y-2 rounded-md border border-[color-mix(in_oklab,white_12%,transparent)] bg-[color-mix(in_oklab,white_4%,transparent)] p-4">
              {m.lessons.map((l, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="font-bold text-[var(--accent)]">›</span>
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

type TabKey = "dashboard" | "missions" | "timeline" | "patterns" | "ai" | "analyzer";

export function MissionIntelApp() {
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState<string>("ALL");
  const [sevF, setSevF] = useState<string>("ALL");
  const [eraF, setEraF] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("year-desc");
  const [modal, setModal] = useState<MissionFailure | null>(null);
  const [aiPr, setAiPr] = useState("");
  const [aiOut, setAiOut] = useState("");
  const [aiLoad, setAiLoad] = useState(false);

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

  const catSummary = useMemo(() => {
    const lines = catData.map((x) => `${x.name}: ${x.value}`).join("; ");
    return `Failure categories — ${lines}`;
  }, [catData]);

  async function runAI() {
    if (!aiPr.trim()) return;
    setAiLoad(true);
    setAiOut("");
    try {
      const systemPrompt = `You are an aerospace failure analysis expert. The AstroFlow database contains ${missions.length} documented mission failures spanning ${Math.min(...missions.map((m) => m.year))}–${Math.max(...missions.map((m) => m.year))}. ${catSummary}. Be concise, technically precise, and bold key terms with **markdown**.`;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: aiPr, systemPrompt }),
      });
      const data = (await res.json()) as { text?: string };
      setAiOut(data.text ?? "No response.");
    } catch (e) {
      setAiOut(e instanceof Error ? e.message : "Request failed.");
    }
    setAiLoad(false);
  }

  const CATS = [...new Set(missions.map((m) => m.category))];
  const SEVS = ["CRITICAL", "HIGH", "MEDIUM", "LOW"] as const;
  const ERAS = [
    ["ALL", "ALL ERAS"],
    ["1957-1969", "SPACE RACE"],
    ["1970-1989", "COLD WAR"],
    ["1990-2009", "MODERN"],
    ["2010-2025", "RECENT"],
  ] as const;

  const tabBtn = (t: TabKey, label: string, highlight?: boolean) => (
    <button
      type="button"
      key={t}
      onClick={() => setTab(t)}
      className={`rounded px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide transition-colors ${
        tab === t
          ? highlight
            ? "border border-[color-mix(in_oklab,white_18%,transparent)] bg-[color-mix(in_oklab,white_6%,transparent)] text-[var(--text)]"
            : "border border-[color-mix(in_oklab,white_18%,transparent)] bg-[color-mix(in_oklab,white_6%,transparent)] text-[var(--accent)]"
          : "border border-[color-mix(in_oklab,white_10%,transparent)] text-[color-mix(in_oklab,var(--text)_55%,transparent)] hover:border-[color-mix(in_oklab,white_22%,transparent)]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-[200] flex flex-wrap items-center gap-4 border-b border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--bg)_96%,transparent)] px-6 py-4 backdrop-blur-xl">
        <div>
          <Link href="/" className="font-[family-name:var(--font-orbitron)] text-lg font-black tracking-[0.08em]">
            <span className="text-[var(--text)]">
              ASTRO<span className="text-[var(--accent)]">FLOW</span>
            </span>
          </Link>
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.15em] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
            Mission intelligence · {missions.length} failures indexed
          </p>
        </div>
        <nav className="flex flex-wrap gap-1">
          {tabBtn("dashboard", "📊 Dashboard")}
          {tabBtn("missions", "🚀 Missions")}
          {tabBtn("timeline", "⏱ Timeline")}
          {tabBtn("patterns", "🔍 Patterns")}
          {tabBtn("ai", "🤖 AI")}
          {tabBtn("analyzer", "⚙ Analyzer", true)}
        </nav>
        <div className="ml-auto flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_65%,transparent)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_6px_rgba(255,255,255,0.15)]" />
          LIVE
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="flex h-fit flex-col gap-3 rounded-lg border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_96%,var(--bg))] p-4 lg:sticky lg:top-[88px]">
          <p className="font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
            Search & filter
          </p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mission, vehicle, agency…"
            className="w-full rounded border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--input-bg)] px-3 py-2 font-[family-name:var(--font-space-mono)] text-xs text-[var(--text)] outline-none focus:border-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
          />
          <div className="rounded-md border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
              Category
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setCatF("ALL")}
                className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${catF === "ALL" ? "border border-[var(--accent)] text-[var(--accent)]" : "border border-transparent text-[color-mix(in_oklab,var(--text)_55%,transparent)]"}`}
              >
                ALL
              </button>
              {CATS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCatF(catF === c ? "ALL" : c)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${catF === c ? "border border-[var(--accent)] text-[var(--accent)]" : "border border-transparent text-[color-mix(in_oklab,var(--text)_55%,transparent)]"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
              Era
            </p>
            <div className="flex flex-wrap gap-1">
              {ERAS.map(([v, l]) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setEraF(v)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[9px] uppercase ${eraF === v ? "border border-[var(--accent)] text-[var(--accent)]" : "border border-transparent text-[color-mix(in_oklab,var(--text)_55%,transparent)]"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface-muted)_95%,transparent)] p-3">
            <p className="mb-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
              Severity
            </p>
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setSevF("ALL")}
                className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${sevF === "ALL" ? "border border-[var(--accent)] text-[var(--accent)]" : ""}`}
              >
                ALL
              </button>
              {SEVS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSevF(sevF === s ? "ALL" : s)}
                  className={`rounded px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] uppercase ${sevF === s ? "border border-[var(--accent)] text-[var(--accent)]" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2 border-t border-[color-mix(in_oklab,white_8%,transparent)] pt-4 font-[family-name:var(--font-space-mono)] text-[11px]">
            <div className="flex justify-between rounded bg-[color-mix(in_oklab,white_4%,transparent)] px-2 py-2">
              <span className="text-[color-mix(in_oklab,var(--text)_55%,transparent)]">Filtered</span>
              <span className="text-[var(--accent)]">{filtered.length}</span>
            </div>
            <div className="flex justify-between rounded bg-[color-mix(in_oklab,white_4%,transparent)] px-2 py-2">
              <span className="text-[color-mix(in_oklab,var(--text)_55%,transparent)]">Casualties</span>
              <span className="text-[var(--accent)]">{totalDeaths}</span>
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
            className="mt-2 w-full rounded-md border border-[color-mix(in_oklab,white_18%,transparent)] bg-transparent py-2.5 font-[family-name:var(--font-orbitron)] text-[11px] font-bold uppercase tracking-wider text-[var(--text)] transition-colors hover:bg-[color-mix(in_oklab,white_6%,transparent)]"
          >
            Download HTML report
          </button>
        </aside>

        <main className="min-w-0 space-y-6">
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["🚀", missions.length, "MISSIONS INDEXED", "Documented failures"],
                  ["💰", `$${(totalCost / 1000).toFixed(1)}B`, "TOTAL COST LOST", "Estimated"],
                  ["⚠", totalDeaths, "FATALITIES", "Recorded"],
                  ["🔴", missions.filter((m) => m.severity === "CRITICAL").length, "CRITICAL EVENTS", "Max severity"],
                ].map(([icon, val, label, sub]) => (
                  <div
                    key={String(label)}
                    className="clip-panel relative overflow-hidden border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--surface)] p-5"
                  >
                    <div className="absolute left-0 right-0 top-0 h-px bg-[color-mix(in_oklab,white_18%,transparent)]" />
                    <div className="text-2xl">{icon}</div>
                    <div className="font-[family-name:var(--font-orbitron)] text-3xl font-black text-[var(--accent)]">{val}</div>
                    <div className="mt-2 font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                      {label}
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-space-mono)] text-[10px] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_82%,var(--bg))] p-4">
                  <p className="mb-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
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
                          background: "#18181b",
                          border: "1px solid #3f3f46",
                          borderRadius: 6,
                          fontSize: "11px",
                          color: "#e4e4e7",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-lg border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--surface)_82%,var(--bg))] p-4">
                  <p className="mb-4 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                    Failures by decade
                  </p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={decData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                      <XAxis dataKey="name" tick={{ fill: "#6a8aaa", fontSize: 10 }} />
                      <YAxis tick={{ fill: "#6a8aaa", fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          background: "#18181b",
                          border: "1px solid #3f3f46",
                          borderRadius: 6,
                          fontSize: "11px",
                          color: "#e4e4e7",
                        }}
                      />
                      <Bar dataKey="value" fill="#a1a1aa" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {tab === "missions" && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-[family-name:var(--font-space-mono)] text-xs text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                  Showing <span className="text-[var(--cyan)]">{filtered.length}</span> of {missions.length}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--input-bg)] px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[11px] text-[var(--text)]"
                >
                  <option value="year-desc">Year ↓</option>
                  <option value="year-asc">Year ↑</option>
                  <option value="cost-desc">Cost ↓</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[color-mix(in_oklab,white_12%,transparent)]">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead className="bg-[color-mix(in_oklab,white_6%,transparent)]">
                    <tr>
                      {["Mission", "Year", "Agency", "Vehicle", "Type", "Severity", "Cost", ""].map((h) => (
                        <th
                          key={h}
                          className="border-b border-[color-mix(in_oklab,white_12%,transparent)] px-4 py-3 text-left font-[family-name:var(--font-space-mono)] text-[10px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_82%,white)]"
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
                        className="cursor-pointer border-b border-[color-mix(in_oklab,white_6%,transparent)] hover:bg-[color-mix(in_oklab,white_5%,transparent)]"
                        onClick={() => setModal(m)}
                      >
                        <td className="px-4 py-3 font-semibold">{m.name}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-space-mono)] text-[var(--cyan)]">{m.year}</td>
                        <td className="px-4 py-3">{m.agency}</td>
                        <td className="px-4 py-3 text-[color-mix(in_oklab,var(--text)_65%,transparent)]">{m.vehicle}</td>
                        <td className="px-4 py-3">
                          <Pill cat={m.category} />
                        </td>
                        <td className="px-4 py-3">
                          <SevDot sev={m.severity} />
                        </td>
                        <td className="px-4 py-3 font-[family-name:var(--font-space-mono)] text-[var(--pass)]">${m.cost}M</td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            className="rounded border border-[color-mix(in_oklab,white_14%,transparent)] px-2 py-1 font-[family-name:var(--font-space-mono)] text-[10px] text-[color-mix(in_oklab,var(--text)_75%,transparent)]"
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
            <div className="relative pl-8">
              <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-[color-mix(in_oklab,white_22%,transparent)]" />
              {[...missions].sort((a, b) => a.year - b.year).map((m) => (
                <div key={m.id} className="relative mb-6">
                  <div
                    className="absolute -left-6 top-2 h-3 w-3 rounded-full border-2 bg-[var(--bg)] shadow-[0_0_8px_currentColor]"
                    style={{ borderColor: SEV_COLORS[m.severity] ?? "#a1a1aa" }}
                  />
                  <button
                    type="button"
                    className="w-full rounded-lg border border-[color-mix(in_oklab,white_10%,transparent)] bg-[var(--surface)] p-4 text-left transition-colors hover:border-[color-mix(in_oklab,white_22%,transparent)]"
                    onClick={() => setModal(m)}
                  >
                    <div className="font-[family-name:var(--font-orbitron)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_70%,transparent)]">{m.year}</div>
                    <div className="mt-1 font-[family-name:var(--font-space-mono)] text-sm font-bold">{m.name}</div>
                    <p className="mt-2 line-clamp-3 text-sm text-[color-mix(in_oklab,var(--text)_68%,transparent)]">{m.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill cat={m.category} />
                      <SevDot sev={m.severity} />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "patterns" && (
            <div className="space-y-6">
              <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                Root cause pattern analysis
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {catData
                  .sort((a, b) => b.value - a.value)
                  .map((d) => {
                    const pct = Math.round((d.value / missions.length) * 100);
                    return (
                      <div key={d.name} className="clip-panel border border-[color-mix(in_oklab,white_10%,transparent)] bg-[var(--surface)] p-5">
                        <div className="font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">{d.name}</div>
                        <div className="font-[family-name:var(--font-orbitron)] text-3xl font-black" style={{ color: d.color }}>
                          {d.value}
                        </div>
                        <div className="mt-1 font-[family-name:var(--font-space-mono)] text-[11px] text-[var(--cyan)]">{pct}% of archive</div>
                        <div className="mt-3 h-1 overflow-hidden rounded bg-[rgba(255,255,255,.06)]">
                          <div className="h-full rounded" style={{ width: `${pct}%`, background: d.color }} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="rounded-lg border border-[color-mix(in_oklab,white_12%,transparent)] bg-[color-mix(in_oklab,white_4%,transparent)] p-6">
                <h3 className="border-b border-[color-mix(in_oklab,white_10%,transparent)] pb-2 font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-wide text-[color-mix(in_oklab,var(--text)_78%,white)]">
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
                      <span className="font-bold text-[var(--accent)]">›</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "ai" && (
            <div className="rounded-lg border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--surface)] p-6">
              <h3 className="font-[family-name:var(--font-orbitron)] text-lg text-[var(--text)]">Claude — failure intelligence</h3>
              <p className="mt-2 font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                Ask questions about patterns across all indexed missions (API key required on server).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { q: "Summarize the dominant failure modes by category.", short: "Dominant modes" },
                  { q: "Which missions highlight software vs structural risk?", short: "Software vs structural" },
                  { q: "What procedural fixes recur most often in lessons learned?", short: "Recurring fixes" },
                ].map(({ q, short }) => (
                  <button
                    type="button"
                    key={short}
                    onClick={() => setAiPr(q)}
                    className="rounded border border-[color-mix(in_oklab,white_10%,transparent)] px-3 py-1.5 font-[family-name:var(--font-space-mono)] text-[10px] text-[color-mix(in_oklab,var(--text)_65%,transparent)] hover:border-[color-mix(in_oklab,white_20%,transparent)]"
                  >
                    {short}
                  </button>
                ))}
              </div>
              <textarea
                value={aiPr}
                onChange={(e) => setAiPr(e.target.value)}
                rows={4}
                className="mt-4 w-full rounded-md border border-[color-mix(in_oklab,white_12%,transparent)] bg-[var(--input-bg)] p-4 font-[family-name:var(--font-rajdhani)] text-sm text-[var(--text)] outline-none focus:border-[color-mix(in_oklab,var(--accent)_40%,transparent)]"
                placeholder="Ask about mission failures, costs, systemic lessons…"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={runAI}
                  disabled={aiLoad}
                  className="rounded-md bg-[var(--accent)] px-6 py-2 font-[family-name:var(--font-orbitron)] text-[11px] font-bold uppercase tracking-wide text-[var(--on-accent)] hover:opacity-90 disabled:opacity-50"
                >
                  {aiLoad ? "Analyzing…" : "Analyze"}
                </button>
              </div>
              <div className="mt-6 min-h-[140px] rounded-md border border-[color-mix(in_oklab,white_10%,transparent)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] p-4 font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed">
                {aiLoad ? (
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] italic text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                    Querying mission intelligence…
                  </span>
                ) : aiOut ? (
                  <div
                    className="prose prose-invert max-w-none text-[var(--text)]"
                    dangerouslySetInnerHTML={{
                      __html: aiOut
                        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e4e4e7">$1</strong>')
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                ) : (
                  <span className="font-[family-name:var(--font-space-mono)] text-[11px] text-[color-mix(in_oklab,var(--text)_55%,transparent)]">
                    Responses appear here.
                  </span>
                )}
              </div>
            </div>
          )}

          {tab === "analyzer" && (
            <div className="clip-panel border border-[color-mix(in_oklab,white_14%,transparent)] bg-[var(--surface)] p-8 text-center">
              <h3 className="font-[family-name:var(--font-orbitron)] text-xl text-[var(--text)]">Structural analysis workflow</h3>
              <p className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-rajdhani)] text-sm leading-relaxed text-[color-mix(in_oklab,var(--text)_72%,transparent)]">
                Run the three-step AstroFlow analyzer (vehicle selection → parameters → fused physics + archive verdict + Claude).
              </p>
              <Link
                href="/analyze"
                className="mt-8 inline-flex rounded-md bg-[var(--accent)] px-8 py-3 font-[family-name:var(--font-orbitron)] text-xs font-bold uppercase tracking-widest text-[var(--on-accent)] hover:opacity-90"
              >
                Open analyzer
              </Link>
            </div>
          )}
        </main>
      </div>

      <MissionModal m={modal} onClose={() => setModal(null)} />
    </div>
  );
}
