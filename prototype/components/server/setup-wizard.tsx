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
  const [done, setDone] = useState(!!server);

  const startSetup = useCallback(() => {
    setRunning(true);
    setCurrentStep(0);
    setDone(false);
  }, []);

  useEffect(() => {
    if (!running || currentStep < 0) return;
    if (currentStep >= setupSteps.length) {
      setDone(true);
      setRunning(false);
      return;
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1500 + Math.random() * 1000);
    return () => clearTimeout(timer);
  }, [running, currentStep]);

  if (done && server) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          Server connected
        </div>
        <div className="border border-border rounded-lg bg-card divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">IP Address</span>
            <span className="text-sm font-mono">{server.ip}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Operating System</span>
            <span className="text-sm">{server.os}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">Last checked</span>
            <span className="text-sm text-muted-foreground">{server.lastChecked}</span>
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
      {!running && !done && (
        <div className="space-y-4">
          <div className="border border-border rounded-lg bg-card p-4 space-y-3">
            <label className="block">
              <span className="text-sm text-muted-foreground">Server IP address</span>
              <input
                type="text"
                placeholder="e.g. 142.132.45.12"
                defaultValue="142.132.45.12"
                className="mt-1.5 w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Solo-Vibe will connect via SSH, check your server, and install
              everything needed to deploy your projects.
            </p>
          </div>
          <Button
            onClick={startSetup}
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          >
            <Server className="w-4 h-4" />
            Connect server
          </Button>
        </div>
      )}

      {running && (
        <div className="space-y-3">
          {setupSteps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-3 text-sm p-3 rounded-lg transition-all duration-300",
                  isDone && "text-green-400 bg-green-500/5",
                  isActive && "text-foreground bg-purple-500/5",
                  !isDone && !isActive && "text-muted-foreground/40"
                )}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400 flex-shrink-0" />
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
