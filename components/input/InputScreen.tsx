"use client";

import { useEffect } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { InputForm } from "@/components/input/InputForm";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useAstroFlow } from "@/components/providers/AstroFlowProvider";

export function InputScreen() {
  const router = useRouter();
  const { vType, inputs, updateInput, runAnalysis } = useAstroFlow();

  useEffect(() => {
    if (!vType) {
      router.replace("/analyze");
    }
  }, [vType, router]);

  if (!vType) {
    return (
      <AppShell step={2}>
        <p className="font-[family-name:var(--font-space-mono)] text-sm text-fg-caption">
          Redirecting…
        </p>
      </AppShell>
    );
  }

  return (
    <AppShell step={2}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/analyze"
            className="font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-wider text-info hover:text-accent"
          >
            ← Change vehicle
          </Link>
          <PrimaryButton
            type="button"
            variant="ghost"
            onClick={() => router.push("/analyze")}
          >
            Mission catalog
          </PrimaryButton>
        </div>

        <InputForm
          vType={vType}
          inputs={inputs}
          onChange={updateInput}
          onSubmit={() => {
            flushSync(() => {
              runAnalysis();
            });
            router.push("/analyze/results");
          }}
        />
      </div>
    </AppShell>
  );
}
