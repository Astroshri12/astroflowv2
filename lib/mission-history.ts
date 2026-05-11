import type {
  HistoricalAnalog,
  HistoricalContext,
  MetricRow,
  VehicleType,
  Verdict,
} from "@/types/astroflow";
import {
  rankMissionFailures,
  weightedSeverityIndex,
  type RankedMissionFailure,
} from "@/lib/mission-intel-relevance";

function toAnalog(m: RankedMissionFailure): HistoricalAnalog {
  return {
    id: m.id,
    name: m.name,
    year: m.year,
    outcome: "failure",
    similarity: Math.round(m.similarity * 1000) / 1000,
    summary: m.desc.length > 220 ? `${m.desc.slice(0, 217)}…` : m.desc,
    severity: m.severity,
    category: m.category,
    agency: m.agency,
  };
}

export function fusePhysicsAndHistory(
  physicsFails: number,
  physicsVerdict: Verdict,
  severityIndex: number,
): { verdict: Verdict; fusionNote: string } {
  const pct = Math.round(severityIndex * 100);

  if (physicsFails >= 2) {
    return {
      verdict: "FAIL",
      fusionNote:
        "Physics shows multiple failed checks. The 36-mission failure archive ranks analogous systemic risks — conservative FAIL retained.",
    };
  }

  if (physicsFails === 0) {
    if (severityIndex >= 0.62) {
      return {
        verdict: "MARGINAL",
        fusionNote: `Physics cleared every metric, but top archived analogies skew toward high-severity historical failures (composite risk ${pct}/100). Verdict nudged to MARGINAL.`,
      };
    }
    return {
      verdict: "PASS",
      fusionNote:
        severityIndex <= 0.42
          ? "Physics PASS with comparatively moderate severity among closest archived mission failures."
          : "Physics PASS; archived failure parallels exist but with moderate composite severity.",
    };
  }

  if (physicsFails === 1) {
    if (severityIndex >= 0.72) {
      return {
        verdict: "FAIL",
        fusionNote: `One physics flag plus strong overlap with critical/high-severity historical failures (composite risk ${pct}/100) — tightening to FAIL.`,
      };
    }
    if (severityIndex <= 0.38) {
      return {
        verdict: "PASS",
        fusionNote:
          "Single physics flag, but historical analogies cluster toward lower-severity patterns — cautiously elevated to PASS.",
      };
    }
    return {
      verdict: "MARGINAL",
      fusionNote:
        "One physics metric failed; mission-failure archive supports staying in the marginal band pending redesign.",
    };
  }

  return {
    verdict: physicsVerdict,
    fusionNote: "Historical fusion defaulted to the physics-only verdict.",
  };
}

export function analyzeHistory(
  vehicle: VehicleType,
  _inputs: Record<string, number>,
  physicsFails: number,
  physicsVerdict: Verdict,
  metrics: MetricRow[],
): { historical: HistoricalContext; fusedVerdict: Verdict } {
  const ranked = rankMissionFailures(vehicle, metrics);
  const neighbors = ranked.map(toAnalog);
  const severityIndex = weightedSeverityIndex(ranked);

  const analogFailureRate = Math.round(severityIndex * 1000) / 1000;
  const analogSuccessRate =
    Math.round(Math.max(0, Math.min(1, 1 - severityIndex)) * 1000) / 1000;

  const { verdict, fusionNote } = fusePhysicsAndHistory(
    physicsFails,
    physicsVerdict,
    severityIndex,
  );

  return {
    historical: {
      analogFailureRate,
      analogSuccessRate,
      neighbors,
      fusionNote,
    },
    fusedVerdict: verdict,
  };
}
