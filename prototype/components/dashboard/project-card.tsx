import Link from "next/link";
import { Globe, Clock, AlertCircle, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="app-panel group block px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/14 hover:shadow-[0_24px_60px_rgba(2,8,23,0.5)]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-cyan-300/16 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_70%),rgba(255,255,255,0.02)] shadow-[0_0_18px_rgba(34,211,238,0.1)]">
            <FileCode className="h-5 w-5 text-cyan-100" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {project.runtime === "nodejs" ? "Node runtime" : "Static runtime"}
            </p>
            <h3 className="display-title mt-1 text-2xl font-semibold text-white transition-colors group-hover:text-cyan-50">
              {project.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "mt-1",
            project.status === "live" &&
              "border-emerald-300/20 bg-emerald-400/[0.12] text-emerald-100",
            project.status === "draft" &&
              "border-white/10 bg-white/[0.03] text-zinc-300",
            project.status === "error" &&
              "border-rose-300/20 bg-rose-400/[0.12] text-rose-100"
          )}
        >
          {project.status === "live" && "Live"}
          {project.status === "draft" && "Not published"}
          {project.status === "error" && "Problem"}
        </Badge>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {project.liveRelease && (
          <span className="telemetry-pill">
            <Globe className="h-3.5 w-3.5 text-cyan-200" />
            {project.liveRelease}
          </span>
        )}
        {project.lastSnapshot && (
          <span className="telemetry-pill">
            <Clock className="h-3.5 w-3.5 text-cyan-200" />
            {project.lastSnapshot}
          </span>
        )}
        {project.status === "error" && (
          <span className="telemetry-pill border-rose-300/16 bg-rose-400/[0.08] text-rose-100">
            <AlertCircle className="h-3.5 w-3.5 text-rose-200" />
            Health check failed
          </span>
        )}
        <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-muted-foreground/55">
          {project.runtime === "nodejs" ? "Node.js" : "Static"}
        </span>
      </div>
    </Link>
  );
}
