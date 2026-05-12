"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VEHICLE_LABEL } from "@/lib/constants";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/results/MetricCard";
import { VerdictBanner } from "@/components/results/VerdictBanner";
import { MissionHistoryPanel } from "@/components/results/MissionHistoryPanel";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAstroFlow } from "@/components/providers/AstroFlowProvider";

export function ResultsScreen() {
  const router = useRouter();
  const { vType, result, analysisRunId, resetForNewAnalysis } = useAstroFlow();

  useEffect(() => {
    if (!vType || !result || analysisRunId === 0) {
      router.replace("/analyze/input");
    }
  }, [vType, result, analysisRunId, router]);

  if (!vType || !result || analysisRunId === 0) {
    return (
      <AppShell step={3}>
        <p className="font-[family-name:var(--font-space-mono)] text-sm text-fg-caption">
          Redirecting…
        </p>
      </AppShell>
    );
  }

  const vehicleTitle = VEHICLE_LABEL[vType].toUpperCase();
  const flagged = result.metrics.filter((m) => !m.ok).length;

  return (
    <AppShell step={3}>
      <div className="flex flex-col gap-10 animate-fadein">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/analyze/input")}
            className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-wider text-info hover:text-accent"
          >
            ← MODIFY PARAMETERS
          </button>
          <Link
            href="/"
            className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-widest text-fg-ghost hover:text-foreground"
          >
            Home
          </Link>
        </div>

        <p className="font-[family-name:var(--font-space-mono)] text-[11px] uppercase tracking-[0.35em] text-fg-caption">
          03 — Analysis Results — {vehicleTitle}
        </p>

        <VerdictBanner
          verdict={result.verdict}
          physicsVerdict={result.physicsVerdict}
          flagged={flagged}
          total={result.metrics.length}
          fusionNote={result.historical.fusionNote}
        />

        <MissionHistoryPanel historical={result.historical} />

        <section className="flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-orbitron)] text-lg tracking-wide text-foreground">
            Calculated metrics
          </h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]">
            {result.metrics.map((m) => (
              <MetricCard key={m.name} metric={m} />
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            type="button"
            variant="primary"
            onClick={() => {
              resetForNewAnalysis();
              router.push("/");
            }}
          >
            New Analysis
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="ghost"
            onClick={() => router.push("/analyze/input")}
          >
            Adjust inputs
          </PrimaryButton>
        </div>
      </div>
    </AppShell>
  );
}
