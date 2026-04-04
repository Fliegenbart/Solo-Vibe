"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  detectedProjectSummary,
  uploadChecks,
  uploadOptions,
  uploadSteps,
} from "@/lib/mock-data";
import { UploadSource } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Circle,
  FolderOpen,
  Loader2,
  PackageOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { UploadOptionCard } from "./upload-option-card";

const sampleUploads: Record<Exclude<UploadSource, "github">, string> = {
  zip: "solo-vibe-export.zip",
  folder: "desktop/ai-app-export/",
};

export function UploadFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSource, setSelectedSource] = useState<UploadSource>("zip");
  const [projectName, setProjectName] = useState("Client Portal MVP");
  const [scanIndex, setScanIndex] = useState(-1);

  const selectedOption = useMemo(
    () => uploadOptions.find((option) => option.id === selectedSource) ?? uploadOptions[0],
    [selectedSource]
  );

  const isInspectStep = stepIndex === 1;
  const inspectDone = scanIndex >= uploadChecks.length;

  useEffect(() => {
    if (!isInspectStep || scanIndex < 0 || inspectDone) return;

    const timer = window.setTimeout(() => {
      setScanIndex((current) => current + 1);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [inspectDone, isInspectStep, scanIndex]);

  const startInspect = () => {
    setStepIndex(1);
    setScanIndex(0);
  };

  const resetFlow = () => {
    setStepIndex(0);
    setSelectedSource("zip");
    setProjectName("Client Portal MVP");
    setScanIndex(-1);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
      <section className="app-panel relative overflow-hidden p-6 lg:p-7">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_45%)]" />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        <Badge className="bg-white/8 text-white hover:bg-white/8">
          Closed beta prototype
        </Badge>
        <h2 className="display-title mt-5 max-w-md text-4xl font-semibold text-white">
          Bring your AI-built app here before it gets lost in a chat thread.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">
          Start with the code you already have. Solo-Vibe stores it safely,
          checks what it is, and only then suggests the next step.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="metric-shell">
            <div className="relative">
              <p className="eyebrow-label">Store</p>
              <p className="mt-2 text-sm font-medium text-white">First snapshot created</p>
            </div>
          </div>
          <div className="metric-shell">
            <div className="relative">
              <p className="eyebrow-label">Inspect</p>
              <p className="mt-2 text-sm font-medium text-white">Runtime and structure detected</p>
            </div>
          </div>
          <div className="metric-shell">
            <div className="relative">
              <p className="eyebrow-label">Guide</p>
              <p className="mt-2 text-sm font-medium text-white">Next action stays clear</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {uploadSteps.map((step, index) => {
            const active = index === stepIndex;
            const complete = index < stepIndex;

            return (
              <div
                key={step.id}
                className={cn(
                  "rounded-2xl border px-4 py-3 transition-all",
                  active && "border-cyan-300/30 bg-cyan-400/[0.07] shadow-[0_0_24px_rgba(34,211,238,0.12)]",
                  complete && "border-cyan-300/18 bg-cyan-400/[0.04]",
                  !active && !complete && "border-white/8 bg-white/4"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                      complete && "border-cyan-300/35 bg-cyan-300/18 text-cyan-50",
                      active && "border-cyan-300/55 bg-cyan-300/18 text-white shadow-[0_0_20px_rgba(34,211,238,0.18)]",
                      !active && !complete && "border-white/10 text-zinc-400"
                    )}
                  >
                    {complete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{step.label}</p>
                    <p className="text-xs text-zinc-400">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
            Builder protection
          </p>
          <ul className="mt-3 space-y-3 text-sm text-zinc-200">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
              Your first version is saved before any risky server step.
            </li>
            <li className="flex gap-3">
              <PackageOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-200" />
              Solo-Vibe explains what it found in plain language.
            </li>
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-200" />
              The next action stays obvious even if you are not technical.
            </li>
          </ul>
        </div>
      </section>

      <section className="app-panel p-5 lg:p-7">
        {stepIndex === 0 && (
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Step 1
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  Start a new project from the code you already have
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Name it once, choose the import path, then preview what Solo-Vibe
                  will check before anything gets deployed.
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-cyan-300/20 bg-cyan-400/[0.12] text-cyan-100"
              >
                No Git required
              </Badge>
            </div>

            <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-5">
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Project name</span>
                  <input
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/15"
                    placeholder="My AI-built app"
                  />
                </label>

                <div>
                  <p className="text-sm font-medium text-foreground">Upload source</p>
                  <div className="mt-3 grid gap-3">
                    {uploadOptions.map((option) => (
                      <UploadOptionCard
                        key={option.id}
                        option={option}
                        selected={option.id === selectedSource}
                        onSelect={setSelectedSource}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-dashed border-cyan-300/20 bg-cyan-400/[0.05] p-4">
                <div className="flex items-start gap-3">
                  {selectedSource === "zip" ? (
                    <PackageOpen className="mt-0.5 h-5 w-5 text-cyan-200" />
                  ) : (
                    <FolderOpen className="mt-0.5 h-5 w-5 text-cyan-200" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">Import preview</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Source path: <span className="text-foreground">{selectedOption.name}</span>
                    </p>
                    {selectedSource !== "github" && (
                      <p className="mt-3 rounded-xl bg-background/80 px-3 py-2 font-mono text-xs text-foreground/80">
                        {sampleUploads[selectedSource]}
                      </p>
                    )}
                    <div className="mt-4 space-y-3 rounded-2xl border border-white/8 bg-black/20 p-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                          What happens on review
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">
                          Solo-Vibe checks project type, likely entry point, and the
                          safest next action.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-100/80">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                        Preview only, no deployment yet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={startInspect}
                disabled={!projectName.trim() || selectedOption.availability !== "ready"}
                className="text-slate-950"
              >
                Review import
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        )}

        {stepIndex === 1 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Step 2
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              Solo-Vibe explains what it found before anything goes live
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This is where a non-technical builder should feel safe: code first,
              explanation second, deployment later.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Imported safely
              </span>
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Project understood
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {uploadChecks.map((check, index) => {
                const active = index === scanIndex && !inspectDone;
                const complete = index < scanIndex || inspectDone;

                return (
                  <div
                    key={check.id}
                    className={cn(
                      "rounded-2xl border px-4 py-3 transition-all",
                      complete && "border-cyan-300/18 bg-cyan-400/[0.06]",
                      active && "border-cyan-300/30 bg-cyan-400/[0.08]",
                      !complete && !active && "border-border bg-background"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {complete ? (
                          <Check className="h-4 w-4 text-cyan-200" />
                        ) : active ? (
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{check.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{check.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-background/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Detected project summary
                </p>
                <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                  Safe to create workspace
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{projectName}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedOption.name}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-xs text-muted-foreground">Runtime</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {detectedProjectSummary.runtime === "nodejs" ? "Node.js" : "Static"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-xs text-muted-foreground">Framework</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {detectedProjectSummary.framework}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.05] p-4 text-sm text-muted-foreground">
                <p className="text-sm leading-6 text-zinc-100">
                  {detectedProjectSummary.plainLanguageSummary}
                </p>
                <p className="mt-3">
                  <span className="font-medium text-foreground">Safe status:</span>{" "}
                  {detectedProjectSummary.safeStatus}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-foreground">It likely needs:</span>{" "}
                  {detectedProjectSummary.likelyNeed}
                </p>
                <p>
                  <span className="font-medium text-foreground">Likely entry point:</span>{" "}
                  {detectedProjectSummary.entryPoint}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-foreground">Storage plan:</span>{" "}
                  {detectedProjectSummary.storagePlan}
                </p>
                <p className="mt-2">
                  <span className="font-medium text-foreground">Next step:</span>{" "}
                  {detectedProjectSummary.nextStep}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={() => setStepIndex(2)}
                disabled={!inspectDone}
                className="text-slate-950"
              >
                Create workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={() => setStepIndex(0)}
                className="text-left text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Back and change upload
              </button>
            </div>
          </div>
        )}

        {stepIndex === 2 && (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Step 3
            </p>
            <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="display-title mt-4 text-3xl font-semibold tracking-tight">
              <span className="text-foreground">{projectName}</span> is ready for its first safe version
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              The important part is done: the code has a home, Solo-Vibe knows what it
              is, and the next action is obvious instead of overwhelming.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Imported safely
              </span>
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                First snapshot created
              </span>
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Ready for server setup
              </span>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl border border-white/8 bg-background p-4">
                <p className="text-sm font-medium text-foreground">What Solo-Vibe guaranteed</p>
                <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                    First snapshot is stored so rollback is possible later.
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                    Solo-Vibe can guide you to server setup when you are ready.
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                    You never needed Git commands to reach this point.
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/80">
                  Next safe step
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-100">
                  Open the dashboard, connect one server, then preview before you go live.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Why this matters
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  You already have a safe baseline. From here on, every risky step can be explained against that saved version.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(56,189,248,0.84),rgba(99,102,241,0.8))] px-4 text-sm font-semibold text-slate-950 shadow-[0_12px_34px_rgba(8,145,178,0.3)] transition hover:brightness-110"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={resetFlow}
                className="text-left text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Start again
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
