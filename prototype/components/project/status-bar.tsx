import { Globe, Clock, Server, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBar({ project }: { project: Project }) {
  return (
    <div className="app-panel flex flex-wrap items-center gap-3 px-4 py-4 text-sm">
      <Badge
        variant="outline"
        className={cn(
          "",
          project.status === "live" &&
            "border-cyan-300/18 bg-cyan-400/[0.12] text-cyan-100",
          project.status === "draft" &&
            "border-white/10 bg-white/[0.03] text-zinc-300",
          project.status === "error" &&
            "border-rose-300/18 bg-rose-400/[0.12] text-rose-100"
        )}
      >
        {project.status === "live" && "Live"}
        {project.status === "draft" && "Not published"}
        {project.status === "error" && "Problem"}
      </Badge>

      {project.liveRelease && (
        <span className="telemetry-pill">
          <Globe className="w-3.5 h-3.5 text-cyan-200" />
          {project.liveRelease}
        </span>
      )}

      {project.lastSnapshot && (
        <span className="telemetry-pill">
          <Clock className="w-3.5 h-3.5 text-cyan-200" />
          Last snapshot: {project.lastSnapshot}
        </span>
      )}

      {project.serverIp && (
        <span className="telemetry-pill">
          <Server className="w-3.5 h-3.5 text-cyan-200" />
          {project.serverIp}
        </span>
      )}

      {project.status === "error" && (
        <span className="telemetry-pill border-rose-300/18 bg-rose-400/[0.08] text-rose-100">
          <AlertCircle className="w-3.5 h-3.5 text-rose-200" />
          Health check failed
        </span>
      )}

      <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-muted-foreground/55">
        {project.runtime === "nodejs" ? "Node.js" : "Static site"}
      </span>
    </div>
  );
}
