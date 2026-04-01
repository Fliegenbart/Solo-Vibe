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
  const [done, setDone] = useState(false);

  const startDeploy = useCallback(() => {
    setDeploying(true);
    setCurrentStep(0);
    setDone(false);
  }, []);

  useEffect(() => {
    if (!deploying || currentStep < 0) return;
    if (currentStep >= steps.length) {
      setDone(true);
      setDeploying(false);
      return;
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1200 + Math.random() * 800);
    return () => clearTimeout(timer);
  }, [deploying, currentStep]);

  const reset = () => {
    setDeploying(false);
    setCurrentStep(-1);
    setDone(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
          <Rocket className="w-4 h-4" />
          Go live
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {done ? "Your project is live" : deploying ? "Going live..." : "Go live"}
          </DialogTitle>
        </DialogHeader>

        {!deploying && !done && (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              This will deploy <strong className="text-foreground">v4</strong> to
              your server at <strong className="text-foreground">142.132.45.12</strong>.
            </p>
            <Button
              onClick={startDeploy}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
            >
              <Rocket className="w-4 h-4" />
              Deploy now
            </Button>
          </div>
        )}

        {(deploying || done) && (
          <div className="space-y-3 pt-2">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isDone = i < currentStep || done;

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-all duration-300",
                    isDone && "text-green-400",
                    isActive && "text-foreground",
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
                  {step.label}
                </div>
              );
            })}

            {done && (
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live at 142.132.45.12:3000
                </div>
                <a
                  href="#"
                  className="flex items-center gap-1 text-xs text-green-400/70 mt-1 hover:text-green-400"
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
