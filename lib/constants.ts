import type { InputFieldDef, VehicleType } from "@/types/astroflow";

export const GOVERNING_LAWS = [
  "Newton's Laws of Motion",
  "Tsiolkovsky Rocket Equation",
  "ISA Standard Atmosphere",
  "Bernoulli's Principle",
  "Prandtl Lifting-Line Theory",
  "Dynamic Pressure (q = ½ρv²)",
  "Drag Equation (F = ½ρv²CdA)",
  "Fin Stability Analysis",
  "Max-Q Structural Constraint",
  "Oswald Efficiency Factor",
  "Thrust-to-Weight Constraint",
] as const;

export const ACTIVE_LAWS: Record<VehicleType, readonly string[]> = {
  rocket: [
    "Newton's Laws of Motion",
    "Tsiolkovsky Rocket Equation",
    "ISA Standard Atmosphere",
    "Dynamic Pressure (q = ½ρv²)",
    "Drag Equation (F = ½ρv²CdA)",
    "Max-Q Structural Constraint",
    "Thrust-to-Weight Constraint",
  ],
  missile: [
    "Newton's Laws of Motion",
    "ISA Standard Atmosphere",
    "Dynamic Pressure (q = ½ρv²)",
    "Drag Equation (F = ½ρv²CdA)",
    "Fin Stability Analysis",
    "Thrust-to-Weight Constraint",
  ],
  aircraft: [
    "Bernoulli's Principle",
    "Prandtl Lifting-Line Theory",
    "ISA Standard Atmosphere",
    "Dynamic Pressure (q = ½ρv²)",
    "Oswald Efficiency Factor",
    "Newton's Laws of Motion",
  ],
};

export const VEHICLE_LABEL: Record<VehicleType, string> = {
  rocket: "Rocket",
  missile: "Missile",
  aircraft: "Aircraft",
};

export const INPUT_FIELDS: Record<VehicleType, InputFieldDef[]> = {
  rocket: [
    { key: "mass", label: "Gross Liftoff Mass", unit: "kg", step: "1" },
    { key: "thrust", label: "Total Thrust", unit: "kN", step: "0.1" },
    { key: "cd", label: "Drag Coefficient", unit: "", step: "0.01" },
    { key: "diameter", label: "Body Diameter", unit: "m", step: "0.01" },
    { key: "altitude", label: "Target Altitude", unit: "km", step: "1" },
  ],
  missile: [
    { key: "mass", label: "Launch Mass", unit: "kg", step: "1" },
    { key: "thrust", label: "Propulsive Force", unit: "kN", step: "0.1" },
    { key: "targetMach", label: "Target Mach Number", unit: "", step: "0.1" },
    { key: "diameter", label: "Body Diameter", unit: "m", step: "0.01" },
    { key: "finSpan", label: "Fin Span", unit: "m", step: "0.01" },
  ],
  aircraft: [
    { key: "mtow", label: "Max Takeoff Weight", unit: "kg", step: "1" },
    { key: "wingArea", label: "Wing Area", unit: "m²", step: "0.1" },
    { key: "aspectRatio", label: "Aspect Ratio", unit: "", step: "0.1" },
    { key: "cruiseSpeed", label: "Cruise Speed", unit: "m/s", step: "0.1" },
    { key: "altitude", label: "Cruise Altitude", unit: "m", step: "1" },
  ],
};

export const DEFAULT_INPUTS: Record<VehicleType, Record<string, number>> = {
  rocket: {
    mass: 5000,
    thrust: 100,
    cd: 0.3,
    diameter: 0.5,
    altitude: 100,
  },
  missile: {
    mass: 200,
    thrust: 50,
    targetMach: 2.5,
    diameter: 0.2,
    finSpan: 0.4,
  },
  aircraft: {
    mtow: 5000,
    wingArea: 20,
    aspectRatio: 8,
    cruiseSpeed: 100,
    altitude: 3000,
  },
};
