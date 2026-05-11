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
  aiText: string;
  busy: boolean;
  analysisRunId: number;
  aiSyncedRunId: number;
  runAnalysis: () => AnalysisResult | null;
  resetForNewAnalysis: () => void;
  setAiFromApi: (text: string) => void;
  setBusy: (v: boolean) => void;
  markAiSynced: (runId: number) => void;
};

const AstroFlowContext = createContext<AstroFlowContextValue | null>(null);

export function AstroFlowProvider({ children }: { children: React.ReactNode }) {
  const [vType, setVTypeState] = useState<VehicleType | null>(null);
  const [inputs, setInputsState] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [aiText, setAiText] = useState("");
  const [busy, setBusy] = useState(false);
  const [analysisRunId, setAnalysisRunId] = useState(0);
  const [aiSyncedRunId, setAiSyncedRunId] = useState(0);

  const setVType = useCallback((v: VehicleType | null) => {
    setVTypeState(v);
    if (v) {
      setInputsState({ ...DEFAULT_INPUTS[v] });
    } else {
      setInputsState({});
    }
    setResult(null);
    setAiText("");
    setAnalysisRunId(0);
    setAiSyncedRunId(0);
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
    setAiText("");
    setAiSyncedRunId(0);
    setAnalysisRunId((n) => n + 1);
    return r;
  }, [vType, inputs]);

  const resetForNewAnalysis = useCallback(() => {
    setVTypeState(null);
    setInputsState({});
    setResult(null);
    setAiText("");
    setBusy(false);
    setAnalysisRunId(0);
    setAiSyncedRunId(0);
  }, []);

  const setAiFromApi = useCallback((text: string) => {
    setAiText(text);
  }, []);

  const markAiSynced = useCallback((runId: number) => {
    setAiSyncedRunId(runId);
  }, []);

  const value = useMemo<AstroFlowContextValue>(
    () => ({
      vType,
      setVType,
      inputs,
      setInputs,
      updateInput,
      result,
      aiText,
      busy,
      analysisRunId,
      aiSyncedRunId,
      runAnalysis,
      resetForNewAnalysis,
      setAiFromApi,
      setBusy,
      markAiSynced,
    }),
    [
      vType,
      setVType,
      inputs,
      result,
      aiText,
      busy,
      analysisRunId,
      aiSyncedRunId,
      runAnalysis,
      resetForNewAnalysis,
      setAiFromApi,
      markAiSynced,
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
