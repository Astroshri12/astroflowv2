import type { AnalysisResult, MetricRow, VehicleType } from "@/types/astroflow";
import { analyzeHistory } from "@/lib/mission-history";

export function rho(altM: number): number {
  if (altM <= 11000) {
    const T = 288.15 - 0.0065 * altM;
    return 1.225 * Math.pow(T / 288.15, 4.256);
  }
  return 0.3639 * Math.exp(-0.0001577 * (altM - 11000));
}

function verdictFromFails(fails: number): AnalysisResult["verdict"] {
  if (fails === 0) return "PASS";
  if (fails === 1) return "MARGINAL";
  return "FAIL";
}

function analyzeRocket(inputs: Record<string, number>): AnalysisResult {
  const mass = inputs.mass;
  const thrust = inputs.thrust;
  const cd = inputs.cd;
  const diameter = inputs.diameter;
  const altitudeKm = inputs.altitude;

  const thrN = thrust * 1000;
  const refA = Math.PI * Math.pow(diameter / 2, 2);
  const twr = thrN / (mass * 9.81);
  const dv = 252 * 9.81 * Math.log(1 / 0.28);
  const maxQ =
    0.5 * rho(altitudeKm * 1000 * 0.14) * Math.pow(dv * 0.28, 2);
  const dRat = (cd * refA * maxQ) / thrN;

  const metrics: MetricRow[] = [
    {
      name: "TWR",
      value: twr,
      unit: "",
      ok: twr >= 1.3,
    },
    {
      name: "Reference Area",
      value: refA,
      unit: "m²",
      ok: true,
    },
    {
      name: "Est. ΔV",
      value: dv / 1000,
      unit: "km/s",
      ok: dv > 1500,
    },
    {
      name: "Max-Q",
      value: maxQ / 1000,
      unit: "kPa",
      ok: maxQ < 60000,
    },
    {
      name: "Drag/Thrust",
      value: dRat * 100,
      unit: "%",
      ok: dRat < 0.3,
    },
  ];

  const fails = metrics.filter((m) => m.ok === false).length;
  const physicsVerdict = verdictFromFails(fails);
  const { historical, fusedVerdict } = analyzeHistory(
    "rocket",
    inputs,
    fails,
    physicsVerdict,
    metrics,
  );
  return {
    metrics,
    verdict: fusedVerdict,
    fails,
    physicsVerdict,
    historical,
  };
}

function analyzeMissile(inputs: Record<string, number>): AnalysisResult {
  const mass = inputs.mass;
  const thrust = inputs.thrust;
  const targetMach = inputs.targetMach;
  const diameter = inputs.diameter;
  const finSpan = inputs.finSpan;

  const thrN = thrust * 1000;
  const tVel = targetMach * 340;
  const refA = Math.PI * Math.pow(diameter / 2, 2);
  const finA = finSpan * diameter * 0.5;
  const twr = thrN / (mass * 9.81);
  const accG = thrN / (mass * 9.81);
  const stab = finA / refA;
  const dynQ = 0.5 * 1.225 * tVel * tVel;
  const tToV = tVel / (thrN / mass);

  const metrics: MetricRow[] = [
    {
      name: "TWR",
      value: twr,
      unit: "",
      ok: twr >= 3.0,
    },
    {
      name: "Peak Accel",
      value: accG,
      unit: "g",
      ok: accG >= 5,
    },
    {
      name: "Fin Stability",
      value: stab,
      unit: "",
      ok: stab >= 0.3,
    },
    {
      name: "Dynamic q",
      value: dynQ / 1000,
      unit: "kPa",
      ok: dynQ < 200000,
    },
    {
      name: "Time to Mach",
      value: tToV,
      unit: "s",
      ok: tToV < 30,
    },
  ];

  const fails = metrics.filter((m) => m.ok === false).length;
  const physicsVerdict = verdictFromFails(fails);
  const { historical, fusedVerdict } = analyzeHistory(
    "missile",
    inputs,
    fails,
    physicsVerdict,
    metrics,
  );
  return {
    metrics,
    verdict: fusedVerdict,
    fails,
    physicsVerdict,
    historical,
  };
}

function analyzeAircraft(inputs: Record<string, number>): AnalysisResult {
  const mtow = inputs.mtow;
  const wingArea = inputs.wingArea;
  const aspectRatio = inputs.aspectRatio;
  const cruiseSpeed = inputs.cruiseSpeed;
  const altitude = inputs.altitude;

  const r = rho(altitude);
  const W = mtow * 9.81;
  const q = 0.5 * r * cruiseSpeed * cruiseSpeed;
  const CL = W / (q * wingArea);
  const Vs = Math.sqrt((2 * W) / (r * wingArea * 1.5));
  const sm = ((cruiseSpeed - Vs) / Vs) * 100;
  const CDi = (CL * CL) / (Math.PI * aspectRatio * 0.8);
  const LD = CL / (0.025 + CDi);
  const WL = W / wingArea;

  const metrics: MetricRow[] = [
    {
      name: "CL (cruise)",
      value: CL,
      unit: "",
      ok: CL > 0.1 && CL < 1.2,
    },
    {
      name: "Stall Speed",
      value: Vs,
      unit: "m/s",
      ok: Vs < cruiseSpeed * 0.7,
    },
    {
      name: "Stall Margin",
      value: sm,
      unit: "%",
      ok: sm > 30,
    },
    {
      name: "L/D Ratio",
      value: LD,
      unit: "",
      ok: LD > 8,
    },
    {
      name: "Wing Loading",
      value: WL,
      unit: "N/m²",
      ok: WL < 3000,
    },
  ];

  const fails = metrics.filter((m) => m.ok === false).length;
  const physicsVerdict = verdictFromFails(fails);
  const { historical, fusedVerdict } = analyzeHistory(
    "aircraft",
    inputs,
    fails,
    physicsVerdict,
    metrics,
  );
  return {
    metrics,
    verdict: fusedVerdict,
    fails,
    physicsVerdict,
    historical,
  };
}

export function runStructuralAnalysis(
  vType: VehicleType,
  inputs: Record<string, number>,
): AnalysisResult {
  switch (vType) {
    case "rocket":
      return analyzeRocket(inputs);
    case "missile":
      return analyzeMissile(inputs);
    case "aircraft":
      return analyzeAircraft(inputs);
  }
}
