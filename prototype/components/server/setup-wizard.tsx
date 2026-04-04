"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Loader2,
  Circle,
  Server,
  Wifi,
  Shield,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ServerInfo } from "@/lib/types";

const setupSteps = [
  {
    id: "connect",
    label: "Reach your server safely",
    detail: "Solo-Vibe first checks whether the server can be reached over SSH.",
    icon: Wifi,
  },
  {
    id: "detect",
    label: "Understand what server you have",
    detail: "We detect the operating system and make sure the project matches it.",
    icon: Server,
  },
  {
    id: "install",
    label: "Install only what this project needs",
    detail: "Solo-Vibe prepares the smallest toolset needed for this app type.",
    icon: Wrench,
  },
  {
    id: "secure",
    label: "Lock down the deploy path",
    detail: "Permissions are narrowed so future deploys stay predictable and safer.",
    icon: Shield,
  },
];

export function SetupWizard({ server }: { server: ServerInfo | null }) {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const fallbackServer: ServerInfo = server ?? {
    ip: "142.132.45.12",
    os: "Ubuntu 24.04 LTS",
    status: "connected",
    lastChecked: "just now",
    guidedHelp:
      "Solo-Vibe checks the server for you, installs only what this project needs, and keeps the risky parts behind a guided flow.",
    nextSafeStep:
      "Once the checks are green, you can return to the project and start a first safe deploy.",
    requirements: [
      "One Ubuntu or Debian VPS with SSH access",
      "Root or sudo access for the first setup",
      "A public IP address you can reach from the internet",
    ],
    checks: [
      "Can Solo-Vibe reach the server over SSH?",
      "Which operating system is running there?",
      "Is the server ready for this project type?",
    ],
    installs: [
      "A deploy user with safer permissions",
      "Only the runtime tools this project needs",
      "A repeatable release path for future snapshots",
    ],
  };
  const done = !!server || currentStep >= setupSteps.length;
  const isRunning = running && currentStep >= 0 && currentStep < setupSteps.length;

  const startSetup = useCallback(() => {
    setRunning(true);
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (!isRunning || currentStep < 0) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1500 + Math.random() * 1000);
    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  if (done) {
    return (
      <div className="space-y-4">
        <div className="telemetry-pill w-fit border-cyan-300/18 bg-cyan-400/[0.08] text-cyan-100">
          <div className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.65)]" />
          Server ready
        </div>
        <div className="border-b border-white/8 pb-4">
          <p className="eyebrow-label text-cyan-100/75">What Solo-Vibe confirmed</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-200">{fallbackServer.guidedHelp}</p>
          <p className="mt-3 text-sm font-medium text-white">{fallbackServer.nextSafeStep}</p>
        </div>
        <div className="divide-y divide-white/8 rounded-[1.1rem] border border-white/8 bg-white/[0.02]">
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-muted-foreground">IP Address</span>
            <span className="text-sm font-mono">{fallbackServer.ip}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-muted-foreground">Operating System</span>
            <span className="text-sm">{fallbackServer.os}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="text-sm text-muted-foreground">Last checked</span>
            <span className="text-sm text-muted-foreground">{fallbackServer.lastChecked}</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-t border-white/8 pt-4">
            <p className="eyebrow-label">What was checked</p>
            <ul className="mt-3 support-list">
              {fallbackServer.checks.map((check) => (
                <li key={check}>
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                  {check}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/8 pt-4">
            <p className="eyebrow-label">What was prepared</p>
            <ul className="mt-3 support-list">
              {fallbackServer.installs.map((item) => (
                <li key={item}>
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Test connection
          </Button>
          <Button size="sm" className="gap-2 text-xs text-slate-950">
            Continue to deploy
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Disconnect safely
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isRunning && !done && (
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="eyebrow-label text-cyan-100/75">What you need</p>
              <ul className="mt-3 support-list">
                {fallbackServer.requirements.map((item) => (
                  <li key={item}>
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Server IP address
              </span>
              <input
                type="text"
                placeholder="e.g. 142.132.45.12"
                defaultValue="142.132.45.12"
                className="mt-2 w-full rounded-xl border border-white/10 bg-background/70 px-3 py-3 text-sm font-mono focus:border-cyan-300/28 focus:outline-none focus:ring-2 focus:ring-cyan-300/18"
              />
            </label>
            <p className="text-sm leading-6 text-muted-foreground">
              Solo-Vibe will connect via SSH, check your server, and only prepare
              the deploy path your project actually needs.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-t border-white/8 pt-4">
                <p className="eyebrow-label">What Solo-Vibe checks</p>
                <ul className="mt-3 support-list">
                  {fallbackServer.checks.map((check) => (
                    <li key={check}>
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/8 pt-4">
                <p className="eyebrow-label">What gets set up</p>
                <ul className="mt-3 support-list">
                  {fallbackServer.installs.map((item) => (
                    <li key={item}>
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Button
            onClick={startSetup}
            className="gap-2 text-slate-950"
          >
            <Server className="w-4 h-4" />
            Connect server
          </Button>
        </div>
      )}

      {isRunning && (
        <div className="space-y-3">
          {setupSteps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 border-l pl-4 pr-2 py-1 text-sm transition-all duration-300",
                  isDone && "border-cyan-300/30 text-cyan-50",
                  isActive && "border-cyan-300/45 text-foreground",
                  !isDone && !isActive && "border-white/10 text-muted-foreground/40"
                )}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-cyan-200 flex-shrink-0" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-200 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 flex-shrink-0" />
                )}
                <StepIcon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground/80">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
