import type { AnalysisResult, VehicleType } from "@/types/astroflow";
import { VEHICLE_LABEL } from "@/lib/constants";
import { formatMetricValue } from "@/lib/format";

export function buildUserPrompt(
  vType: VehicleType,
  inputs: Record<string, number>,
  result: AnalysisResult,
): string {
  const vehicleType = VEHICLE_LABEL[vType];
  const inputLines = Object.entries(inputs)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const metricLines = result.metrics
    .map((m) => {
      const tag = m.ok ? "PASS" : "FAIL";
      return `${m.name}: ${formatMetricValue(m)} ${m.unit} [${tag}]`;
    })
    .join("\n");

  const hist = result.historical;
  const analogLines = hist.neighbors
    .map((n) => {
      const meta = [n.category, n.severity].filter(Boolean).join(" · ");
      return `${n.name}${n.year ? ` (${n.year})` : ""}${meta ? ` — ${meta}` : ""} · similarity=${n.similarity}`;
    })
    .join("\n");

  return `Analyze this ${vehicleType} design for structural/aerodynamic viability.

INPUT PARAMETERS:
${inputLines}

CALCULATED METRICS:
${metricLines}

PHYSICS-ONLY VERDICT: ${result.physicsVerdict}
FINAL VERDICT (physics fused with the documented mission-failure archive): ${result.verdict}

ARCHIVE CONTEXT (36 documented failures — severity-weighted matching):
Composite severity-weighted risk index: ${(hist.analogFailureRate * 100).toFixed(1)}%
Complementary confidence index: ${(hist.analogSuccessRate * 100).toFixed(1)}%
Closest archived missions:
${analogLines}

FUSION SUMMARY:
${hist.fusionNote}

Provide:
VERDICT — Confirm the FINAL VERDICT (${result.verdict}) with confidence % and one sentence of reasoning (mention archive analogs only if relevant).
CRITICAL RISKS — 2–3 specific failure points based on flagged metrics.
IMPROVEMENTS — 2–3 concrete parameter changes to improve the design.
KEY LAW — The single most critical physical law governing this design.

Target audience: aerospace engineering students and beginners.`;
}

export const SYSTEM_PROMPT =
  "You are AstroFlow — an aerospace structural analysis AI for students. Be concise and technically accurate. Use these exact section headers on their own lines: VERDICT, CRITICAL RISKS, IMPROVEMENTS, KEY LAW.";
