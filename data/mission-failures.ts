import type { MissionFailure } from "@/types/mission-intel";
import { MISSION_FAILURES_A } from "@/data/mission-failures.part-a";
import { MISSION_FAILURES_B } from "@/data/mission-failures.part-b";

/** 36 documented aerospace mission failures used for intelligence dashboards and verdict fusion. */
export const MISSION_FAILURES: MissionFailure[] = [
  ...MISSION_FAILURES_A,
  ...MISSION_FAILURES_B,
];
