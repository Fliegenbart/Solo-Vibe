"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Check,
  Loader2,
  Circle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "transfer", label: "Transferring code to server" },
  { id: "build", label: "Installing dependencies" },
  { id: "start", label: "Starting application" },
  { id: "health", label: "Running health check" },
];

export function DeployModal() {
  const [open, setOpen] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const done = currentStep >= steps.length;
  const isDeploying = deploying && !done;

  const startDeploy = useCallback(() => {
    setDeploying(true);
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (!isDeploying || currentStep < 0) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1200 + Math.random() * 800);
    return () => clearTimeout(timer);
  }, [isDeploying, currentStep]);

  const reset = () => {
    setDeploying(false);
    setCurrentStep(-1);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger
        render={<Button className="gap-2 text-slate-950" />}
      >
        <Rocket className="w-4 h-4" />
        Go live
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{done ? "Your project is live" : isDeploying ? "Going live..." : "Go live"}</DialogTitle>
        </DialogHeader>

        {!isDeploying && !done && (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              This will deploy <strong className="text-foreground">v4</strong> to
              your server at <strong className="text-foreground">142.132.45.12</strong>.
            </p>
            <Button
              onClick={startDeploy}
              className="w-full gap-2 text-slate-950"
            >
              <Rocket className="w-4 h-4" />
              Deploy now
            </Button>
          </div>
        )}

        {(isDeploying || done) && (
          <div className="space-y-3 pt-2">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isDone = i < currentStep || done;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    isDone && "text-cyan-100",
                    isActive && "text-foreground",
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
                  {step.label}
                </div>
              );
            })}

            {done && (
              <div className="mt-4 rounded-2xl border border-cyan-300/18 bg-cyan-400/[0.08] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
                  <div className="h-2 w-2 rounded-full bg-cyan-200 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.65)]" />
                  Live at 142.132.45.12:3000
                </div>
                <a
                  href="#"
                  className="mt-2 flex items-center gap-1 text-xs text-cyan-100/70 hover:text-cyan-50"
                >
                  Open in browser <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
