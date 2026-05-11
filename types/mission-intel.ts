export type FailureSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type FailureCategory =
  | "structural"
  | "software"
  | "design"
  | "propulsion"
  | "human"
  | "guidance"
  | "environmental"
  | "comms";

export type MissionFailure = {
  id: string;
  name: string;
  year: number;
  agency: string;
  vehicle: string;
  type: string;
  category: FailureCategory;
  severity: FailureSeverity;
  cost: number;
  casualties: number;
  destination: string;
  desc: string;
  root: string;
  lessons: string[];
};
