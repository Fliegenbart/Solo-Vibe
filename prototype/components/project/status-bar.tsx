import { Globe, Clock, Server, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBar({ project }: { project: Project }) {
  return (
    <div className="app-panel px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
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

        <div className="max-w-xs border-l border-white/8 pl-4">
          <p className="eyebrow-label">Next safe action</p>
          <p className="mt-2 text-sm font-medium text-white">{project.nextSafeAction.label}</p>
          <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
            {project.nextSafeAction.detail}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-white/8 pt-4">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
        {project.liveRelease && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Live version
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-white">
              <Globe className="w-3.5 h-3.5 text-cyan-200" />
              {project.liveRelease}
            </p>
          </div>
        )}

        {project.lastStableRelease && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Last stable version
            </p>
            <p className="mt-1 text-sm font-medium text-white">{project.lastStableRelease}</p>
          </div>
        )}

        {project.lastSnapshot && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Last snapshot
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-white">
              <Clock className="w-3.5 h-3.5 text-cyan-200" />
              {project.lastSnapshot}
            </p>
          </div>
        )}

        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
            Project type
          </p>
          <p className="mt-1 text-sm font-medium text-white">
            {project.runtime === "nodejs" ? "Node.js app" : "Static site"}
          </p>
        </div>

        {project.serverIp && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Server connection
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-white">
              <Server className="w-3.5 h-3.5 text-cyan-200" />
              {project.serverIp}
            </p>
          </div>
        )}
        </div>
      </div>

      {project.status === "error" && project.attention && (
        <div className="mt-4 rounded-[1.25rem] border border-rose-300/16 bg-rose-400/[0.08] px-4 py-4 text-sm text-rose-100">
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
