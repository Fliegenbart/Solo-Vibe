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
  { id: "connect", label: "Testing SSH connection", icon: Wifi },
  { id: "detect", label: "Detecting server environment", icon: Server },
  { id: "install", label: "Installing required software", icon: Wrench },
  { id: "secure", label: "Configuring permissions", icon: Shield },
];

export function SetupWizard({ server }: { server: ServerInfo | null }) {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const fallbackServer: ServerInfo = server ?? {
    ip: "142.132.45.12",
    os: "Ubuntu 24.04 LTS",
    status: "connected",
    lastChecked: "just now",
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
          Server connected
        </div>
        <div className="app-panel divide-y divide-white/8">
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Test connection
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isRunning && !done && (
        <div className="space-y-4">
          <div className="app-panel space-y-4 p-5">
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
              Solo-Vibe will connect via SSH, check your server, and install
              everything needed to deploy your projects.
            </p>
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
                  "flex items-center gap-3 rounded-2xl border p-4 text-sm transition-all duration-300",
                  isDone && "border-cyan-300/18 bg-cyan-400/[0.06] text-cyan-50",
                  isActive && "border-cyan-300/24 bg-cyan-400/[0.08] text-foreground shadow-[0_0_24px_rgba(34,211,238,0.1)]",
                  !isDone && !isActive && "text-muted-foreground/40"
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
                {step.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
