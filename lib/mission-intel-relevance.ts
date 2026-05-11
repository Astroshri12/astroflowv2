import { MISSION_FAILURES } from "@/data/mission-failures";
import type { MissionFailure, FailureCategory } from "@/types/mission-intel";
import type { MetricRow, VehicleType } from "@/types/astroflow";

function severityWeight(s: MissionFailure["severity"]): number {
  switch (s) {
    case "CRITICAL":
      return 1;
    case "HIGH":
      return 0.72;
    case "MEDIUM":
      return 0.45;
    case "LOW":
      return 0.22;
    default:
      return 0.4;
  }
}

/** Map failing physics metrics to historical failure categories in the 37-mission archive. */
function categoriesFromMetric(name: string, vehicle: VehicleType): FailureCategory[] {
  const n = name.toLowerCase();
  const out = new Set<FailureCategory>();

  if (n.includes("twr") || n.includes("thrust") || n.includes("mach") || n.includes("burn")) {
    out.add("propulsion");
    out.add("structural");
  }
  if (n.includes("max-q") || n.includes("dynamic q") || n.includes("accel")) {
    out.add("structural");
  }
  if (n.includes("drag")) {
    out.add("propulsion");
    out.add("structural");
  }
  if (
    n.includes("δv") ||
    n.includes("delta") ||
    (n.includes("est.") && n.includes("v"))
  ) {
    out.add("propulsion");
    out.add("software");
  }
  if (n.includes("stability") || n.includes("fin")) {
    out.add("design");
    out.add("guidance");
  }
  if (n.includes("stall") || n.includes("cl ") || n.includes("cl(") || n.includes("l/d")) {
    out.add("design");
    out.add("structural");
  }
  if (n.includes("wing loading")) {
    out.add("design");
    out.add("structural");
  }
  if (n.includes("margin")) {
    out.add("design");
    out.add("software");
  }
  if (n.includes("reference area")) {
    out.add("design");
  }

  if (out.size === 0) {
    out.add(vehicle === "missile" ? "guidance" : "design");
  }

  return [...out];
}

function riskCategories(metrics: MetricRow[], vehicle: VehicleType): FailureCategory[] {
  const set = new Set<FailureCategory>();
  for (const m of metrics) {
    if (!m.ok) {
      for (const c of categoriesFromMetric(m.name, vehicle)) {
        set.add(c);
      }
    }
  }
  if (set.size === 0) {
    set.add("design");
    set.add("propulsion");
  }
  return [...set];
}

function vehicleChannelScore(vehicle: VehicleType, mission: MissionFailure): number {
  const blob = `${mission.type} ${mission.vehicle} ${mission.destination}`.toLowerCase();

  if (vehicle === "rocket") {
    if (
      /shuttle|launcher|lv|falcon|delta|ariane|zenit|long march|naro|pslv|gslv|vulcan|h-ii|pegasus|proton|titan|sea launch|cargo|commercial|uncrewed|crewed|sample return|orbiter|mars|lunar|moon|escape/i.test(
        blob,
      )
    ) {
      return 1;
    }
    if (/satellite|geo|leo|gto|heliocentric|observer/i.test(blob)) return 0.55;
    return 0.28;
  }

  if (vehicle === "missile") {
    if (/missile|ballistic|icbm|dart|intercept|defense|ascent|rendezvous/i.test(blob)) return 1;
    if (/rocket|stage|launch/i.test(blob)) return 0.45;
    return 0.2;
  }

  if (vehicle === "aircraft") {
    if (/aircraft|jet|plane|glider|motor-glider|turboprop|utility|regional|cargo|echo|globalstar|aehf|inmarsat/i.test(blob))
      return 1;
    if (/satellite|orbit|mars|lunar/i.test(blob)) return 0.18;
    return 0.25;
  }

  return 0.3;
}

function categoryOverlapScore(
  mission: MissionFailure,
  riskCats: FailureCategory[],
): number {
  if (riskCats.includes(mission.category)) return 1;
  return 0.18;
}

export type RankedMissionFailure = MissionFailure & { score: number; similarity: number };

export function rankMissionFailures(
  vehicle: VehicleType,
  metrics: MetricRow[],
): RankedMissionFailure[] {
  const riskCats = riskCategories(metrics, vehicle);

  const scored = MISSION_FAILURES.map((m) => {
    const channel = vehicleChannelScore(vehicle, m);
    const overlap = categoryOverlapScore(m, riskCats);
    const base = 0.55 * overlap + 0.45 * channel;
    const boosted = base * (0.65 + 0.35 * severityWeight(m.severity));
    const score = boosted;
    const similarity = Math.min(1, Math.max(0.05, score));
    return { ...m, score, similarity };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function weightedSeverityIndex(ranked: RankedMissionFailure[]): number {
  let wSum = 0;
  let acc = 0;
  for (const m of ranked) {
    const w = m.similarity;
    wSum += w;
    acc += w * severityWeight(m.severity);
  }
  if (wSum <= 0) return 0;
  return acc / wSum;
}
