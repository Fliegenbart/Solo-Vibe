import { Globe, Clock, Server, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBar({ project }: { project: Project }) {
  return (
    <div className="app-panel px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge
            variant="outline"
            className={cn(
              project.visibleState === "live_and_healthy" &&
                "border-cyan-300/18 bg-cyan-400/[0.12] text-cyan-100",
              project.visibleState === "imported_safely" &&
                "border-cyan-300/18 bg-cyan-400/[0.12] text-cyan-100",
              project.status === "draft" &&
                project.visibleState !== "imported_safely" &&
                "border-white/10 bg-white/[0.03] text-zinc-300",
              project.visibleState === "attention_needed" &&
                "border-rose-300/18 bg-rose-400/[0.12] text-rose-100"
            )}
          >
            {project.stateCopy.label}
          </Badge>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-200">
            {project.stateCopy.detail}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
          <p className="eyebrow-label">Next safe action</p>
          <p className="mt-2 text-sm font-medium text-white">{project.nextSafeAction.label}</p>
          <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
            {project.nextSafeAction.detail}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {project.liveRelease && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
            <p className="eyebrow-label">Live version</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
              <Globe className="w-3.5 h-3.5 text-cyan-200" />
              {project.liveRelease}
            </p>
          </div>
        )}

        {project.lastStableRelease && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
            <p className="eyebrow-label">Last stable version</p>
            <p className="mt-2 text-sm font-medium text-white">{project.lastStableRelease}</p>
          </div>
        )}

        {project.lastSnapshot && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
            <p className="eyebrow-label">Last snapshot</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
              <Clock className="w-3.5 h-3.5 text-cyan-200" />
              {project.lastSnapshot}
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
          <p className="eyebrow-label">Project type</p>
          <p className="mt-2 text-sm font-medium text-white">
            {project.runtime === "nodejs" ? "Node.js app" : "Static site"}
          </p>
        </div>

        {project.serverIp && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 md:col-span-2">
            <p className="eyebrow-label">Server connection</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
              <Server className="w-3.5 h-3.5 text-cyan-200" />
              {project.serverIp}
            </p>
          </div>
        )}
      </div>

      {project.status === "error" && project.attention && (
        <div className="mt-4 rounded-2xl border border-rose-300/16 bg-rose-400/[0.08] px-4 py-4 text-sm text-rose-100">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 w-4 h-4 text-rose-200" />
            <div className="space-y-2">
              <p className="font-medium text-white">What happened</p>
              <p>{project.attention.happened}</p>
              <p className="font-medium text-white">What this means</p>
              <p>{project.attention.meaning}</p>
              <p className="font-medium text-white">Safe next step</p>
              <p>{project.attention.nextSafeStep}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
