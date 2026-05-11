export type VehicleType = "rocket" | "missile" | "aircraft";

export type ScreenRoute = "select" | "input" | "results";

export type Verdict = "PASS" | "MARGINAL" | "FAIL";

export type MissionOutcome = "success" | "failure";

export type MetricRow = {
  name: string;
  value: number;
  unit: string;
  ok: boolean;
};

export type HistoricalAnalog = {
  id: string;
  name: string;
  year?: number;
  outcome: MissionOutcome;
  similarity: number;
  summary: string;
  severity?: string;
  category?: string;
  agency?: string;
};

/** analogFailureRate / analogSuccessRate are complementary risk indices derived from severity-weighted archive matches (not literal success rates). */
export type HistoricalContext = {
  analogFailureRate: number;
  analogSuccessRate: number;
  neighbors: HistoricalAnalog[];
  fusionNote: string;
};

export type AnalysisResult = {
  metrics: MetricRow[];
  verdict: Verdict;
  fails: number;
  physicsVerdict: Verdict;
  historical: HistoricalContext;
};

export type InputFieldDef = {
  key: string;
  label: string;
  unit: string;
  step?: string;
};
