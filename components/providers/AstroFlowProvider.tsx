"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { AnalysisResult, VehicleType } from "@/types/astroflow";
import { DEFAULT_INPUTS } from "@/lib/constants";
import { runStructuralAnalysis } from "@/lib/physics";

type AstroFlowContextValue = {
  vType: VehicleType | null;
  setVType: (v: VehicleType | null) => void;
  inputs: Record<string, number>;
  setInputs: (patch: Record<string, number>) => void;
  updateInput: (key: string, value: number) => void;
  result: AnalysisResult | null;
  analysisRunId: number;
  runAnalysis: () => AnalysisResult | null;
  resetForNewAnalysis: () => void;
};

const AstroFlowContext = createContext<AstroFlowContextValue | null>(null);

export function AstroFlowProvider({ children }: { children: React.ReactNode }) {
  const [vType, setVTypeState] = useState<VehicleType | null>(null);
  const [inputs, setInputsState] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisRunId, setAnalysisRunId] = useState(0);

  const setVType = useCallback((v: VehicleType | null) => {
    setVTypeState(v);
    if (v) {
      setInputsState({ ...DEFAULT_INPUTS[v] });
    } else {
      setInputsState({});
    }
    setResult(null);
    setAnalysisRunId(0);
  }, []);

  const setInputs = useCallback((patch: Record<string, number>) => {
    setInputsState((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateInput = useCallback((key: string, value: number) => {
    setInputsState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const runAnalysis = useCallback(() => {
    if (!vType) return null;
    const r = runStructuralAnalysis(vType, inputs);
    setResult(r);
    setAnalysisRunId((n) => n + 1);
    return r;
  }, [vType, inputs]);

  const resetForNewAnalysis = useCallback(() => {
    setVTypeState(null);
    setInputsState({});
    setResult(null);
    setAnalysisRunId(0);
  }, []);

  const value = useMemo<AstroFlowContextValue>(
    () => ({
      vType,
      setVType,
      inputs,
      setInputs,
      updateInput,
      result,
      analysisRunId,
      runAnalysis,
      resetForNewAnalysis,
    }),
    [
      vType,
      setVType,
      inputs,
      result,
      analysisRunId,
      runAnalysis,
      resetForNewAnalysis,
      updateInput,
      setInputs,
    ],
  );

  return (
    <AstroFlowContext.Provider value={value}>{children}</AstroFlowContext.Provider>
  );
}

export function useAstroFlow() {
  const ctx = useContext(AstroFlowContext);
  if (!ctx) {
    throw new Error("useAstroFlow must be used within AstroFlowProvider");
  }
  return ctx;
}
